import React, { useEffect, useMemo, useState } from "react";
import { MapPin, Home, Building2, Hotel, ChevronRight, Info, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PropertyType = "lodge" | "apartment" | "guesthouse" | "";

type DraftListing = {
  propertyType: PropertyType;
  city: string;
  address: string;
  propertyName: string;
};

const STORAGE_KEY = "Mwaiseni_add_listing_draft_v1";

const zambiaCities = [
  "Lusaka",
  "Livingstone",
  "Kitwe",
  "Ndola",
  "Solwezi",
  "Chipata",
  "Kabwe",
  "Chingola",
  "Mansa",
  "Kasama",
  "Mongu",
  "Mazabuka",
  "Kafue",
];

const AddListingPage: React.FC = () => {
  const navigate = useNavigate();

  const [propertyType, setPropertyType] = useState<PropertyType>("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [propertyName, setPropertyName] = useState("");

  const [touched, setTouched] = useState({
    propertyType: false,
    city: false,
    address: false,
    propertyName: false,
  });

  const types = [
    { id: "lodge", label: "Lodge / Safari", icon: <Hotel size={24} /> },
    { id: "apartment", label: "Executive Apartment", icon: <Building2 size={24} /> },
    { id: "guesthouse", label: "Guest House", icon: <Home size={24} /> },
  ] as const;

  // Load draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw) as DraftListing;

      setPropertyType(draft.propertyType || "");
      setCity(draft.city || "");
      setAddress(draft.address || "");
      setPropertyName(draft.propertyName || "");
    } catch {
      // ignore
    }
  }, []);

  // Save draft (auto)
  useEffect(() => {
    const draft: DraftListing = { propertyType, city, address, propertyName };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [propertyType, city, address, propertyName]);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};

    if (!propertyType) e.propertyType = "Select a property type to continue.";
    if (!city.trim()) e.city = "Enter your city (e.g. Lusaka).";
    if (city.trim().length > 0 && city.trim().length < 3) e.city = "City name looks too short.";
    if (!address.trim()) e.address = "Enter an address or area (e.g. Kabulonga, Roma).";
    if (address.trim().length > 0 && address.trim().length < 5) e.address = "Address looks too short.";
    if (!propertyName.trim()) e.propertyName = "Give your property a name guests will recognize.";
    if (propertyName.trim().length > 0 && propertyName.trim().length < 4)
      e.propertyName = "Name looks too short.";

    return e;
  }, [propertyType, city, address, propertyName]);

  const isValid = Object.keys(errors).length === 0;

  const progressPct = 25;

  const selectedTypeLabel =
    propertyType === "lodge"
      ? "Lodge / Safari"
      : propertyType === "apartment"
        ? "Executive Apartment"
        : propertyType === "guesthouse"
          ? "Guest House"
          : "Not selected";

  function clearDraft() {
    localStorage.removeItem(STORAGE_KEY);
    setPropertyType("");
    setCity("");
    setAddress("");
    setPropertyName("");
    setTouched({ propertyType: false, city: false, address: false, propertyName: false });
  }

  function onContinue() {
    setTouched({ propertyType: true, city: true, address: true, propertyName: true });
    if (!isValid) return;

    // Next step route (you can change this)
    // Example: /owner/wizard?step=2
    navigate("/owner/wizard?step=2");
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* PROGRESS BAR */}
      <div className="w-full h-2 bg-slate-200">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="p-8 max-w-2xl mx-auto mt-10">
        <header className="mb-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
                List Your Property
              </h1>
              <p className="text-slate-500 font-medium text-lg">
                Step 1 of 4 — Location & Type
              </p>
            </div>

            <button
              onClick={clearDraft}
              className="text-slate-500 hover:text-slate-900 font-bold text-sm flex items-center gap-2"
              title="Clear draft"
            >
              <X size={16} /> Reset
            </button>
          </div>
        </header>

        <div className="space-y-8">
          {/* STEP INDICATOR CARD */}
          <div className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-100">
                1
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-xl tracking-tight">
                  Property Details
                </h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
                  Location & Type
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* PROPERTY TYPE SELECTOR */}
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-700 ml-1">
                  What are you listing?
                </label>

                <div className="grid grid-cols-1 gap-3">
                  {types.map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => {
                        setPropertyType(t.id);
                        setTouched((p) => ({ ...p, propertyType: true }));
                      }}
                      className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                        propertyType === t.id
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {t.icon}
                        <span className="font-bold text-lg">{t.label}</span>
                      </div>
                      {propertyType === t.id && (
                        <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                {touched.propertyType && errors.propertyType && (
                  <p className="text-sm font-bold text-red-600">{errors.propertyType}</p>
                )}
              </div>

              {/* CITY INPUT */}
              <div className="space-y-3 pt-2">
                <label className="text-sm font-black text-slate-700 ml-1">
                  Which city is it in?
                </label>

                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />

                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, city: true }))}
                    type="text"
                    list="Mwaiseni-zambia-cities"
                    placeholder="City (e.g. Lusaka, Livingstone, Kitwe)"
                    className="w-full p-5 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-blue-600 focus:bg-white outline-none transition"
                  />

                  <datalist id="Mwaiseni-zambia-cities">
                    {zambiaCities.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>

                {touched.city && errors.city && (
                  <p className="text-sm font-bold text-red-600">{errors.city}</p>
                )}
              </div>

              {/* ADDRESS / AREA INPUT */}
              <div className="space-y-3 pt-2">
                <label className="text-sm font-black text-slate-700 ml-1">
                  Address / Area
                </label>

                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, address: true }))}
                  type="text"
                  placeholder="Street, area, or landmark (e.g. Kabulonga, Roma Park)"
                  className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-blue-600 focus:bg-white outline-none transition"
                />

                {touched.address && errors.address && (
                  <p className="text-sm font-bold text-red-600">{errors.address}</p>
                )}
              </div>

              {/* PROPERTY NAME */}
              <div className="space-y-3 pt-2">
                <label className="text-sm font-black text-slate-700 ml-1">
                  Property name
                </label>

                <input
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, propertyName: true }))}
                  type="text"
                  placeholder="Example: Mwaiseni Roma Executive Suites"
                  className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-blue-600 focus:bg-white outline-none transition"
                />

                {touched.propertyName && errors.propertyName && (
                  <p className="text-sm font-bold text-red-600">{errors.propertyName}</p>
                )}
              </div>
            </div>
          </div>

          {/* QUICK PREVIEW CARD */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-7">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
              Preview
            </p>

            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-2xl font-black text-slate-900 leading-tight">
                  {propertyName.trim() ? propertyName : "Your property name will appear here"}
                </p>
                <p className="text-slate-500 font-bold mt-2">
                  {city.trim() ? city : "City"} • {selectedTypeLabel}
                </p>
                <p className="text-sm text-slate-400 font-medium mt-1">
                  {address.trim() ? address : "Address / area"}
                </p>
              </div>

              <div className="shrink-0 w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-black">
                IMG
              </div>
            </div>
          </div>

          {/* HELP BOX */}
          <div className="flex gap-4 p-6 bg-amber-50 rounded-3xl border border-amber-100">
            <Info className="text-amber-600 flex-shrink-0" size={24} />
            <p className="text-sm text-amber-900 font-medium leading-relaxed">
              <b>Hosting Tip:</b> Properties in <b>Livingstone</b> see more traffic during
              peak season (June–August). Accurate location = more bookings.
            </p>
          </div>

          <button
            type="button"
            onClick={onContinue}
            disabled={!isValid}
            className={`w-full py-5 rounded-[2rem] font-black text-xl transition-all shadow-xl flex items-center justify-center gap-2 ${
              isValid
                ? "bg-[#003580] text-white hover:bg-blue-900 shadow-blue-100"
                : "bg-slate-200 text-slate-500 shadow-transparent cursor-not-allowed"
            }`}
          >
            Continue to Photos <ChevronRight size={24} />
          </button>

          {!isValid && (
            <p className="text-center text-sm text-slate-500 font-medium">
              Fill in all required fields to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddListingPage;

