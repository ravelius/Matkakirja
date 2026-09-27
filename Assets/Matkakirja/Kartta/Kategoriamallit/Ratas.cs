using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI RATAS (tekniikka), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        static readonly Color RaPinta = Ramppi(0xf1e7d0), RaKylki = Ramppi(0xd8c6a0), RaSisa = Ramppi(0xa98a5e), RaPuola = Ramppi(0xebdfc4),
            RaPuolaKylki = Ramppi(0xbfa37a), RaNapa = Ramppi(0xf4ecd9), RaNapaKylki = Ramppi(0x9c7d54), RaAkseli = Ramppi(0x3b2f22);
        static readonly Color RaKattila = Ramppi(0xc9aa7a), RaKoppi = Ramppi(0xcfb283), RaKatto = Ramppi(0x94784f), RaPiippu = Ramppi(0x6b563b),
            RaKupu = Ramppi(0xdcc190), RaPyora = Ramppi(0x5e4a33), RaRunko = Ramppi(0x7d6647), RaMuste = Ramppi(0x3b2f22), RaAura = Ramppi(0x8f7450), RaPyoraPinta = Ramppi(0xb09068);

        /// <summary>Rattaan kallistus taaksepäin (°): pystyssä oleva ratas näkyisi ruudun keskellä (suoraan ylhäältä) pelkkänä
        /// viivana, joten se nojaa taakse ja kasvot näkyvät kaikilla kallistuksilla.</summary>
        const float RaKallistus = 25f;
        /// <summary>Rattaan säteet (hampaan kärki, hammaspohja, kehän sisäreuna) ja kehän puolisyvyys.</summary>
        const float RaRt = 0.43f, RaRr = 0.355f, RaRi = 0.29f, RaSyv = 0.045f;

        /// <summary>
        /// TEKNIIKKA: hammasratas ja höyryveturi (merkki-tekniikka.png oikeana 3D-esineenä). Kahdeksanhampainen ratas
        /// (halkaisija 0,86, kehä ja hampaat 0,09 paksuja, kuusi kapenevaa puolaa, napa ja tumma akselinreikä) seisoo
        /// hampaallaan ja nojaa 25° taaksepäin; sen alaosan edessä maassa pieni veturi sivuttain (ohjaamo vasemmalla,
        /// kattila, höyrykupu, levenevä savupiippu ja aura oikealla, kaksi isoa ja kaksi pientä pyörää kummallakin kyljellä,
        /// kytkintanko). Veturi tummempi kuin vaalea ratas, joten ne erottuvat ilman ääriviivaa. Ylhäältä: rattaan kasvot
        /// loivasti ja veturi sen edessä. Ääriviivaosat: ratas ja veturi. LOD1 (≤ 200): kahdeksankulmainen kehä, kolme
        /// läpimenevää puolaa, veturi kolmena laatikkona.
        /// </summary>
        static void RatasOsat(Rakentaja r, bool lod1)
        {
            float fi = RaKallistus * Mathf.Deg2Rad, cf = Mathf.Cos(fi), sf = Mathf.Sin(fi);
            // Rattaan etureuna alhaalla on (Rt·sin + d·cos) keskipisteen edessä; veturin keskiviiva 0,03 sen edessä, joten veturin
            // takaosa peittää alimman hampaan (kuten kuvamerkissä veturi rattaan alaosan edessä).
            float etu = RaRt * sf + RaSyv * cf, zR = 0.06f, zV = zR - etu - 0.03f;
            // Alin kohta: alimman hampaan kärkisärmän takareuna (kärki on suora särmä ±8°, joten Rt·cos 8°) maassa.
            var o = new Vector3(0f, RaRt * Mathf.Cos(8f * Mathf.Deg2Rad) * cf + RaSyv * sf, zR);
            Vector3 M(float x, float y, float z) => o + new Vector3(x, y * cf - z * sf, y * sf + z * cf);
            Vector3 S(Vector3 v) => new Vector3(v.x, v.y * cf - v.z * sf, v.y * sf + v.z * cf);

            r.AloitaOsa();
            RaKeha(r, M, S, lod1);
            RaPuolat(r, M, S, lod1);
            r.LopetaOsa();

            r.AloitaOsa();
            if (lod1) RaVeturiLod1(r, zV); else RaVeturi(r, zV);
            r.LopetaOsa();
        }

        /// <summary>Kehä ja hampaat: rengas (LOD0 16 kärkeä hammaspohjan kulmissa, LOD1 kahdeksankulmio raon keskellä) ja sen
        /// päällä kahdeksan puolisuunnikashammasta; etu- ja takapinta, ulko- ja sisäseinä.</summary>
        static void RaKeha(Rakentaja r, Func<float, float, float, Vector3> M, Func<Vector3, Vector3> S, bool lod1)
        {
            const int nH = 8;
            float jakso = Mathf.PI * 2f / nH, aR = 11.5f * Mathf.Deg2Rad, aT = 8f * Mathf.Deg2Rad, d = RaSyv;
            // Renkaan ulkokärjet: LOD0 hampaan juurikulmissa (hampaan pohja = renkaan sivu), LOD1 rakojen keskellä.
            int nk = lod1 ? nH : nH * 2;
            var kulma = new float[nk];
            for (int k = 0; k < nH; k++)
            {
                float th = Mathf.PI * 0.5f + k * jakso;
                if (lod1) kulma[k] = th + jakso * 0.5f;
                else { kulma[2 * k] = th - aR; kulma[2 * k + 1] = th + aR; }
            }
            float ro = lod1 ? 0.36f : RaRr, ri = RaRi;
            Vector2 P(float a, float rr) => new Vector2(Mathf.Cos(a) * rr, Mathf.Sin(a) * rr);
            var back = S(Vector3.back); var fwd = S(Vector3.forward);
            for (int i = 0; i < nk; i++)
            {
                int j = (i + 1) % nk;
                Vector2 o0 = P(kulma[i], ro), o1 = P(kulma[j], ro), i0 = P(kulma[i], ri), i1 = P(kulma[j], ri);
                foreach (float z in new[] { -d, d })
                    r.NelioUlos(M(i0.x, i0.y, z), M(o0.x, o0.y, z), M(o1.x, o1.y, z), M(i1.x, i1.y, z), z < 0f ? back : fwd, RaPinta);
                // Ulkoseinä (LOD0: vain raon pohja, hampaan kohdalla seinä on hampaan sisällä) ja sisäseinä.
                if (lod1 || i % 2 == 1) RaSeina(r, M, S, o0, o1, d, true, RaKylki);
                RaSeina(r, M, S, i0, i1, d, false, RaSisa);
            }
            for (int k = 0; k < nH; k++)
            {
                float th = Mathf.PI * 0.5f + k * jakso;
                // Hampaan juuri renkaan sivulla (LOD1: kahdeksankulmion sivun suoralla).
                float rj = lod1 ? ro * Mathf.Cos(jakso * 0.5f) / Mathf.Cos(aR) : ro;
                Vector2 r0 = P(th - aR, rj), t0 = P(th - aT, RaRt), t1 = P(th + aT, RaRt), r1 = P(th + aR, rj);
                foreach (float z in new[] { -d, d })
                    r.NelioUlos(M(r0.x, r0.y, z), M(t0.x, t0.y, z), M(t1.x, t1.y, z), M(r1.x, r1.y, z), z < 0f ? back : fwd, RaPinta);
                RaSeina(r, M, S, r0, t0, d, true, RaKylki);
                RaSeina(r, M, S, t0, t1, d, true, RaKylki);
                RaSeina(r, M, S, t1, r1, d, true, RaKylki);
            }
        }

        /// <summary>Seinä rattaan tasossa pisteestä a pisteeseen b (vastapäivään), syvyys ±d; ulos = poispäin keskeltä.</summary>
        static void RaSeina(Rakentaja r, Func<float, float, float, Vector3> M, Func<Vector3, Vector3> S, Vector2 a, Vector2 b, float d, bool ulos, Color vari)
        {
            var n = new Vector3(b.y - a.y, a.x - b.x, 0f);
            if (!ulos) n = -n;
            r.NelioUlos(M(a.x, a.y, -d), M(b.x, b.y, -d), M(b.x, b.y, d), M(a.x, a.y, d), S(n), vari);
        }

        /// <summary>Puolat ja napa: LOD0 kuusi kapenevaa puolaa (ohuemmat kuin kehä), kahdeksankulmainen napa ja tumma
        /// akselinreikä kummallakin puolella; LOD1 kolme läpimenevää tankoa.</summary>
        static void RaPuolat(Rakentaja r, Func<float, float, float, Vector3> M, Func<Vector3, Vector3> S, bool lod1)
        {
            float ds = 0.026f, r1 = RaRi + 0.012f;
            var back = S(Vector3.back); var fwd = S(Vector3.forward);
            int n = lod1 ? 3 : 6;
            for (int j = 0; j < n; j++)
            {
                float a = Mathf.PI * 0.5f + j * Mathf.PI * 2f / 6f;
                var u = new Vector2(Mathf.Cos(a), Mathf.Sin(a)); var v = new Vector2(-u.y, u.x);
                float r0 = lod1 ? -r1 : 0.06f, w0 = lod1 ? 0.028f : 0.036f, w1 = lod1 ? 0.028f : 0.025f;
                Vector2 A = u * r0 - v * w0, B = u * r0 + v * w0, C = u * r1 + v * w1, D = u * r1 - v * w1;
                foreach (float z in new[] { -ds, ds })
                    r.NelioUlos(M(A.x, A.y, z), M(B.x, B.y, z), M(C.x, C.y, z), M(D.x, D.y, z), z < 0f ? back : fwd, RaPuola);
                r.NelioUlos(M(A.x, A.y, -ds), M(D.x, D.y, -ds), M(D.x, D.y, ds), M(A.x, A.y, ds), S(new Vector3(-v.x, -v.y, 0f)), RaPuolaKylki);
                r.NelioUlos(M(B.x, B.y, -ds), M(C.x, C.y, -ds), M(C.x, C.y, ds), M(B.x, B.y, ds), S(new Vector3(v.x, v.y, 0f)), RaPuolaKylki);
            }
            if (lod1) return;
            // Napa: kahdeksankulmainen lieriö rattaan akselilla, ja akselinreikä tummana kuusikulmiona kummallakin puolella.
            const int nn = 8; const float rn = 0.1f, dn = 0.06f;
            for (int i = 0; i < nn; i++)
            {
                float a0 = i * Mathf.PI * 2f / nn, a1 = (i + 1) * Mathf.PI * 2f / nn;
                Vector2 p0 = new Vector2(Mathf.Cos(a0) * rn, Mathf.Sin(a0) * rn), p1 = new Vector2(Mathf.Cos(a1) * rn, Mathf.Sin(a1) * rn);
                RaSeina(r, M, S, p0, p1, dn, true, RaNapaKylki);
                if (i > 0 && i < nn - 1)
                    foreach (float z in new[] { -dn, dn })
                        r.KolmioUlos(M(rn, 0f, z), M(p0.x, p0.y, z), M(p1.x, p1.y, z), z < 0f ? back : fwd, RaNapa);
            }
            foreach (float z in new[] { -dn - 0.002f, dn + 0.002f })
                for (int i = 1; i < 5; i++)
                {
                    float a0 = i * Mathf.PI / 3f, a1 = (i + 1) * Mathf.PI / 3f;
                    const float ra = 0.042f;
                    r.KolmioUlos(M(ra, 0f, z), M(Mathf.Cos(a0) * ra, Mathf.Sin(a0) * ra, z), M(Mathf.Cos(a1) * ra, Mathf.Sin(a1) * ra, z), z < 0f ? back : fwd, RaAkseli);
                }
        }

        /// <summary>Veturi sivuttain x-akselin suuntaan (ohjaamo −x, savupiippu ja aura +x), keskellä z = zv, maassa.</summary>
        static void RaVeturi(Rakentaja r, float zv)
        {
            // Alusta (tumma, pyörien välissä) ja kehys.
            r.Laatikko(new Vector3(-0.03f, 0.03f, zv), new Vector3(0.5f, 0.05f, 0.1f), RaRunko, RaRunko);
            r.Laatikko(new Vector3(-0.035f, 0.08f, zv), new Vector3(0.6f, 0.024f, 0.158f), RaRunko, RaRunko);
            // Kattila x-akselin suuntaan, etupääty (savukammion ovi) tumma.
            RaLieriX(r, -0.14f, 0.21f, 0.166f, zv, 0.062f, 8, RaKattila, RaPiippu);
            // Savupiippu: kapeneva varsi ja leveä suppilo; höyrykupu.
            RaSorvi(r, new Vector3(0.158f, 0.21f, zv), new[] { (0.024f, 0f), (0.02f, 0.07f), (0.045f, 0.112f), (0f, 0.112f) }, 6, j => j == 2 ? RaMuste : RaPiippu);
            RaSorvi(r, new Vector3(0.015f, 0.215f, zv), new[] { (0.03f, 0f), (0.029f, 0.028f), (0f, 0.05f) }, 6, _ => RaKupu);
            // Ohjaamo ja katto, ikkunat kummallakin kyljellä.
            r.Laatikko(new Vector3(-0.225f, 0.104f, zv), new Vector3(0.19f, 0.19f, 0.15f), RaKoppi, RaKoppi);
            r.Laatikko(new Vector3(-0.225f, 0.294f, zv), new Vector3(0.22f, 0.02f, 0.176f), RaKatto, RaKatto);
            foreach (float s in new[] { -1f, 1f })
                foreach (float wx in new[] { -0.272f, -0.19f })
                {
                    float z = zv + s * 0.0765f;
                    r.NelioUlos(new Vector3(wx - 0.027f, 0.2f, z), new Vector3(wx + 0.027f, 0.2f, z), new Vector3(wx + 0.027f, 0.262f, z),
                        new Vector3(wx - 0.027f, 0.262f, z), new Vector3(0f, 0f, s), RaMuste);
                }
            // Aura (lumiaura) keulassa: kiila.
            {
                float x0 = 0.235f, x1 = 0.318f, y0 = 0.082f, zz = 0.066f;
                var k = new Vector3((x0 + x1) * 0.5f, 0.03f, zv);
                Vector3 a0 = new Vector3(x0, y0, zv - zz), a1 = new Vector3(x0, y0, zv + zz), b0 = new Vector3(x1, 0.004f, zv - zz), b1 = new Vector3(x1, 0.004f, zv + zz);
                Vector3 c0 = new Vector3(x0, 0.004f, zv - zz), c1 = new Vector3(x0, 0.004f, zv + zz);
                r.NelioKeskelta(a0, a1, b1, b0, k, RaAura);
                r.KolmioKeskelta(a0, b0, c0, k, RaAura);
                r.KolmioKeskelta(a1, b1, c1, k, RaAura);
            }
            // Pyörät kummallakin kyljellä: kaksi isoa vetopyörää ja kaksi pientä etupyörää, kytkintanko isojen välillä.
            foreach (float s in new[] { -1f, 1f })
            {
                float z = zv + s * 0.068f;
                RaPyoraZ(r, new Vector3(-0.215f, 0.068f, z), 0.068f, 0.009f, s, 8);
                RaPyoraZ(r, new Vector3(-0.06f, 0.068f, z), 0.068f, 0.009f, s, 8);
                RaPyoraZ(r, new Vector3(0.09f, 0.042f, z), 0.042f, 0.009f, s, 6);
                RaPyoraZ(r, new Vector3(0.19f, 0.042f, z), 0.042f, 0.009f, s, 6);
                float zt = z + s * 0.012f;
                var kt = new Vector3(-0.1375f, 0.05f, z);
                Vector3 p0 = new Vector3(-0.23f, 0.043f, zt), p1 = new Vector3(-0.045f, 0.043f, zt), p2 = new Vector3(-0.045f, 0.057f, zt), p3 = new Vector3(-0.23f, 0.057f, zt);
                r.NelioUlos(p0, p1, p2, p3, new Vector3(0f, 0f, s), RaMuste);
                r.NelioUlos(p3, p2, p2 - new Vector3(0f, 0f, s * 0.006f), p3 - new Vector3(0f, 0f, s * 0.006f), Vector3.up, RaMuste);
            }
        }

        /// <summary>LOD1-veturi: runko ja kattila yhtenä laatikkona, ohjaamo ja savupiippu.</summary>
        static void RaVeturiLod1(Rakentaja r, float zv)
        {
            r.Laatikko(new Vector3(0.05f, 0f, zv), new Vector3(0.38f, 0.22f, 0.13f), RaKattila, RaKattila);
            r.Laatikko(new Vector3(-0.225f, 0f, zv), new Vector3(0.19f, 0.31f, 0.156f), RaKoppi, RaKatto);
            r.Laatikko(new Vector3(0.158f, 0.22f, zv), new Vector3(0.05f, 0.105f, 0.05f), RaPiippu, RaMuste);
        }

        /// <summary>Pyörä z-akselin suuntaan: ulkopinta (kyljen puolella s = ±1) ja kehä; sisäpinta jää alustaa vasten.</summary>
        static void RaPyoraZ(Rakentaja r, Vector3 c, float sade, float puoli, float s, int n)
        {
            var ulko = new Vector3(0f, 0f, s * puoli);
            for (int i = 0; i < n; i++)
            {
                float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), Mathf.Sin(a0), 0f) * sade, d1 = new Vector3(Mathf.Cos(a1), Mathf.Sin(a1), 0f) * sade;
                r.NelioKeskelta(c + d0 - ulko, c + d1 - ulko, c + d1 + ulko, c + d0 + ulko, c, RaPyora);
                if (i > 0 && i < n - 1)
                    r.KolmioUlos(c + new Vector3(sade, 0f, 0f) + ulko, c + d0 + ulko, c + d1 + ulko, new Vector3(0f, 0f, s), RaPyoraPinta);
            }
        }

        /// <summary>Lieriö x-akselin suuntaan (kattila): x0 → x1, keskiviiva (y, z), säde, kulmien määrä; +x-pääty omalla värillään.</summary>
        static void RaLieriX(Rakentaja r, float x0, float x1, float y, float z, float sade, int n, Color vari, Color paaty)
        {
            var k = new Vector3((x0 + x1) * 0.5f, y, z);
            for (int i = 0; i < n; i++)
            {
                float a0 = (i + 0.5f) * Mathf.PI * 2f / n, a1 = (i + 1.5f) * Mathf.PI * 2f / n;
                Vector3 d0 = new Vector3(0f, Mathf.Cos(a0), Mathf.Sin(a0)) * sade, d1 = new Vector3(0f, Mathf.Cos(a1), Mathf.Sin(a1)) * sade;
                Vector3 e0 = new Vector3(x0, y, z), e1 = new Vector3(x1, y, z);
                r.NelioKeskelta(e0 + d0, e1 + d0, e1 + d1, e0 + d1, k, vari);
                if (i > 0 && i < n - 1)
                {
                    var d00 = new Vector3(0f, Mathf.Cos(0.5f * Mathf.PI * 2f / n), Mathf.Sin(0.5f * Mathf.PI * 2f / n)) * sade;
                    r.KolmioUlos(e1 + d00, e1 + d0, e1 + d1, Vector3.right, paaty);
                }
            }
        }

        /// <summary>Sorvattu pinta pystyakselin ympäri (ks. MjSorvi): aine profiilin kulkusuunnasta vasemmalla, säde 0 päässä
        /// tekee viuhkan, väri profiilin väleittäin.</summary>
        static void RaSorvi(Rakentaja r, Vector3 p, (float sade, float y)[] prof, int n, Func<int, Color> vari)
        {
            for (int j = 0; j + 1 < prof.Length; j++)
            {
                var (r0, y0) = prof[j]; var (r1, y1) = prof[j + 1];
                float nr = y1 - y0, ny = r0 - r1;
                for (int i = 0; i < n; i++)
                {
                    float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n, am = (a0 + a1) * 0.5f;
                    Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)), d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1));
                    var ulos = new Vector3(Mathf.Cos(am) * nr, ny, Mathf.Sin(am) * nr);
                    Vector3 A = p + d0 * r0 + Vector3.up * y0, B = p + d1 * r0 + Vector3.up * y0;
                    Vector3 C = p + d1 * r1 + Vector3.up * y1, D = p + d0 * r1 + Vector3.up * y1;
                    if (r0 <= 0f) r.KolmioUlos(A, C, D, ulos, vari(j));
                    else if (r1 <= 0f) r.KolmioUlos(A, B, C, ulos, vari(j));
                    else r.NelioUlos(A, B, C, D, ulos, vari(j));
                }
            }
        }

        static Mesh RatasRunko() { var r = new Rakentaja(); RatasOsat(r, false); return r.Verkko("kategoria-Ratas"); }
        static Mesh RatasLod1() { var r = new Rakentaja(); RatasOsat(r, true); return r.Verkko("kategoria-Ratas-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaRatas3D(bool lod1 = false) => lod1 ? RatasLod1() : RatasRunko();

        static readonly bool ratasMalli = RekisteroiKategoria(Kategoriasymboli.Ratas, new Erikoismalli { Runko = RatasRunko, Lod1 = RatasLod1 });
    }
}
