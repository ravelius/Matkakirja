// INTROESITYS (Natiivi-UI-pohjilla, Linssiseppä; omistaja 12.1x PT:n kautta, juna 182: "isot kuvat kaikissa introissa"):
// yhteinen lähes koko ruudun esityspohja Pariisin saapumisesityksen C1–C5-kuville (Saapumisesitys.NykyIntro) ja kaupunkien
// aloitusintrolle (AloitusintroNakyma). Vain olemassa olevat pohjat ja tyylit: saapumistrailerin kerros ja kuvakortti
// (mk-traileri, mk-traileri__kuvat, mk-traileri__kuva --keskella/--ulos, leveys enintään 96 % ruudusta kuten trailerissa),
// trailerin nimen kirjaimet ja iskulause (mk-traileri__nimi/__kirjain/__iskulause) ja luennan Ohita-nappi (mk-ohita, sama
// teksti ui.aloitus.ohita). Ohita näkyy koko esityksen ajan. Uusi kuva liukuu oikealta keskelle (700 ms) ja edellinen ulos
// vasemmalle haalistuen (600 ms), kameran klik kuten trailerissa. Kuva, joka ei lataudu, jää pois (edellinen pysyy).
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Introesitys
    {
        public const int Kerros = UiKerros.Traileri;

        readonly UiKerros kerros;
        readonly VisualElement peite, kuvat, nimi;
        readonly Label iskulause;
        readonly Button ohita;
        readonly List<IVisualElementScheduledItem> ajastimet = new List<IVisualElementScheduledItem>();
        VisualElement nykyinen;
        Action ohitaKasittelija;
        int kuvaNro, kerta;
        bool kaynnissa;

        /// <summary>Esityksen tunnus lokiin ("aloitusintro ateena", "nykyintro pariisi").</summary>
        public string Tunnus { get; private set; }
        public bool Kaynnissa => kaynnissa;
        /// <summary>Näytettyjen kuvien määrä tässä esityksessä (QA, lokit).</summary>
        public int Kuvia { get; private set; }

        public Introesitys(UiKerros kerros)
        {
            this.kerros = kerros;
            var juuri = kerros.Juuri(Kerros);
            peite = Rakenne.El("mk-traileri", juuri);
            peite.style.display = DisplayStyle.None;
            // Kartta ei liiku esityksen alla; napautus ei ohita (Ohita-nappi aina näkyvissä).
            peite.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            kuvat = Rakenne.El("mk-traileri__kuvat", peite, PickingMode.Ignore);
            var teksti = Rakenne.El("mk-traileri__teksti", peite, PickingMode.Ignore);
            nimi = Rakenne.El("mk-traileri__nimi", teksti, PickingMode.Ignore);
            iskulause = Rakenne.Teksti("", "mk-traileri__iskulause", teksti);
            Kirjasimet.Aseta(nimi, Kirjasin.LukuLihava);
            Kirjasimet.Aseta(iskulause, Kirjasin.LukuKursiivi);
            ohita = Rakenne.Nappi(Kieli.T("ui.aloitus.ohita"), "mk-ohita", Ohita, peite);
            Kirjasimet.Aseta(ohita, Kirjasin.Kone);
        }

        float Leveys => kerros.Juuri(Kerros).resolvedStyle.width > 0 ? kerros.Juuri(Kerros).resolvedStyle.width : 393f;
        float Korkeus => kerros.Juuri(Kerros).resolvedStyle.height > 0 ? kerros.Juuri(Kerros).resolvedStyle.height : 852f;

        /// <summary>Esitys auki (tyhjä kerros ja Ohita); ohitaKasittelija kutsutaan Ohita-napista (kerran).</summary>
        public void Aloita(string tunnus, Action ohitaKasittelija)
        {
            Tyhjenna();
            kerta++;
            Tunnus = tunnus;
            this.ohitaKasittelija = ohitaKasittelija;
            kaynnissa = true;
            Kuvia = 0;
            peite.RemoveFromClassList("mk-traileri--ohitettu");
            peite.style.display = DisplayStyle.Flex;
            ohita.style.display = DisplayStyle.Flex;
            Debug.Log($"MATKAKIRJA ui saapuminen: esitys {tunnus} auki {Time.unscaledTime:0.000}");
        }

        /// <summary>Seuraava kuva keskelle (lataa ensin; edellinen ulos, kun uusi on valmis). nro = esityksen oma numero lokiin.</summary>
        public void Kuva(string osoite, string selite)
        {
            if (!kaynnissa || string.IsNullOrEmpty(osoite)) return;
            int oma = ++kuvaNro, k = kerta;
            Kuvat.Hae(osoite, t =>
            {
                if (t == null)
                {
                    Debug.Log($"MATKAKIRJA ui saapuminen: esitys {Tunnus} kuva ei latautunut ({selite}) {osoite}");
                    return;
                }
                // Vanha esitys tai uudempi kuva jo pyydetty: tämä jää pois.
                if (!kaynnissa || k != kerta || oma != kuvaNro) return;
                float leveys = Leveys, korkeus = Korkeus;
                var kortti = Rakenne.El("mk-traileri__kuva", kuvat, PickingMode.Ignore);
                kortti.style.backgroundImage = new StyleBackground(t);
                float suhde = t.height > 0 ? (float)t.width / t.height : 1.5f;
                float w = Mathf.Min(leveys * 0.96f, korkeus * 0.92f * suhde);
                kortti.style.width = w;
                kortti.style.height = w / suhde;
                kortti.style.translate = new Translate(leveys * 1.15f, 0);
                var vanha = nykyinen;
                nykyinen = kortti;
                Kuvia++;
                // Seuraavassa ruudussa, jotta siirtymä lähtee oikealta (tyyli ehtii voimaan).
                Ajasta(16, () =>
                {
                    kortti.AddToClassList("mk-traileri__kuva--keskella");
                    kortti.style.translate = new Translate(0, 0);
                    Aanet.PulunTehoste("pulu.kamera-klik");
                    if (vanha != null) Poistu(vanha, leveys);
                });
                Debug.Log($"MATKAKIRJA ui saapuminen: esitys {Tunnus} kuva {Kuvia} sisään ({selite}) {Time.unscaledTime:0.000}");
            });
        }

        void Poistu(VisualElement kortti, float leveys)
        {
            kortti.RemoveFromClassList("mk-traileri__kuva--keskella");
            kortti.AddToClassList("mk-traileri__kuva--ulos");
            kortti.style.translate = new Translate(-leveys * 1.15f, 0);
            kortti.schedule.Execute(() => kortti.RemoveFromHierarchy()).StartingIn(Saapumistraileri.UlosMs + 100);
        }

        /// <summary>Kaupungin nimi kirjain kerrallaan ja iskulause kuten saapumistrailerissa (sama porrastus ja viiveet).</summary>
        public void Nimi(string teksti, string isku)
        {
            if (!kaynnissa) return;
            nimi.Clear();
            teksti = (teksti ?? "").ToUpperInvariant();
            iskulause.text = isku ?? "";
            iskulause.RemoveFromClassList("mk-auki");
            float leveys = Leveys;
            float koko = Mathf.Min(Mathf.Clamp(leveys * 0.09f, 38f, 112f), leveys * 0.88f / (Mathf.Max(1, teksti.Length) * 1.1f));
            nimi.style.fontSize = koko;
            for (int i = 0; i < teksti.Length; i++)
            {
                var kirjain = Rakenne.Teksti(teksti[i] == ' ' ? " " : teksti[i].ToString(), "mk-traileri__kirjain", nimi);
                kirjain.style.marginRight = koko * 0.35f;
                Ajasta(300 + i * Saapumistraileri.PorrasMs, () => kirjain.AddToClassList("mk-auki"));
            }
            Ajasta(300, () => Aanet.PulunTehoste("pulu.kirjain-suhina"));
            if (!string.IsNullOrEmpty(isku))
                Ajasta(300 + teksti.Length * Saapumistraileri.PorrasMs + Saapumistraileri.LentoMs + Saapumistraileri.IskulauseViiveMs,
                    () => iskulause.AddToClassList("mk-auki"));
        }

        /// <summary>Nimen kirjaimet syöksyvät ulos ja iskulause häipyy (trailerin loppu).</summary>
        public void NimiPois()
        {
            int i = 0;
            foreach (var kirjain in nimi.Children())
            {
                var kk = kirjain;
                Ajasta(i++ * Saapumistraileri.UlosPorrasMs, () => { kk.RemoveFromClassList("mk-auki"); kk.AddToClassList("mk-traileri__kirjain--ulos"); });
            }
            iskulause.RemoveFromClassList("mk-auki");
        }

        void Ohita()
        {
            if (!kaynnissa) return;
            Debug.Log($"MATKAKIRJA ui saapuminen: esitys {Tunnus} Ohita {Time.unscaledTime:0.000}");
            var h = ohitaKasittelija;
            ohitaKasittelija = null;
            int k = kerta;
            try { h?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
            // Varmistus: käsittelijä ei sulkenut esitystä (peli ei käynnissä) → kerros ei jää ruudulle.
            peite.schedule.Execute(() => { if (kaynnissa && k == kerta) Lopeta(true); }).StartingIn(500);
        }

        /// <summary>Esitys pois: kerros häipyy 200 ms:ssä (trailerin --ohitettu). Turvallinen kutsua monta kertaa.</summary>
        public void Lopeta(bool ohitettu)
        {
            if (!kaynnissa) return;
            kaynnissa = false;
            ohitaKasittelija = null;
            Debug.Log($"MATKAKIRJA ui saapuminen: esitys {Tunnus} pois {Time.unscaledTime:0.000} ({Kuvia} kuvaa{(ohitettu ? ", ohitettu" : "")})");
            NimiPois();
            ohita.style.display = DisplayStyle.None;
            peite.AddToClassList("mk-traileri--ohitettu");
            int k = kerta;
            peite.schedule.Execute(() => { if (!kaynnissa && k == kerta) { peite.style.display = DisplayStyle.None; Tyhjenna(); } }).StartingIn(220);
        }

        void Tyhjenna()
        {
            foreach (var a in ajastimet) a.Pause();
            ajastimet.Clear();
            kuvat.Clear();
            nimi.Clear();
            iskulause.text = "";
            iskulause.RemoveFromClassList("mk-auki");
            nykyinen = null;
        }

        void Ajasta(int ms, Action a) => ajastimet.Add(peite.schedule.Execute(a).StartingIn(ms));
    }
}
