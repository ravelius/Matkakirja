// SAAPUMISTRAILERI (Natiivi-UI): webin kaupungin minitraileri
// (js/saapumistraileri.js, css/saapumistraileri.css; omistaja 11.9.2026).
//
// 1–3 lehden avauskuvaa liukuu oikealta keskelle (700 ms, nopeutus–hidastus),
// seisoo 2 s ja liukuu haalistuen vasemmalle (600 ms, 200 ms limitys seuraavan
// kanssa). Kaupungin nimi lentää kirjain kerrallaan "horisontista" (90 ms
// porrastus, 650 ms lento; perspektiivin sijaan skaala 0,05 → 1), versaalit
// harvennettuna 0,35em, valkoinen varjolla. Iskulause häivytetään näkyviin
// 500 ms viimeisen kirjaimen laskeuduttua. Horation saapumispuhe soi samalla
// (Puhe.Soita); traileri päättyy, kun kuvat ovat kulkeneet ja puhe on ohi
// (katto 20 s), kirjaimet syöksyvät ulos (20 ms porrastus, 450 ms) ja kerros
// häipyy 200 ms:ssä. Napautus missä tahansa ohittaa (puhe pysähtyy).
// Kartta näkyy taustalla himmennettynä (USS:ssä ei backdrop-blurria).
// Kameran klik kuvan tullessa, kirjainten suhina nimen lentäessä (pulun
// äänikirjasto).
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Saapumistraileri
    {
        public const int Kerros = UiKerros.Traileri;
        public const int Kuvia = 3, LiukuMs = 700, PysahdysMs = 2000, UlosMs = 600, LimitysMs = 200;
        public const int PorrasMs = 90, LentoMs = 650, UlosPorrasMs = 20, UlosLentoMs = 450, IskulauseViiveMs = 500, KattoMs = 20000;

        readonly UiKerros kerros;
        readonly VisualElement peite, kuvat, nimi;
        readonly Label iskulause;
        readonly List<IVisualElementScheduledItem> ajastimet = new List<IVisualElementScheduledItem>();
        Action valmis;
        bool kaynnissa, kuvatValmiit, puheValmis;
        readonly HashSet<string> nahty = new HashSet<string>();

        public bool Kaynnissa => kaynnissa;

        public Saapumistraileri(UiKerros kerros)
        {
            this.kerros = kerros;
            var juuri = kerros.Juuri(Kerros);
            peite = Rakenne.El("mk-traileri", juuri);
            peite.style.display = DisplayStyle.None;
            peite.RegisterCallback<PointerDownEvent>(e => { e.StopPropagation(); Ohita(); });
            kuvat = Rakenne.El("mk-traileri__kuvat", peite, PickingMode.Ignore);
            var teksti = Rakenne.El("mk-traileri__teksti", peite, PickingMode.Ignore);
            nimi = Rakenne.El("mk-traileri__nimi", teksti, PickingMode.Ignore);
            iskulause = Rakenne.Teksti("", "mk-traileri__iskulause", teksti);
            Kirjasimet.Aseta(nimi, Kirjasin.LukuLihava);
            Kirjasimet.Aseta(iskulause, Kirjasin.LukuKursiivi);
            peite.schedule.Execute(Vahdi).Every(250);
        }

        /// <summary>Onko kaupungin traileri jo nähty tässä pelissä (kerran per kaupunki).</summary>
        public bool Nahty(string kaupunki) => kaupunki != null && nahty.Contains(kaupunki);

        /// <summary>
        /// Näyttää trailerin. puheUrl = Horation saapumispuhe tai null. valmis kutsutaan
        /// kerran (loppu tai ohitus). Ilman kuvia traileria ei näytetä (valmis heti).
        /// </summary>
        public void Nayta(string kaupunki, string puheUrl, Action kunValmis)
        {
            UiSisalto.Lataa(() =>
            {
                var k = UiSisalto.Kaupunki(kaupunki);
                var lahteet = k?.Avauskuvat.Count > 0 ? k.Avauskuvat : k?.Kansikuvat;
                if (k == null || lahteet == null || lahteet.Count == 0 || kaynnissa) { kunValmis?.Invoke(); return; }
                nahty.Add(kaupunki);
                Aloita(k, lahteet.GetRange(0, Mathf.Min(Kuvia, lahteet.Count)), puheUrl, kunValmis);
            });
        }

        void Aloita(KaupunkiTiedot k, List<Kuvateksti> lahteet, string puheUrl, Action kunValmis)
        {
            kaynnissa = true;
            alkoi = Time.unscaledTime;
            valmis = kunValmis;
            kuvatValmiit = false;
            puheValmis = string.IsNullOrEmpty(puheUrl);
            kuvat.Clear();
            nimi.Clear();
            iskulause.text = k.Iskulause ?? "";
            iskulause.RemoveFromClassList("mk-auki");
            peite.RemoveFromClassList("mk-traileri--ohitettu");
            peite.style.display = DisplayStyle.Flex;

            // Kuvat vuorotellen: sisään i·(liuku+pysähdys−limitys), ulos 2,7 s myöhemmin.
            float leveys = kerros.Juuri(Kerros).resolvedStyle.width > 0 ? kerros.Juuri(Kerros).resolvedStyle.width : 393f;
            float korkeus = kerros.Juuri(Kerros).resolvedStyle.height > 0 ? kerros.Juuri(Kerros).resolvedStyle.height : 852f;
            int vuoro = LiukuMs + PysahdysMs;
            for (int i = 0; i < lahteet.Count; i++)
            {
                var kortti = Rakenne.El("mk-traileri__kuva", kuvat, PickingMode.Ignore);
                kortti.style.translate = new Translate(leveys * 1.15f, 0);
                var lahde = lahteet[i];
                Kuvat.Hae(lahde.Tiedosto, t =>
                {
                    if (t == null) return;
                    kortti.style.backgroundImage = new StyleBackground(t);
                    float suhde = t.height > 0 ? (float)t.width / t.height : 1.5f;
                    float w = Mathf.Min(leveys * 0.96f, korkeus * 0.92f * suhde);
                    kortti.style.width = w;
                    kortti.style.height = w / suhde;
                });
                int alku = i * (vuoro - LimitysMs);
                Ajasta(alku, () =>
                {
                    kortti.AddToClassList("mk-traileri__kuva--keskella");
                    kortti.style.translate = new Translate(0, 0);
                    Aanet.PulunTehoste("pulu.kamera-klik");
                });
                Ajasta(alku + vuoro, () =>
                {
                    kortti.RemoveFromClassList("mk-traileri__kuva--keskella");
                    kortti.AddToClassList("mk-traileri__kuva--ulos");
                    kortti.style.translate = new Translate(-leveys * 1.15f, 0);
                });
            }
            int kesto = lahteet.Count * (vuoro - LimitysMs) + LimitysMs + UlosMs;
            Ajasta(kesto, () => { kuvatValmiit = true; YritaLopettaa(); });

            // Nimi kirjain kerrallaan; koko nimen pituudesta (mahtuu yhdelle riville).
            string teksti = (k.Nimi ?? "").ToUpperInvariant();
            float koko = Mathf.Min(Mathf.Clamp(leveys * 0.09f, 38f, 112f), leveys * 0.88f / (Mathf.Max(1, teksti.Length) * 1.1f));
            nimi.style.fontSize = koko;
            for (int i = 0; i < teksti.Length; i++)
            {
                var kirjain = Rakenne.Teksti(teksti[i] == ' ' ? " " : teksti[i].ToString(), "mk-traileri__kirjain", nimi);
                kirjain.style.marginRight = koko * 0.35f;
                int n = i;
                Ajasta(300 + n * PorrasMs, () => kirjain.AddToClassList("mk-auki"));
            }
            Ajasta(300, () => Aanet.PulunTehoste("pulu.kirjain-suhina"));
            Ajasta(300 + teksti.Length * PorrasMs + LentoMs + IskulauseViiveMs, () => iskulause.AddToClassList("mk-auki"));

            if (!puheValmis)
            {
                var puhe = Puhe.Hae();
                if (puhe == null || !puhe.Soita(puheUrl, 0, () => { puheValmis = true; YritaLopettaa(); })) puheValmis = true;
                Ajasta(KattoMs, () => { puheValmis = true; YritaLopettaa(); });
            }
        }

        /// <summary>Testikomento ohitti trailerin pelin puolella (PeliOhjain ei ole enää Traileri-tilassa).</summary>
        void Vahdi()
        {
            var o = PeliOhjain.Instanssi;
            if (kaynnissa && pelista && o != null && o.Tila != SilmukanTila.Traileri && Time.unscaledTime - alkoi > 0.5f) Lopeta(true);
        }

        float alkoi;
        bool pelista;

        /// <summary>PeliOhjaimen kutsu (PeliNakymat.Saapumistraileri): vahtii pelin tilaa.</summary>
        public void NaytaPelista(string kaupunki, string puheUrl, Action kunValmis)
        {
            pelista = true;
            Nayta(kaupunki, puheUrl, kunValmis);
        }

        void Ajasta(int ms, Action a) => ajastimet.Add(peite.schedule.Execute(a).StartingIn(ms));

        void YritaLopettaa()
        {
            if (!kaynnissa || !kuvatValmiit || !puheValmis) return;
            // Kirjaimet syöksyvät ulos ja kerros häipyy.
            int i = 0;
            foreach (var kirjain in nimi.Children())
            {
                var kk = kirjain;
                Ajasta(i++ * UlosPorrasMs, () => { kk.RemoveFromClassList("mk-auki"); kk.AddToClassList("mk-traileri__kirjain--ulos"); });
            }
            iskulause.RemoveFromClassList("mk-auki");
            Ajasta(i * UlosPorrasMs + UlosLentoMs, () => Lopeta(false));
        }

        /// <summary>Napautus: kaikki pois 200 ms:ssä, puhe pysähtyy, valmis heti.</summary>
        public void Ohita()
        {
            if (!kaynnissa) return;
            Puhe.Instanssi?.Pysayta(0.2f);
            Lopeta(true);
        }

        void Lopeta(bool ohitettu)
        {
            if (!kaynnissa) return;
            kaynnissa = false;
            pelista = false;
            foreach (var a in ajastimet) a.Pause();
            ajastimet.Clear();
            peite.AddToClassList("mk-traileri--ohitettu");
            peite.schedule.Execute(() => { if (!kaynnissa) peite.style.display = DisplayStyle.None; }).StartingIn(220);
            var v = valmis;
            valmis = null;
            v?.Invoke();
        }
    }
}
