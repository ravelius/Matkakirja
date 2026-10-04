// OMAT ISS-KUVAT (omistaja 4.10.2026 klo 15.2x Päätoimittajan kautta, juna 138): "kuva saisi näkyä heti cupolan sisällä omassa
// isossa ikkunassa kun se valmistuu ja se voisi pienentyä vasempaan alareunaan pikkukuva pinoksi jonka saisi auki uudelleen
// painamalla pinoa". Data LS2:n IssKameraKuva (Valmis-tapahtuma, Albumi).
//
//   IKKUNA   KUVANÄKYMÄ-pohja ikkunana (teema tumma): kuva, kuvateksti ("Oma kuva · Helsinki · 4.10.2026 klo 15.20"), oikeassa
//            yläkulmassa OHJAUSNAPIT jaa ja ✕; ‹ › (OHJAUSNAPPI) aiempiin kuviin, kun kuvia on useampi. Avautuu kameranapista
//            (uusi kuva) tai pinosta, sulkeutuu (✕, ohinapautus, veto alas) lentäen pinoon (Ponnahdus.Lenna, kuvan suurennos).
//   PINO     vasemmassa alareunassa ohjaamopaneelin yläpuolella: uusin päällimmäisenä, kaksi vanhempaa vinossa alla
//            (tyylikirja ISS-OHJAAMO.kuvapino); napautus avaa uusimman. Näkyy kyydissä, kun kuvia on.
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class IssOmatKuvat
    {
        readonly VisualElement peite, ikkuna, kuva, pino;
        readonly Label teksti;
        readonly Button jaa, edellinen, seuraava;
        readonly VisualElement[] pinonKuvat = new VisualElement[3];
        readonly List<IssKameraKuva.OmaKuva> kuvat = new List<IssKameraKuva.OmaKuva>();
        int nyt;
        float vetoAlku = float.NaN;
        bool pinoSallittu;

        /// <summary>Pinon pikkukuvan koko (pt, 4:5 kuten kuva).</summary>
        public const float PinoLeveys = 52f, PinoKorkeus = 65f;
        public bool Auki { get; private set; }
        public int Maara => kuvat.Count;

        public IssOmatKuvat(VisualElement isa)
        {
            peite = Rakenne.El("mk-issomakuva", isa);
            peite.style.display = DisplayStyle.None;
            peite.RegisterCallback<PointerDownEvent>(e => { if (e.target == peite) { Sulje("ulkopuoli"); e.StopPropagation(); } });
            ikkuna = Rakenne.El("mk-issomakuva__ikkuna tk-teema-tumma", peite);
            ikkuna.RegisterCallback<PointerDownEvent>(e => { vetoAlku = e.position.y; e.StopPropagation(); });
            ikkuna.RegisterCallback<PointerUpEvent>(e =>
            {
                // Veto alas sulkee (KUVANÄKYMÄ-pohjan sulku).
                if (!float.IsNaN(vetoAlku) && e.position.y - vetoAlku > 60f) Sulje("veto");
                vetoAlku = float.NaN;
            });
            kuva = Rakenne.El("mk-issomakuva__kuva", ikkuna, PickingMode.Ignore);
            var alarivi = Rakenne.El("mk-issomakuva__alarivi", ikkuna, PickingMode.Ignore);
            edellinen = Ohjausnappi.Nappi(Ikonit.Takaisin, "Edellinen kuva", () => Nayta(nyt + 1), alarivi, "harmaa");
            teksti = Rakenne.Teksti("", "mk-issomakuva__teksti", alarivi);
            Kirjasimet.Aseta(teksti, Kirjasin.Luku);
            seuraava = Ohjausnappi.Nappi(Ikonit.NuoliOikea, "Uudempi kuva", () => Nayta(nyt - 1), alarivi, "harmaa");
            var ryhma = Ohjausnappi.Ryhma(ikkuna);
            jaa = Ohjausnappi.Nappi(Ikonit.Jaa, "Jaa kuva", Jaa, ryhma);
            Ohjausnappi.Nappi(Ikonit.Viiva["rasti"], "Sulje kuva", () => Sulje("sulku"), ryhma);

            pino = Rakenne.El("mk-issomakuva__pino", isa);
            pino.tooltip = "Omat kuvat";
            for (int i = pinonKuvat.Length - 1; i >= 0; i--)
                pinonKuvat[i] = Rakenne.El("mk-issomakuva__pikku mk-issomakuva__pikku--" + i, pino, PickingMode.Ignore);
            pino.AddManipulator(new Clickable(() => Avaa(0, null)));
            pino.style.display = DisplayStyle.None;
        }

        /// <summary>Albumi talteen (uusin ensin), esim. linssin auetessa (IssKameraKuva.Albumi, LS2).</summary>
        public void AsetaAlbumi(IEnumerable<IssKameraKuva.OmaKuva> albumi)
        {
            kuvat.Clear();
            if (albumi != null) kuvat.AddRange(albumi);
            PaivitaPino();
        }

        /// <summary>Uusi kuva valmis (IssKameraKuva.Valmis): pinon päälle ja heti auki isoon ikkunaan avaajan kohdalta.</summary>
        public void Lisaa(IssKameraKuva.OmaKuva k, Vector2? avaaja)
        {
            kuvat.RemoveAll(x => x.Polku == k.Polku);
            kuvat.Insert(0, k);
            PaivitaPino();
            Avaa(0, avaaja);
        }

        /// <summary>Pino näkyviin kyydissä (ohjaamo); vasen alakulma isän koordinaateissa.</summary>
        public void AsetaPino(bool sallittu, float vasen, float ala)
        {
            pinoSallittu = sallittu;
            pino.style.left = vasen;
            pino.style.bottom = ala;
            PaivitaPino();
            if (!sallittu && Auki) Sulje("kyyti");
        }

        void PaivitaPino()
        {
            pino.style.display = pinoSallittu && kuvat.Count > 0 && !Auki ? DisplayStyle.Flex : DisplayStyle.None;
            for (int i = 0; i < pinonKuvat.Length; i++)
            {
                var e = pinonKuvat[i];
                if (i >= kuvat.Count) { e.style.display = DisplayStyle.None; continue; }
                e.style.display = DisplayStyle.Flex;
                string polku = kuvat[i].Polku, pikku = kuvat[i].Pikkukuva;
                int j = i;
                Lataa(pikku, t => { if (t != null && j < kuvat.Count && kuvat[j].Polku == polku) e.style.backgroundImage = new StyleBackground(t); });
            }
        }

        /// <summary>Iso ikkuna kuvalle i (0 = uusin); avaaja = kameranappi, muuten lento pinosta.</summary>
        public void Avaa(int i, Vector2? avaaja)
        {
            if (kuvat.Count == 0) return;
            Nayta(i);
            bool jo = Auki;
            Auki = true;
            peite.style.display = DisplayStyle.Flex;
            peite.BringToFront();
            if (!jo)
            {
                if (avaaja.HasValue) Ponnahdus.Avaa(ikkuna, avaaja);
                else Ponnahdus.Lenna(ikkuna, pino.worldBound, true);
            }
            PaivitaPino();
            Debug.Log($"MATKAKIRJA linssit: oma kuva auki {nyt + 1}/{kuvat.Count} \"{Teksti(kuvat[nyt])}\"");
        }

        /// <summary>
        /// Kuvateksti paikalla ja maalla (Päätoimittaja 4.10.: "Oma kuva · Etna, Italia · 4.10.2026 klo 15.20"), kuvaushetki pelaajan
        /// aikavyöhykkeellä; maa jää pois, jos se on paikan nimi (esim. UKRAINA) tai puuttuu.
        /// </summary>
        public static string Teksti(IssKameraKuva.OmaKuva k, bool kahdelleRiville = false)
        {
            var d = TimeZoneInfo.ConvertTimeFromUtc(DateTime.SpecifyKind(k.Utc, DateTimeKind.Utc), TimeZoneInfo.Local);
            string paikka = k.Paikka ?? "", maa = k.Maa ?? "";
            if (maa.Length > 0 && !string.Equals(maa, paikka, StringComparison.OrdinalIgnoreCase)) paikka = paikka.Length > 0 ? paikka + ", " + maa : maa;
            // Ikkunassa päiväys ja kello omalle rivilleen (Päätoimittaja 4.10.: "klo / 18.10" katkesi; U+00A0 piirtyy Luku-fontissa
            // leveänä aukkona, LS2:n Cupola-ruutu), jakoarkissa yhdelle riville.
            return "Oma kuva" + (paikka.Length > 0 ? " · " + paikka : "") + (kahdelleRiville ? "\n" : " · ") + $"{d.Day}.{d.Month}.{d.Year} klo {d.Hour}.{d.Minute:00}";
        }

        void Nayta(int i)
        {
            if (kuvat.Count == 0) return;
            nyt = Mathf.Clamp(i, 0, kuvat.Count - 1);
            var k = kuvat[nyt];
            teksti.text = Teksti(k, true);
            edellinen.SetEnabled(nyt < kuvat.Count - 1);
            seuraava.SetEnabled(nyt > 0);
            edellinen.style.visibility = seuraava.style.visibility = kuvat.Count > 1 ? Visibility.Visible : Visibility.Hidden;
            kuva.style.backgroundImage = StyleKeyword.None;
            string polku = k.Polku;
            bool taysi = false;
            // Pikkukuva heti (256 px, valmiina pinossa), täysi kuva sen tilalle purun jälkeen (simussa ~2 s tyhjä ikkuna, 4.10.).
            if (!string.IsNullOrEmpty(k.Pikkukuva) && k.Pikkukuva != polku)
                Lataa(k.Pikkukuva, t => { if (t != null && !taysi && kuvat.Count > 0 && kuvat[nyt].Polku == polku) kuva.style.backgroundImage = new StyleBackground(t); });
            Lataa(polku, t =>
            {
                if (t == null || kuvat.Count == 0 || kuvat[nyt].Polku != polku) return;
                taysi = true;
                kuva.style.backgroundImage = new StyleBackground(t);
                // Kuvan oma suhde (4:5 tai muu muoto): korkeus leveydestä.
                kuva.style.height = Length.Percent(0);
                kuva.style.paddingTop = Length.Percent(100f * t.height / Mathf.Max(1, t.width));
            });
        }

        // Levyn JPG:t omalla latauksella (Kuvat.Hae on verkko- ja peilireitti): purku taustalla (UnityWebRequestTexture,
        // nonReadable), pikkukuvat ja nykyinen iso kuva muistissa; vanha iso vapautetaan vaihdossa.
        readonly Dictionary<string, Texture2D> tekstuurit = new Dictionary<string, Texture2D>();
        string isoPolku;

        void Lataa(string polku, Action<Texture2D> valmis)
        {
            if (string.IsNullOrEmpty(polku)) { valmis(null); return; }
            if (tekstuurit.TryGetValue(polku, out var t) && t != null) { valmis(t); return; }
            UiKerros.Hae().StartCoroutine(LataaLevylta(polku, valmis));
        }

        IEnumerator LataaLevylta(string polku, Action<Texture2D> valmis)
        {
            using var k = UnityWebRequestTexture.GetTexture("file://" + polku, true);
            yield return k.SendWebRequest();
            if (k.result != UnityWebRequest.Result.Success) { Debug.LogWarning("MATKAKIRJA linssit: oma kuva ei latautunut " + polku + ": " + k.error); valmis(null); yield break; }
            var t = DownloadHandlerTexture.GetContent(k);
            bool iso = !polku.EndsWith("-pieni.jpg", StringComparison.Ordinal);
            if (iso)
            {
                if (isoPolku != null && isoPolku != polku && tekstuurit.TryGetValue(isoPolku, out var vanha) && vanha != null)
                { tekstuurit.Remove(isoPolku); UnityEngine.Object.Destroy(vanha); }
                isoPolku = polku;
            }
            tekstuurit[polku] = t;
            valmis(t);
        }

        void Jaa()
        {
            if (!Auki || kuvat.Count == 0) return;
            var k = kuvat[nyt];
            Debug.Log("MATKAKIRJA linssit: oma kuva jakoon " + System.IO.Path.GetFileName(k.Polku));
            Jakaminen.JaaKuva(k.Polku, Teksti(k), jaettu => Debug.Log("MATKAKIRJA linssit: oma kuva jaettu " + jaettu));
        }

        /// <summary>Sulku (✕, ohinapautus, veto alas): ikkuna lentää pinoon ja pino tulee näkyviin.</summary>
        public void Sulje(string syy)
        {
            if (!Auki) return;
            Auki = false;
            Debug.Log("MATKAKIRJA linssit: oma kuva kiinni (" + syy + ")");
            void Valmis() { if (!Auki) peite.style.display = DisplayStyle.None; PaivitaPino(); }
            if (pinoSallittu && pino.resolvedStyle.width > 0) { pino.style.display = DisplayStyle.Flex; Ponnahdus.Lenna(ikkuna, pino.worldBound, false, Valmis); }
            else Ponnahdus.Sulje(ikkuna, Valmis);
        }

        /// <summary>Testikomennon tila ja ohjaus (astro kyyti ohjaamo kuvat [auki|kiinni|jaa|edellinen|seuraava]).</summary>
        public string Testaa(string a)
        {
            switch (a)
            {
                case "auki": Avaa(0, null); break;
                case "kiinni": Sulje("testi"); break;
                case "jaa": Jaa(); break;
                case "edellinen": Nayta(nyt + 1); break;
                case "seuraava": Nayta(nyt - 1); break;
            }
            var r = ikkuna.worldBound; var p = pino.worldBound;
            return $"omat kuvat {kuvat.Count}, {(Auki ? $"auki {nyt + 1}/{kuvat.Count} {r.xMin:0},{r.yMin:0}–{r.xMax:0},{r.yMax:0}" : "kiinni")}, "
                + $"pino {(pino.resolvedStyle.display == DisplayStyle.Flex ? $"{p.xMin:0},{p.yMin:0}–{p.xMax:0},{p.yMax:0}" : "piilossa")}";
        }
    }
}
