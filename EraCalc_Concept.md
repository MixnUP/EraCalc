# EraCalc – Concept Document

## 🎯 Mission
EraCalc gives Graal Era players a **fast and simple calculator** for converting between *Tro* (trade shell) and *Sellas* (general shells), using community-set values and rates.

## 📌 Core Feature: Tro ↔ Sellas Calculator
- **Input Options:** Players can enter either Tro or Sellas.  
- **Custom Rate:** Users adjust the conversion rate based on the community standard.  
- **Instant Results:** Conversion happens immediately with a clean, mobile-friendly layout.  
- **Lightweight:** 100% frontend — no login, no backend.

## 🔢 Conversion Formula

1. **Sellas → Tro**  
\[
\text{Tro} = \frac{\text{Number of Sellas} \times \text{Value of Sella}}{\text{Rate}}
\]  

2. **Tro → Sellas**  
\[
\text{Sellas} = \frac{\text{Number of Tro} \times \text{Rate}}{\text{Value of Sella}}
\]  

## 🛠 Tech & Monetization
- **Tech:** React + Tailwind (static frontend).  
- **Hosting:** Cloudflare Pages or Vercel.  
- **Persistence:** LocalStorage (saves last rate).  
- **Monetization:** Google AdSense (light, responsive banner ads).  

## 🚀 Roadmap
**Phase 1:** Launch simple calculator with swap button, presets, and copy result.  
**Phase 2:** Add quick tables (common amounts: 1, 5, 10, 20 Tro).  
**Phase 3 (Optional):** Add history and advanced settings (fees, multiple rates).  

## 🌟 Value Proposition
- **Simple:** One tool, one purpose — fair and fast Tro ↔ Sellas conversions.  
- **Community-Driven:** Players choose the rate and value of Sellas.  
- **Accessible:** Mobile-friendly, free to use, supported by ads.
