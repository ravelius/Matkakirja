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
// Piirto generateVisualContent + Painter2D; rivi kerrallaan omana täyttönään, jotta
// yksi mesh ei kasva liian suureksi (1425 pistettä). Lineaarinen väriavaruus: himmeät
// alfat korjataan niin, että tulos vastaa webin sRGB-sekoitusta tummalla lasilla.
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

        bool JokinVierii() { foreach (var r in rivit) if (r.Vierii) return true; return false; }

        public void Pysayta()
        {
            ajastin?.Pause();
            ajastin = null;
        }

        void Askel()
        {
            if (panel == null) { Pysayta(); return; }
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
            var p = mgc.painter2D;
            Color muste = Suodin(Muste), tausta = Suodin(lasi), hehku = Suodin(Hehku);
            var sammunut = muste; sammunut.a = Peitto(SammunutPeitto, muste, tausta);
            var h1 = hehku; h1.a = Peitto(0.16f, hehku, tausta);
            var h2 = hehku; h2.a = Peitto(0.22f, hehku, tausta);
            float r = Sade * s;
            for (int y = 0; y < pisterivit; y++)
            {
                float cy = o.y + (Reuna + y * Jako) * s;
                // Hehku (kaksi rengasta) palavien alle, sitten sammuneet ja palavat.
                Tayta(p, y, cy, o.x, s, true, r * 1.75f, h1);
                Tayta(p, y, cy, o.x, s, true, r * 1.3f, h2);
                Tayta(p, y, cy, o.x, s, false, r, sammunut);
                Tayta(p, y, cy, o.x, s, true, r, muste);
            }
        }

        void Tayta(Painter2D p, int y, float cy, float x0, float s, bool palavat, float sade, Color vari)
        {
            bool jotain = false;
            p.BeginPath();
            for (int x = 0; x < sarakkeita; x++)
            {
                if (tilat[y, x] != palavat) continue;
                var c = new Vector2(x0 + (Reuna + x * Jako) * s, cy);
                p.MoveTo(c + new Vector2(sade, 0));
                p.Arc(c, sade, Angle.Degrees(0f), Angle.Degrees(360f));
                p.ClosePath();
                jotain = true;
            }
            if (!jotain) return;
            p.fillColor = vari;
            p.Fill();
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
