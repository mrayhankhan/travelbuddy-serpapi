"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Shield, CreditCard, Smartphone, Building2, Wallet, CheckCircle, Lock, Sparkles, ArrowRight } from "lucide-react";

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet' | null;

export interface PaymentSuccessDetails {
    travelCashUsed: number;
    totalAmountPaid: number;
    paymentMethod: string;
    transactionId: string;
    paidAt: string;
    billingSummary: {
        tripCost: number;
        convenienceFee: number;
        gst: number;
        subtotal: number;
        travelCashDiscount: number;
        totalPaid: number;
    };
}

// ── Official logo URLs ───────────────────────────────────────────────────────
const LOGOS: Record<string, string> = {
    // UPI Apps
    gpay: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg',
    phonepe: 'https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg',
    paytm: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg',
    bhim: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg',
    // Card Networks
    visa: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
    mastercard: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
    rupay: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Rupay-Logo.png',
    amex: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg',
    // Banks
    sbi: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg',
    hdfc: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg',
    icici: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg',
    axis: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg',
    kotak: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Kotak_Mahindra_Bank_logo.svg',
    pnb: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Punjab_National_Bank_logo.svg',
    // Wallets
    amazonpay: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    mobikwik: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/MobiKwik_Logo.svg',
    freecharge: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Freecharge_Logo.svg',
};

function LogoBadge({ src, alt, size = 28 }: { src: string; alt: string; size?: number }) {
    return (
        <div className="rounded-lg bg-white border border-[#F2F2F7] flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{ width: size, height: size, padding: 3 }}>
            <img src={src} alt={alt} className="w-full h-full object-contain"
                onError={(e) => {
                    // Fallback: show first 2 letters
                    const el = e.currentTarget;
                    el.style.display = 'none';
                    if (el.parentElement) {
                        el.parentElement.innerHTML = `<span style="font-size:8px;font-weight:700;color:#666">${alt.slice(0, 2).toUpperCase()}</span>`;
                    }
                }}
            />
        </div>
    );
}

export default function PaymentGateway({
    amount,
    destination,
    onSuccess,
    onCancel,
    travelCashDiscount = 0,
}: {
    amount: number;
    destination: string;
    onSuccess: (details: PaymentSuccessDetails) => void;
    onCancel: () => void;
    travelCashDiscount?: number;
}) {
    const [useTravelCash, setUseTravelCash] = useState(false);
    const [activeMethod, setActiveMethod] = useState<PaymentMethod>(null);
    const [upiId, setUpiId] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [cardName, setCardName] = useState('');
    const [selectedBank, setSelectedBank] = useState<string | null>(null);
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);
    const transactionIdRef = useRef<string>("");

    const onSuccessRef = useRef(onSuccess);
    onSuccessRef.current = onSuccess;

    const convenienceFee = Math.round(amount * 0.02);
    const gst = Math.round(convenienceFee * 0.18);
    const subtotal = amount + convenienceFee + gst;
    const appliedDiscount = useTravelCash ? travelCashDiscount : 0;
    const totalAmount = Math.max(0, subtotal - appliedDiscount);

    const ensureTransactionId = (): string => {
        if (!transactionIdRef.current) {
            const ts = Date.now().toString().slice(-10);
            const rand = Math.floor(1000 + Math.random() * 9000);
            transactionIdRef.current = `TBPAY-${ts}-${rand}`;
        }
        return transactionIdRef.current;
    };

    const getPaymentMethodLabel = (): string => {
        if (activeMethod === 'upi') {
            return upiId ? `UPI (${upiId})` : 'UPI';
        }
        if (activeMethod === 'card') {
            const digits = cardNumber.replace(/\s/g, '');
            const last4 = digits.slice(-4);
            return last4 ? `Card (•••• ${last4})` : 'Card';
        }
        if (activeMethod === 'netbanking') {
            const bankMap: Record<string, string> = {
                sbi: 'SBI NetBanking',
                hdfc: 'HDFC NetBanking',
                icici: 'ICICI NetBanking',
                axis: 'Axis NetBanking',
                kotak: 'Kotak NetBanking',
                pnb: 'PNB NetBanking',
            };
            return selectedBank ? (bankMap[selectedBank] || 'NetBanking') : 'NetBanking';
        }
        if (activeMethod === 'wallet') {
            const walletMap: Record<string, string> = {
                paytm: 'Paytm Wallet',
                amazon: 'Amazon Pay',
                mobikwik: 'MobiKwik',
                freecharge: 'Freecharge',
            };
            return selectedWallet ? (walletMap[selectedWallet] || 'Wallet') : 'Wallet';
        }
        return 'Online Payment';
    };

    const buildPaymentSuccessDetails = (): PaymentSuccessDetails => ({
        travelCashUsed: appliedDiscount,
        totalAmountPaid: totalAmount,
        paymentMethod: getPaymentMethodLabel(),
        transactionId: ensureTransactionId(),
        paidAt: new Date().toISOString(),
        billingSummary: {
            tripCost: amount,
            convenienceFee,
            gst,
            subtotal,
            travelCashDiscount: appliedDiscount,
            totalPaid: totalAmount,
        },
    });

    const formatCardNumber = (val: string) => {
        const v = val.replace(/\D/g, '').slice(0, 16);
        return v.replace(/(.{4})/g, '$1 ').trim();
    };

    const formatExpiry = (val: string) => {
        const v = val.replace(/\D/g, '').slice(0, 4);
        if (v.length >= 2) return v.slice(0, 2) + '/' + v.slice(2);
        return v;
    };

    const handlePay = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setPaymentDone(true);
        }, 2500);
    };

    // Auto-redirect after payment success
    useEffect(() => {
        if (!paymentDone) return;
        const timer = setTimeout(() => {
            onSuccessRef.current(buildPaymentSuccessDetails());
        }, 1500);
        return () => clearTimeout(timer);
    }, [paymentDone, appliedDiscount, totalAmount, amount, convenienceFee, gst, subtotal, activeMethod, upiId, cardNumber, selectedBank, selectedWallet]);

    const canPay = () => {
        if (activeMethod === 'upi') return upiId.includes('@');
        if (activeMethod === 'card') return cardNumber.replace(/\s/g, '').length === 16 && cardExpiry.length === 5 && cardCvv.length === 3 && cardName.length > 2;
        if (activeMethod === 'netbanking') return !!selectedBank;
        if (activeMethod === 'wallet') return !!selectedWallet;
        return false;
    };

    // ── Payment success overlay ──
    if (paymentDone) {
        return (
            <div className="min-h-[100dvh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #F5F3FF 0%, #FFFCF0 100%)' }}>
                <motion.div
                    className="flex flex-col items-center px-8"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                    <motion.div
                        className="w-24 h-24 rounded-full bg-[#34C759]/10 flex items-center justify-center mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                    >
                        <CheckCircle className="w-12 h-12 text-[#34C759]" />
                    </motion.div>
                    <h2 className="text-[24px] font-bold text-[#1A1A1A] mb-2">Payment Successful</h2>
                    <p className="text-[14px] text-[#8E8E93] text-center mb-6">₹{totalAmount.toLocaleString()} paid for your trip to {destination}</p>
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onSuccessRef.current(buildPaymentSuccessDetails())}
                        className="px-8 py-3.5 bg-[#FFD233] text-[#1A1A1A] rounded-full text-[15px] font-bold flex items-center gap-2 shadow-[0_4px_20px_rgba(255,210,51,0.35)]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Continue to Booking
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    // ── Processing overlay ──
    if (isProcessing) {
        return (
            <div className="min-h-[100dvh] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #F5F3FF 0%, #FFFCF0 100%)' }}>
                <motion.div className="flex flex-col items-center px-8">
                    <motion.div
                        className="w-20 h-20 rounded-full border-[5px] border-[#FFD233] border-t-transparent mb-8"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <h2 className="text-[20px] font-bold text-[#1A1A1A] mb-2">Processing Payment...</h2>
                    <p className="text-[13px] text-[#8E8E93] text-center mb-4">Please do not close this window</p>
                    <div className="flex items-center gap-1.5 bg-[#34C759]/10 px-4 py-2 rounded-full">
                        <Lock className="w-3.5 h-3.5 text-[#34C759]" />
                        <span className="text-[12px] text-[#34C759] font-semibold">256-bit SSL Encrypted</span>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] flex flex-col" style={{ background: 'linear-gradient(180deg, #F5F3FF 0%, #FFFCF0 100%)' }}>

            {/* ═══ Premium Header ═══ */}
            <div className="bg-gradient-to-b from-[#1A1A1A] to-[#2A2A2A] rounded-b-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-[#FFD233] flex items-center justify-center shadow-[0_2px_8px_rgba(255,210,51,0.4)]">
                            <Sparkles className="w-5 h-5 text-[#1A1A1A]" />
                        </div>
                        <div>
                            <p className="text-white text-[16px] font-bold tracking-tight">TravelBuddy</p>
                            <p className="text-white/40 text-[11px]">Trip to {destination}</p>
                        </div>
                    </div>
                    <button onClick={onCancel}
                        className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center active:bg-white/20 transition-colors">
                        <X className="w-4 h-4 text-white/70" />
                    </button>
                </div>

                <div className="px-5 pb-4 pt-1">
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.1em] font-semibold mb-1">Total Amount</p>
                    <div className="flex items-end justify-between">
                        <p className="text-white text-[32px] font-bold leading-none">₹{totalAmount.toLocaleString()}</p>
                        <button className="text-[#FFD233] text-[12px] font-semibold flex items-center gap-0.5 mb-1 active:opacity-70">
                            View Details <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                <div className="px-5 pb-4 flex gap-2 overflow-x-auto no-scrollbar">
                    <span className="flex-shrink-0 text-[11px] text-[#1A1A1A] font-bold bg-[#FFD233] px-3 py-1.5 rounded-full shadow-sm">
                        🎉 3 Offers
                    </span>
                    <span className="flex-shrink-0 text-[11px] text-white/70 font-medium bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        Upto ₹{Math.round(totalAmount * 0.05).toLocaleString()} cashback
                    </span>
                    <span className="flex-shrink-0 text-[11px] text-white/70 font-medium bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        No cost EMI available
                    </span>
                </div>
            </div>

            {/* ═══ Payment Methods ═══ */}
            <div className="flex-1 overflow-y-auto pb-48 pt-5 px-5">
                <p className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-[0.12em] mb-4">Choose Payment Method</p>

                <div className="space-y-3">
                    {/* ── UPI ── */}
                    <PaymentOption
                        icon={<Smartphone className="w-5 h-5" />}
                        label="UPI"
                        sublabel="GPay, PhonePe, Paytm & more"
                        isActive={activeMethod === 'upi'}
                        onClick={() => setActiveMethod(activeMethod === 'upi' ? null : 'upi')}
                        badgeLogos={[
                            { src: LOGOS.gpay, alt: 'GPay' },
                            { src: LOGOS.phonepe, alt: 'PhonePe' },
                            { src: LOGOS.paytm, alt: 'Paytm' },
                            { src: LOGOS.bhim, alt: 'BHIM' },
                        ]}
                    >
                        <div className="space-y-4 pt-1">
                            <div>
                                <label className="text-[11px] text-[#8E8E93] font-semibold mb-2 block uppercase tracking-wider">Enter UPI ID</label>
                                <input
                                    type="text"
                                    placeholder="yourname@upi"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    className="w-full px-4 py-3.5 bg-[#F8F8FA] rounded-2xl text-[14px] text-[#1A1A1A] placeholder:text-[#C7C7CC] outline-none focus:ring-2 focus:ring-[#FFD233]/30 border border-[#E5E5EA] transition-all"
                                />
                            </div>
                            <div>
                                <p className="text-[11px] text-[#8E8E93] font-medium mb-2.5">Quick Pay with</p>
                                <div className="flex gap-2.5">
                                    {[
                                        { app: 'GPay', logo: LOGOS.gpay },
                                        { app: 'PhonePe', logo: LOGOS.phonepe },
                                        { app: 'Paytm', logo: LOGOS.paytm },
                                    ].map(({ app, logo }) => (
                                        <button key={app}
                                            onClick={() => setUpiId(`demo@${app.toLowerCase()}`)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-white border border-[#E5E5EA] rounded-xl text-[12px] font-semibold text-[#3A3A3C] active:bg-[#F2F2F7] transition-colors">
                                            <img src={logo} alt={app} className="w-5 h-5 object-contain" />
                                            {app}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </PaymentOption>

                    {/* ── Card ── */}
                    <PaymentOption
                        icon={<CreditCard className="w-5 h-5" />}
                        label="Credit / Debit Card"
                        sublabel="Visa, Mastercard, RuPay"
                        isActive={activeMethod === 'card'}
                        onClick={() => setActiveMethod(activeMethod === 'card' ? null : 'card')}
                        badgeLogos={[
                            { src: LOGOS.visa, alt: 'Visa' },
                            { src: LOGOS.mastercard, alt: 'MC' },
                            { src: LOGOS.rupay, alt: 'RuPay' },
                            { src: LOGOS.amex, alt: 'Amex' },
                        ]}
                    >
                        <div className="space-y-4 pt-1">
                            <div>
                                <label className="text-[11px] text-[#8E8E93] font-semibold mb-2 block uppercase tracking-wider">Card Number</label>
                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                    maxLength={19}
                                    className="w-full px-4 py-3.5 bg-[#F8F8FA] rounded-2xl text-[15px] text-[#1A1A1A] placeholder:text-[#C7C7CC] outline-none focus:ring-2 focus:ring-[#FFD233]/30 border border-[#E5E5EA] font-mono tracking-[0.2em]"
                                />
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="text-[11px] text-[#8E8E93] font-semibold mb-2 block uppercase tracking-wider">Expiry</label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        value={cardExpiry}
                                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                                        maxLength={5}
                                        className="w-full px-4 py-3.5 bg-[#F8F8FA] rounded-2xl text-[15px] text-[#1A1A1A] placeholder:text-[#C7C7CC] outline-none focus:ring-2 focus:ring-[#FFD233]/30 border border-[#E5E5EA] font-mono text-center"
                                    />
                                </div>
                                <div className="w-[110px]">
                                    <label className="text-[11px] text-[#8E8E93] font-semibold mb-2 block uppercase tracking-wider">CVV</label>
                                    <input
                                        type="password"
                                        placeholder="•••"
                                        value={cardCvv}
                                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                        maxLength={3}
                                        className="w-full px-4 py-3.5 bg-[#F8F8FA] rounded-2xl text-[15px] text-[#1A1A1A] placeholder:text-[#C7C7CC] outline-none focus:ring-2 focus:ring-[#FFD233]/30 border border-[#E5E5EA] font-mono text-center"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] text-[#8E8E93] font-semibold mb-2 block uppercase tracking-wider">Cardholder Name</label>
                                <input
                                    type="text"
                                    placeholder="JOHN DOE"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                    className="w-full px-4 py-3.5 bg-[#F8F8FA] rounded-2xl text-[14px] text-[#1A1A1A] placeholder:text-[#C7C7CC] outline-none focus:ring-2 focus:ring-[#FFD233]/30 border border-[#E5E5EA] uppercase tracking-wider"
                                />
                            </div>
                            <div className="flex items-center gap-2 bg-[#34C759]/10 rounded-xl px-3 py-2">
                                <Shield className="w-3.5 h-3.5 text-[#34C759]" />
                                <p className="text-[11px] text-[#34C759] font-medium">Your card details are encrypted and 100% secure</p>
                            </div>
                        </div>
                    </PaymentOption>

                    {/* ── Netbanking ── */}
                    <PaymentOption
                        icon={<Building2 className="w-5 h-5" />}
                        label="Netbanking"
                        sublabel="All Indian banks supported"
                        isActive={activeMethod === 'netbanking'}
                        onClick={() => setActiveMethod(activeMethod === 'netbanking' ? null : 'netbanking')}
                        badgeLogos={[
                            { src: LOGOS.sbi, alt: 'SBI' },
                            { src: LOGOS.hdfc, alt: 'HDFC' },
                            { src: LOGOS.icici, alt: 'ICICI' },
                            { src: LOGOS.axis, alt: 'Axis' },
                        ]}
                    >
                        <div className="space-y-3 pt-1">
                            <p className="text-[11px] text-[#8E8E93] font-semibold uppercase tracking-wider">Popular Banks</p>
                            <div className="grid grid-cols-2 gap-2.5">
                                {[
                                    { id: 'sbi', name: 'SBI', logo: LOGOS.sbi },
                                    { id: 'hdfc', name: 'HDFC Bank', logo: LOGOS.hdfc },
                                    { id: 'icici', name: 'ICICI Bank', logo: LOGOS.icici },
                                    { id: 'axis', name: 'Axis Bank', logo: LOGOS.axis },
                                    { id: 'kotak', name: 'Kotak Bank', logo: LOGOS.kotak },
                                    { id: 'pnb', name: 'PNB', logo: LOGOS.pnb },
                                ].map((bank) => (
                                    <button key={bank.id}
                                        onClick={() => setSelectedBank(bank.id)}
                                        className={`flex items-center gap-2.5 px-3 py-3 rounded-2xl border-2 transition-all ${selectedBank === bank.id
                                            ? 'border-[#FFD233] bg-[#FFD233]/5 shadow-[0_0_0_1px_rgba(255,210,51,0.2)]'
                                            : 'border-[#F2F2F7] bg-white active:bg-[#F8F8FA]'
                                            }`}>
                                        <img src={bank.logo} alt={bank.name} className="w-7 h-7 object-contain flex-shrink-0" />
                                        <span className="text-[12px] font-semibold text-[#1A1A1A] truncate">{bank.name}</span>
                                        {selectedBank === bank.id && <CheckCircle className="w-4 h-4 text-[#FFD233] ml-auto flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </PaymentOption>

                    {/* ── Wallet ── */}
                    <PaymentOption
                        icon={<Wallet className="w-5 h-5" />}
                        label="Wallet"
                        sublabel="Paytm, Amazon Pay, MobiKwik"
                        isActive={activeMethod === 'wallet'}
                        onClick={() => setActiveMethod(activeMethod === 'wallet' ? null : 'wallet')}
                        badgeLogos={[
                            { src: LOGOS.paytm, alt: 'Paytm' },
                            { src: LOGOS.amazonpay, alt: 'Amazon' },
                            { src: LOGOS.mobikwik, alt: 'MobiKwik' },
                            { src: LOGOS.freecharge, alt: 'Freecharge' },
                        ]}
                    >
                        <div className="space-y-2.5 pt-1">
                            {[
                                { id: 'paytm', name: 'Paytm Wallet', logo: LOGOS.paytm },
                                { id: 'amazon', name: 'Amazon Pay', logo: LOGOS.amazonpay },
                                { id: 'mobikwik', name: 'MobiKwik', logo: LOGOS.mobikwik },
                                { id: 'freecharge', name: 'Freecharge', logo: LOGOS.freecharge },
                            ].map((w) => (
                                <button key={w.id}
                                    onClick={() => setSelectedWallet(w.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 transition-all ${selectedWallet === w.id
                                        ? 'border-[#FFD233] bg-[#FFD233]/5 shadow-[0_0_0_1px_rgba(255,210,51,0.2)]'
                                        : 'border-[#F2F2F7] bg-white active:bg-[#F8F8FA]'
                                        }`}>
                                    <img src={w.logo} alt={w.name} className="w-7 h-7 object-contain flex-shrink-0" />
                                    <span className="text-[13px] font-semibold text-[#1A1A1A]">{w.name}</span>
                                    {selectedWallet === w.id && <CheckCircle className="w-4 h-4 text-[#FFD233] ml-auto flex-shrink-0" />}
                                </button>
                            ))}
                        </div>
                    </PaymentOption>
                </div>
            </div>

            {/* ═══ Bottom Pay Button ═══ */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-20">
                <div className="bg-white/80 backdrop-blur-xl border-t border-[#F2F2F7] px-5 pb-6 pt-4">
                    <AnimatePresence>
                        {activeMethod && (
                            <motion.div
                                className="bg-[#FAFAFA] rounded-2xl border border-[#F2F2F7] px-4 py-3 mb-4"
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            >
                                <div className="flex justify-between text-[12px] text-[#8E8E93] mb-1">
                                    <span>Trip Cost</span>
                                    <span className="font-medium">₹{amount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-[12px] text-[#8E8E93] mb-1">
                                    <span>Convenience Fee (2%)</span>
                                    <span className="font-medium">₹{convenienceFee.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-[12px] text-[#8E8E93]">
                                    <span>GST (18%)</span>
                                    <span className="font-medium">₹{gst.toLocaleString()}</span>
                                </div>
                                {travelCashDiscount > 0 && (
                                    <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-dashed border-[#E5E5EA]">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <div className="relative flex items-center justify-center w-5 h-5">
                                                <input 
                                                    type="checkbox" 
                                                    checked={useTravelCash}
                                                    onChange={(e) => setUseTravelCash(e.target.checked)}
                                                    className="appearance-none w-5 h-5 rounded border border-[#C7C7CC] checked:bg-[#34C759] checked:border-[#34C759] transition-colors cursor-pointer"
                                                />
                                                {useTravelCash && <CheckCircle className="absolute w-3.5 h-3.5 text-white pointer-events-none" />}
                                            </div>
                                            <span className="text-[12px] font-medium text-[#1A1A1A] group-hover:text-black transition-colors">
                                                Use Travel Cash (Balance: ₹{travelCashDiscount.toLocaleString()})
                                            </span>
                                        </label>
                                        
                                        {useTravelCash && (
                                            <div className="flex justify-between text-[12px] text-[#34C759] font-semibold pl-7">
                                                <span>🎁 Applied Discount</span>
                                                <span>-₹{appliedDiscount.toLocaleString()}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="border-t border-solid border-[#E5E5EA] mt-2.5 pt-2.5 flex justify-between text-[14px] font-bold text-[#1A1A1A]">
                                    <span>Total</span>
                                    <span>₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        disabled={!canPay()}
                        onClick={handlePay}
                        className={`w-full py-4 rounded-full text-[15px] font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${canPay()
                            ? 'bg-[#FFD233] text-[#1A1A1A] shadow-[0_4px_20px_rgba(255,210,51,0.35)]'
                            : 'bg-[#E5E5EA] text-[#C7C7CC] cursor-not-allowed shadow-none'
                            }`}
                    >
                        <Lock className="w-4 h-4" />
                        Pay ₹{totalAmount.toLocaleString()}
                    </motion.button>

                    <div className="flex items-center justify-center gap-1.5 mt-3">
                        <Shield className="w-3 h-3 text-[#C7C7CC]" />
                        <p className="text-[10px] text-[#C7C7CC]">
                            Secured by <span className="font-bold text-[#1A1A1A]">TravelBuddy Pay</span> · 256-bit SSL
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Reusable payment option accordion ─────────────────────────────────────────
function PaymentOption({
    icon, label, sublabel, badgeLogos, isActive, onClick, children,
}: {
    icon: React.ReactNode;
    label: string;
    sublabel: string;
    badgeLogos: { src: string; alt: string }[];
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <motion.div
            layout
            className={`rounded-2xl border-2 overflow-hidden transition-all ${isActive
                ? 'border-[#FFD233] bg-white shadow-[0_4px_24px_rgba(255,210,51,0.1)]'
                : 'border-[#F2F2F7] bg-white hover:border-[#E5E5EA]'
                }`}
        >
            <button onClick={onClick} className="w-full flex items-center gap-3 p-4 text-left">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${isActive ? 'bg-[#FFD233]/15 text-[#1A1A1A]' : 'bg-[#F2F2F7] text-[#8E8E93]'
                    }`}>
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    <p className={`text-[14px] font-bold ${isActive ? 'text-[#1A1A1A]' : 'text-[#3A3A3C]'}`}>{label}</p>
                    <p className="text-[11px] text-[#8E8E93] truncate">{sublabel}</p>
                </div>
                <div className="flex gap-1.5">
                    {badgeLogos.map((l, i) => (
                        <LogoBadge key={i} src={l.src} alt={l.alt} size={30} />
                    ))}
                </div>
            </button>

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-5 pt-2 border-t border-[#F2F2F7]">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
