// SÄÄGRAAFI (Natiivi-UI, 23.9.2026): webin js/saa.js piirraVuosiSaa, vuosiSaaSelite ja
// js/lehti.js naytaVuosiSaa sekä js/opas.js opasSaagraafi.
//
// Koko vuoden graafi pelin mustekynän tyylillä: kuluvan kuukauden haalea kaista,
// sadepalkit (sateensininen), tyypillinen ylin–alin-vaihteluvyöhyke (valinnainen),
// apuviivat 10° välein, keskilämpökäyrä pehmeänä (Catmull–Rom → bezier) ja sen alla
// kultaliuku, ääripäiden lukemat ja kuukausien alkukirjaimet. Mitoitus on webin
// kiinteä viewBox 300×176, joka skaalataan elementin sisältöalaan suhde säilyttäen
// (korkeus asetetaan leveydestä, koska USS:ssä ei ole aspect-ratiota).
// Viivat ja täytöt Painter2D:llä, kultaliuku omana verkkonaan (Painter2D ei täytä
// liukuvärillä), tekstit Labeleina absoluuttisesti.
//
// Data: sisältöpaketin moduulit/js/packs/saatiedot.json → exportit.SAATIEDOT[kaupunki].
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class SaaTiedot
    {
        /// <summary>12 kuukauden arvot. Ylin ja Alin voivat puuttua (null).</summary>
        public float[] Keskilampo, Ylin, Alin, Sade;
        /// <summary>Muutaman lauseen luonnehdinta (valinnainen).</summary>
        public string Luonnehdinta;
        /// <summary>Rivikohtainen lähde (valinnainen; null = Open-Meteo ERA5 1991–2020).</summary>
        public string LahdeNimi, LahdeKausi;
    }

    public static class Saatiedot
    {
        const string Polku = "moduulit/js/packs/saatiedot.json";
        static Dictionary<string, SaaTiedot> kaikki;
        static bool haussa;
        static readonly List<Action> odottajat = new List<Action>();

        /// <summary>
        /// Kaupungin säänormaalit (moduuli ladataan kerran). valmis(null), jos kaupunkia
        /// ei ole, keskilämpö tai sade puuttuu tai latausta ei saatu.
        /// </summary>
        public static void Hae(string kaupunki, Action<SaaTiedot> valmis)
        {
            if (valmis == null) return;
            SaaTiedot Tulos() =>
                kaupunki != null && kaikki != null && kaikki.TryGetValue(kaupunki, out var t) ? t : null;
            if (kaikki != null) { valmis(Tulos()); return; }
            odottajat.Add(() => valmis(Tulos()));
            if (haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(Lataa());
        }

        static IEnumerator Lataa()
        {
            string json = null;
            // Skeema 1.15+: oma kokoelma saatiedot; vanhemmissa paketeissa web-moduuli.
            yield return Sisalto.HaeTeksti("saatiedot", t => json = t, valinnainen: true);
            if (json == null) yield return Sisalto.HaePaketista(Polku, t => json = t, true);
            if (json == null)
            {
                Debug.LogWarning("MATKAKIRJA ui sää: saatiedot-moduulia ei saatu");
                Valmistu(null);
                yield break;
            }
            Task.Run(() =>
            {
                Dictionary<string, SaaTiedot> tulos = null;
                try { tulos = Jasenna(json); }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui sää: jäsennys epäonnistui: " + e.Message); }
                UiKerros.PaaSaikeessa(() => Valmistu(tulos));
            });
        }

        static void Valmistu(Dictionary<string, SaaTiedot> tulos)
        {
            // Epäonnistunut lataus jättää kaikki = null, jolloin seuraava Hae yrittää uudelleen.
            kaikki = tulos;
            haussa = false;
            var kutsut = odottajat.ToArray();
            odottajat.Clear();
            foreach (var k in kutsut) { try { k(); } catch (Exception e) { Debug.LogException(e); } }
        }

        static Dictionary<string, SaaTiedot> Jasenna(string json)
        {
            var juuri = Rakenne.Olio(MiniJson.Jasenna(json));
            var st = new List<KeyValuePair<string, object>>();
            if (MiniJson.Kentta(juuri, "alkiot") is List<object> alkiot)
            {
                foreach (var a in alkiot)
                    if (a is Dictionary<string, object> ao && (MiniJson.Teksti(ao, "kaupunki") ?? MiniJson.Teksti(ao, "id")) is string id)
                        st.Add(new KeyValuePair<string, object>(id, ao));
            }
            else
            {
                var ex = Rakenne.Olio(MiniJson.Kentta(juuri, "exportit"));
                var mod = Rakenne.Olio(MiniJson.Kentta(ex, "SAATIEDOT"));
                if (mod != null) st.AddRange(mod);
            }
            var tulos = new Dictionary<string, SaaTiedot>();
            foreach (var kv in st)
            {
                var o = kv.Value as Dictionary<string, object>;
                if (o == null) continue;
                var keski = Luvut(MiniJson.Kentta(o, "keskilampo"));
                var sade = Luvut(MiniJson.Kentta(o, "sade"));
                if (keski == null || sade == null || keski.Length == 0 || sade.Length == 0) continue;
                var lahde = MiniJson.Kentta(o, "lahde") as Dictionary<string, object>;
                tulos[kv.Key] = new SaaTiedot
                {
                    Keskilampo = keski,
                    Sade = sade,
                    Ylin = Luvut(MiniJson.Kentta(o, "ylin")),
                    Alin = Luvut(MiniJson.Kentta(o, "alin")),
                    Luonnehdinta = MiniJson.Teksti(o, "luonnehdinta"),
                    LahdeNimi = lahde != null ? MiniJson.Teksti(lahde, "nimi") : null,
                    LahdeKausi = lahde != null ? MiniJson.Teksti(lahde, "kausi") : null,
                };
            }
            return tulos;
        }

        /// <summary>Lukutaulukko tai null (puuttuu tai sisältää muuta kuin lukuja).</summary>
        static float[] Luvut(object arvo)
        {
            if (!(arvo is List<object> l)) return null;
            var t = new float[l.Count];
            for (int i = 0; i < l.Count; i++)
            {
                if (!(l[i] is double d)) return null;
                t[i] = (float)d;
            }
            return t;
        }
    }

    public sealed class Saagraafi : VisualElement
    {
        // webin viewBox ja piirtoala
        const float L = 300f, K = 176f, Vasen = 30f, Oikea = 268f, Yla = 20f, Ala = 146f;
        const float Askel = (Oikea - Vasen) / 12f;
        const float Tekstikoko = 8.5f;
        const string Kirjaimet = "THMHTKHESLMJ";

        static readonly Color KuluvaKaista = new Color32(164, 105, 28, 23);   // 0.09
        static readonly Color Palkki = new Color32(96, 118, 142, 140);        // 0.55
        static readonly Color Kaista = new Color32(164, 105, 28, 33);         // 0.13
        static readonly Color Kulta = new Color32(164, 105, 28, 255);         // #a4691c
        const float LiukuAlfa = 0.22f;
        static readonly Color Apuviiva = new Color32(70, 51, 31, 46);         // 0.18
        static readonly Color Pohjaviiva = new Color32(70, 51, 31, 153);      // 0.6

        readonly float[] keski, sade, ylin, alin;
        readonly bool kaista;
        readonly int kuluva;
        readonly float lampoYla, lampoAla, sadeYla;

        // Tekstit viewBox-koordinaatein; ankkuri 0 = alku, 0.5 = keskellä, 1 = loppu.
        struct Teksti { public Label L; public float X, Y, Ankkuri; public bool Arvo; }
        readonly List<Teksti> tekstit = new List<Teksti>();

        // skaalaus viewBoxista paikallisiin koordinaatteihin
        float s = 1f;
        Vector2 o;

        // avausanimaatio (web .vuosisaa: palkit kasvavat, käyrä piirtyy, pisteet ja lukemat ilmestyvät)
        float alku = -1f;
        const float AnimaatioMs = 1550f;

        public Saagraafi(SaaTiedot t, bool iso = false)
        {
            AddToClassList("mk-saa");
            if (iso) AddToClassList("mk-saa--iso");
            pickingMode = PickingMode.Position;
            keski = t?.Keskilampo ?? new float[0];
            sade = t?.Sade ?? new float[0];
            ylin = t?.Ylin;
            alin = t?.Alin;
            kaista = KelpaaKaista(ylin, alin);
            kuluva = DateTime.Now.Month - 1;

            // Asteikot: lämpö viiden, sade viidenkymmenen tarkkuuteen; kaista mukaan rajoihin.
            float lmax = Maksimi(keski), lmin = Minimi(keski);
            if (kaista) { lmax = Mathf.Max(lmax, Maksimi(ylin), Maksimi(alin)); lmin = Mathf.Min(lmin, Minimi(ylin), Minimi(alin)); }
            lampoYla = Mathf.Max(10f, Mathf.Ceil(lmax / 5f) * 5f);
            lampoAla = Mathf.Min(0f, Mathf.Floor(lmin / 5f) * 5f);
            sadeYla = Mathf.Max(50f, Mathf.Ceil(Maksimi(sade) / 50f) * 50f);

            // Lämpöasteikko vasemmalle (nollaviiva aina mukana), sadeasteikko oikealle.
            for (float aste = Mathf.Ceil(lampoAla / 10f) * 10f; aste <= lampoYla; aste += 10f)
                LisaaTeksti($"{Mathf.RoundToInt(aste)}°", "mk-saa__akseli", Vasen - 4f, LampoY(aste) + 3f, 1f);
            foreach (var mm in new[] { sadeYla / 2f, sadeYla })
                LisaaTeksti($"{Mathf.RoundToInt(mm)}", "mk-saa__akseli", Oikea + 4f, SadeY(mm) + 3f, 0f);
            LisaaTeksti("mm", "mk-saa__akseli", Oikea + 4f, Ala + 3f, 0f);

            // Ääripäiden lukemat: lämpimin ja kylmin kuukausi käyrälle, sateisin palkin päälle.
            if (keski.Length > 0)
            {
                int maxI = Array.IndexOf(keski, Maksimi(keski)), minI = Array.IndexOf(keski, Minimi(keski));
                LisaaTeksti($"{Pyorista(keski[maxI])}°", "mk-saa__arvo", KeskiX(maxI), LampoY(keski[maxI]) - 6f, 0.5f, true);
                LisaaTeksti($"{Pyorista(keski[minI])}°", "mk-saa__arvo", KeskiX(minI), LampoY(keski[minI]) - 6f, 0.5f, true);
                if (sade.Length > 0)
                {
                    int sadeI = Array.IndexOf(sade, Maksimi(sade));
                    if (sade[sadeI] > 0 && sadeI != maxI && sadeI != minI)
                        LisaaTeksti($"{Pyorista(sade[sadeI])}", "mk-saa__arvo mk-saa__arvo--sade", KeskiX(sadeI), SadeY(sade[sadeI]) - 3f, 0.5f, true);
                }
            }

            // Kuukausien alkukirjaimet; kuluva kuukausi korostuu.
            for (int i = 0; i < 12; i++)
            {
                var l = LisaaTeksti(Kirjaimet[i].ToString(), i == kuluva ? "mk-saa__akseli mk-saa__kuluva" : "mk-saa__akseli",
                    KeskiX(i), Ala + 12f, 0.5f);
                if (i == kuluva) Kirjasimet.Aseta(l, Kirjasin.KoneLihava);
            }

            generateVisualContent += Piirra;
            RegisterCallback<GeometryChangedEvent>(_ => Asettele());
        }

        /// <summary>Iso näkymä (web naytaVuosiSaa): graafi, luonnehdinta ja lähderivi minipopupissa.</summary>
        public static void NaytaIsona(SaaTiedot t, string otsikko)
        {
            if (t == null || t.Keskilampo == null || t.Sade == null) return;
            Minipopup m = null;
            m = Minipopup.Avaa(otsikko, s =>
            {
                var g = new Saagraafi(t, true);
                g.RegisterCallback<ClickEvent>(_ => m?.Sulje());
                s.Add(g);
                if (!string.IsNullOrEmpty(t.Luonnehdinta))
                    Kirjasimet.Aseta(Rakenne.Teksti(t.Luonnehdinta, "mk-saa__luonnehdinta", s), Kirjasin.Luku);
                Kirjasimet.Aseta(Rakenne.Teksti(Selite(t), "mk-saa__selite", s), Kirjasin.Kone);
            }, "mk-saa__popup");
            Aanet.PulunTehoste("paper");
        }

        /// <summary>
        /// Oppaan pieni kuvaaja (web opasSaagraafi, css .opas-saagraafi): graafi ja kuvateksti,
        /// napautus avaa ison näkymän. null, jos dataa ei ole.
        /// </summary>
        public static VisualElement OppaanKuvaaja(SaaTiedot t, string otsikko)
        {
            if (t?.Keskilampo == null || t.Keskilampo.Length == 0 || t.Sade == null || t.Sade.Length == 0) return null;
            var kehys = Rakenne.El("mk-saa__kelluke");
            var g = new Saagraafi(t);
            g.AddToClassList("mk-saa--nappi");
            g.RegisterCallback<ClickEvent>(_ => NaytaIsona(t, otsikko));
            kehys.Add(g);
            Kirjasimet.Aseta(Rakenne.Teksti("Sää vuoden mittaan. Napauta suuremmaksi.", "mk-saa__kelluke-teksti", kehys), Kirjasin.Kone);
            return kehys;
        }

        /// <summary>Lähderivi (web vuosiSaaSelite): sanamuoto seuraa kaistan olemassaoloa.</summary>
        public static string Selite(SaaTiedot t)
        {
            bool k = KelpaaKaista(t?.Ylin, t?.Alin);
            string lahde = !string.IsNullOrEmpty(t?.LahdeNimi)
                ? t.LahdeNimi + (!string.IsNullOrEmpty(t.LahdeKausi) ? ", " + t.LahdeKausi : "")
                : "Open-Meteo (ERA5), 1991–2020";
            return k
                ? "Käyrä keskilämpö, kaista tyypillinen vaihteluväli °C · palkit sademäärä mm · " + lahde
                : "Käyrä keskilämpö °C · palkit sademäärä mm · " + lahde;
        }

        // --- mitoitus -----------------------------------------------------------------

        float LampoY(float aste) => Ala - (aste - lampoAla) / (lampoYla - lampoAla) * (Ala - Yla);
        float SadeY(float mm) => Ala - mm / sadeYla * (Ala - Yla);
        static float KeskiX(int i) => Vasen + i * Askel + Askel / 2f;
        Vector2 P(float x, float y) => new Vector2(o.x + x * s, o.y + y * s);
        Vector2 P(Vector2 v) => P(v.x, v.y);

        Label LisaaTeksti(string teksti, string luokka, float x, float y, float ankkuri, bool arvo = false)
        {
            var l = Rakenne.Teksti(teksti, luokka, this);
            Kirjasimet.Aseta(l, arvo ? Kirjasin.KoneLihava : Kirjasin.Kone);
            l.style.translate = new Translate(Length.Percent(-100f * ankkuri), Length.Percent(-50f));
            tekstit.Add(new Teksti { L = l, X = x, Y = y, Ankkuri = ankkuri, Arvo = arvo });
            return l;
        }

        void Asettele()
        {
            var r = contentRect;
            if (r.width <= 0) return;
            // Korkeus leveydestä (viewBoxin suhde); reunus ja täyte lisätään päälle.
            float tavoite = r.width * K / L;
            if (Mathf.Abs(r.height - tavoite) > 0.5f)
                style.height = tavoite + (layout.height - r.height);
            float h = Mathf.Max(r.height, 1f);
            s = Mathf.Min(r.width / L, h / K);
            o = new Vector2(r.x + (r.width - L * s) / 2f, r.y + (h - K * s) / 2f);

            // SVG:n tekstin y on perusviiva: keskikohta noin 0,35 fonttikokoa sen yläpuolella.
            float bl = resolvedStyle.borderLeftWidth, bt = resolvedStyle.borderTopWidth;
            foreach (var t in tekstit)
            {
                t.L.style.fontSize = Tekstikoko * s;
                t.L.style.left = o.x + t.X * s - bl;
                t.L.style.top = o.y + (t.Y - 0.35f * Tekstikoko) * s - bt;
            }

            if (alku < 0f)
            {
                alku = Time.realtimeSinceStartup;
                PaivitaTekstit();
                schedule.Execute(() => { PaivitaTekstit(); MarkDirtyRepaint(); })
                    .Every(16).Until(() => Kulunut() > AnimaatioMs + 50f);
            }
            MarkDirtyRepaint();
        }

        float Kulunut() => alku < 0f ? 0f : (Time.realtimeSinceStartup - alku) * 1000f;

        /// <summary>Animaation edistyminen 0..1 (ease-out) viiveen ja keston mukaan.</summary>
        float Vaihe(float viive, float kesto)
        {
            float t = Mathf.Clamp01((Kulunut() - viive) / kesto);
            return 1f - (1f - t) * (1f - t);
        }

        void PaivitaTekstit()
        {
            float a = Vaihe(1100f, 400f);
            foreach (var t in tekstit) if (t.Arvo) t.L.style.opacity = a;
        }

        // --- piirto -------------------------------------------------------------------

        void Piirra(MeshGenerationContext mgc)
        {
            if (contentRect.width <= 0 || keski.Length == 0) return;
            var p = mgc.painter2D;
            int n = keski.Length;

            // Kuluvan kuukauden haalea kaista taustimmaksi.
            if (kuluva >= 0 && kuluva < 12)
            {
                p.fillColor = KuluvaKaista;
                Suorakaide(p, Vasen + kuluva * Askel, Yla - 6f, Askel, Ala - Yla + 6f, 2f);
                p.Fill();
            }

            // Sadepalkit: kasvavat pohjaviivasta porrastetusti.
            p.fillColor = Palkki;
            for (int i = 0; i < sade.Length && i < 12; i++)
            {
                float h = Mathf.Max(0f, Ala - SadeY(sade[i])) * Vaihe(i * 45f, 600f);
                if (h <= 0.01f) continue;
                Suorakaide(p, Vasen + i * Askel + Askel * 0.18f, Ala - h, Askel * 0.64f, h, 1.4f);
                p.Fill();
            }

            // Vaihteluvyöhyke palkkien päälle mutta käyrän alle.
            if (kaista)
            {
                var ylaReuna = new Vector2[12];
                var alaReuna = new Vector2[12];
                for (int i = 0; i < 12; i++)
                {
                    ylaReuna[i] = new Vector2(KeskiX(i), LampoY(ylin[i]));
                    alaReuna[11 - i] = new Vector2(KeskiX(i), LampoY(alin[i]));
                }
                p.fillColor = Alfa(Kaista, Vaihe(200f, 800f));
                p.BeginPath();
                p.MoveTo(P(ylaReuna[0]));
                PehmeaKayra(p, ylaReuna);
                p.LineTo(P(alaReuna[0]));
                PehmeaKayra(p, alaReuna);
                p.ClosePath();
                p.Fill();
            }

            // Apuviivat 10° välein.
            p.strokeColor = Apuviiva;
            p.lineWidth = 0.7f * s;
            p.lineCap = LineCap.Butt;
            for (float aste = Mathf.Ceil(lampoAla / 10f) * 10f; aste <= lampoYla; aste += 10f)
            {
                p.BeginPath();
                p.MoveTo(P(Vasen, LampoY(aste)));
                p.LineTo(P(Oikea, LampoY(aste)));
                p.Stroke();
            }

            // Keskilämpökäyrä: kultaliuku alle, sitten viiva vasemmalta oikealle ja pisteet.
            var pts = new Vector2[n];
            for (int i = 0; i < n; i++) pts[i] = new Vector2(KeskiX(i), LampoY(keski[i]));
            var naytteet = Naytteet(pts);
            Liuku(mgc, naytteet, Vaihe(450f, 900f));

            float piirto = Vaihe(150f, 1100f);
            if (piirto > 0f)
            {
                p.strokeColor = Kulta;
                p.lineWidth = 1.8f * s;
                p.lineCap = LineCap.Round;
                p.lineJoin = LineJoin.Round;
                p.BeginPath();
                p.MoveTo(P(pts[0]));
                if (piirto >= 1f) PehmeaKayra(p, pts);
                else Osapolku(p, naytteet, piirto);
                p.Stroke();
            }
            for (int i = 0; i < n; i++)
            {
                float a = Vaihe(250f + i * 70f, 300f);
                if (a <= 0f) continue;
                p.fillColor = Alfa(Kulta, a);
                p.BeginPath();
                Ympyra(p, P(pts[i]), 2.1f * s);
                p.Fill();
            }

            // Pohjaviiva viimeisenä.
            p.strokeColor = Pohjaviiva;
            p.lineWidth = 1f * s;
            p.lineCap = LineCap.Butt;
            p.BeginPath();
            p.MoveTo(P(Vasen, Ala));
            p.LineTo(P(Oikea, Ala));
            p.Stroke();
        }

        /// <summary>Catmull–Rom-pisteistä bezier-segmentit (web pehmeaSaakayra); MoveTo tehty jo.</summary>
        void PehmeaKayra(Painter2D p, Vector2[] pts)
        {
            for (int i = 0; i < pts.Length - 1; i++)
            {
                Segmentti(pts, i, out var c1, out var c2);
                p.BezierCurveTo(P(c1), P(c2), P(pts[i + 1]));
            }
        }

        static void Segmentti(Vector2[] pts, int i, out Vector2 c1, out Vector2 c2)
        {
            var p0 = pts[Mathf.Max(0, i - 1)];
            var p1 = pts[i];
            var p2 = pts[i + 1];
            var p3 = pts[Mathf.Min(pts.Length - 1, i + 2)];
            c1 = p1 + (p2 - p0) / 6f;
            c2 = p2 - (p3 - p1) / 6f;
        }

        /// <summary>Pehmeä käyrä näytepisteinä (viewBox-koordinaatit).</summary>
        static List<Vector2> Naytteet(Vector2[] pts)
        {
            const int Jako = 12;
            var t = new List<Vector2> { pts[0] };
            for (int i = 0; i < pts.Length - 1; i++)
            {
                Segmentti(pts, i, out var c1, out var c2);
                Vector2 a = pts[i], d = pts[i + 1];
                for (int k = 1; k <= Jako; k++)
                {
                    float u = k / (float)Jako, v = 1f - u;
                    t.Add(v * v * v * a + 3f * v * v * u * c1 + 3f * v * u * u * c2 + u * u * u * d);
                }
            }
            return t;
        }

        /// <summary>Viiva näytepisteitä pitkin osuuteen osa (0..1) koko pituudesta.</summary>
        void Osapolku(Painter2D p, List<Vector2> nayt, float osa)
        {
            float koko = 0f;
            for (int i = 1; i < nayt.Count; i++) koko += Vector2.Distance(nayt[i - 1], nayt[i]);
            float jaljella = koko * osa;
            for (int i = 1; i < nayt.Count; i++)
            {
                float d = Vector2.Distance(nayt[i - 1], nayt[i]);
                if (d >= jaljella)
                {
                    if (d > 0f) p.LineTo(P(Vector2.Lerp(nayt[i - 1], nayt[i], jaljella / d)));
                    return;
                }
                p.LineTo(P(nayt[i]));
                jaljella -= d;
            }
        }

        /// <summary>
        /// Kultaliuku käyrän alla: pystysuora liukuväri (0,22 → 0) käyrän ylimmästä kohdasta
        /// pohjaviivaan, kuten webin objectBoundingBox-liuku. Pystysuikaleina verkkoon.
        /// </summary>
        void Liuku(MeshGenerationContext mgc, List<Vector2> nayt, float opasiteetti)
        {
            if (opasiteetti <= 0f || nayt.Count < 2) return;
            float ylin = Ala;
            foreach (var v in nayt) ylin = Mathf.Min(ylin, v.y);
            float korkeus = Mathf.Max(0.001f, Ala - ylin);
            int nv = nayt.Count * 2;
            if (nv > 60000) return;
            var md = mgc.Allocate(nv, (nayt.Count - 1) * 6);
            if (md.vertexCount == 0) return;
            Color32 pohja = new Color(Kulta.r, Kulta.g, Kulta.b, 0f);
            foreach (var v in nayt)
            {
                float a = LiukuAlfa * (1f - (v.y - ylin) / korkeus) * opasiteetti;
                var yla = P(v);
                var ala = P(v.x, Ala);
                md.SetNextVertex(new Vertex { position = new Vector3(yla.x, yla.y, Vertex.nearZ), tint = new Color(Kulta.r, Kulta.g, Kulta.b, a) });
                md.SetNextVertex(new Vertex { position = new Vector3(ala.x, ala.y, Vertex.nearZ), tint = pohja });
            }
            for (int i = 0; i < nayt.Count - 1; i++)
            {
                ushort a = (ushort)(i * 2), b = (ushort)(i * 2 + 1), c = (ushort)(i * 2 + 2), d = (ushort)(i * 2 + 3);
                // myötäpäivään (y alaspäin): ylä-i, ylä-i+1, ala-i+1 ja ylä-i, ala-i+1, ala-i
                md.SetNextIndex(a); md.SetNextIndex(c); md.SetNextIndex(d);
                md.SetNextIndex(a); md.SetNextIndex(d); md.SetNextIndex(b);
            }
        }

        void Suorakaide(Painter2D p, float x, float y, float w, float h, float r)
        {
            r = Mathf.Min(r, w / 2f, h / 2f);
            p.BeginPath();
            p.MoveTo(P(x + r, y));
            p.LineTo(P(x + w - r, y));
            p.ArcTo(P(x + w, y), P(x + w, y + r), r * s);
            p.LineTo(P(x + w, y + h - r));
            p.ArcTo(P(x + w, y + h), P(x + w - r, y + h), r * s);
            p.LineTo(P(x + r, y + h));
            p.ArcTo(P(x, y + h), P(x, y + h - r), r * s);
            p.LineTo(P(x, y + r));
            p.ArcTo(P(x, y), P(x + r, y), r * s);
            p.ClosePath();
        }

        static void Ympyra(Painter2D p, Vector2 c, float r)
        {
            const float k = 0.5523f;
            float kr = k * r;
            p.MoveTo(new Vector2(c.x + r, c.y));
            p.BezierCurveTo(new Vector2(c.x + r, c.y + kr), new Vector2(c.x + kr, c.y + r), new Vector2(c.x, c.y + r));
            p.BezierCurveTo(new Vector2(c.x - kr, c.y + r), new Vector2(c.x - r, c.y + kr), new Vector2(c.x - r, c.y));
            p.BezierCurveTo(new Vector2(c.x - r, c.y - kr), new Vector2(c.x - kr, c.y - r), new Vector2(c.x, c.y - r));
            p.BezierCurveTo(new Vector2(c.x + kr, c.y - r), new Vector2(c.x + r, c.y - kr), new Vector2(c.x + r, c.y));
            p.ClosePath();
        }

        // --- apurit -------------------------------------------------------------------

        /// <summary>Kaista kelpaa: 12 äärellistä lukua kummassakin eikä ylin alimman alla (web kelpaaKaista).</summary>
        static bool KelpaaKaista(float[] ylin, float[] alin)
        {
            if (ylin == null || alin == null || ylin.Length != 12 || alin.Length != 12) return false;
            for (int i = 0; i < 12; i++)
            {
                if (float.IsNaN(ylin[i]) || float.IsInfinity(ylin[i]) || float.IsNaN(alin[i]) || float.IsInfinity(alin[i])) return false;
                if (ylin[i] < alin[i]) return false;
            }
            return true;
        }

        static float Maksimi(float[] t) { float m = float.MinValue; foreach (var v in t) m = Mathf.Max(m, v); return t.Length > 0 ? m : 0f; }
        static float Minimi(float[] t) { float m = float.MaxValue; foreach (var v in t) m = Mathf.Min(m, v); return t.Length > 0 ? m : 0f; }

        /// <summary>JavaScriptin Math.round (puolikas ylöspäin; −0 → 0).</summary>
        static int Pyorista(float v) => (int)Mathf.Floor(v + 0.5f);

        static Color Alfa(Color c, float kerroin) => new Color(c.r, c.g, c.b, c.a * kerroin);
    }
}
