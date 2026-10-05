// ELÄVÄN OPPAAN VALIKKO (Natiivi-UI 5.10.2026; omistaja 18.0x Päätoimittajan kautta): LinnaValikon pohja (OHJAUSNAPPI ☰ oikeaan
// yläkulmaan, LINSSIN VALIKKO -lista .mk-linssivalikko--pohja alanäkymineen), ei uusia tyylejä.
//
//   Pää      Vaihda kohde › · ─ · Poistu linssistä
//   Maanosat ‹ Vaihda kohde · Eurooppa › · Aasia › …
//   Maat     ‹ <maanosa> · maat aakkosjärjestyksessä (vierittyy)
//   Kaupungit ‹ <maa> · maan suurimmat kaupungit väkiluvun mukaan (enintään Kaupunkeja)
//
// Kaupungit: Natural Earthin asutuspaikat (sama aineisto kuin ISS-LCD:ssä) Kaupungit-koukusta (Linssiseppä/LS2 kytkee); valinta
// kutsuu KohdeValittu(nimi, lat, lon), jonka elävä opas (OpasSovitin) kytkee. Poistu sulkee linssin (LinssiUi.SuljeLinssi).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class OpasValikko
    {
        /// <summary>Asutuspaikka: nimi, maa (näkyvä nimi), maanosa (näkyvä nimi), sijainti ja väkiluku.</summary>
        public readonly struct Kaupunki
        {
            public readonly string Nimi, Maa, Maanosa;
            public readonly double Lat, Lon;
            public readonly long Vakiluku;
            public Kaupunki(string nimi, string maa, string maanosa, double lat, double lon, long vakiluku)
            { Nimi = nimi; Maa = maa; Maanosa = maanosa; Lat = lat; Lon = lon; Vakiluku = vakiluku; }
        }

        /// <summary>Kaupunkiaineisto; oletuksena Resources/IssPaikat/paikat.json (LS2:n ISS-LCD:n Natural Earth -asutuspaikat).</summary>
        public static Func<IReadOnlyList<Kaupunki>> Kaupungit = Lue;

        static List<Kaupunki> luettu;
        static readonly Dictionary<string, string> Maanosat = new Dictionary<string, string>
        {
            ["Europe"] = "Eurooppa", ["Asia"] = "Aasia", ["Africa"] = "Afrikka", ["North America"] = "Pohjois-Amerikka",
            ["South America"] = "Etelä-Amerikka", ["Oceania"] = "Oseania", ["Antarctica"] = "Etelämanner", ["Seven seas (open ocean)"] = "Valtameret",
        };

        /// <summary>
        /// paikat.json: {"paikat":[[nimi, lat, lon, ADM0_A3, POP_MAX, CONTINENT?], …]}. Maan nimi pelin maa-aineistosta (ISO3), muuten
        /// koodi; maanosa 6. sarakkeesta suomeksi, ilman sitä "Kaikki maat" (yksi ryhmä).
        /// </summary>
        static IReadOnlyList<Kaupunki> Lue()
        {
            if (luettu != null) return luettu;
            var t = Resources.Load<TextAsset>("IssPaikat/paikat");
            if (t == null) return null;
            var tulos = new List<Kaupunki>();
            try
            {
                var j = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(t.text));
                if (MiniJson.Kentta(j, "paikat") is List<object> rivit)
                    foreach (var r in rivit)
                    {
                        if (!(r is List<object> c) || c.Count < 5) continue;
                        string iso = c[3] as string;
                        string maa = LinssiOhjain.MaatAineisto?.Hae(iso)?.Nimi ?? iso;
                        string mo = c.Count > 5 && c[5] is string m ? (Maanosat.TryGetValue(m, out var fi) ? fi : m) : "Kaikki maat";
                        tulos.Add(new Kaupunki(c[0] as string, maa, mo, Convert.ToDouble(c[1]), Convert.ToDouble(c[2]), Convert.ToInt64(c[4])));
                    }
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA opas: paikat.json: " + e.Message); return null; }
            Debug.Log($"MATKAKIRJA opas: {tulos.Count} kaupunkia (IssPaikat/paikat)");
            // Maa-aineisto voi latautua myöhemmin: välimuistiin vasta, kun nimet ovat tulleet.
            if (LinssiOhjain.MaatAineisto != null) luettu = tulos;
            return tulos;
        }
        /// <summary>Valittu kohde (nimi, lat, lon): elävä opas siirtyy sinne.</summary>
        public static Action<string, double, double> KohdeValittu;
        /// <summary>Viimeksi luotu (testikomento ja KierrosTaulun näyttö).</summary>
        public static OpasValikko Viimeisin { get; private set; }

        /// <summary>Ainoa valikko (luodaan ensimmäisellä kutsulla linssin kerrokseen kuten LinnaValikko); oppaan kytkentä:
        /// <c>OpasValikko.Hae().Nayta(true|false)</c>.</summary>
        public static OpasValikko Hae() => Viimeisin ?? new OpasValikko(UiKerros.Hae(), LinssiUi.RadioKerros);

        const int Kaupunkeja = 12;

        enum Nakyma { Paa, Maanosat, Maat, Kaupungit }

        public readonly VisualElement Juuri;
        readonly VisualElement ryhma, valikko;
        readonly Button nappi;
        Nakyma nakyma;
        string maanosa, maa;
        ScrollView rivit;
        public bool Auki { get; private set; }

        public OpasValikko(UiKerros kerros, int kerrosNro)
        {
            Juuri = Rakenne.El("mk-linnavalikko", kerros.Turva(kerrosNro), PickingMode.Ignore);
            Juuri.style.position = Position.Absolute;
            Juuri.style.left = 0; Juuri.style.right = 0; Juuri.style.top = 0; Juuri.style.bottom = 0;
            Juuri.style.display = DisplayStyle.None;
            ryhma = Ohjausnappi.Ryhma(Juuri);
            nappi = Ohjausnappi.Nappi(Ikonit.Valikko, "Valikko", () => { if (Auki) Sulje(); else Avaa(Nakyma.Paa); }, ryhma);

            valikko = Rakenne.El("mk-linssivalikko mk-linssivalikko--pohja", kerros.Juuri(kerrosNro));
            valikko.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(valikko, Kirjasin.Luku);
            valikko.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            kerros.JokaRuutu += TarkistaOhiNapautus;
            Viimeisin = this;
        }

        /// <summary>Oppaan linssi auki / kiinni.</summary>
        public void Nayta(bool nakyy)
        {
            Juuri.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (!nakyy) Sulje();
        }

        void Avaa(Nakyma n)
        {
            nakyma = n;
            Rakenna();
            if (Auki) return;
            Auki = true;
            Asettele();
            valikko.BringToFront();
            Ponnahdus.Avaa(valikko, origo: new TransformOrigin(Length.Percent(100), Length.Percent(0)));
            nappi.AddToClassList("mk-valittu");
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Ponnahdus.Sulje(valikko);
            nappi.RemoveFromClassList("mk-valittu");
        }

        void Rakenna()
        {
            valikko.Clear();
            rivit = null;
            var kaikki = Kaupungit?.Invoke();
            switch (nakyma)
            {
                case Nakyma.Paa:
                    Alanakyma("Vaihda kohde", () => Avaa(Nakyma.Maanosat));
                    Viiva();
                    Komento("Poistu linssistä", () => UiNakymat.Hae()?.Linssit?.SuljeLinssi());
                    break;
                case Nakyma.Maanosat:
                    Takaisin("Vaihda kohde", Nakyma.Paa);
                    if (kaikki == null || kaikki.Count == 0) { Tyhja("Kaupungit latautuvat…"); break; }
                    foreach (var m in kaikki.Select(k => k.Maanosa).Where(m => !string.IsNullOrEmpty(m)).Distinct().OrderBy(m => m))
                    {
                        string mm = m;
                        Alanakyma(mm, () => { maanosa = mm; Avaa(Nakyma.Maat); });
                    }
                    break;
                case Nakyma.Maat:
                    Takaisin(maanosa, Nakyma.Maanosat);
                    Vieritys();
                    foreach (var m in (kaikki ?? Array.Empty<Kaupunki>()).Where(k => k.Maanosa == maanosa).Select(k => k.Maa)
                                 .Where(m => !string.IsNullOrEmpty(m)).Distinct().OrderBy(m => m))
                    {
                        string mm = m;
                        Alanakyma(mm, () => { maa = mm; Avaa(Nakyma.Kaupungit); }, rivit);
                    }
                    break;
                case Nakyma.Kaupungit:
                    Takaisin(maa, Nakyma.Maat);
                    Vieritys();
                    foreach (var k in (kaikki ?? Array.Empty<Kaupunki>()).Where(k => k.Maa == maa && k.Maanosa == maanosa)
                                 .OrderByDescending(k => k.Vakiluku).Take(Kaupunkeja))
                    {
                        var kk = k;
                        Komento(kk.Nimi, () =>
                        {
                            Debug.Log($"MATKAKIRJA opas: kohde {kk.Nimi} ({kk.Lat:0.###}, {kk.Lon:0.###})");
                            KohdeValittu?.Invoke(kk.Nimi, kk.Lat, kk.Lon);
                        }, rivit);
                    }
                    break;
            }
            if (Auki) SovitaKorkeus();
        }

        // --- rivit (LinnaValikon pohja) ---------------------------------------------------------------

        Button Komento(string teksti, Action teko, VisualElement isa = null)
        {
            var b = Rakenne.Nappi(teksti, "mk-linssivalikko__kohta mk-linssivalikko__komento", () => { Sulje(); teko(); }, isa ?? valikko);
            Kirjasimet.Aseta(b, Kirjasin.Luku);
            b.tooltip = teksti;
            return b;
        }

        void Alanakyma(string teksti, Action avaa, VisualElement isa = null)
        {
            var b = Rakenne.Nappi(null, "mk-linssivalikko__kohta mk-linssivalikko__kytkin", avaa, isa ?? valikko);
            Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-linssivalikko__nimi", b), Kirjasin.Luku);
            Kirjasimet.Aseta(Rakenne.Teksti("›", "mk-linssivalikko__tila", b), Kirjasin.KoneBold);
            b.tooltip = teksti;
        }

        void Takaisin(string otsikko, Nakyma minne)
        {
            var b = Rakenne.Nappi(null, "mk-linssivalikko__kohta mk-linssivalikko__kytkin", () => Avaa(minne), valikko);
            Kirjasimet.Aseta(Rakenne.Teksti("‹ " + otsikko, "mk-linssivalikko__nimi", b), Kirjasin.LukuLihava);
            b.tooltip = "Takaisin";
            Viiva();
        }

        void Tyhja(string teksti) => Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-linssivalikko__lahde", valikko), Kirjasin.Luku);

        void Viiva() => Rakenne.El("mk-linssivalikko__viiva", valikko, PickingMode.Ignore);

        void Vieritys()
        {
            rivit = new ScrollView(ScrollViewMode.Vertical)
            { verticalScrollerVisibility = ScrollerVisibility.Hidden, horizontalScrollerVisibility = ScrollerVisibility.Hidden };
            rivit.style.flexShrink = 1;
            valikko.Add(rivit);
        }

        /// <summary>Lista napin alle, oikea reuna napin oikeaan reunaan (LinnaValikko.Asettele).</summary>
        void Asettele()
        {
            var isa = valikko.parent;
            if (isa == null) return;
            var n = nappi.worldBound;
            var yla = isa.WorldToLocal(new Vector2(n.xMax, n.yMax));
            float leveys = isa.resolvedStyle.width;
            valikko.style.top = yla.y + 8;
            valikko.style.right = float.IsNaN(leveys) ? 10 : Mathf.Max(0, leveys - yla.x);
            SovitaKorkeus();
        }

        /// <summary>Valikko turva-alueen sisään; pitkät listat (maat, kaupungit) vierittyvät.</summary>
        void SovitaKorkeus()
        {
            if (!Auki) return;
            var isa = valikko.parent;
            float korkeus = isa != null ? isa.resolvedStyle.height : float.NaN;
            float ylaR = valikko.resolvedStyle.top;
            if (float.IsNaN(korkeus) || korkeus <= 0 || float.IsNaN(ylaR)) { valikko.schedule.Execute(SovitaKorkeus).StartingIn(16); return; }
            float sk = Screen.height > 0 ? korkeus / Screen.height : 1f;
            valikko.style.maxHeight = Mathf.Max(120f, korkeus - ylaR - Screen.safeArea.yMin * sk - 8f);
        }

        void TarkistaOhiNapautus()
        {
            if (!Auki) return;
            var osoitin = Pointer.current;
            if (osoitin == null || !osoitin.press.wasPressedThisFrame || valikko.panel == null) return;
            var ruutu = osoitin.position.ReadValue();
            var p = RuntimePanelUtils.ScreenToPanel(valikko.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            if (!valikko.worldBound.Contains(p) && !nappi.worldBound.Contains(p)) Sulje();
        }

        /// <summary>Testikomento `ui opasvalikko valikko|maanosat|maat <maanosa>|kaupungit <maanosa>|<maa>|sulje`.</summary>
        public string Komento(string mita)
        {
            var o = (mita ?? "").Split(new[] { ' ' }, 2, StringSplitOptions.RemoveEmptyEntries);
            string k = o.Length > 0 ? o[0] : "valikko";
            Nayta(true);
            switch (k)
            {
                case "sulje": Sulje(); return "opas: valikko kiinni";
                case "maanosat": Avaa(Nakyma.Maanosat); return "opas: maanosat";
                case "maat": maanosa = o.Length > 1 ? o[1] : maanosa; Avaa(Nakyma.Maat); return "opas: maat " + maanosa;
                case "kaupungit":
                    var p = o.Length > 1 ? o[1].Split('|') : new string[0];
                    if (p.Length == 2) { maanosa = p[0]; maa = p[1]; }
                    Avaa(Nakyma.Kaupungit);
                    return $"opas: kaupungit {maanosa} / {maa}";
                default: Avaa(Nakyma.Paa); return "opas: valikko (" + (Kaupungit?.Invoke()?.Count ?? 0) + " kaupunkia)";
            }
        }
    }
}
