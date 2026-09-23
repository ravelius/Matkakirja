// AVARUUSSUMU (Natiivi-UI): webin js/linssit/astro-sumu.js, avaruussumun
// kalvot (SUMUKERROKSET). Kameran ja pallon VÄLISSÄ oleva epätasainen harso,
// jonka läpi zoomataan: kaksi kalvoa (etu paino 1, 760 pt, ajelehtii
// (5,5; −2,2) pt/s; taka paino 0,72, 1340 pt, (−2,4; 1,3) pt/s), molemmat
// ruutua 20 % isompia ja toistuvia. Peitto tulee Linssiseppältä
// (AstronauttiKerros.SumuKasittelija, Astronauttimatikka.SumunPeitto) ja
// kalvon mittakaava kasvaa lähestyttäessä: mitta = 1 + 1,2 · (1,3 − s) / 1,3,
// s = kameran korkeus / avauskorkeus (webin "tapetti vain vaalenisi" -korjaus).
//
// Kuvio lasketaan kerran ajossa (ei kuvatiedostoja): saumaton hilakohina
// (hila kiertää ympäri, joten toisto ei näy ruudukkona), viisi oktaavia,
// kylmä sinivalkoinen sävy (206, 222, 246), alfassa aukkoja (kynnys 0,34),
// jotta kalvo on repaleinen harso eikä tasainen himmennys. Webin kangas on
// 512², tässä 256² bilineaarisesti venytettynä (harso on joka tapauksessa
// pehmeä). Vähennetty liike: ei ajelehdintaa.
// Kerros 5: 3D-pallon ja sen merkkien päällä, kaiken muun UI:n alla.
using Matkakirja.Linssit.Astronautti;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Avaruussumu
    {
        const int Koko = 256;
        static readonly (float Paino, float KokoPt, Vector2 Nopeus)[] Kalvot =
        {
            (1f, 760f, new Vector2(5.5f, -2.2f)),
            (0.72f, 1340f, new Vector2(-2.4f, 1.3f)),
        };

        static Texture2D kuvio;
        readonly VisualElement juuri;
        readonly VisualElement[] kalvot = new VisualElement[Kalvot.Length];
        float peitto;
        bool kytketty;
        readonly UiKerros kerros;

        public float Peitto => peitto;

        public Avaruussumu(UiKerros kerros)
        {
            this.kerros = kerros;
            juuri = Rakenne.El("mk-astrosumu", kerros.Juuri(LinssiUi.SumuKerros), PickingMode.Ignore);
            juuri.style.display = DisplayStyle.None;
            for (int i = 0; i < Kalvot.Length; i++)
            {
                var k = Rakenne.El("mk-astrosumu__kalvo", juuri, PickingMode.Ignore);
                k.style.backgroundRepeat = new BackgroundRepeat(Repeat.Repeat, Repeat.Repeat);
                k.style.opacity = 0f;
                kalvot[i] = k;
            }
        }

        /// <summary>AstronauttiKerros.SumuKasittelija: peitto 0…1 (0 = pois).</summary>
        public void Aseta(double uusi)
        {
            peitto = Mathf.Clamp01((float)uusi);
            bool nakyy = peitto > 0.001f;
            if (nakyy && kuvio == null)
            {
                kuvio = Laske();
                foreach (var k in kalvot) k.style.backgroundImage = new StyleBackground(kuvio);
            }
            juuri.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (nakyy && !kytketty) { kytketty = true; kerros.JokaRuutu += Paivita; }
            else if (!nakyy && kytketty) { kytketty = false; kerros.JokaRuutu -= Paivita; }
            if (nakyy) Paivita();
        }

        void Paivita()
        {
            // s = korkeus / avauskorkeus; ilman ohjainta (testit) keskimatka.
            var o = LinssiOhjain.Instanssi;
            float s = 0.6f;
            if (o != null && o.KokoPallonKorkeus > 0) s = (float)(o.Kamera.Korkeus / o.KokoPallonKorkeus);
            float kauko = (float)Astronauttimatikka.SumunKauko;
            float mitta = 1f + 1.2f * Mathf.Clamp01((kauko - s) / kauko);
            bool liike = !LinssiUi.VahennettyLiike();
            float t = Time.unscaledTime;
            for (int i = 0; i < kalvot.Length; i++)
            {
                var (paino, kokoPt, nopeus) = Kalvot[i];
                var st = kalvot[i].style;
                st.opacity = peitto * paino;
                float koko = Mathf.Round(kokoPt * mitta);
                st.backgroundSize = new BackgroundSize(new Length(koko), new Length(koko));
                if (!liike) continue;
                st.backgroundPositionX = new BackgroundPosition(BackgroundPositionKeyword.Left, new Length(Mathf.Repeat(t * nopeus.x, koko)));
                st.backgroundPositionY = new BackgroundPosition(BackgroundPositionKeyword.Top, new Length(Mathf.Repeat(t * nopeus.y, koko)));
            }
        }

        // --- kuvio (webin sumupikselit + fraktaalikohina) --------------------------------

        static Texture2D Laske()
        {
            var t = new Texture2D(Koko, Koko, TextureFormat.RGBA32, false)
            {
                name = "Matkakirja avaruussumu",
                wrapMode = TextureWrapMode.Repeat,
                filterMode = FilterMode.Bilinear,
                hideFlags = HideFlags.DontSave,
            };
            var px = new Color32[Koko * Koko];
            const float Kynnys = 0.34f;
            for (int y = 0; y < Koko; y++)
            {
                float v = (y + 0.5f) / Koko;
                for (int x = 0; x < Koko; x++)
                {
                    float u = (x + 0.5f) / Koko;
                    float n = Fraktaali(u, v, 3, 5, 71829, 0.55f);
                    float alfa = Mathf.Pow(Mathf.Clamp01((n - Kynnys) / (1 - Kynnys)), 0.9f);
                    float k = 0.82f + 0.28f * n;
                    px[y * Koko + x] = new Color32(
                        (byte)Mathf.Min(255, Mathf.RoundToInt(206 * k)),
                        (byte)Mathf.Min(255, Mathf.RoundToInt(222 * k)),
                        (byte)Mathf.Min(255, Mathf.RoundToInt(246 * k)),
                        (byte)Mathf.RoundToInt(255 * alfa));
                }
            }
            t.SetPixels32(px);
            t.Apply(false, true);
            return t;
        }

        /// <summary>Saumaton fraktaalikohina 0…1: oktaavit tuplaavat hilan, joka kiertää ympäri.</summary>
        static float Fraktaali(float u, float v, int ruutuja, int oktaaveja, int siemen, float sitkeys)
        {
            float summa = 0, paino = 1, painot = 0;
            int hila = ruutuja;
            for (int o = 0; o < oktaaveja; o++)
            {
                summa += paino * Arvo(u * hila, v * hila, hila, siemen + o * 131);
                painot += paino;
                paino *= sitkeys;
                hila *= 2;
            }
            return painot > 0 ? summa / painot : 0;
        }

        static float Arvo(float x, float y, int hila, int siemen)
        {
            int ix = Mathf.FloorToInt(x), iy = Mathf.FloorToInt(y);
            float fx = x - ix, fy = y - iy;
            fx = fx * fx * (3 - 2 * fx);
            fy = fy * fy * (3 - 2 * fy);
            float a = Solmu(ix, iy, hila, siemen), b = Solmu(ix + 1, iy, hila, siemen);
            float c = Solmu(ix, iy + 1, hila, siemen), d = Solmu(ix + 1, iy + 1, hila, siemen);
            return Mathf.Lerp(Mathf.Lerp(a, b, fx), Mathf.Lerp(c, d, fx), fy);
        }

        /// <summary>Hilan solmuarvo 0…1 (webin hilaArvo: indeksit kierrätetään hilan koolla).</summary>
        static float Solmu(int x, int y, int hila, int siemen)
        {
            x = ((x % hila) + hila) % hila;
            y = ((y % hila) + hila) % hila;
            unchecked
            {
                uint h = (uint)x * 374761393u ^ (uint)y * 668265263u ^ (uint)siemen * 2246822519u;
                h = (h ^ (h >> 13)) * 1274126177u;
                h ^= h >> 16;
                return (h & 0xffffff) / 16777216f;
            }
        }
    }
}
