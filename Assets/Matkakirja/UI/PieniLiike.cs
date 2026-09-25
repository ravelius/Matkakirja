// PIENI LIIKE KARTALLE (Natiivi-UI): webin js/kartta-liike.js (Fable 21.9.2026) UI Toolkit
// -kerroksena pallon päällä, kaiken muun UI:n alla (kerros 10), ei osumia. Pallon piirtoa ei
// herätetä: kerros elää UITK:ssa ja päivittyy vain lennon ajan.
//
//   a) PULU LENTÄÄ HARVOIN KARTAN YLI: levossa kerran 60–120 s välein 2 s suora lento
//      reunasta reunaan (siluetti ylhäältä, 26 pt, siivet läpättävät 260 ms), peitto 0,72.
//   b) ILLAN SÄVY vuorokaudenajan mukaan (pelin Matka.Tila.Vuorokaudenaika): aamu viileä
//      rgb(120,150,200) 0,07, ilta lämmin rgb(232,150,70) 0,09, yö sinertävä rgb(40,60,130)
//      0,12, keskipäivä ei mitään; vaihto pehmeästi 2 s.
//      Web sekoittaa sävyn mix-blend-mode: multiply -tilassa (kartta vain tummuu hieman). UI Toolkitissa ei ole
//      multiplyä, ja tavallinen alfasekoitus lineaarisessa väriavaruudessa LISÄSI tummaan karttaan valoa: aamun
//      sävy toi keksintölinssin kartalle sinisen lisän (0,015; 0,022; 0,038), Linssisepän mittaus 24.9. Nyt kerros
//      on musta, ja peitto on multiplyn luminanssikerroin lineaarisena: 1 − Σ w·(1 − a·(1 − c))^2,2. Kirkkaus
//      vastaa webiä; heikko värivivahde (kerroin 0,92–0,98 kanavittain) jää pois. Linssin ollessa auki sävyä ei ole
//      (webissä linssin kartta peittää pallolaudan sävykerroksen).
// Pilven varjo on poistettu webistä (omistaja 22.9.2026), joten sitä ei tehdä.
//
// LEPO: Natiivisepän PalloKierto.Levossa (ei liikettä eikä peittoa), ei avointa näkymää
// (SyoteLukko), ei linssiä eikä aloitusnäkymää. Tila luetaan kerran sekunnissa (web
// LEPOVAHDIN_MS). Kytkin: päävalikko → Pieni liike (Asetukset.Kytkin.PieniLiike, oletus päällä).
using System;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class PieniLiike
    {
        public const int Kerros = 10;
        const float ValiMinS = 60f, ValiMaxS = 120f, LentoS = 2f, KokoPt = 26f, SiipiS = 0.26f;

        readonly VisualElement juuri, savy;
        readonly PulunSiluetti pulu;
        readonly System.Random arpa = new System.Random();
        PalloKierto kierto;
        float seuraavaLento;
        bool lennossa, paalla;
        string savyNyt;

        public int Lentoja { get; private set; }

        public PieniLiike(UiKerros ui)
        {
            juuri = Rakenne.El("mk-liike", ui.Juuri(Kerros), PickingMode.Ignore);
            savy = Rakenne.El("mk-liike__savy", juuri, PickingMode.Ignore);
            pulu = new PulunSiluetti();
            pulu.AddToClassList("mk-liike__pulu");
            juuri.Add(pulu);
            AjastaLento();
            juuri.schedule.Execute(Vahdi).Every(1000);
            Asetukset.Muuttui += _ => Vahdi();
        }

        bool Levossa()
        {
            kierto ??= UnityEngine.Object.FindAnyObjectByType<PalloKierto>();
            if (kierto != null && !kierto.Levossa) return false;
            if (SyoteLukko.Estetty) return false;
            if (LinssiUi.Rekisteri?.Auki != null) return false;
            var n = UiNakymat.Olemassa ? UiNakymat.Hae() : null;
            if (n == null || n.Aloitus.Auki || n.Kaupunkikortti.Auki) return false;
            return juuri.resolvedStyle.width > 0;
        }

        void AjastaLento() =>
            seuraavaLento = Time.realtimeSinceStartup + ValiMinS + (float)arpa.NextDouble() * (ValiMaxS - ValiMinS);

        void Vahdi()
        {
            paalla = Asetukset.Paalla(Kytkin.PieniLiike);
            juuri.style.display = paalla ? DisplayStyle.Flex : DisplayStyle.None;
            PaivitaSavy();
            if (!paalla) { AjastaLento(); return; }
            if (!lennossa && Time.realtimeSinceStartup >= seuraavaLento)
            {
                // Ei levossa: uusi arpa, lento ei jää jonoon kortin taakse (web ajastaPulu).
                Lenna();
                AjastaLento();
            }
        }

        void PaivitaSavy()
        {
            // Linssin aikana ei sävyä: webissä linssin kartta piirtyy pallolaudan (ja sen sävykerroksen) päälle.
            bool linssi = LinssiUi.Rekisteri?.Auki != null;
            var aika = paalla && !linssi ? PeliOhjain.Instanssi?.Matka?.Tila.Vuorokaudenaika() : null;
            (Color vari, float peitto) = aika switch
            {
                Vuorokaudenaika.Aamu => ((Color)new Color32(120, 150, 200, 255), 0.07f),
                Vuorokaudenaika.Ilta => ((Color)new Color32(232, 150, 70, 255), 0.09f),
                Vuorokaudenaika.Yo => ((Color)new Color32(40, 60, 130, 255), 0.12f),
                _ => (Color.clear, 0f),
            };
            string avain = aika?.ToString();
            if (avain == savyNyt) return;
            savyNyt = avain;
            savy.style.backgroundColor = Color.black;
            savy.style.opacity = peitto > 0 ? MultiplynPeitto(vari, peitto) : 0f;
        }

        /// <summary>
        /// Web multiply (sRGB-kerroin 1 − a·(1 − c) kanavittain) mustana alfakerroksena: peitto = 1 − luminanssi
        /// lineaarisista kertoimista (Rec. 709 -painot), eli kartta tummuu yhtä paljon kuin webissä eikä saa lisävaloa.
        /// </summary>
        static float MultiplynPeitto(Color srgb, float a)
        {
            float K(float c) => Mathf.Pow(1f - a * (1f - c), 2.2f);
            float luminanssi = 0.2126f * K(srgb.r) + 0.7152f * K(srgb.g) + 0.0722f * K(srgb.b);
            return Mathf.Clamp01(1f - luminanssi);
        }

        /// <summary>Pulu lentää kerran reunasta reunaan (myös testikomento). false = ei levossa.</summary>
        public bool Lenna(bool pakota = false)
        {
            if (lennossa || !paalla || (!pakota && !Levossa())) return false;
            float w = juuri.resolvedStyle.width, h = juuri.resolvedStyle.height;
            if (float.IsNaN(w) || w <= 0 || h <= 0) return false;
            bool vasemmalta = arpa.NextDouble() < 0.5;
            float y0 = h * (0.2f + (float)arpa.NextDouble() * 0.5f);
            float y1 = y0 + ((float)arpa.NextDouble() - 0.5f) * h * 0.3f;
            float x0 = vasemmalta ? -KokoPt * 2 : w + KokoPt * 2, x1 = vasemmalta ? w + KokoPt * 2 : -KokoPt * 2;
            float kulma = Mathf.Atan2(y1 - y0, x1 - x0) * Mathf.Rad2Deg + 90f;
            pulu.style.rotate = new Rotate(new Angle(kulma));
            pulu.style.opacity = 0.72f;
            lennossa = true;
            Lentoja++;
            float alku = Time.realtimeSinceStartup;
            IVisualElementScheduledItem ajo = null;
            ajo = pulu.schedule.Execute(() =>
            {
                Ruudunpaivitys.Herata(0.1f); // lämpö: täysi taajuus animaation ajan
                float t = (Time.realtimeSinceStartup - alku) / LentoS;
                // Lepo katkesi (kortti aukesi, kamera liikkui): lento loppuu heti.
                if (t >= 1f || !Levossa() && !pakota)
                {
                    lennossa = false;
                    pulu.style.opacity = 0f;
                    ajo.Pause();
                    return;
                }
                pulu.style.translate = new Translate(Mathf.Lerp(x0, x1, t) - KokoPt / 2, Mathf.Lerp(y0, y1, t) - KokoPt * 0.375f);
                pulu.Siipi = 0.25f + 0.75f * Mathf.Abs(Mathf.Cos((Time.realtimeSinceStartup - alku) * Mathf.PI / SiipiS));
            }).Every(16);
            return true;
        }

        /// <summary>Pulun siluetti ylhäältä (web pulunSvg viewBox -16 -12 32 24): siivet, runko ja pyrstö.</summary>
        sealed class PulunSiluetti : VisualElement
        {
            float siipi = 1f;
            public float Siipi { set { siipi = value; MarkDirtyRepaint(); } }

            public PulunSiluetti()
            {
                pickingMode = PickingMode.Ignore;
                style.position = Position.Absolute;
                style.width = KokoPt;
                style.height = KokoPt * 0.75f;
                style.opacity = 0f;
                generateVisualContent += Piirra;
            }

            void Piirra(MeshGenerationContext mgc)
            {
                var r = contentRect;
                if (r.width <= 0) return;
                float s = r.width / 32f;
                Vector2 P(float x, float y) => new Vector2((x + 16f) * s, (y + 12f) * s);
                Vector2 S(float x, float y) => P(x, y * siipi); // siiven läpätys: scaleY origosta
                var p = mgc.painter2D;
                p.fillColor = new Color32(0x2a, 0x24, 0x1c, 255);
                foreach (float suunta in new[] { -1f, 1f })
                {
                    p.BeginPath();
                    p.MoveTo(S(0, -1));
                    p.BezierCurveTo(S(5 * suunta, -9), S(11 * suunta, -11), S(15 * suunta, -9));
                    p.BezierCurveTo(S(12 * suunta, -6), S(7 * suunta, -2), S(0, 1));
                    p.ClosePath();
                    p.Fill();
                }
                p.BeginPath();
                p.MoveTo(P(-1.6f, -5));
                p.BezierCurveTo(P(0, -7), P(1.6f, -5), P(1.6f, -3));
                p.LineTo(P(1.4f, 4));
                p.BezierCurveTo(P(1, 6.5f), P(-1, 6.5f), P(-1.4f, 4));
                p.ClosePath();
                p.Fill();
                p.BeginPath();
                p.MoveTo(P(-2.4f, 3.5f));
                p.LineTo(P(2.4f, 3.5f));
                p.LineTo(P(1.6f, 8.5f));
                p.LineTo(P(-1.6f, 8.5f));
                p.ClosePath();
                p.Fill();
            }
        }
    }
}
