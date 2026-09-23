// LAUDALLA POMPPIVA NOPPA (Natiivi-UI). Portti webin js/die.js:stä (BoardDie) ja
// css/styles.css:n .die-* -säännöistä; web on totuus, vakiot ja kaavat samat.
//
// Heitto simuloidaan painovoimalla: kaari, kimpoilu pienenevin pompuin, hidastuva
// pyörintä ja lopuksi SETTLE_MS:n kallahdus niin, että heitetty silmäluku on
// ylöspäin (FACE_ROTATION + pieni kallistus, jolloin sivutahkot jäävät näkyviin).
// Korkeus näkyy varjon koossa ja peitossa sekä nopan koossa (scale 1 + z·0,0016).
//
// PIIRTO. USS:ssä ei ole 3D-muunnoksia, joten kuutio lasketaan itse: CSS:n
// rotateZ·rotateX·rotateY (y alaspäin, z katsojaa kohti) ja .board-die:n
// perspective: 900px (origo nopan keskellä). Näkyvät tahkot (backface-visibility:
// hidden → normaali kohti silmää) piirretään verkkona, jonka kärkiväreissä on tahkon
// liukuväri (#f9f1da → #efe0bd → #ddc9a2), sisävarjo oikeassa ja alareunassa,
// kirkkaus (3/4: 0,96, 5/6: 0,9) ja kiiltokerros ruudun tasossa (valo aina vasemmalta
// ylhäältä). Reunaviiva ja musteiset silmät Painter2D:llä omassa lapsessaan, jotta ne
// ovat varmasti verkon päällä ja reunat pehmennettyjä.
//
// LINEAARINEN VÄRIAVARUUS: UI Toolkit sekoittaa läpikuultavat lineaarisesti, jolloin
// tumma varjo vaalealla kartalla näkyisi paljon webiä haaleampana. Varjon alfa
// korjataan: a_lin = 1 − (1 − a_sRGB)^2,2 (tumma vaalean päällä; vrt. Avaruussumu.cs,
// jossa vaalea tumman päällä → a^2,2).
//
// Animaatio pyörii schedule.Execute(...).Every(16) vain heiton ajan; levossa ei
// päivitetä mitään (webin will-change vain heiton ajaksi -periaate).
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Noppa
    {
        // --- webin vakiot (js/die.js) --------------------------------------------------
        static readonly int[][] Silmat =
        {
            null,
            new[] { 4 },
            new[] { 0, 8 },
            new[] { 0, 4, 8 },
            new[] { 0, 2, 6, 8 },
            new[] { 0, 2, 4, 6, 8 },
            new[] { 0, 2, 3, 5, 6, 8 },
        };

        /// <summary>FACE_ROTATION: kierto (x, y asteina), jolla silmäluku kääntyy katsojaan.</summary>
        static readonly Vector2[] TahkoKierto =
        {
            default, new Vector2(0, 0), new Vector2(-90, 0), new Vector2(0, -90),
            new Vector2(0, 90), new Vector2(90, 0), new Vector2(0, 180),
        };

        const float Painovoima = 3400f;      // GRAVITY
        const float Kimmoisuus = 0.45f;      // BOUNCE
        const float Vastus = 0.56f;          // DRAG
        const float PyorintaVaimennus = 0.5f; // SPIN_DAMP
        const float PysahdysNopeus = 60f;    // STOP_SPEED
        const float Nosto = 0.62f;           // LIFT
        const float Asettuminen = 0.43f;     // SETTLE_MS / 1000
        const int HaipyminenMs = 420;        // HAIPYMINEN_MS
        const float Perspektiivi = 900f;     // .board-die perspective

        // Tahkot (FACES): 1 edessä, 6 takana, 3 oikealla, 4 vasemmalla, 2 ylhäällä, 5 alhaalla.
        // Piste tahkolla = N·puolikas + U·u + V·v, (u, v) tahkon omat koordinaatit (y alas).
        readonly struct Tahko
        {
            public readonly int Arvo;
            public readonly Vector3 N, U, V;
            public readonly float Kirkkaus;
            public Tahko(int arvo, Vector3 n, Vector3 u, Vector3 v, float k) { Arvo = arvo; N = n; U = u; V = v; Kirkkaus = k; }
        }

        static readonly Tahko[] Tahkot =
        {
            new Tahko(1, new Vector3(0, 0, 1), new Vector3(1, 0, 0), new Vector3(0, 1, 0), 1f),
            new Tahko(6, new Vector3(0, 0, -1), new Vector3(-1, 0, 0), new Vector3(0, 1, 0), 0.9f),
            new Tahko(3, new Vector3(1, 0, 0), new Vector3(0, 0, -1), new Vector3(0, 1, 0), 0.96f),
            new Tahko(4, new Vector3(-1, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 1, 0), 0.96f),
            new Tahko(2, new Vector3(0, -1, 0), new Vector3(1, 0, 0), new Vector3(0, 0, 1), 1f),
            new Tahko(5, new Vector3(0, 1, 0), new Vector3(1, 0, 0), new Vector3(0, 0, -1), 0.9f),
        };

        // .die-face / .pip / .die-shadow -värit
        static readonly Color Luu0 = new Color32(249, 241, 218, 255);
        static readonly Color Luu1 = new Color32(239, 224, 189, 255);
        static readonly Color Luu2 = new Color32(221, 201, 162, 255);
        static readonly Color SisaVarjo = new Color32(108, 76, 34, 255);
        static readonly Color Reuna = new Color(46 / 255f, 32 / 255f, 17 / 255f, 0.92f);
        static readonly Color Muste = new Color32(63, 45, 24, 255);
        static readonly Color MusteKeski = new Color32(84, 60, 33, 255);
        static readonly Color Kiilto = new Color32(252, 244, 222, 255);
        static readonly Color Patina = new Color32(44, 27, 10, 255);
        static readonly Color VarjoVari = new Color32(44, 27, 10, 255);

        // Silmien ruudukko: padding 12 %, gap 4 % (sisältölaatikosta) → solun keskikohdat
        // ±0,2633 ja silmä 70 % solusta (0,163 tahkon leveydestä).
        const float SoluKeski = 0.2633f;
        const float SilmanKoko = 0.163f;

        const int KulmaPisteet = 5, Rinki = 4;
        const int Reunapisteet = 4 * KulmaPisteet;

        // --- tila -----------------------------------------------------------------------
        readonly VisualElement kerros, pinta, viivat;
        float skaala = 1f;
        bool nakyvissa;
        IVisualElementScheduledItem ajo, haipymisAjastin;

        Vector3 kierto = new Vector3(-22, 26, 0);
        Vector2 paikka;
        float korkeus;

        // käynnissä oleva heitto
        int heittoNro;
        bool heittaa;
        Action valmisOdottaa, laskeutuiK, pomppuK, pysahtyiK, kohinaK;
        Vector2 lahto, kohde;
        float[] hypytV, hypytKesto, osuudet;
        float kokonais, asettuuHetki, matka, kuljettu, hypynAlku;
        int hyppy, kohinaPaikka;
        Vector3 pyorinta, kiertoAlku, kiertoLoppu;
        Vector2 kallistus;
        float neljannes;
        bool asettui, lentoOhi;
        double alkuAika, edellinen, kallistusAlku, loppuAika;
        int tahkoX, tahkoY;

        // piirron välimuistit (yksi heitto kerrallaan, pääsäie)
        readonly Vector2[] reunaLahi = new Vector2[Reunapisteet];
        readonly Vector2[] ruutu = new Vector2[256]; // tahko 81, varjo 181 kärkeä
        readonly Vector2[] silmaPisteet = new Vector2[Reunapisteet];

        public Noppa(VisualElement isa)
        {
            kerros = Rakenne.El("mk-noppa", isa, PickingMode.Ignore);
            pinta = Rakenne.El("mk-noppa__pinta", kerros, PickingMode.Ignore);
            viivat = Rakenne.El("mk-noppa__viivat", kerros, PickingMode.Ignore);
            pinta.generateVisualContent += PiirraPinta;
            viivat.generateVisualContent += PiirraViivat;
            kerros.style.display = DisplayStyle.None;
        }

        public bool Nakyvissa => nakyvissa;

        /// <summary>Webin --die-skaala: kartan mittakaava suhteessa heittohetkeen (1 = heittokoko).</summary>
        public float Skaala
        {
            set
            {
                if (!(value > 0f) || float.IsInfinity(value)) return;
                skaala = value;
                Paivita();
            }
        }

        /// <summary>
        /// Heittää nopan paneelin koordinaateissa (UITK, origo vasen ylä) alusta loppuun;
        /// kutsuu laskeutui (ensimmäinen osuma), pomppu (joka pomppu), valmis (asettunut
        /// silmäluvulleen, webin roll-lupauksen ratkeaminen). vahennettyLiike = true → suoraan
        /// lopputilaan. pysahtyi = webin onSettle (kallahduksen alku, haptiikka), kohina =
        /// webin onTick (7/s ensimmäisen kaaren aikana). Kesken jäänyt edellinen heitto
        /// päätetään ja sen valmis kutsutaan, jottei odottaja jää roikkumaan.
        /// </summary>
        public void Heita(int arvo, Vector2 alku, Vector2 loppu, Action valmis, Action laskeutui = null,
            Action pomppu = null, bool vahennettyLiike = false, Action pysahtyi = null, Action kohina = null)
        {
            Keskeyta()?.Invoke();

            haipymisAjastin?.Pause();
            kerros.RemoveFromClassList("mk-noppa--haipyy");
            kerros.style.display = DisplayStyle.Flex;
            nakyvissa = true;

            var kiertoArvo = TahkoKierto[Mathf.Clamp(arvo, 1, 6)];
            tahkoX = (int)kiertoArvo.x;
            tahkoY = (int)kiertoArvo.y;
            lahto = kerros.WorldToLocal(alku);
            kohde = kerros.WorldToLocal(loppu);

            if (vahennettyLiike)
            {
                kierto = new Vector3(tahkoX - 8, tahkoY + 12, 0);
                paikka = kohde;
                korkeus = 0f;
                Paivita();
                laskeutui?.Invoke();
                pysahtyi?.Invoke();
                valmis?.Invoke();
                return;
            }

            heittoNro++;
            heittaa = true;
            valmisOdottaa = valmis;
            laskeutuiK = laskeutui;
            pomppuK = pomppu;
            pysahtyiK = pysahtyi;
            kohinaK = kohina;

            var d = kohde - lahto;
            matka = d.magnitude;
            // Mitä pidempi heitto, sitä korkeampi kaari — järkevissä rajoissa.
            float huippu = Mathf.Max(130f, Mathf.Min(280f, 90f + matka * 0.34f));
            Hypyt(Mathf.Sqrt(2f * Painovoima * huippu));
            kokonais = 0f;
            foreach (var k in hypytKesto) kokonais += k;

            // Vaakamatka pompuille: ensimmäinen hyppy pisin, loput lyhenevät.
            osuudet = new float[hypytKesto.Length];
            float painoSumma = 0f;
            for (int i = 0; i < osuudet.Length; i++) { osuudet[i] = hypytKesto[i] * Mathf.Pow(Vastus, i); painoSumma += osuudet[i]; }
            for (int i = 0; i < osuudet.Length; i++) osuudet[i] = painoSumma > 0f ? osuudet[i] / painoSumma * matka : 0f;

            pyorinta = new Vector3(
                Merkki() * (640f + UnityEngine.Random.value * 520f),
                Merkki() * (760f + UnityEngine.Random.value * 560f),
                Merkki() * (240f + UnityEngine.Random.value * 280f));
            // Oikea tahko katsojaan ja satunnainen neljänneskierros ruudun tasossa; pieni
            // kallistus jättää sivutahkot näkyviin.
            neljannes = 90f * Mathf.Min(3, Mathf.FloorToInt(UnityEngine.Random.value * 4f));
            kallistus = new Vector2(-11f + UnityEngine.Random.value * 7f, 9f + UnityEngine.Random.value * 8f);

            paikka = lahto;
            korkeus = 0f;
            kuljettu = 0f;
            hyppy = 0;
            hypynAlku = 0f;
            asettui = false;
            lentoOhi = false;
            kohinaPaikka = -1;
            alkuAika = edellinen = Time.realtimeSinceStartupAsDouble;
            // Viimeiselle hetkelle aikaa kallahdukselle oikealle silmäluvulle.
            asettuuHetki = Mathf.Max(hypytKesto[0] * 0.55f, kokonais - Asettuminen);
            Paivita();

            ajo?.Pause();
            ajo = kerros.schedule.Execute(Askel).Every(16);
        }

        /// <summary>Häivyttää nopan pois 420 ms:ssa (uuteen kaupunkiin saavuttaessa).</summary>
        public void Haivyta()
        {
            if (!nakyvissa) return;
            haipymisAjastin?.Pause();
            kerros.AddToClassList("mk-noppa--haipyy");
            haipymisAjastin = kerros.schedule.Execute(() =>
            {
                kerros.style.display = DisplayStyle.None;
                kerros.RemoveFromClassList("mk-noppa--haipyy");
                nakyvissa = false;
            }).StartingIn(HaipyminenMs);
        }

        /// <summary>Piilottaa heti. Kesken heiton valmis kutsutaan (odottaja ei jää roikkumaan).</summary>
        public void Piilota()
        {
            var odottaja = Keskeyta();
            haipymisAjastin?.Pause();
            kerros.RemoveFromClassList("mk-noppa--haipyy");
            kerros.style.display = DisplayStyle.None;
            nakyvissa = false;
            odottaja?.Invoke();
        }

        // --- heiton ajo -------------------------------------------------------------------

        /// <summary>Pysäyttää käynnissä olevan heiton lopputilaan; palauttaa sen valmis-kutsun.</summary>
        Action Keskeyta()
        {
            if (!heittaa) return null;
            heittaa = false;
            heittoNro++;
            ajo?.Pause();
            var v = valmisOdottaa;
            valmisOdottaa = null;
            kierto = new Vector3(tahkoX + kallistus.x, tahkoY + kallistus.y, neljannes);
            paikka = kohde;
            korkeus = 0f;
            Paivita();
            return v;
        }

        static float Merkki() => UnityEngine.Random.value < 0.5f ? -1f : 1f;

        /// <summary>Pompyt: kunkin alkunopeus ja kesto, kunnes vauhti loppuu (BoardDie.hops).</summary>
        void Hypyt(float v0)
        {
            var v = new System.Collections.Generic.List<float>();
            float n = v0;
            while (n > PysahdysNopeus && v.Count < 8) { v.Add(n); n *= Kimmoisuus; }
            if (v.Count == 0) v.Add(v0);
            hypytV = v.ToArray();
            hypytKesto = new float[hypytV.Length];
            for (int i = 0; i < hypytV.Length; i++) hypytKesto[i] = 2f * hypytV[i] / Painovoima;
        }

        void Askel()
        {
            if (!heittaa) { ajo?.Pause(); return; }
            int nro = heittoNro;
            double nyt = Time.realtimeSinceStartupAsDouble;
            float t = (float)Math.Min(kokonais, nyt - alkuAika);
            float dt = Mathf.Min(0.05f, (float)(nyt - edellinen));
            edellinen = nyt;

            if (!lentoOhi)
            {
                while (hyppy < hypytKesto.Length - 1 && t > hypynAlku + hypytKesto[hyppy])
                {
                    hypynAlku += hypytKesto[hyppy];
                    kuljettu += osuudet[hyppy];
                    hyppy++;
                    pyorinta *= PyorintaVaimennus;
                    if (hyppy == 1) laskeutuiK?.Invoke();
                    else pomppuK?.Invoke();
                    if (nro != heittoNro) return;
                }

                float kesto = hypytKesto[hyppy];
                float paikallinen = Mathf.Min(kesto, Mathf.Max(0f, t - hypynAlku));
                korkeus = Mathf.Max(0f, hypytV[hyppy] * paikallinen - 0.5f * Painovoima * paikallinen * paikallinen);

                // Vaakaliike: tasainen pompun sisällä, hidastuu pompusta toiseen.
                float pitkin = kuljettu + osuudet[hyppy] * (kesto > 0f ? paikallinen / kesto : 1f);
                float p = matka > 0f ? Mathf.Min(1f, pitkin / matka) : 1f;
                paikka = lahto + (kohde - lahto) * p;

                int paikkaNyt = Mathf.FloorToInt(t * 7f);
                if (hyppy == 0 && paikkaNyt != kohinaPaikka)
                {
                    kohinaPaikka = paikkaNyt;
                    kohinaK?.Invoke();
                    if (nro != heittoNro) return;
                }

                if (!asettui && t >= asettuuHetki)
                {
                    asettui = true;
                    // Lähin vastaava asento, jotta kallahdus on lyhyt ja luonteva.
                    float lx = tahkoX + kallistus.x, ly = tahkoY + kallistus.y;
                    kiertoAlku = kierto;
                    kiertoLoppu = new Vector3(
                        lx + 360f * Mathf.Round((kierto.x - lx) / 360f),
                        ly + 360f * Mathf.Round((kierto.y - ly) / 360f),
                        neljannes + 360f * Mathf.Round((kierto.z - neljannes) / 360f));
                    kallistusAlku = nyt;
                    pysahtyiK?.Invoke();
                    if (nro != heittoNro) return;
                }
                else if (!asettui)
                {
                    kierto += pyorinta * dt;
                }

                if (t >= kokonais)
                {
                    lentoOhi = true;
                    paikka = kohde;
                    korkeus = 0f;
                    loppuAika = nyt + Asettuminen;
                }
            }

            bool kallistusValmis = true;
            if (asettui)
            {
                float k = Mathf.Clamp01((float)((nyt - kallistusAlku) / Asettuminen));
                kierto = Vector3.LerpUnclamped(kiertoAlku, kiertoLoppu, Kuutiobezier(k));
                kallistusValmis = k >= 1f;
            }
            Paivita();

            if (lentoOhi && nyt >= loppuAika && kallistusValmis)
            {
                var v = Keskeyta();
                v?.Invoke();
            }
        }

        /// <summary>cubic-bezier(0.26, 1.1, 0.4, 1) (webin kallahdussiirtymä, pieni ylitys).</summary>
        static float Kuutiobezier(float x)
        {
            const float x1 = 0.26f, y1 = 1.1f, x2 = 0.4f, y2 = 1f;
            if (x <= 0f) return 0f;
            if (x >= 1f) return 1f;
            float Bx(float s) => ((1 - 3 * x2 + 3 * x1) * s + (3 * x2 - 6 * x1)) * s * s + 3 * x1 * s;
            float By(float s) => ((1 - 3 * y2 + 3 * y1) * s + (3 * y2 - 6 * y1)) * s * s + 3 * y1 * s;
            float lo = 0f, hi = 1f, t = x;
            for (int i = 0; i < 24; i++)
            {
                float bx = Bx(t);
                if (Mathf.Abs(bx - x) < 1e-5f) break;
                if (bx < x) lo = t; else hi = t;
                t = (lo + hi) * 0.5f;
            }
            return By(t);
        }

        void Paivita()
        {
            pinta.MarkDirtyRepaint();
            viivat.MarkDirtyRepaint();
        }

        // --- geometria --------------------------------------------------------------------

        /// <summary>--die-size: clamp(32px, 5,4vmin, 56px) · --die-skaala.</summary>
        float Koko()
        {
            float vmin = 700f;
            var juuri = kerros.panel?.visualTree;
            if (juuri != null)
            {
                float m = Mathf.Min(juuri.layout.width, juuri.layout.height);
                if (!float.IsNaN(m) && m > 0f) vmin = m;
            }
            return Mathf.Clamp(vmin * 0.054f, 32f, 56f) * skaala;
        }

        /// <summary>Kierron ja projektion yhden ruudun tila.</summary>
        struct Projektio
        {
            public Vector3 X, Y, Z; // kiertomatriisin sarakkeet (M = Rz·Rx·Ry, CSS)
            public Vector2 Keski;
            public float Mitta;     // nopan skaala 1 + z·0,0016

            public Vector3 Kierra(Vector3 p) => X * p.x + Y * p.y + Z * p.z;

            /// <summary>Nopan keskeltä mitattu perspektiivipiste ennen lentoskaalaa.</summary>
            public static Vector2 Perspektiivinen(Vector3 p)
            {
                float k = Perspektiivi / Mathf.Max(1f, Perspektiivi - p.z);
                return new Vector2(p.x * k, p.y * k);
            }

            public Vector2 Ruutuun(Vector3 p) => Keski + Mitta * Perspektiivinen(p);
        }

        Projektio Nykyinen()
        {
            float rx = kierto.x * Mathf.Deg2Rad, ry = kierto.y * Mathf.Deg2Rad, rz = kierto.z * Mathf.Deg2Rad;
            float cx = Mathf.Cos(rx), sx = Mathf.Sin(rx), cy = Mathf.Cos(ry), sy = Mathf.Sin(ry), cz = Mathf.Cos(rz), sz = Mathf.Sin(rz);
            // CSS: Rx = [1 0 0; 0 c −s; 0 s c], Ry = [c 0 s; 0 1 0; −s 0 c], Rz = [c −s 0; s c 0; 0 0 1]
            Vector3 M(Vector3 p)
            {
                var a = new Vector3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
                var b = new Vector3(a.x, cx * a.y - sx * a.z, sx * a.y + cx * a.z);
                return new Vector3(cz * b.x - sz * b.y, sz * b.x + cz * b.y, b.z);
            }
            return new Projektio
            {
                X = M(Vector3.right),
                Y = M(Vector3.up),      // (0,1,0) = CSS y alas
                Z = M(Vector3.forward), // (0,0,1) = CSS z katsojaan
                Keski = new Vector2(paikka.x, paikka.y - korkeus * Nosto),
                Mitta = 1f + korkeus * 0.0016f,
            };
        }

        /// <summary>Pyöristetty neliö tahkon koordinaateissa, myötäpäivään (y alas).</summary>
        void Pyoristetty(float puolikas, float sade)
        {
            sade = Mathf.Clamp(sade, 0f, puolikas);
            float k = puolikas - sade;
            var keskukset = new[] { new Vector2(k, -k), new Vector2(k, k), new Vector2(-k, k), new Vector2(-k, -k) };
            int n = 0;
            for (int c = 0; c < 4; c++)
            {
                float a0 = (-90f + 90f * c) * Mathf.Deg2Rad;
                for (int i = 0; i < KulmaPisteet; i++)
                {
                    float a = a0 + (Mathf.PI / 2f) * i / (KulmaPisteet - 1);
                    reunaLahi[n++] = keskukset[c] + sade * new Vector2(Mathf.Cos(a), Mathf.Sin(a));
                }
            }
        }

        static bool Nakyva(in Projektio pr, in Tahko t, float puolikas, out Vector3 keski, out Vector3 u, out Vector3 v)
        {
            var n = pr.Kierra(t.N);
            keski = n * puolikas;
            u = pr.Kierra(t.U);
            v = pr.Kierra(t.V);
            // backface-visibility: hidden — silmä on (0, 0, perspektiivi) nopan keskeltä.
            return n.z * Perspektiivi > puolikas + 0.01f;
        }

        // --- piirto: varjo ja tahkojen pinnat (verkko) ---------------------------------------

        void PiirraPinta(MeshGenerationContext mgc)
        {
            if (!nakyvissa) return;
            float s = Koko();
            PiirraVarjo(mgc, s);

            var pr = Nykyinen();
            float h = s * 0.5f;
            // Pinta reunaviivan keskilinjaan asti: 1,8 px viiva peittää verkon terävän reunan.
            Pyoristetty(h - 0.9f, s * 0.09f - 0.9f);
            foreach (var t in Tahkot)
            {
                if (!Nakyva(pr, t, h, out var keski, out var u, out var v)) continue;
                PiirraTahko(mgc, pr, t, keski, u, v, s);
            }
        }

        void PiirraTahko(MeshGenerationContext mgc, in Projektio pr, in Tahko t, Vector3 keski, Vector3 u, Vector3 v, float s)
        {
            int nv = 1 + Reunapisteet * Rinki;
            int ni = 3 * Reunapisteet + 6 * Reunapisteet * (Rinki - 1);
            var md = mgc.Allocate(nv, ni);
            if (md.vertexCount == 0) return;
            float h = s * 0.5f;

            for (int i = 0; i < nv; i++)
            {
                Vector2 lahi;
                if (i == 0) lahi = Vector2.zero;
                else
                {
                    int r = (i - 1) / Reunapisteet + 1, k = (i - 1) % Reunapisteet;
                    lahi = reunaLahi[k] * ((float)r / Rinki);
                }
                var p = keski + u * lahi.x + v * lahi.y;
                var q = Projektio.Perspektiivinen(p);
                var ruutuP = pr.Keski + pr.Mitta * q;
                ruutu[i] = ruutuP;
                md.SetNextVertex(new Vertex
                {
                    position = new Vector3(ruutuP.x, ruutuP.y, Vertex.nearZ),
                    tint = TahkonVari(lahi, h, s, t.Kirkkaus, q),
                });
            }

            for (int k = 0; k < Reunapisteet; k++)
            {
                int k2 = (k + 1) % Reunapisteet;
                Kolmio(md, 0, 1 + k, 1 + k2);
            }
            for (int r = 1; r < Rinki; r++)
            {
                int sisa = 1 + (r - 1) * Reunapisteet, ulko = 1 + r * Reunapisteet;
                for (int k = 0; k < Reunapisteet; k++)
                {
                    int k2 = (k + 1) % Reunapisteet;
                    Kolmio(md, sisa + k, ulko + k, ulko + k2);
                    Kolmio(md, sisa + k, ulko + k2, sisa + k2);
                }
            }
        }

        /// <summary>Kolmio myötäpäivään ruudulla (y alas), kuten UI Toolkit odottaa.</summary>
        void Kolmio(MeshWriteData md, int a, int b, int c)
        {
            var pa = ruutu[a]; var pb = ruutu[b]; var pc = ruutu[c];
            float risti = (pb.x - pa.x) * (pc.y - pa.y) - (pb.y - pa.y) * (pc.x - pa.x);
            md.SetNextIndex((ushort)a);
            if (risti >= 0f) { md.SetNextIndex((ushort)b); md.SetNextIndex((ushort)c); }
            else { md.SetNextIndex((ushort)c); md.SetNextIndex((ushort)b); }
        }

        /// <summary>
        /// Tahkon väri pisteessä: radial-gradient(circle at 36% 30%, #f9f1da 0, #efe0bd 55%,
        /// #ddc9a2 100%), inset -2px -3px 6px rgba(108,76,34,.22), kirkkaussuodin ja
        /// .die-gloss (soft-light, likiarvona sekoitus) ruudun tasossa.
        /// </summary>
        static Color TahkonVari(Vector2 lahi, float h, float s, float kirkkaus, Vector2 q)
        {
            float fx = (lahi.x + h) / s, fy = (lahi.y + h) / s;
            float d = Mathf.Sqrt((fx - 0.36f) * (fx - 0.36f) + (fy - 0.30f) * (fy - 0.30f)) / 0.9476f;
            Color c = d < 0.55f ? Color.Lerp(Luu0, Luu1, d / 0.55f) : Color.Lerp(Luu1, Luu2, Mathf.Clamp01((d - 0.55f) / 0.45f));

            float oikea = Mathf.Clamp01(1f - (h - lahi.x) / 5f);
            float ala = Mathf.Clamp01(1f - (h - lahi.y) / 6f);
            float varjo = 0.22f * (1f - (1f - oikea) * (1f - ala));
            c = Color.Lerp(c, SisaVarjo, varjo);

            c *= kirkkaus;

            // Kiilto ei pyöri nopan mukana: inset -6 % → 1,12·koko, valo 30 % 24 %, patina 76 % 84 %.
            var g = q / (1.12f * s) + new Vector2(0.5f, 0.5f);
            float valo = 0.22f * Mathf.Clamp01(1f - Vector2.Distance(g, new Vector2(0.30f, 0.24f)) / 0.434f);
            float patina = 0.2f * Mathf.Clamp01(1f - Vector2.Distance(g, new Vector2(0.76f, 0.84f)) / 0.634f);
            c = Color.Lerp(c, Kiilto, valo * 0.6f);
            c = Color.Lerp(c, Patina, patina * 0.5f);
            c.a = 1f;
            return c;
        }

        /// <summary>
        /// .die-shadow: 1,3 × 0,58 kokoinen ellipsi (margin-top 0,32), radial-gradient(ellipse at
        /// 46% 42%, rgba(44,27,10,.8) 0 16%, 0 74%); siirtymä (5 + z·0,08, 5 + z·0,035), skaala
        /// 1 + t·0,9 ja peitto 0,82 − t·0,62, t = min(1, z/240).
        /// </summary>
        void PiirraVarjo(MeshGenerationContext mgc, float s)
        {
            const int Kehat = 5, Sektorit = 36;
            float t = Mathf.Min(1f, korkeus / 240f);
            float sk = 1f + t * 0.9f;
            float peitto = 0.82f - t * 0.62f;
            float w = 1.3f * s * sk, hh = 0.58f * s * sk;
            var keski = new Vector2(paikka.x + 5f + korkeus * 0.08f, paikka.y + 5f + korkeus * 0.035f + 0.32f * s);
            var liukuKeski = keski + new Vector2(-0.04f * w, -0.08f * hh);
            float grx = 0.834f * w, gry = 0.761f * hh; // farthest-corner -ellipsin säteet
            bool lineaarinen = QualitySettings.activeColorSpace == ColorSpace.Linear;

            int nv = 1 + Kehat * Sektorit;
            var md = mgc.Allocate(nv, 3 * Sektorit + 6 * Sektorit * (Kehat - 1));
            if (md.vertexCount == 0) return;
            for (int i = 0; i < nv; i++)
            {
                Vector2 p;
                if (i == 0) p = keski;
                else
                {
                    int r = (i - 1) / Sektorit + 1, k = (i - 1) % Sektorit;
                    float a = 2f * Mathf.PI * k / Sektorit, f = (float)r / Kehat;
                    p = keski + new Vector2(Mathf.Cos(a) * 0.5f * w * f, Mathf.Sin(a) * 0.5f * hh * f);
                }
                var rel = p - liukuKeski;
                float rn = Mathf.Sqrt((rel.x / grx) * (rel.x / grx) + (rel.y / gry) * (rel.y / gry));
                float alfa = rn <= 0.16f ? 0.8f : 0.8f * Mathf.Clamp01((0.74f - rn) / 0.58f);
                alfa *= peitto;
                if (lineaarinen) alfa = 1f - Mathf.Pow(1f - alfa, 2.2f);
                ruutu[i] = p;
                md.SetNextVertex(new Vertex
                {
                    position = new Vector3(p.x, p.y, Vertex.nearZ),
                    tint = new Color(VarjoVari.r, VarjoVari.g, VarjoVari.b, alfa),
                });
            }
            for (int k = 0; k < Sektorit; k++) Kolmio(md, 0, 1 + k, 1 + (k + 1) % Sektorit);
            for (int r = 1; r < Kehat; r++)
            {
                int sisa = 1 + (r - 1) * Sektorit, ulko = 1 + r * Sektorit;
                for (int k = 0; k < Sektorit; k++)
                {
                    int k2 = (k + 1) % Sektorit;
                    Kolmio(md, sisa + k, ulko + k, ulko + k2);
                    Kolmio(md, sisa + k, ulko + k2, sisa + k2);
                }
            }
        }

        // --- piirto: reunaviiva ja silmät (Painter2D) ----------------------------------------

        void PiirraViivat(MeshGenerationContext mgc)
        {
            if (!nakyvissa) return;
            float s = Koko();
            float h = s * 0.5f;
            var pr = Nykyinen();
            var p2 = mgc.painter2D;
            p2.lineJoin = LineJoin.Round;
            p2.lineWidth = 1.8f * pr.Mitta;

            foreach (var t in Tahkot)
            {
                if (!Nakyva(pr, t, h, out var keski, out var u, out var v)) continue;

                // border: 1.8px solid rgba(46,32,17,.92), border-radius 9 %
                Pyoristetty(h - 0.9f, s * 0.09f - 0.9f);
                var reuna = Reuna * t.Kirkkaus;
                reuna.a = Reuna.a;
                p2.strokeColor = reuna;
                p2.BeginPath();
                for (int i = 0; i < Reunapisteet; i++)
                {
                    var q = pr.Ruutuun(keski + u * reunaLahi[i].x + v * reunaLahi[i].y);
                    if (i == 0) p2.MoveTo(q); else p2.LineTo(q);
                }
                p2.ClosePath();
                p2.Stroke();

                foreach (int solu in Silmat[t.Arvo])
                {
                    // .pip rotate(7deg); :nth-child(2n) rotate(-11deg) scale(.96); :nth-child(5n) rotate(19deg) scale(1.04)
                    int lapsi = solu + 1;
                    float kulma = 7f, koko = 1f;
                    if (lapsi % 5 == 0) { kulma = 19f; koko = 1.04f; }
                    else if (lapsi % 2 == 0) { kulma = -11f; koko = 0.96f; }
                    var solukeski = new Vector2((solu % 3 - 1) * SoluKeski * s, (solu / 3 - 1) * SoluKeski * s);
                    float koko2 = SilmanKoko * s * koko;
                    Silma(p2, pr, keski, u, v, solukeski, koko2, kulma, Vector2.zero, 1f, Muste * t.Kirkkaus);
                    // radial-gradient(circle at 44% 38%, #5a4023 …): vaaleampi ydin yläviistoon.
                    Silma(p2, pr, keski, u, v, solukeski, koko2, kulma, new Vector2(-0.06f, -0.12f) * koko2, 0.55f, MusteKeski * t.Kirkkaus);
                }
            }
        }

        // (vaaka, pysty) kulmittain: oikea ylä, oikea ala, vasen ala, vasen ylä
        static readonly Vector2[] SilmaSateet =
        {
            new Vector2(0.48f, 0.55f), new Vector2(0.50f, 0.45f), new Vector2(0.55f, 0.52f), new Vector2(0.52f, 0.48f),
        };
        static readonly Vector2[] KulmaSuunnat = { new Vector2(1, -1), new Vector2(1, 1), new Vector2(-1, 1), new Vector2(-1, -1) };

        /// <summary>Musteella painettu silmä: border-radius 52% 48% 50% 55% / 48% 55% 45% 52%.</summary>
        void Silma(Painter2D p2, in Projektio pr, Vector3 keski, Vector3 u, Vector3 v, Vector2 solukeski, float koko,
            float kulmaAste, Vector2 siirto, float osuus, Color vari)
        {
            const float Tasoitus = 100f / 105f; // alareunan säteet 50 + 55 > 100 % → kaikki kerrotaan
            float P = koko * osuus, puoli = P * 0.5f;
            float ca = Mathf.Cos(kulmaAste * Mathf.Deg2Rad), sa = Mathf.Sin(kulmaAste * Mathf.Deg2Rad);
            int n = 0;
            for (int c = 0; c < 4; c++)
            {
                float rx = SilmaSateet[c].x * Tasoitus * P, ry = SilmaSateet[c].y * Tasoitus * P;
                var ck = new Vector2(KulmaSuunnat[c].x * (puoli - rx), KulmaSuunnat[c].y * (puoli - ry));
                float a0 = (-90f + 90f * c) * Mathf.Deg2Rad;
                for (int i = 0; i < KulmaPisteet; i++)
                {
                    float a = a0 + (Mathf.PI / 2f) * i / (KulmaPisteet - 1);
                    var lp = ck + new Vector2(rx * Mathf.Cos(a), ry * Mathf.Sin(a)) + siirto;
                    // CSS rotate(θ): myötäpäivään ruudulla (y alas)
                    var kp = new Vector2(lp.x * ca - lp.y * sa, lp.x * sa + lp.y * ca) + solukeski;
                    silmaPisteet[n++] = pr.Ruutuun(keski + u * kp.x + v * kp.y);
                }
            }
            vari.a = 1f;
            p2.fillColor = vari;
            p2.BeginPath();
            p2.MoveTo(silmaPisteet[0]);
            for (int i = 1; i < n; i++) p2.LineTo(silmaPisteet[i]);
            p2.ClosePath();
            p2.Fill();
        }
    }
}
