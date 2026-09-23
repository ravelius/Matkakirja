// MAA NUMEROINA (Natiivi-UI, 23.9.2026): maalehden tilastosivu. Webin js/maakayrat.js
// piirraMaaNumerot, piirraKayra ja piirraPyramidi sekä js/maalehti.js piirraMaaNumerotSivu;
// tyylit webin .maakayrat, .maakayra-*, .pyramidi-* ja .numeroina-ingressi (css/styles.css).
//
// Tekstit (otsikko, ingressi, johdanto, lohkojen otsikot ja tulkinnat, silloin-rivi, V-Dem ja
// lähderivi) tulevat sisältöpaketin maat.json-alkion numeroina-kentästä valmiina; käyrät
// piirretään paketin tiedostosta assets/data/maakayrat.json, joka ladataan kerran ja
// jäsennetään taustasäikeessä. Lohkot näkyvät heti tekstinä, käyrät lisätään datan tultua.
//
// Piirto pelin mustekynän tyylillä kuten webissä: kultainen pääkäyrä, Suomi ohuena himmeänä
// musteviivana taustalla, ennusteosa himmeämpänä kultana, isoisän vuoden 1873 väkiluku
// pienenä renkaana akselin reunassa ja väestöpyramidi vaakapalkkeina (miehet muste, naiset
// kulta). Mitoitus on webin kiinteä viewBox (leveys 300), joka skaalataan elementin
// leveyteen; korkeus asetetaan leveydestä, koska USS:ssä ei ole aspect-ratiota.
// Aukot piirretään aukkoina: viiva katkeaa, yksinäinen havainto saa pisteen.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class MaaNumeroina
    {
        const string Haetaan = "Haetaan tilastoja…";
        const string EiVerkkoa = "Tämä sivu tarvitsee verkkoyhteyden ensimmäisellä avauksella — luvut haetaan silloin talteen.";
        const string EiSarjoja = "Tästä maasta ei ole vielä tilastosarjoja.";

        /// <summary>
        /// Rakentaa sivun sisällön isaan: otsikko (webin h3.aihe-nimi), ingressi, johdanto,
        /// jokainen lohko = otsikko + käyrä + tulkinta + silloin-rivi, lopuksi vdem-rivi ja
        /// lähderivi. Käyrät piirtyvät, kun maakayrat on ladattu. luettava(teksti) kutsutaan
        /// jokaisesta leipätekstistä sivun järjestyksessä (ingressi, johdanto, tulkinnat,
        /// silloin-rivit, V-Dem).
        /// </summary>
        public static void Rakenna(VisualElement isa, string iso3, Dictionary<string, object> numeroina, Action<string> luettava)
        {
            if (isa == null || numeroina == null) return;
            var juuri = Rakenne.El("mk-numerot", isa, PickingMode.Ignore);

            string otsikko = MiniJson.Teksti(numeroina, "otsikko");
            if (!string.IsNullOrEmpty(otsikko))
            {
                var ot = Rakenne.El("mk-numerot__otsikko", juuri, PickingMode.Ignore);
                Kirjasimet.Aseta(Teksti(otsikko.ToUpperInvariant(), "mk-numerot__otsikkoteksti", ot), Kirjasin.KoneLihava);
            }
            Kappale(juuri, MiniJson.Teksti(numeroina, "ingressi"), "mk-numerot__ingressi", Kirjasin.Luku, luettava);
            Kappale(juuri, MiniJson.Teksti(numeroina, "johdanto"), "mk-numerot__johdanto", Kirjasin.LukuKursiivi, luettava);

            var tila = Kirjasimet.Aseta(Teksti(Haetaan, "mk-numerot__tila", juuri), Kirjasin.LukuKursiivi);

            // Webin .maakayrat: leveällä kaksi käyrää rinnan, kapealla yksi allekkain.
            var ristikko = Rakenne.El("mk-numerot__ristikko", juuri, PickingMode.Ignore);
            Rakenne.Ruudukko(ristikko, 320f, 20f);
            var paikat = new List<KeyValuePair<string, VisualElement>>();
            if (Rakenne.Lista(MiniJson.Kentta(numeroina, "lohkot")) is List<object> lohkot)
            {
                foreach (var lo in lohkot)
                {
                    if (!(lo is Dictionary<string, object> l)) continue;
                    var osa = Rakenne.El("mk-numerot__lohko", ristikko, PickingMode.Ignore);
                    string lOtsikko = MiniJson.Teksti(l, "otsikko");
                    if (!string.IsNullOrEmpty(lOtsikko))
                        Kirjasimet.Aseta(Teksti(lOtsikko, "mk-numerot__lohko-otsikko", osa), Kirjasin.KoneLihava);
                    var paikka = Rakenne.El("mk-numerot__paikka", osa, PickingMode.Ignore);
                    string kayra = MiniJson.Teksti(l, "kayra");
                    if (!string.IsNullOrEmpty(kayra)) paikat.Add(new KeyValuePair<string, VisualElement>(kayra, paikka));
                    Kappale(osa, MiniJson.Teksti(l, "tulkinta"), "mk-numerot__tulkinta", Kirjasin.LukuKursiivi, luettava);
                    Kappale(osa, MiniJson.Teksti(l, "silloin"), "mk-numerot__silloin", Kirjasin.LukuKursiivi, luettava);
                }
            }

            Kappale(juuri, MiniJson.Teksti(numeroina, "vdem"), "mk-numerot__vdem", Kirjasin.Luku, luettava);
            string lahde = MiniJson.Teksti(numeroina, "lahderivi");
            if (!string.IsNullOrEmpty(lahde)) Kirjasimet.Aseta(Teksti(lahde, "mk-numerot__lahde", juuri), Kirjasin.Kone);

            if (paikat.Count == 0) { tila.RemoveFromHierarchy(); return; }
            NumeroAineisto.Hae(data =>
            {
                // Sivu on ehditty kääntää tai rakentaa uudelleen: myöhässä tullut data ei kirjoita.
                if (!isa.Contains(juuri)) return;
                if (data == null) { tila.text = EiVerkkoa; return; }
                if (iso3 == null || !data.Maat.TryGetValue(iso3, out var maa)) { tila.text = EiSarjoja; return; }
                tila.RemoveFromHierarchy();
                data.Maat.TryGetValue("FIN", out var suomi);
                // Suomen omalla sivulla ei vertailuviivaa (web: vertailu = null).
                var vertailu = iso3 == "FIN" ? null : suomi;
                foreach (var kv in paikat)
                {
                    var kuvio = Kuvio(kv.Key, maa, vertailu, data.PyramidiRyhmia);
                    if (kuvio != null) kv.Value.Add(kuvio);
                }
            });
        }

        /// <summary>Lohkon kuvio webin piirraMaaNumerot-asetuksilla, tai null jos sarja puuttuu.</summary>
        static VisualElement Kuvio(string kayra, NumeroMaa maa, NumeroMaa vertailu, int ryhmia)
        {
            NumeroSarja Sarja(NumeroMaa m, string k) => m != null && m.Sarjat.TryGetValue(k, out var s) ? s : null;
            var oma = Sarja(maa, kayra);
            var suomi = Sarja(vertailu, kayra);
            switch (kayra)
            {
                case "pyramidi":
                    return maa.Pyramidi != null ? new NumeroPyramidi(maa.Pyramidi, ryhmia > 0 ? ryhmia : maa.Pyramidi.Miehet.Length) : null;
                case "vakiluku":
                    if (oma == null) return null;
                    bool miljoonissa = NumeroSarja.Suurin(oma) >= 2e6;
                    return new NumeroKayra(oma, suomi, miljoonissa ? 1e6 : 1e3, oma.EnnusteAlku,
                        maa.SilloinVuosi > 0 ? maa.SilloinVuosi : 0, maa.SilloinArvo, null, 150f);
                case "bkt":
                    return oma == null ? null : new NumeroKayra(oma, suomi, 1e3, 0, 0, 0, null, 150f);
                case "elinika":
                    return oma == null ? null : new NumeroKayra(oma, suomi, 1, 0, 0, 0, null, 106f);
                case "kaupungistuminen":
                    return oma == null ? null : new NumeroKayra(oma, suomi, 1, 0, 0, 0, 100, 106f);
                case "co2":
                    return oma == null ? null : new NumeroKayra(oma, suomi, 1, 0, 0, 0, null, 106f);
                default:
                    // Tuntematon mittari: yleinen käyrä, jos sarja on aineistossa.
                    return oma == null ? null : new NumeroKayra(oma, suomi, 1, oma.EnnusteAlku, 0, 0, null, 106f);
            }
        }

        static Label Teksti(string teksti, string luokka, VisualElement isa)
        {
            var l = Rakenne.Teksti(teksti, luokka, isa);
            l.enableRichText = false;
            return l;
        }

        static void Kappale(VisualElement isa, string teksti, string luokka, Kirjasin kirjasin, Action<string> luettava)
        {
            if (string.IsNullOrWhiteSpace(teksti)) return;
            Kirjasimet.Aseta(Teksti(teksti.Trim(), luokka, isa), kirjasin);
            luettava?.Invoke(teksti.Trim());
        }
    }

    // --- aineisto (assets/data/maakayrat.json) -------------------------------------------------

    /// <summary>Vuosisarja: arvot vuodesta Alku alkaen, puuttuva arvo = NaN. EnnusteAlku 0 = ei ennustetta.</summary>
    public sealed class NumeroSarja
    {
        public int Alku, EnnusteAlku;
        public double[] Arvot;

        public int Loppu => Alku + Arvot.Length - 1;

        public static double Suurin(NumeroSarja s)
        {
            double m = double.NegativeInfinity;
            foreach (var a in s.Arvot) if (!double.IsNaN(a) && a > m) m = a;
            return m;
        }
    }

    public sealed class NumeroPyramidiTiedot
    {
        public int Vuosi;
        public double[] Miehet, Naiset;
    }

    public sealed class NumeroMaa
    {
        public readonly Dictionary<string, NumeroSarja> Sarjat = new Dictionary<string, NumeroSarja>();
        public NumeroPyramidiTiedot Pyramidi;
        /// <summary>Isoisän aikainen väkiluku (Gapminder); SilloinVuosi 0 = ei tietoa.</summary>
        public int SilloinVuosi;
        public double SilloinArvo;
    }

    public sealed class NumeroAineisto
    {
        const string Polku = "tiedostot/assets/data/maakayrat.json";

        public Dictionary<string, NumeroMaa> Maat = new Dictionary<string, NumeroMaa>();
        public int PyramidiRyhmia;

        static NumeroAineisto ladattu;
        static bool haussa;
        static readonly List<Action> odottajat = new List<Action>();

        /// <summary>
        /// Aineisto kerran per istunto (web lataaMaakayrat); valmis(null), jos latausta ei saatu —
        /// seuraava kutsu yrittää silloin uudelleen.
        /// </summary>
        public static void Hae(Action<NumeroAineisto> valmis)
        {
            if (valmis == null) return;
            if (ladattu != null) { valmis(ladattu); return; }
            odottajat.Add(() => valmis(ladattu));
            if (haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(Lataa());
        }

        static IEnumerator Lataa()
        {
            string json = null;
            yield return Sisalto.HaePaketista(Polku, t => json = t, true);
            if (json == null)
            {
                Debug.LogWarning("MATKAKIRJA ui numerot: maakayrat.json-tiedostoa ei saatu");
                Valmistu(null);
                yield break;
            }
            Task.Run(() =>
            {
                NumeroAineisto tulos = null;
                try { tulos = Jasenna(json); }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui numerot: jäsennys epäonnistui: " + e.Message); }
                UiKerros.PaaSaikeessa(() => Valmistu(tulos));
            });
        }

        static void Valmistu(NumeroAineisto tulos)
        {
            ladattu = tulos;
            haussa = false;
            var kutsut = odottajat.ToArray();
            odottajat.Clear();
            foreach (var k in kutsut) { try { k(); } catch (Exception e) { Debug.LogException(e); } }
        }

        static NumeroAineisto Jasenna(string json)
        {
            var juuri = Rakenne.Olio(MiniJson.Jasenna(json));
            var tulos = new NumeroAineisto();
            var meta = MiniJson.Kentta(juuri, "meta") as Dictionary<string, object>;
            if (MiniJson.Kentta(meta, "pyramidiRyhmat") is List<object> ryhmat) tulos.PyramidiRyhmia = ryhmat.Count;
            if (!(MiniJson.Kentta(juuri, "maat") is Dictionary<string, object> maat)) return tulos;
            foreach (var kv in maat)
            {
                if (!(kv.Value is Dictionary<string, object> m)) continue;
                var maa = new NumeroMaa();
                foreach (var k in m)
                {
                    if (k.Key == "pyramidi" || k.Key == "silloin") continue;
                    if (Sarja(k.Value) is NumeroSarja s) maa.Sarjat[k.Key] = s;
                }
                if (MiniJson.Kentta(m, "pyramidi") is Dictionary<string, object> p)
                {
                    var miehet = Luvut(MiniJson.Kentta(p, "miehet"));
                    var naiset = Luvut(MiniJson.Kentta(p, "naiset"));
                    if (miehet != null && naiset != null && miehet.Length == naiset.Length && miehet.Length > 0)
                        maa.Pyramidi = new NumeroPyramidiTiedot
                        {
                            Vuosi = (int)(MiniJson.Luku(p, "vuosi") ?? 0),
                            Miehet = Nollaksi(miehet),
                            Naiset = Nollaksi(naiset),
                        };
                }
                if (MiniJson.Kentta(m, "silloin") is Dictionary<string, object> si
                    && MiniJson.Luku(si, "vuosi") is double sv && MiniJson.Luku(si, "arvo") is double sa)
                {
                    maa.SilloinVuosi = (int)sv;
                    maa.SilloinArvo = sa;
                }
                tulos.Maat[kv.Key] = maa;
            }
            return tulos;
        }

        static NumeroSarja Sarja(object arvo)
        {
            if (!(arvo is Dictionary<string, object> o)) return null;
            if (!(MiniJson.Luku(o, "alku") is double alku)) return null;
            var arvot = Luvut(MiniJson.Kentta(o, "arvot"));
            if (arvot == null || arvot.Length == 0) return null;
            return new NumeroSarja
            {
                Alku = (int)alku,
                EnnusteAlku = (int)(MiniJson.Luku(o, "ennusteAlku") ?? 0),
                Arvot = arvot,
            };
        }

        /// <summary>Lukutaulukko, null-arvot NaN:ksi; null jos ei taulukko.</summary>
        static double[] Luvut(object arvo)
        {
            if (!(arvo is List<object> l)) return null;
            var t = new double[l.Count];
            for (int i = 0; i < l.Count; i++) t[i] = l[i] is double d ? d : double.NaN;
            return t;
        }

        static double[] Nollaksi(double[] t)
        {
            for (int i = 0; i < t.Length; i++) if (double.IsNaN(t[i])) t[i] = 0;
            return t;
        }
    }

    // --- piirto --------------------------------------------------------------------------------

    /// <summary>
    /// Yhteinen pohja: viewBox L×K skaalataan contentRectiin suhde säilyttäen, tekstit Labeleina
    /// absoluuttisesti viewBox-koordinaatein (kuten Saagraafi).
    /// </summary>
    public abstract class NumeroKuvio : VisualElement
    {
        protected const float L = 300f;
        protected const float Akselikoko = 8.5f, Pienikoko = 7.5f;
        protected static readonly Color Kulta = new Color32(164, 105, 28, 255);           // #a4691c
        protected static readonly Color Apuviiva = new Color32(70, 51, 31, 46);           // 0.18
        protected static readonly Color Pohjaviiva = new Color32(70, 51, 31, 153);        // 0.6

        readonly float k;
        struct Teksti { public Label L; public float X, Y, Ankkuri, Koko; }
        readonly List<Teksti> tekstit = new List<Teksti>();
        float s = 1f;
        Vector2 o;

        protected NumeroKuvio(float korkeus)
        {
            k = korkeus;
            AddToClassList("mk-numerot__kuvio");
            pickingMode = PickingMode.Ignore;
            generateVisualContent += mgc => { if (contentRect.width > 0) Piirra(mgc.painter2D); };
            RegisterCallback<GeometryChangedEvent>(_ => Asettele());
        }

        protected abstract void Piirra(Painter2D p);

        /// <summary>Teksti viewBox-kohtaan; y on SVG:n perusviiva, ankkuri 0 = alku, 0.5 = keskellä, 1 = loppu.</summary>
        protected void LisaaTeksti(string teksti, string luokka, float x, float y, float ankkuri, float koko = Akselikoko)
        {
            var l = Rakenne.Teksti(teksti, "mk-numerot__akseli " + luokka, this);
            Kirjasimet.Aseta(l, Kirjasin.Kone);
            l.style.translate = new Translate(Length.Percent(-100f * ankkuri), Length.Percent(-50f));
            tekstit.Add(new Teksti { L = l, X = x, Y = y, Ankkuri = ankkuri, Koko = koko });
        }

        void Asettele()
        {
            var r = contentRect;
            if (r.width <= 0) return;
            float tavoite = r.width * k / L;
            if (Mathf.Abs(r.height - tavoite) > 0.5f)
                style.height = tavoite + (layout.height - r.height);
            float h = Mathf.Max(r.height, 1f);
            s = Mathf.Min(r.width / L, h / k);
            o = new Vector2(r.x + (r.width - L * s) / 2f, r.y + (h - k * s) / 2f);
            float bl = resolvedStyle.borderLeftWidth, bt = resolvedStyle.borderTopWidth;
            foreach (var t in tekstit)
            {
                t.L.style.fontSize = t.Koko * s;
                t.L.style.left = o.x + t.X * s - bl;
                t.L.style.top = o.y + (t.Y - 0.35f * t.Koko) * s - bt;
            }
            MarkDirtyRepaint();
        }

        protected Vector2 P(float x, float y) => new Vector2(o.x + x * s, o.y + y * s);
        protected float S => s;

        protected void Viiva(Painter2D p, Color c, float leveys, float x1, float y1, float x2, float y2)
        {
            p.strokeColor = c;
            p.lineWidth = leveys * s;
            p.lineCap = LineCap.Butt;
            p.BeginPath();
            p.MoveTo(P(x1, y1));
            p.LineTo(P(x2, y2));
            p.Stroke();
        }

        protected static void Ympyra(Painter2D p, Vector2 c, float r)
        {
            const float kk = 0.5523f;
            float kr = kk * r;
            p.BeginPath();
            p.MoveTo(new Vector2(c.x + r, c.y));
            p.BezierCurveTo(new Vector2(c.x + r, c.y + kr), new Vector2(c.x + kr, c.y + r), new Vector2(c.x, c.y + r));
            p.BezierCurveTo(new Vector2(c.x - kr, c.y + r), new Vector2(c.x - r, c.y + kr), new Vector2(c.x - r, c.y));
            p.BezierCurveTo(new Vector2(c.x - r, c.y - kr), new Vector2(c.x - kr, c.y - r), new Vector2(c.x, c.y - r));
            p.BezierCurveTo(new Vector2(c.x + kr, c.y - r), new Vector2(c.x + r, c.y - kr), new Vector2(c.x + r, c.y));
            p.ClosePath();
        }

        protected static Color Alfa(Color c, float a) => new Color(c.r, c.g, c.b, c.a * a);
    }

    /// <summary>
    /// Aikasarja (web piirraKayra): kultainen pääkäyrä, Suomi ohuena musteviivana, ennusteosa
    /// himmeämpänä, vasemmassa reunassa asteikko 50 % ja 100 %, vuosiluvut pohjaviivan alla ja
    /// "silloin"-rengas akselin reunassa.
    /// </summary>
    public sealed class NumeroKayra : NumeroKuvio
    {
        const float Vasen = 36f, Oikea = 290f, Yla = 12f;
        static readonly Color Suomi = new Color32(70, 51, 31, 97);          // 0.38
        static readonly Color Silloin = new Color32(138, 97, 20, 255);      // #8a6114
        const float EnnusteAlfa = 0.45f;

        readonly NumeroSarja sarja, suomi;
        readonly int ennusteAlku, silloinVuosi, alku, loppu;
        readonly double silloinArvo, ylaraja;
        readonly float ala;
        readonly List<float> vuodet = new List<float>();

        /// <param name="jakaja">asteikon lukujen jakaja (1e6 = miljoonina)</param>
        /// <param name="ennusteAlku">ensimmäinen ennustevuosi, 0 = ei ennustetta</param>
        /// <param name="silloinVuosi">isoisän aikainen vuosi (rengas akselin reunassa), 0 = ei</param>
        /// <param name="katto">kiinteä yläraja (esim. prosenttiasteikon 100), null = pyöristetty maksimi</param>
        /// <param name="korkeus">viewBoxin korkeus (web 150 tai matalampi 106)</param>
        public NumeroKayra(NumeroSarja sarja, NumeroSarja suomi, double jakaja, int ennusteAlku,
            int silloinVuosi, double silloinArvo, double? katto, float korkeus) : base(korkeus)
        {
            this.sarja = sarja;
            this.suomi = suomi;
            this.ennusteAlku = ennusteAlku;
            this.silloinVuosi = silloinVuosi;
            this.silloinArvo = silloinArvo;
            // Matalampi kehys: pohjaviivan etäisyys alareunasta pysyy vakiona (web 150 − 128).
            ala = korkeus - 22f;

            alku = sarja.Alku;
            loppu = sarja.Loppu;
            double suurin = Math.Max(0, NumeroSarja.Suurin(sarja));
            if (suomi != null)
            {
                alku = Math.Min(alku, suomi.Alku);
                loppu = Math.Max(loppu, suomi.Loppu);
                suurin = Math.Max(suurin, NumeroSarja.Suurin(suomi));
            }
            if (silloinVuosi > 0) suurin = Math.Max(suurin, silloinArvo);
            if (loppu <= alku) loppu = alku + 1;
            ylaraja = katto ?? SomaYlaraja(suurin / jakaja) * jakaja;

            // Asteikko vasempaan reunaan (nolla on pohjaviiva).
            foreach (var osa in new[] { 0.5, 1.0 })
            {
                double arvo = ylaraja * osa;
                LisaaTeksti(Lukema(arvo / jakaja), "", Vasen - 4f, Y(arvo) + 3f, 1f);
            }
            // Vuosiluvut: neljännesvuosisata pitkälle, muuten tiheämmin.
            int jana = loppu - alku;
            int askel = jana >= 90 ? 25 : jana >= 50 ? 20 : 10;
            for (int v = (int)Math.Ceiling(alku / (double)askel) * askel; v <= loppu; v += askel)
            {
                LisaaTeksti(v.ToString(CultureInfo.InvariantCulture), "", X(v), ala + 11f, 0.5f);
                vuodet.Add(X(v));
            }
            if (ennusteAlku > 0)
                LisaaTeksti("ennuste", "mk-numerot__ennusteteksti", X(Math.Min(ennusteAlku + 2, loppu)), Yla + 6f, 0f);
            if (silloinVuosi > 0)
                LisaaTeksti(silloinVuosi.ToString(CultureInfo.InvariantCulture), "mk-numerot__silloinvuosi",
                    Vasen + 5f, Mathf.Max(Yla + 6f, Y(silloinArvo) - 4f), 0f, Pienikoko);
        }

        float X(double vuosi) => Vasen + (float)((vuosi - alku) / (loppu - alku)) * (Oikea - Vasen);
        float Y(double arvo) => ala - (float)(arvo / ylaraja) * (ala - Yla);

        protected override void Piirra(Painter2D p)
        {
            // Vaaka-apuviivat puolivälissä ja ylärajalla, vuosien pienet väkäset.
            foreach (var osa in new[] { 0.5, 1.0 })
            {
                float y = Y(ylaraja * osa);
                Viiva(p, Apuviiva, 0.7f, Vasen, y, Oikea, y);
            }
            foreach (var x in vuodet) Viiva(p, Apuviiva, 0.7f, x, ala, x, ala + 2.5f);

            if (suomi != null) Patkat(p, suomi, _ => true, Suomi, 1f);
            // Ennusteen raja: historia rajavuoteen asti, ennuste jatkaa siitä himmeämpänä;
            // rajavuosi kuuluu molempiin, jotta viiva jatkuu.
            int raja = ennusteAlku > 0 ? ennusteAlku : int.MaxValue;
            Patkat(p, sarja, v => v <= raja - 1, Kulta, 1.8f);
            if (ennusteAlku > 0) Patkat(p, sarja, v => v >= raja - 1, Alfa(Kulta, EnnusteAlfa), 1.3f);

            // "Silloin ja nyt": pieni rengas akselin reunassa sen ajan väkiluvun korkeudella.
            if (silloinVuosi > 0)
            {
                p.strokeColor = Silloin;
                p.lineWidth = 1.1f * S;
                Ympyra(p, P(Vasen, Y(silloinArvo)), 2.6f * S);
                p.Stroke();
            }

            Viiva(p, Pohjaviiva, 1f, Vasen, ala, Oikea, ala);
        }

        /// <summary>Sarja pätkinä: puuttuva arvo katkaisee, yksinäinen havainto saa pisteen.</summary>
        void Patkat(Painter2D p, NumeroSarja s, Func<int, bool> ehto, Color vari, float leveys)
        {
            var patka = new List<Vector2>();
            for (int i = 0; i <= s.Arvot.Length; i++)
            {
                int vuosi = s.Alku + i;
                bool mukana = i < s.Arvot.Length && !double.IsNaN(s.Arvot[i]) && ehto(vuosi);
                if (mukana) { patka.Add(P(X(vuosi), Y(s.Arvot[i]))); continue; }
                if (patka.Count == 1)
                {
                    p.fillColor = vari;
                    Ympyra(p, patka[0], 1.6f * S);
                    p.Fill();
                }
                else if (patka.Count > 1)
                {
                    p.strokeColor = vari;
                    p.lineWidth = leveys * S;
                    p.lineCap = LineCap.Round;
                    p.lineJoin = LineJoin.Round;
                    p.BeginPath();
                    p.MoveTo(patka[0]);
                    for (int j = 1; j < patka.Count; j++) p.LineTo(patka[j]);
                    p.Stroke();
                }
                patka.Clear();
            }
        }

        /// <summary>
        /// Yläraja pyöristettynä somaan lukemaan (web somaYlaraja): tikapuissa myös 1,5, 3, 6 ja 8,
        /// jottei käyrä jää puolikkaaksi.
        /// </summary>
        static double SomaYlaraja(double suurin)
        {
            if (!(suurin > 0)) return 1;
            double kymppi = Math.Pow(10, Math.Floor(Math.Log10(suurin)));
            foreach (var kerroin in new[] { 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10 })
                if (suurin <= kerroin * kymppi) return kerroin * kymppi;
            return 10 * kymppi;
        }

        /// <summary>Asteikon lukema: kokonaisluku sellaisenaan, muuten yksi desimaali pilkulla.</summary>
        static string Lukema(double v)
        {
            if (Math.Abs(v - Math.Round(v)) > 1e-9)
                return v.ToString("0.0", CultureInfo.InvariantCulture).Replace('.', ',');
            return Math.Round(v).ToString(CultureInfo.InvariantCulture);
        }
    }

    /// <summary>
    /// Väestöpyramidi (web piirraPyramidi): miehet vasemmalle mustella, naiset oikealle kullalla,
    /// nuorimmat alhaalla. Palkin pituus on ikäluokan osuus koko väestöstä; ikä joka neljännen
    /// portaan kohdalle keskikäytävään.
    /// </summary>
    public sealed class NumeroPyramidi : NumeroKuvio
    {
        const float Korkeus = 168f, Keski = 150f, Kaytava = 10f, Leveinta = 96f, Ala = 150f, Yla = 16f;
        static readonly Color Miehet = new Color32(70, 51, 31, 140);        // 0.55
        static readonly Color Naiset = new Color32(164, 105, 28, 199);      // 0.78

        readonly NumeroPyramidiTiedot t;
        readonly int ryhmia;
        readonly float riviVali, palkki;
        readonly double kaikki, isoin;

        public NumeroPyramidi(NumeroPyramidiTiedot tiedot, int ryhmia) : base(Korkeus)
        {
            t = tiedot;
            this.ryhmia = Mathf.Min(ryhmia, Mathf.Min(t.Miehet.Length, t.Naiset.Length));
            riviVali = (Ala - Yla) / Mathf.Max(1, ryhmia);
            palkki = riviVali - 1.4f;
            foreach (var a in t.Miehet) kaikki += a;
            foreach (var a in t.Naiset) kaikki += a;
            if (kaikki > 0)
            {
                foreach (var a in t.Miehet) isoin = Math.Max(isoin, a / kaikki);
                foreach (var a in t.Naiset) isoin = Math.Max(isoin, a / kaikki);
            }

            LisaaTeksti("miehet", "", Keski - 12f, Yla - 6f, 1f);
            LisaaTeksti("naiset", "", Keski + 12f, Yla - 6f, 0f);
            for (int i = 0; i < this.ryhmia; i += 4)
                LisaaTeksti((i * 5).ToString(CultureInfo.InvariantCulture), "mk-numerot__ika",
                    Keski, Ala - i * riviVali - palkki / 2f + 2.4f, 0.5f, Pienikoko);
        }

        float Leveys(double arvo) => kaikki > 0 && isoin > 0 ? (float)(arvo / kaikki / isoin) * Leveinta : 0f;

        protected override void Piirra(Painter2D p)
        {
            for (int i = 0; i < ryhmia; i++)
            {
                float yPohja = Ala - i * riviVali;
                float m = Leveys(t.Miehet[i]), n = Leveys(t.Naiset[i]);
                if (m > 0f) Palkki(p, Miehet, Keski - Kaytava - m, yPohja - palkki, m, palkki);
                if (n > 0f) Palkki(p, Naiset, Keski + Kaytava, yPohja - palkki, n, palkki);
            }
            Viiva(p, Pohjaviiva, 1f, Keski - Kaytava - Leveinta, Ala, Keski + Kaytava + Leveinta, Ala);
        }

        void Palkki(Painter2D p, Color c, float x, float y, float w, float h)
        {
            p.fillColor = c;
            p.BeginPath();
            p.MoveTo(P(x, y));
            p.LineTo(P(x + w, y));
            p.LineTo(P(x + w, y + h));
            p.LineTo(P(x, y + h));
            p.ClosePath();
            p.Fill();
        }
    }
}
