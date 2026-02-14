import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  DollarSign,
  Camera,
  Wifi,
  Car,
  Waves,
  Info,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";

type City = "Lusaka" | "Livingstone" | "Ndola" | "Kitwe" | "Solwezi";

type FormData = {
  title: string;
  city: City;
  price_per_night: string; // keep string for input
  description: string;
  has_wifi: boolean;
  has_pool: boolean;
  has_parking: boolean;
  photos: string[]; // store preview URLs (frontend only)
};

type Step = 1 | 2 | 3 | 4;

const STORAGE_KEY = "Mwaiseni_add_property_draft_v1";

export default function AddPropertyPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>(1);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    city: "Lusaka",
    price_per_night: "",
    description: "",
    has_wifi: false,
    has_pool: false,
    has_parking: false,
    photos: [],
  });

  // ----------------------------
  // Draft restore
  // ----------------------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as Partial<FormData>;
      setFormData((prev) => ({
        ...prev,
        ...parsed,
        photos: Array.isArray(parsed.photos) ? parsed.photos : prev.photos,
      }));
    } catch {
      // ignore
    }
  }, []);

  // Draft save
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData]);

  // ----------------------------
  // Helpers
  // ----------------------------
  const priceNumber = useMemo(() => {
    const n = Number(formData.price_per_night);
    return Number.isFinite(n) ? n : 0;
  }, [formData.price_per_night]);

  const formattedPrice = useMemo(() => {
    if (!priceNumber) return "—";
    return `K${priceNumber.toLocaleString()}`;
  }, [priceNumber]);

  const amenitiesCount = useMemo(() => {
    return (
      Number(formData.has_wifi) +
      Number(formData.has_pool) +
      Number(formData.has_parking)
    );
  }, [formData.has_wifi, formData.has_pool, formData.has_parking]);

  const canGoNext = useMemo(() => {
    if (step === 1) {
      return (
        formData.title.trim().length >= 6 &&
        formData.description.trim().length >= 30 &&
        priceNumber > 0
      );
    }

    if (step === 2) return true;
    if (step === 3) return formData.photos.length >= 1; // at least 1 photo
    if (step === 4) return true;

    return false;
  }, [step, formData, priceNumber]);

  const stepTitle = useMemo(() => {
    if (step === 1) return "Property details";
    if (step === 2) return "Amenities";
    if (step === 3) return "Photos";
    return "Review & submit";
  }, [step]);

  const progressPercent = useMemo(() => {
    if (step === 1) return 25;
    if (step === 2) return 50;
    if (step === 3) return 75;
    return 100;
  }, [step]);

  const resetDraft = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // ----------------------------
  // Photos
  // ----------------------------
  const addPhotos = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      // only images
      if (!file.type.startsWith("image/")) continue;

      const url = URL.createObjectURL(file);
      newUrls.push(url);
    }

    if (newUrls.length === 0) return;

    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newUrls].slice(0, 10), // cap 10
    }));
  };

  const removePhoto = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((p) => p !== url),
    }));
    try {
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    }
  };

  // ----------------------------
  // Submit
  // ----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // safety: prevent submit if step not 4
    if (step !== 4) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // clear draft once successful
      resetDraft();

      navigate("/owner/dashboard", {
        state: { message: "Property listed successfully!" },
      });
    }, 1500);
  };

  // ----------------------------
  // UI Components
  // ----------------------------
  const StepPill = ({ n, label }: { n: Step; label: string }) => {
    const active = step === n;
    const done = step > n;

    return (
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-black transition ${
          active
            ? "bg-blue-600 border-blue-600 text-white"
            : done
            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
            : "bg-white border-slate-200 text-slate-500"
        }`}
      >
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
            active
              ? "bg-white text-blue-700"
              : done
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {done ? <CheckCircle2 size={14} /> : n}
        </div>
        <span className="hidden sm:inline">{label}</span>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-10 border border-gray-100">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-600 text-white rounded-3xl shadow-lg shadow-blue-100">
              <Building2 size={32} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                List Your Stay
              </h1>
              <p className="text-slate-500 font-medium italic tracking-tight">
                Reach thousands of Zambian travelers
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              resetDraft();
              setFormData({
                title: "",
                city: "Lusaka",
                price_per_night: "",
                description: "",
                has_wifi: false,
                has_pool: false,
                has_parking: false,
                photos: [],
              });
              setStep(1);
            }}
            className="text-xs font-black text-slate-400 hover:text-red-500 transition flex items-center gap-2 self-start md:self-auto"
          >
            <X size={16} /> Reset draft
          </button>
        </div>

        {/* PROGRESS */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <StepPill n={1} label="Details" />
            <StepPill n={2} label="Amenities" />
            <StepPill n={3} label="Photos" />
            <StepPill n={4} label="Review" />
          </div>

          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
              Step {step} of 4 · {stepTitle}
            </p>
            <p className="text-xs font-bold text-slate-400">
              {progressPercent}%
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1: DETAILS */}
          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-2 duration-300">
              {/* PROPERTY TITLE */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  <Camera size={14} /> Property Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  placeholder="e.g., Victoria Falls Luxury Suite"
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
                <p className="text-[11px] text-slate-500 font-medium ml-1">
                  Tip: Keep it clear and premium. Minimum 6 characters.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CITY SELECTOR */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    <MapPin size={14} /> City
                  </label>
                  <div className="relative">
                    <select
                      value={formData.city}
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold appearance-none cursor-pointer"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          city: e.target.value as City,
                        })
                      }
                    >
                      <option>Lusaka</option>
                      <option>Livingstone</option>
                      <option>Ndola</option>
                      <option>Kitwe</option>
                      <option>Solwezi</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <CheckCircle2 size={18} />
                    </div>
                  </div>
                </div>

                {/* PRICE INPUT */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    <DollarSign size={14} /> Price per night (ZMW)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.price_per_night}
                    placeholder="0.00"
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold font-mono"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price_per_night: e.target.value,
                      })
                    }
                    required
                  />
                  <p className="text-[11px] text-slate-500 font-medium ml-1">
                    Preview: <span className="font-black text-slate-900">{formattedPrice}</span> / night
                  </p>
                </div>
              </div>

              {/* DESCRIPTION TEXTAREA */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  Description
                </label>
                <textarea
                  rows={5}
                  value={formData.description}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium"
                  placeholder="Tell guests what makes your place special..."
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
                <p className="text-[11px] text-slate-500 font-medium ml-1">
                  Minimum 30 characters. You currently have{" "}
                  <span className="font-black">{formData.description.trim().length}</span>.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: AMENITIES */}
          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-2 duration-300">
              <div className="space-y-2">
                <h2 className="text-xl font-black text-slate-900">Amenities</h2>
                <p className="text-sm text-slate-500 font-medium">
                  Add what guests will care about most in Zambia.
                </p>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  Amenities Included
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: "has_wifi", label: "Fast Wi-Fi", icon: <Wifi size={18} /> },
                    { name: "has_pool", label: "Swimming Pool", icon: <Waves size={18} /> },
                    { name: "has_parking", label: "Secure Parking", icon: <Car size={18} /> },
                  ].map((item) => (
                    <label
                      key={item.name}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
                        (formData as any)[item.name]
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-slate-100 text-slate-500 hover:border-slate-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={(formData as any)[item.name]}
                        onChange={(e) =>
                          setFormData({ ...formData, [item.name]: e.target.checked } as any)
                        }
                      />
                      {item.icon}
                      <span className="font-bold text-sm">{item.label}</span>
                    </label>
                  ))}
                </div>

                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-600">
                    Selected:{" "}
                    <span className="font-black text-slate-900">{amenitiesCount}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">
                    Solar backup and borehole can be added later in the full wizard.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PHOTOS */}
          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-2 duration-300">
              <div className="space-y-2">
                <h2 className="text-xl font-black text-slate-900">Photos</h2>
                <p className="text-sm text-slate-500 font-medium">
                  Upload at least 1 photo. Max 10 photos.
                </p>
              </div>

              {/* Upload box */}
              <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 bg-slate-50">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm mb-4">
                    <Upload size={34} className="text-slate-300" />
                  </div>
                  <p className="font-black text-slate-900">Upload property photos</p>
                  <p className="text-sm text-slate-500 font-medium mt-1 max-w-md">
                    Guests book faster when they can see real images of the rooms, bathroom,
                    and outside area.
                  </p>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-6 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-95"
                  >
                    Choose photos
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => addPhotos(e.target.files)}
                  />

                  <p className="text-[11px] text-slate-400 font-bold mt-4">
                    (Frontend preview only — backend upload later)
                  </p>
                </div>
              </div>

              {/* Preview grid */}
              {formData.photos.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                      Preview ({formData.photos.length}/10)
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, photos: [] })}
                      className="text-xs font-black text-slate-400 hover:text-red-500 transition flex items-center gap-2"
                    >
                      <X size={16} /> Clear photos
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {formData.photos.map((url) => (
                      <div
                        key={url}
                        className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200"
                      >
                        <img src={url} className="w-full h-full object-cover" alt="Preview" />
                        <button
                          type="button"
                          onClick={() => removePhoto(url)}
                          className="absolute top-2 right-2 p-2 rounded-full bg-black/40 text-white hover:bg-red-600 transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-white border border-slate-200 rounded-[2rem] flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <ImageIcon className="text-slate-300" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">No photos yet</p>
                    <p className="text-sm text-slate-500 font-medium">
                      You need at least 1 photo to continue.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: REVIEW */}
          {step === 4 && (
            <div className="space-y-8 animate-in slide-in-from-right-2 duration-300">
              <div className="space-y-2">
                <h2 className="text-xl font-black text-slate-900">Review & Submit</h2>
                <p className="text-sm text-slate-500 font-medium">
                  Confirm your details before listing.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 space-y-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Title
                  </p>
                  <p className="font-black text-slate-900 text-lg">{formData.title}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      City
                    </p>
                    <p className="font-black text-slate-900">{formData.city}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Price / night
                    </p>
                    <p className="font-black text-blue-700 font-mono text-lg">
                      {formattedPrice}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Description
                  </p>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">
                    {formData.description}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    Amenities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.has_wifi && (
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-black">
                        Wi-Fi
                      </span>
                    )}
                    {formData.has_pool && (
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-black">
                        Pool
                      </span>
                    )}
                    {formData.has_parking && (
                      <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-[11px] font-black">
                        Parking
                      </span>
                    )}

                    {!formData.has_wifi && !formData.has_pool && !formData.has_parking && (
                      <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-[11px] font-black">
                        None selected
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    Photos ({formData.photos.length})
                  </p>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {formData.photos.map((url) => (
                      <div
                        key={url}
                        className="w-24 h-24 rounded-3xl overflow-hidden border border-slate-200 bg-white shrink-0"
                      >
                        <img src={url} className="w-full h-full object-cover" alt="Preview" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ZTA INFO BOX */}
              <div className="p-5 bg-blue-50 rounded-3xl flex gap-3 items-start border border-blue-100 shadow-sm shadow-blue-50">
                <Info size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-blue-800 font-bold leading-relaxed uppercase tracking-tight">
                  Listing your property on{" "}
                  <span className="text-blue-600">Mwaiseni</span> means you agree to provide accurate
                  information and follow Zambian Tourism Agency (ZTA) guidelines.
                </p>
              </div>
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                if (step === 1) return navigate(-1);
                setStep((prev) => (prev - 1) as Step);
              }}
              className="w-full sm:w-auto flex-1 py-5 rounded-[1.5rem] font-black bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2"
            >
              <ChevronLeft size={18} />
              Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                disabled={!canGoNext}
                onClick={() => setStep((prev) => (prev + 1) as Step)}
                className={`w-full sm:w-auto flex-[1.2] py-5 rounded-[1.5rem] font-black transition flex items-center justify-center gap-2 ${
                  canGoNext
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-100 active:scale-95"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Continue
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto flex-[1.2] bg-blue-600 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  loading ? "opacity-70 cursor-wait" : "hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  "Submit Listing"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

