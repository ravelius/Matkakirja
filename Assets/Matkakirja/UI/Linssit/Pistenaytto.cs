// PISTENÄYTTÖ (Natiivi-UI): maailmanradion meripihkainen pistematriisinäyttö,
// webin js/linssit/pistenaytto.js teePistenaytto sellaisenaan:
//   - jokainen merkki 5 × 7 pyöreää pistettä, merkkien ja rivien välissä yksi
//     tyhjä sarake/rivi, joka kuuluu ruudukkoon (sammuneet pisteet näkyvät
//     himmeinä myös väleissä — "sammuneet pisteet ovat koko temppu");
//   - mitat näytön omissa yksiköissä: JAKO 10, SADE 3,6, REUNA 9; 16 merkkiä ×
//     2 riviä = 958 × 158, skaalataan aukkoon kuvasuhde säilyttäen (meet);
//   - sammunut piste = muste peitolla 0,13, palava = muste (radio.js NAYTON_MUSTE
//     #f2c05e tummalla lasilla); webin drop-shadow(0 0 4px rgba(242,183,90,.45))
//     -hehku piirretään isompana himmeänä ympyränä palavan pisteen alle;
//   - rivi, joka ei mahdu, vierii sarake kerrallaan 110 ms:n välein renkaana,
//     perässä näytön levyinen tyhjä; mahtuva rivi on paikallaan vasemmassa
//     reunassa. Vähennetty liike: ei vieritystä.
// Fontti on webin FONTTI-taulukko (latinalainen, Å Ä Ö, välimerkit ja kyrilliset
// lainoineen) sarakkeina: bitti n = rivi n ylhäältä. Merkkijärjestys on sama kuin
// RadioAineisto.PistefontinMerkit. Tarkkeellinen kirjain riisutaan perusmuotoonsa
// (É → E); muut merkit ovat tyhjiä ruutuja (webin järjestelmäfontin näytteistintä
// ei ole natiivissa — RadioAineisto.NaytonNimi vaihtaa silloin maan nimeen).
//
// Piirto generateVisualContent: jokainen piste on tekstuuroitu nelikulmio (sammunut kiekko
// ja palava kiekko hehkuineen leivotaan kerran pieniksi tekstuureiksi). Painter2D-kaaret
// tesseloitiin joka vierityskehyksessä (1425 pistettä + hehkut): radion soidessa iPadilla
// PrepareRepaint 14–15 ms / 110 ms (Linssisepän piikkiajo 4, 24.9.2026). Lineaarinen
// väriavaruus: himmeät alfat korjataan niin, että tulos vastaa webin sRGB-sekoitusta
// tummalla lasilla.
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Pistenaytto : VisualElement
    {
        public const int MerkinLeveys = 5, MerkinKorkeus = 7, NopeusMs = 110;
        const float Jako = 10f, Sade = 3.6f, Reuna = 9f, SammunutPeitto = 0.13f;
        /// <summary>radio.js NAYTON_MUSTE (--radio-lcd-muste).</summary>
        public static readonly Color Muste = new Color32(0xf2, 0xc0, 0x5e, 255);
        static readonly Color Hehku = new Color32(242, 183, 90, 255);

        readonly int merkkeja, riveja, sarakkeita, pisterivit;
        readonly float leveys, korkeus;
        readonly bool[,] tilat;
        readonly Rivi[] rivit;
        IVisualElementScheduledItem ajastin;
        Color lasi = new Color32(0x22, 0x12, 0x04, 255);
        bool himmea;

        sealed class Rivi { public List<byte> Puskuri = new List<byte>(); public int Siirtyma; public bool Vierii; public string Teksti = ""; }

        /// <summary>Kysytään joka kerta (asetus voi vaihtua kesken istunnon).</summary>
        public System.Func<bool> LiikeSallittu = () => true;

        public Pistenaytto(int merkkeja = 16, int riveja = 2)
        {
            this.merkkeja = Mathf.Max(1, merkkeja);
            this.riveja = Mathf.Max(1, riveja);
            sarakkeita = this.merkkeja * (MerkinLeveys + 1) - 1;
            pisterivit = this.riveja * (MerkinKorkeus + 1) - 1;
            leveys = (sarakkeita - 1) * Jako + Reuna * 2;
            korkeus = (pisterivit - 1) * Jako + Reuna * 2;
            tilat = new bool[pisterivit, sarakkeita];
            rivit = new Rivi[this.riveja];
            for (int i = 0; i < this.riveja; i++) rivit[i] = new Rivi();
            pickingMode = PickingMode.Ignore;
            AddToClassList("mk-pistenaytto");
            generateVisualContent += Piirra;
            RegisterCallback<DetachFromPanelEvent>(_ => Pysayta());
            RegisterCallback<AttachToPanelEvent>(_ => { if (ajastin == null && JokinVierii()) ajastin = schedule.Execute(Askel).Every(NopeusMs); });
        }

        /// <summary>Webin kuvasuhde (958 : 158 ≈ 6,06).</summary>
        public float Kuvasuhde => leveys / korkeus;

        /// <summary>Lasin väri (hehkukorjauksen tausta): #221204, virheessä #3a1408.</summary>
        public Color Lasi { get => lasi; set { lasi = value; MarkDirtyRepaint(); } }

        /// <summary>Sammuksissa: saturate(.55) brightness(.86) kuten webin näytöllä.</summary>
        public bool Himmea { get => himmea; set { if (himmea == value) return; himmea = value; MarkDirtyRepaint(); } }

        /// <summary>Näyttää rivit (null = tyhjä). Sama teksti ei aloita vieritystä alusta.</summary>
        public void NaytaTeksti(params string[] tekstit)
        {
            bool sama = true;
            for (int i = 0; i < riveja; i++)
                if ((tekstit != null && i < tekstit.Length ? tekstit[i] ?? "" : "") != rivit[i].Teksti) sama = false;
            if (sama && (ajastin != null || !JokinVierii())) return;
            Pysayta();
            bool liike = LiikeSallittu?.Invoke() ?? true;
            bool vierii = false;
            for (int i = 0; i < riveja; i++)
            {
                var r = rivit[i];
                r.Teksti = tekstit != null && i < tekstit.Length ? tekstit[i] ?? "" : "";
                var sarakkeet = Sarakkeet(r.Teksti);
                r.Vierii = liike && sarakkeet.Count > sarakkeita && sarakkeet.Count > 0;
                r.Siirtyma = 0;
                if (r.Vierii) { for (int k = 0; k < sarakkeita; k++) sarakkeet.Add(0); vierii = true; }
                r.Puskuri = sarakkeet;
            }
            PiirraKaikki();
            if (vierii) ajastin = schedule.Execute(Askel).Every(NopeusMs);
        }

        bool Naytetaan()
        {
            for (VisualElement e = this; e != null; e = e.hierarchy.parent)
                if (e.resolvedStyle.display == DisplayStyle.None) return false;
            return true;
        }

        bool JokinVierii() { foreach (var r in rivit) if (r.Vierii) return true; return false; }

        public void Pysayta()
        {
            ajastin?.Pause();
            ajastin = null;
        }

        void Askel()
        {
            if (panel == null) { Pysayta(); return; }
            // Lämpöerä (25.9.2026): piilossa (radiolinssi suljettu, display none) ei vieritetä eikä pyydetä piirtoa.
            // Muuten suljetun radion näyttö likasi linssikerroksen 9 kertaa sekunnissa, eikä UI koskaan päässyt
            // lepoon (Ruudunpaivitys PAIKALLAAN). Vieritys jatkuu samasta kohdasta, kun näyttö tulee näkyviin.
            if (!Naytetaan()) return;
            bool liikkui = false;
            for (int i = 0; i < riveja; i++)
            {
                var r = rivit[i];
                if (!r.Vierii || r.Puskuri.Count == 0) continue;
                r.Siirtyma = (r.Siirtyma + 1) % r.Puskuri.Count;
                PiirraRivi(i);
                liikkui = true;
            }
            if (!liikkui) Pysayta();
            MarkDirtyRepaint();
        }

        void PiirraKaikki()
        {
            for (int i = 0; i < riveja; i++) PiirraRivi(i);
            MarkDirtyRepaint();
        }

        void PiirraRivi(int i)
        {
            var r = rivit[i];
            int ylin = i * (MerkinKorkeus + 1);
            for (int x = 0; x < sarakkeita; x++)
            {
                int naamio = 0;
                if (r.Puskuri.Count > 0)
                    naamio = r.Vierii ? r.Puskuri[(r.Siirtyma + x) % r.Puskuri.Count] : (x < r.Puskuri.Count ? r.Puskuri[x] : 0);
                for (int y = 0; y < MerkinKorkeus; y++) tilat[ylin + y, x] = ((naamio >> y) & 1) == 1;
            }
        }

        // --- piirto --------------------------------------------------------------------

        void Piirra(MeshGenerationContext mgc)
        {
            var rect = contentRect;
            if (float.IsNaN(rect.width) || rect.width <= 0 || rect.height <= 0) return;
            float s = Mathf.Min(rect.width / leveys, rect.height / korkeus);
            var o = rect.center - new Vector2(leveys, korkeus) * (s * 0.5f);
            Color muste = Suodin(Muste), tausta = Suodin(lasi);
            var sammunut = muste; sammunut.a = Peitto(SammunutPeitto, muste, tausta);
            float r = Sade * s;
            int palavia = 0;
            foreach (bool b in tilat) if (b) palavia++;
            int sammuneita = pisterivit * sarakkeita - palavia;
            // Kiekon reunan pehmennys on tekstuurin sisällä: nelikulmio on hiukan kiekkoa suurempi.
            if (sammuneita > 0) Pisteet(mgc, KiekkoTekstuuri(), sammuneita, false, o, s, r * TekstuuriVara, sammunut);
            if (palavia == 0) return;
            // Hehkut ensin kaikkien palavien alle, sitten kiekot (naapurin hehku ei peitä kiekkoa).
            Pisteet(mgc, HehkuTekstuuri(himmea, lasi), palavia, true, o, s, r * HehkuSade * TekstuuriVara, Color.white);
            Pisteet(mgc, KiekkoTekstuuri(), palavia, true, o, s, r * TekstuuriVara, muste);
        }

        void Pisteet(MeshGenerationContext mgc, Texture2D tekstuuri, int maara, bool palavat, Vector2 o, float s, float puoli, Color vari)
        {
            var md = mgc.Allocate(maara * 4, maara * 6, tekstuuri);
            var uv = md.uvRegion;
            Color32 tint = vari;
            int n = 0;
            for (int y = 0; y < pisterivit; y++)
            {
                float cy = o.y + (Reuna + y * Jako) * s;
                for (int x = 0; x < sarakkeita; x++)
                {
                    if (tilat[y, x] != palavat) continue;
                    float cx = o.x + (Reuna + x * Jako) * s;
                    md.SetNextVertex(new Vertex { position = new Vector3(cx - puoli, cy - puoli, Vertex.nearZ), tint = tint, uv = new Vector2(uv.xMin, uv.yMax) });
                    md.SetNextVertex(new Vertex { position = new Vector3(cx + puoli, cy - puoli, Vertex.nearZ), tint = tint, uv = new Vector2(uv.xMax, uv.yMax) });
                    md.SetNextVertex(new Vertex { position = new Vector3(cx + puoli, cy + puoli, Vertex.nearZ), tint = tint, uv = new Vector2(uv.xMax, uv.yMin) });
                    md.SetNextVertex(new Vertex { position = new Vector3(cx - puoli, cy + puoli, Vertex.nearZ), tint = tint, uv = new Vector2(uv.xMin, uv.yMin) });
                    ushort i = (ushort)(n * 4);
                    md.SetNextIndex(i); md.SetNextIndex((ushort)(i + 1)); md.SetNextIndex((ushort)(i + 2));
                    md.SetNextIndex(i); md.SetNextIndex((ushort)(i + 2)); md.SetNextIndex((ushort)(i + 3));
                    n++;
                }
            }
        }

        // --- pistetekstuurit ------------------------------------------------------------

        /// <summary>Hehkun ulkosäde pisteen säteinä (web drop-shadow piirrettynä kahtena renkaana 1,3 ja 1,75).</summary>
        const float HehkuSade = 1.75f;
        const int TekstuuriKoko = 64;
        /// <summary>Kiekko täyttää tekstuurin säteelle 31 / 32: nelikulmion puolikas = säde · 32 / 31.</summary>
        const float TekstuuriVara = TekstuuriKoko / 2f / (TekstuuriKoko / 2f - 1f);
        static Texture2D kiekko;
        static readonly Dictionary<(bool, Color), Texture2D> hehkut = new Dictionary<(bool, Color), Texture2D>();

        /// <summary>Peitto etäisyydellä d säteestä R tekstuurin pikseleinä (pehmeä reuna).</summary>
        static float Peitto(float d, float R) => Mathf.Clamp01(R - d + 0.5f);

        static Texture2D UusiTekstuuri(string nimi)
        {
            var t = new Texture2D(TekstuuriKoko, TekstuuriKoko, TextureFormat.RGBA32, true, false)
            { name = nimi, wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Trilinear, hideFlags = HideFlags.DontSave };
            return t;
        }

        /// <summary>Valkoinen kiekko (väri tulee sävytyksestä): sammuneet pisteet.</summary>
        static Texture2D KiekkoTekstuuri()
        {
            if (kiekko != null) return kiekko;
            kiekko = UusiTekstuuri("Pistenaytto.kiekko");
            float k = TekstuuriKoko / 2f, R = k - 1f;
            var px = new Color[TekstuuriKoko * TekstuuriKoko];
            for (int y = 0; y < TekstuuriKoko; y++)
                for (int x = 0; x < TekstuuriKoko; x++)
                    px[y * TekstuuriKoko + x] = new Color(1f, 1f, 1f, Peitto(Vector2.Distance(new Vector2(x + 0.5f, y + 0.5f), new Vector2(k, k)), R));
            kiekko.SetPixels(px);
            kiekko.Apply(true, true);
            return kiekko;
        }

        /// <summary>
        /// Palavan pisteen hehku valmiina värinä: renkaat 1,75 r (peitto 0,16) ja 1,3 r (0,22) hehkun värillä
        /// (kiekko piirretään erikseen päälle).
        /// </summary>
        Texture2D HehkuTekstuuri(bool himmeana, Color lasiVari)
        {
            if (hehkut.TryGetValue((himmeana, lasiVari), out var t) && t != null) return t;
            Color tausta = Suodin(lasiVari), hehku = Suodin(Hehku);
            float a1 = Peitto(0.16f, hehku, tausta), a2 = Peitto(0.22f, hehku, tausta);
            t = UusiTekstuuri("Pistenaytto.hehku");
            float k = TekstuuriKoko / 2f, R = k - 1f, r = R / HehkuSade;
            var px = new Color[TekstuuriKoko * TekstuuriKoko];
            for (int y = 0; y < TekstuuriKoko; y++)
                for (int x = 0; x < TekstuuriKoko; x++)
                {
                    float d = Vector2.Distance(new Vector2(x + 0.5f, y + 0.5f), new Vector2(k, k));
                    // Esikerrottu "over"-sekoitus kahdesta renkaasta, lopuksi suora alfa.
                    Vector3 c = Vector3.zero;
                    float a = 0f;
                    void Paalle(Color v, float peitto)
                    {
                        c = c * (1f - peitto) + new Vector3(v.r, v.g, v.b) * peitto;
                        a = a * (1f - peitto) + peitto;
                    }
                    Paalle(hehku, a1 * Peitto(d, R));
                    Paalle(hehku, a2 * Peitto(d, r * 1.3f));
                    px[y * TekstuuriKoko + x] = a > 0f ? new Color(c.x / a, c.y / a, c.z / a, a) : new Color(hehku.r, hehku.g, hehku.b, 0f);
                }
            t.SetPixels(px);
            t.Apply(true, true);
            hehkut[(himmeana, lasiVari)] = t;
            return t;
        }

        /// <summary>Sammuksissa: saturate(.55) brightness(.86).</summary>
        Color Suodin(Color c)
        {
            if (!himmea) return c;
            float l = 0.2126f * c.r + 0.7152f * c.g + 0.0722f * c.b;
            var d = new Color(l + (c.r - l) * 0.55f, l + (c.g - l) * 0.55f, l + (c.b - l) * 0.55f, c.a);
            return new Color(d.r * 0.86f, d.g * 0.86f, d.b * 0.86f, c.a);
        }

        /// <summary>
        /// Alfa, jolla lineaarinen sekoitus antaa saman tuloksen kuin webin sRGB-sekoitus
        /// (vaalea väri tummalla lasilla näyttäisi muuten paljon kirkkaammalta).
        /// </summary>
        public static float Peitto(float a, Color vari, Color tausta)
        {
            if (QualitySettings.activeColorSpace != ColorSpace.Linear) return a;
            // Kanava, jossa värin ja taustan ero on suurin.
            float v = vari.r, t = tausta.r;
            if (Mathf.Abs(vari.g - tausta.g) > Mathf.Abs(v - t)) { v = vari.g; t = tausta.g; }
            if (Mathf.Abs(vari.b - tausta.b) > Mathf.Abs(v - t)) { v = vari.b; t = tausta.b; }
            float vl = Mathf.GammaToLinearSpace(v), tl = Mathf.GammaToLinearSpace(t);
            if (Mathf.Abs(vl - tl) < 1e-4f) return a;
            float tavoite = Mathf.GammaToLinearSpace(a * v + (1 - a) * t);
            return Mathf.Clamp01((tavoite - tl) / (vl - tl));
        }

        // --- fontti --------------------------------------------------------------------

        /// <summary>Tekstin pistesarakkeet (merkkien väliin yksi tyhjä sarake, viimeisen jälkeen ei).</summary>
        public static List<byte> Sarakkeet(string teksti)
        {
            var tulos = new List<byte>();
            if (string.IsNullOrEmpty(teksti)) return tulos;
            var e = StringInfo.GetTextElementEnumerator(teksti);
            bool eka = true;
            while (e.MoveNext())
            {
                if (!eka) tulos.Add(0);
                eka = false;
                int i = Indeksi(e.GetTextElement());
                for (int x = 0; x < MerkinLeveys; x++) tulos.Add(i < 0 ? (byte)0 : Fontti[i * MerkinLeveys + x]);
            }
            return tulos;
        }

        /// <summary>Tekstin leveys pistesarakkeina (mahtuuko näyttöön).</summary>
        public static int Leveys(string teksti) => Sarakkeet(teksti).Count;

        static int Indeksi(string elementti)
        {
            if (string.IsNullOrEmpty(elementti)) return -1;
            string iso = elementti.ToUpperInvariant();
            if (iso.Length == 1)
            {
                int i = Merkit.IndexOf(iso[0]);
                if (i >= 0) return i;
            }
            // Tarkkeellinen kirjain perusmuotoonsa (É → E); Å Ä Ö löytyivät jo yllä.
            var riisuttu = new StringBuilder();
            foreach (char c in iso.Normalize(NormalizationForm.FormD))
                if (c < '̀' || c > 'ͯ') riisuttu.Append(c);
            return riisuttu.Length == 1 ? Merkit.IndexOf(riisuttu[0]) : -1;
        }

        /// <summary>Fontin merkit (sama järjestys kuin RadioAineisto.PistefontinMerkit).</summary>
        public const string Merkit = "0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ.,-:'()?!/|+·БГДЁЖЗИЙЛПУФЦЧШЩЪЫЬЭЮЯЄЇҐАВЕКМНОРСТХІЅЈ";

        /// <summary>Viisi saraketta per merkki, bitti n = rivi n ylhäältä (web FONTTI).</summary>
        static readonly byte[] Fontti =
        {
                0x3e,0x51,0x49,0x45,0x3e, 0x00,0x42,0x7f,0x40,0x00, 0x42,0x61,0x51,0x49,0x46, 0x21,0x41,0x45,0x4b,0x31, 0x18,0x14,0x12,0x7f,0x10, 0x27,0x45,0x45,0x45,0x39,
                0x3c,0x4a,0x49,0x49,0x30, 0x01,0x71,0x09,0x05,0x03, 0x36,0x49,0x49,0x49,0x36, 0x06,0x49,0x49,0x29,0x1e, 0x00,0x00,0x00,0x00,0x00, 0x7e,0x09,0x09,0x09,0x7e,
                0x7f,0x49,0x49,0x49,0x36, 0x3e,0x41,0x41,0x41,0x22, 0x7f,0x41,0x41,0x41,0x3e, 0x7f,0x49,0x49,0x49,0x41, 0x7f,0x09,0x09,0x09,0x01, 0x3e,0x41,0x49,0x49,0x3a,
                0x7f,0x08,0x08,0x08,0x7f, 0x00,0x41,0x7f,0x41,0x00, 0x20,0x40,0x41,0x3f,0x01, 0x7f,0x08,0x14,0x22,0x41, 0x7f,0x40,0x40,0x40,0x40, 0x7f,0x02,0x04,0x02,0x7f,
                0x7f,0x04,0x08,0x10,0x7f, 0x3e,0x41,0x41,0x41,0x3e, 0x7f,0x09,0x09,0x09,0x06, 0x3e,0x41,0x51,0x21,0x5e, 0x7f,0x09,0x19,0x29,0x46, 0x46,0x49,0x49,0x49,0x31,
                0x01,0x01,0x7f,0x01,0x01, 0x3f,0x40,0x40,0x40,0x3f, 0x1f,0x20,0x40,0x20,0x1f, 0x7f,0x20,0x18,0x20,0x7f, 0x63,0x14,0x08,0x14,0x63, 0x03,0x04,0x78,0x04,0x03,
                0x61,0x51,0x49,0x45,0x43, 0x78,0x14,0x15,0x14,0x78, 0x78,0x15,0x14,0x15,0x78, 0x38,0x45,0x44,0x45,0x38, 0x00,0x60,0x60,0x00,0x00, 0x00,0x40,0x30,0x30,0x00,
                0x08,0x08,0x08,0x08,0x08, 0x00,0x36,0x36,0x00,0x00, 0x00,0x07,0x03,0x00,0x00, 0x00,0x1c,0x22,0x41,0x00, 0x00,0x41,0x22,0x1c,0x00, 0x02,0x01,0x51,0x09,0x06,
                0x00,0x00,0x5f,0x00,0x00, 0x60,0x10,0x08,0x04,0x03, 0x00,0x00,0x7f,0x00,0x00, 0x08,0x08,0x3e,0x08,0x08, 0x00,0x00,0x08,0x00,0x00, 0x7f,0x49,0x49,0x49,0x31,
                0x7f,0x01,0x01,0x01,0x01, 0x60,0x38,0x27,0x21,0x7f, 0x7c,0x55,0x54,0x55,0x44, 0x63,0x14,0x7f,0x14,0x63, 0x22,0x41,0x49,0x49,0x36, 0x7f,0x10,0x08,0x04,0x7f,
                0x7c,0x21,0x11,0x09,0x7c, 0x40,0x3e,0x01,0x01,0x7f, 0x7f,0x01,0x01,0x01,0x7f, 0x43,0x24,0x18,0x04,0x03, 0x1c,0x22,0x7f,0x22,0x1c, 0x3f,0x20,0x20,0x20,0x7f,
                0x07,0x08,0x08,0x08,0x7f, 0x7f,0x40,0x7f,0x40,0x7f, 0x3f,0x20,0x3f,0x20,0x7f, 0x01,0x7f,0x48,0x48,0x30, 0x7f,0x48,0x30,0x00,0x7f, 0x7f,0x48,0x48,0x48,0x30,
                0x22,0x49,0x49,0x49,0x3e, 0x7f,0x08,0x3e,0x41,0x3e, 0x46,0x29,0x19,0x09,0x7f, 0x3e,0x49,0x49,0x41,0x22, 0x00,0x45,0x7c,0x45,0x00, 0x7f,0x01,0x01,0x01,0x02,
                0x7e,0x09,0x09,0x09,0x7e, 0x7f,0x49,0x49,0x49,0x36, 0x7f,0x49,0x49,0x49,0x41, 0x7f,0x08,0x14,0x22,0x41, 0x7f,0x02,0x04,0x02,0x7f, 0x7f,0x08,0x08,0x08,0x7f,
                0x3e,0x41,0x41,0x41,0x3e, 0x7f,0x09,0x09,0x09,0x06, 0x3e,0x41,0x41,0x41,0x22, 0x01,0x01,0x7f,0x01,0x01, 0x63,0x14,0x08,0x14,0x63, 0x00,0x41,0x7f,0x41,0x00,
                0x46,0x49,0x49,0x49,0x31, 0x20,0x40,0x41,0x3f,0x01,
        };
    }
}
