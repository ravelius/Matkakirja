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

        static readonly bool ratasMalli = RekisteroiKategoria(Kategoriasymboli.Ratas, new Erikoismalli { Runko = RatasRunko, Lod1 = RatasLod1, Lahi = RatasLahi });

        // ---- LÄHITASO (omistaja 27.9.2026 klo 09.0x; Natiivisepän rajapinta Erikoismalli.Lahi, 1.0.29) ----

        /// <summary>
        /// LÄHITASO: sama hammasratas ja veturi lähizoomiin (Erikoismalli.Lahi: korvaa LOD0:n, kun kartan kerroin ≥ 4, enintään
        /// kolmelle lähimmälle). Sama siluetti, mittasuhteet, värit, rajat ja sommitelma kuin LOD0:ssa (kahdeksanhampainen ratas
        /// nojaa 25° taakse, veturi sivuttain sen alaosan edessä), mutta 2 042 kolmiota (LOD0 558, noin 3,7 ×) lähikuvan
        /// yksityiskohtiin: rattaan etureunat viistetty (valoreuna hampaiden ja rakojen ympäri), kehän sisäreunassa koholla oleva
        /// huuli, puolissa keskiharja ja kaarevasti levenevät päät, 12-kulmainen napa viistetyllä reunalla, koholla oleva rengas
        /// ja syvä akselinreikä; veturissa kattila 12-kulmaisena kolmella vanteella ja paksumpi savukammio, savupiippu tyvilaipan
        /// ja kruunun kanssa, höyrykupu laippoineen ja pieni hiekkakupu, käsikaide, ohjaamon ikkunat puitteineen ja välipuineen,
        /// kylkiviiva ja kaareva katto, lähemmät pyörät pinnoina tummaa taustaa vasten (vetopyörissä vastapaino), kytkintanko
        /// laakeripesineen ja auran säleet. Kaiverrustyyli ennallaan: seepiarampin värit (Ramppi); samat ääriviivaosat kuin
        /// LOD0:ssa (ratas, veturi). Rattaan takapinta ja kaukaisemmat pyörät kuten LOD0:ssa (eivät näy ylhäältä).
        /// </summary>
        static void RatasLahiOsat(Rakentaja r)
        {
            float fi = RaKallistus * Mathf.Deg2Rad, cf = Mathf.Cos(fi), sf = Mathf.Sin(fi);
            float etu = RaRt * sf + RaSyv * cf, zR = 0.06f, zV = zR - etu - 0.03f;
            var o = new Vector3(0f, RaRt * Mathf.Cos(8f * Mathf.Deg2Rad) * cf + RaSyv * sf, zR);
            Vector3 M(float x, float y, float z) => o + new Vector3(x, y * cf - z * sf, y * sf + z * cf);
            Vector3 S(Vector3 v) => new Vector3(v.x, v.y * cf - v.z * sf, v.y * sf + v.z * cf);

            r.AloitaOsa();
            RaLhKeha(r, M, S);
            RaLhPuolat(r, M, S);
            r.LopetaOsa();

            r.AloitaOsa();
            RaLhVeturi(r, zV);
            r.LopetaOsa();
        }

        /// <summary>
        /// Lähitason kehä ja hampaat: LOD0:n ääriviiva (kahdeksan puolisuunnikashammasta hammaspohjan 16-kulmion päällä) ja
        /// takapinta ennallaan, mutta etupinnan reunat viistetty (valoreuna hampaiden ja rakojen ympäri) ja kehän sisäreunassa
        /// koholla oleva huuli (kuvamerkin sisärengas); sisäreuna 32-kulmiona.
        /// </summary>
        static void RaLhKeha(Rakentaja r, Func<float, float, float, Vector3> M, Func<Vector3, Vector3> S)
        {
            const int nH = 8;
            float jakso = Mathf.PI * 2f / nH, aR = 11.5f * Mathf.Deg2Rad, aT = 8f * Mathf.Deg2Rad, d = RaSyv;
            const float c = 0.0065f;
            var back = S(Vector3.back); var fwd = S(Vector3.forward);
            Vector2 P(float a, float rr) => new Vector2(Mathf.Cos(a) * rr, Mathf.Sin(a) * rr);
            Vector3 V(Vector2 p, float z) => M(p.x, p.y, z);
            var ulko = new Vector2[nH * 4];
            for (int k = 0; k < nH; k++)
            {
                float th = Mathf.PI * 0.5f + k * jakso;
                ulko[4 * k] = P(th - aR, RaRr); ulko[4 * k + 1] = P(th - aT, RaRt); ulko[4 * k + 2] = P(th + aT, RaRt); ulko[4 * k + 3] = P(th + aR, RaRr);
            }
            var sis = RaLhSisenna(ulko, c);
            int n = ulko.Length;
            // Ulkoseinä (hampaat ja raot) ja etureunan viiste.
            for (int i = 0; i < n; i++)
            {
                int j = (i + 1) % n;
                var U = S(new Vector3(ulko[j].y - ulko[i].y, ulko[i].x - ulko[j].x, 0f));
                r.NelioUlos(V(ulko[i], -d + c), V(ulko[j], -d + c), V(ulko[j], d), V(ulko[i], d), U, RaKylki);
                r.NelioUlos(V(sis[i], -d), V(sis[j], -d), V(ulko[j], -d + c), V(ulko[i], -d + c), U.normalized + back, RaPinta);
            }
            // Hammaspohjien ketju (16 kärkeä) ja sisäreunan kulmat (32): jokaista ketjun väliä kohden kaksi sisäreunan väliä.
            var ket = new Vector2[2 * nH]; var ketT = new Vector2[2 * nH];
            for (int k = 0; k < nH; k++) { ket[2 * k] = sis[4 * k]; ket[2 * k + 1] = sis[4 * k + 3]; ketT[2 * k] = ulko[4 * k]; ketT[2 * k + 1] = ulko[4 * k + 3]; }
            int nk = ket.Length, ns = 2 * nk;
            var kulma = new float[ns];
            for (int j = 0; j < nk; j++)
            {
                float a0 = (float)Math.Atan2(ket[j].y, ket[j].x), a1 = (float)Math.Atan2(ket[(j + 1) % nk].y, ket[(j + 1) % nk].x);
                if (a1 < a0) a1 += Mathf.PI * 2f;
                kulma[2 * j] = a0; kulma[2 * j + 1] = (a0 + a1) * 0.5f;
            }
            const float rJ = RaRi + 0.017f;
            for (int k = 0; k < nH; k++)
            {
                r.NelioUlos(V(sis[4 * k], -d), V(sis[4 * k + 1], -d), V(sis[4 * k + 2], -d), V(sis[4 * k + 3], -d), back, RaPinta);
                r.NelioUlos(V(ulko[4 * k], d), V(ulko[4 * k + 1], d), V(ulko[4 * k + 2], d), V(ulko[4 * k + 3], d), fwd, RaPinta);
            }
            for (int j = 0; j < nk; j++)
            {
                int j1 = (j + 1) % nk;
                Vector2 a0 = P(kulma[2 * j], rJ), a1 = P(kulma[2 * j + 1], rJ), a2 = P(kulma[(2 * j + 2) % ns], rJ);
                r.KolmioUlos(V(ket[j], -d), V(ket[j1], -d), V(a1, -d), back, RaPinta);
                r.KolmioUlos(V(ket[j], -d), V(a1, -d), V(a0, -d), back, RaPinta);
                r.KolmioUlos(V(ket[j1], -d), V(a2, -d), V(a1, -d), back, RaPinta);
                Vector2 b0 = P(kulma[2 * j], RaRi), b1 = P(kulma[2 * j + 1], RaRi), b2 = P(kulma[(2 * j + 2) % ns], RaRi);
                r.KolmioUlos(V(ketT[j], d), V(ketT[j1], d), V(b1, d), fwd, RaPinta);
                r.KolmioUlos(V(ketT[j], d), V(b1, d), V(b0, d), fwd, RaPinta);
                r.KolmioUlos(V(ketT[j1], d), V(b2, d), V(b1, d), fwd, RaPinta);
            }
            // Sisäreuna: huulen ulkoluiska, huulen sisäviiste ja sisäseinä (aine profiilin oikealla puolella).
            RaLhLevy(r, M, S, new[] { (rJ, -d), (RaRi + 0.0105f, -d - 0.005f), (RaRi, -d), (RaRi, d) }, kulma, h => h < 2 ? RaPinta : RaSisa);
        }

        /// <summary>Monikulmion sisennys (vastapäivään kiertävä ääriviiva): jokainen kärki siirretään kulmanpuolittajaa pitkin
        /// niin, että sivut siirtyvät c:n verran sisään.</summary>
        static Vector2[] RaLhSisenna(Vector2[] p, float c)
        {
            int n = p.Length;
            var o = new Vector2[n];
            for (int i = 0; i < n; i++)
            {
                Vector2 a = p[(i + n - 1) % n], b = p[i], e = p[(i + 1) % n];
                var n1 = new Vector2(-(b - a).y, (b - a).x).normalized; var n2 = new Vector2(-(e - b).y, (e - b).x).normalized;
                var m = (n1 + n2).normalized;
                float cosPuoli = m.x * n1.x + m.y * n1.y;
                o[i] = b + m * (c / Mathf.Max(0.3f, cosPuoli));
            }
            return o;
        }

        /// <summary>
        /// Rattaan akselin ympäri pyörähtävä pinta (kehän huuli, napa): profiili (säde, z) kulkee niin, että aine jää kulkusuunnasta
        /// oikealle; ulospäin osoittava normaali on silloin (−dz, dr). Kärjet kulmissa kulmat[] (suljettu kierros); säde 0 tekee
        /// viuhkan. Väri profiilin väleittäin.
        /// </summary>
        static void RaLhLevy(Rakentaja r, Func<float, float, float, Vector3> M, Func<Vector3, Vector3> S, (float sade, float z)[] prof, float[] kulmat, Func<int, Color> vari)
        {
            int n = kulmat.Length;
            for (int h = 0; h + 1 < prof.Length; h++)
            {
                var (r0, z0) = prof[h]; var (r1, z1) = prof[h + 1];
                float nr = -(z1 - z0), nz = r1 - r0;
                for (int i = 0; i < n; i++)
                {
                    float a0 = kulmat[i], a1 = kulmat[(i + 1) % n];
                    if (a1 < a0) a1 += Mathf.PI * 2f;
                    float am = (a0 + a1) * 0.5f;
                    var ulos = S(new Vector3(Mathf.Cos(am) * nr, Mathf.Sin(am) * nr, nz));
                    Vector3 A = M(Mathf.Cos(a0) * r0, Mathf.Sin(a0) * r0, z0), B = M(Mathf.Cos(a1) * r0, Mathf.Sin(a1) * r0, z0);
                    Vector3 C = M(Mathf.Cos(a1) * r1, Mathf.Sin(a1) * r1, z1), D = M(Mathf.Cos(a0) * r1, Mathf.Sin(a0) * r1, z1);
                    if (r1 <= 0f) r.KolmioUlos(A, B, C, ulos, vari(h));
                    else if (r0 <= 0f) r.KolmioUlos(A, C, D, ulos, vari(h));
                    else r.NelioUlos(A, B, C, D, ulos, vari(h));
                }
            }
        }

        /// <summary>
        /// Lähitason puolat ja napa: kuusi LOD0:n kapenevaa puolaa, joiden etupinnassa on keskiharja ja päät levenevät
        /// kaarevasti napaan ja kehään (valukappaleen pyöristys); 12-kulmainen napa viistetyllä etureunalla, akselinreiän
        /// ympärillä koholla oleva rengas ja tumma, syvä akselinreikä.
        /// </summary>
        static void RaLhPuolat(Rakentaja r, Func<float, float, float, Vector3> M, Func<Vector3, Vector3> S)
        {
            const float ds = 0.026f, harja = 0.0045f;
            float[] asema = { 0.085f, 0.132f, 0.25f, 0.297f };
            float[] leveys = { 0.046f, 0.0332f, 0.0272f, 0.037f };
            for (int j = 0; j < 6; j++)
            {
                float a = Mathf.PI * 0.5f + j * Mathf.PI * 2f / 6f;
                var u = new Vector2(Mathf.Cos(a), Mathf.Sin(a)); var v = new Vector2(-u.y, u.x);
                // Poikkileikkaus: etuharja, etureunat, takareunat (tasainen takapinta).
                Vector3 Pt(int s, int q)
                {
                    var p = u * asema[s];
                    switch (q)
                    {
                        case 0: return M(p.x, p.y, -ds - harja);
                        case 1: { var e = p + v * leveys[s]; return M(e.x, e.y, -ds); }
                        case 2: { var e = p + v * leveys[s]; return M(e.x, e.y, ds); }
                        case 3: { var e = p - v * leveys[s]; return M(e.x, e.y, ds); }
                        default: { var e = p - v * leveys[s]; return M(e.x, e.y, -ds); }
                    }
                }
                for (int s = 0; s + 1 < asema.Length; s++)
                    for (int q = 0; q < 5; q++)
                    {
                        int q1 = (q + 1) % 5;
                        var keski = M(u.x * (asema[s] + asema[s + 1]) * 0.5f, u.y * (asema[s] + asema[s + 1]) * 0.5f, 0f);
                        var vari = q == 0 || q == 4 ? RaPuola : q == 2 ? RaPuola : RaPuolaKylki;
                        r.NelioKeskelta(Pt(s, q), Pt(s + 1, q), Pt(s + 1, q1), Pt(s, q1), keski, vari);
                    }
            }
            // Napa: 12-kulmio (kärjet puolien suunnissa), viistetty etureuna, koholla oleva rengas ja syvä tumma akselinreikä.
            const float dn = 0.06f;
            var kulmat = new float[12];
            for (int i = 0; i < 12; i++) kulmat[i] = i * Mathf.PI * 2f / 12f;
            RaLhLevy(r, M, S, new[] { (0.1f, dn), (0.1f, -dn + 0.006f), (0.094f, -dn), (0.064f, -dn), (0.0585f, -dn - 0.0055f), (0.05f, -dn - 0.0055f),
                (0.0445f, -dn), (0.0445f, -dn + 0.018f), (0f, -dn + 0.018f) }, kulmat, h => h == 0 ? RaNapaKylki : h >= 6 ? RaAkseli : RaNapa);
            RaLhLevy(r, M, S, new[] { (0f, dn), (0.1f, dn) }, kulmat, _ => RaNapa);
        }

        /// <summary>
        /// Lähitason veturi (sama sommitelma ja mitat kuin RaVeturi): kattila 12-kulmaisena kolmella tummalla vanteella ja
        /// hieman paksumpi savukammio, savupiippu tyvilaippoineen ja kruunuineen, höyrykupu laippoineen ja pieni hiekkakupu,
        /// ohjaamon ikkunat puitteineen ja välipuineen, kaareva katto, käsikaide kattilan kyljessä, lähimmät pyörät pinnoineen
        /// (vetopyörissä vastapaino ja kampitappi), kytkintanko laakeripesineen ja auran säleet.
        /// </summary>
        static void RaLhVeturi(Rakentaja r, float zv)
        {
            // Alusta ja kehys (kuten LOD0).
            r.Laatikko(new Vector3(-0.03f, 0.03f, zv), new Vector3(0.5f, 0.05f, 0.1f), RaRunko, RaRunko);
            r.Laatikko(new Vector3(-0.035f, 0.08f, zv), new Vector3(0.6f, 0.024f, 0.158f), RaRunko, RaRunko);
            // Kattila: vanteet tummina raitoina, savukammio 0,066 ja etupääty tumma.
            RaLhLieriX(r, new Vector3(0f, 0.166f, zv), new[] { (-0.14f, 0.062f), (-0.1f, 0.062f), (-0.093f, 0.062f), (-0.035f, 0.062f), (-0.028f, 0.062f),
                (0.062f, 0.062f), (0.069f, 0.062f), (0.145f, 0.062f), (0.145f, 0.066f), (0.203f, 0.066f), (0.21f, 0.0635f), (0.21f, 0f) }, 12,
                j => j == 1 || j == 3 || j == 5 ? RaRunko : j >= 7 ? RaPiippu : RaKattila);
            // Savupiippu: tyvilaippa, kapeneva varsi, levenevä suppilo, kruunun reunus ja tumma suu.
            RaSorvi(r, new Vector3(0.158f, 0.21f, zv), new[] { (0.03f, 0f), (0.03f, 0.021f), (0.0235f, 0.029f), (0.0205f, 0.068f), (0.042f, 0.099f),
                (0.046f, 0.1025f), (0.046f, 0.112f), (0.038f, 0.112f), (0.031f, 0.104f), (0f, 0.104f) }, 10, j => j >= 7 ? RaMuste : RaPiippu);
            // Höyrykupu laippoineen ja pieni hiekkakupu.
            RaSorvi(r, new Vector3(0.015f, 0.215f, zv), new[] { (0.034f, 0f), (0.034f, 0.014f), (0.029f, 0.018f), (0.029f, 0.029f), (0.026f, 0.038f),
                (0.019f, 0.0455f), (0.009f, 0.049f), (0f, 0.05f) }, 10, _ => RaKupu);
            RaSorvi(r, new Vector3(0.1f, 0.213f, zv), new[] { (0.02f, 0f), (0.02f, 0.024f), (0.013f, 0.032f), (0f, 0.035f) }, 8, _ => RaKupu);
            // Käsikaide kattilan kyljessä (ohut vaalea tanko ja kaksi tukea).
            float zk = zv - 0.069f;
            r.Laatikko(new Vector3(-0.005f, 0.196f, zk), new Vector3(0.25f, 0.004f, 0.004f), RaKupu, RaKupu);
            foreach (float xk in new[] { -0.09f, 0.08f }) r.Laatikko(new Vector3(xk, 0.19f, zk + 0.008f), new Vector3(0.004f, 0.006f, 0.016f), RaKupu, RaKupu);
            // Ohjaamo, kaareva katto ja ikkunat puitteineen.
            r.Laatikko(new Vector3(-0.225f, 0.104f, zv), new Vector3(0.19f, 0.19f, 0.15f), RaKoppi, RaKoppi);
            RaLhKatto(r, -0.335f, -0.115f, zv);
            foreach (float s in new[] { -1f, 1f })
            {
                float z = zv + s * 0.0765f;
                var n = new Vector3(0f, 0f, s);
                foreach (float wx in new[] { -0.272f, -0.19f })
                {
                    r.NelioUlos(new Vector3(wx - 0.027f, 0.2f, z), new Vector3(wx + 0.027f, 0.2f, z), new Vector3(wx + 0.027f, 0.262f, z), new Vector3(wx - 0.027f, 0.262f, z), n, RaMuste);
                    if (s > 0f) continue;
                    // Puitteet: ylä-, ala- ja sivupuut sekä välipuu hieman lasin edessä.
                    float zf = z + s * 0.0012f, pw = 0.0045f;
                    RaLhLista(r, new Vector3(wx - 0.027f, 0.2f, zf), new Vector3(wx + 0.027f, 0.2f + pw, zf), n);
                    RaLhLista(r, new Vector3(wx - 0.027f, 0.262f - pw, zf), new Vector3(wx + 0.027f, 0.262f, zf), n);
                    RaLhLista(r, new Vector3(wx - 0.027f, 0.2f + pw, zf), new Vector3(wx - 0.027f + pw, 0.262f - pw, zf), n);
                    RaLhLista(r, new Vector3(wx + 0.027f - pw, 0.2f + pw, zf), new Vector3(wx + 0.027f, 0.262f - pw, zf), n);
                    RaLhLista(r, new Vector3(wx - 0.0018f, 0.2f + pw, zf), new Vector3(wx + 0.0018f, 0.262f - pw, zf), n);
                }
                if (s < 0f)
                {
                    // Ohjaamon kylkipaneelin viiva ikkunoiden alla.
                    r.NelioUlos(new Vector3(-0.316f, 0.176f, z - s * 0.001f), new Vector3(-0.134f, 0.176f, z - s * 0.001f), new Vector3(-0.134f, 0.1795f, z - s * 0.001f),
                        new Vector3(-0.316f, 0.1795f, z - s * 0.001f), n, RaPiippu);
                }
            }
            // Aura: kiila ja sen päällä viisi tummaa sälettä.
            {
                float x0 = 0.235f, x1 = 0.318f, y0 = 0.082f, zz = 0.066f;
                var k = new Vector3((x0 + x1) * 0.5f, 0.03f, zv);
                Vector3 a0 = new Vector3(x0, y0, zv - zz), a1 = new Vector3(x0, y0, zv + zz), b0 = new Vector3(x1, 0.004f, zv - zz), b1 = new Vector3(x1, 0.004f, zv + zz);
                Vector3 c0 = new Vector3(x0, 0.004f, zv - zz), c1 = new Vector3(x0, 0.004f, zv + zz);
                r.NelioKeskelta(a0, a1, b1, b0, k, RaAura);
                r.KolmioKeskelta(a0, b0, c0, k, RaAura);
                r.KolmioKeskelta(a1, b1, c1, k, RaAura);
                var nk = Vector3.Cross(b1 - a0, a1 - a0).normalized;
                if (Vector3.Dot(nk, (a0 + b1) * 0.5f - k) < 0f) nk = -nk;
                for (int i = 0; i < 5; i++)
                {
                    float zs = zv - 0.052f + i * 0.026f, hw = 0.0022f;
                    Vector3 p0 = new Vector3(x0 + 0.004f, y0 - 0.0037f, zs), p1 = new Vector3(x1 - 0.006f, 0.0096f, zs);
                    var sv = new Vector3(0f, 0f, hw);
                    r.NelioUlos(p0 - sv + nk * 0.0007f, p1 - sv + nk * 0.0007f, p1 + sv + nk * 0.0007f, p0 + sv + nk * 0.0007f, nk, RaMuste);
                }
            }
            // Pyörät: lähempi kylki pinnoineen, kaukaisempi kuten LOD0:ssa (ei näy); kytkintanko laakeripesineen.
            foreach (float s in new[] { -1f, 1f })
            {
                float z = zv + s * 0.068f;
                if (s > 0f)
                {
                    RaPyoraZ(r, new Vector3(-0.215f, 0.068f, z), 0.068f, 0.009f, s, 8);
                    RaPyoraZ(r, new Vector3(-0.06f, 0.068f, z), 0.068f, 0.009f, s, 8);
                    RaPyoraZ(r, new Vector3(0.09f, 0.042f, z), 0.042f, 0.009f, s, 6);
                    RaPyoraZ(r, new Vector3(0.19f, 0.042f, z), 0.042f, 0.009f, s, 6);
                    continue;
                }
                RaLhPyora(r, new Vector3(-0.215f, 0.068f, z), 0.068f, s, 16, 10, true);
                RaLhPyora(r, new Vector3(-0.06f, 0.068f, z), 0.068f, s, 16, 10, true);
                RaLhPyora(r, new Vector3(0.09f, 0.042f, z), 0.042f, s, 12, 6, false);
                RaLhPyora(r, new Vector3(0.19f, 0.042f, z), 0.042f, s, 12, 6, false);
                // Kytkintanko kampitappien (keskeltä 0,018 alas) välillä, laakeripesät kuusikulmioina, vaalea yläreuna.
                float zt = z + s * 0.012f;
                var nn = new Vector3(0f, 0f, s);
                r.NelioUlos(new Vector3(-0.215f, 0.0455f, zt), new Vector3(-0.06f, 0.0455f, zt), new Vector3(-0.06f, 0.0545f, zt), new Vector3(-0.215f, 0.0545f, zt), nn, RaMuste);
                r.NelioUlos(new Vector3(-0.215f, 0.0545f, zt), new Vector3(-0.06f, 0.0545f, zt), new Vector3(-0.06f, 0.0545f, zt - s * 0.005f), new Vector3(-0.215f, 0.0545f, zt - s * 0.005f), Vector3.up, RaPyoraPinta);
                foreach (float xp in new[] { -0.215f, -0.06f })
                {
                    var pc = new Vector3(xp, 0.05f, zt + s * 0.0005f);
                    for (int i = 0; i < 6; i++)
                    {
                        float a0 = i * Mathf.PI / 3f, a1 = (i + 1) * Mathf.PI / 3f;
                        r.KolmioUlos(pc, pc + new Vector3(Mathf.Cos(a0), Mathf.Sin(a0), 0f) * 0.0105f, pc + new Vector3(Mathf.Cos(a1), Mathf.Sin(a1), 0f) * 0.0105f, nn, i % 2 == 0 ? RaMuste : RaPyora);
                    }
                    r.KolmioUlos(pc + new Vector3(-0.0035f, -0.003f, s * 0.0006f), pc + new Vector3(0.0035f, -0.003f, s * 0.0006f), pc + new Vector3(0f, 0.0036f, s * 0.0006f), nn, RaPyoraPinta);
                }
            }
        }

        /// <summary>Ohut suorakulmainen lista (ikkunan puite) pystytasossa: kulmat a (vasen ala) ja b (oikea ylä), etupuoli n.</summary>
        static void RaLhLista(Rakentaja r, Vector3 a, Vector3 b, Vector3 n) =>
            r.NelioUlos(new Vector3(a.x, a.y, a.z), new Vector3(b.x, a.y, a.z), new Vector3(b.x, b.y, a.z), new Vector3(a.x, b.y, a.z), n, RaKupu);

        /// <summary>Ohjaamon kaareva katto x0–x1 (räystäät z = zv ± 0,088, korkeus 0,294–0,314 kuten LOD0:n laatikko):
        /// kuusi lapetta, räystäslaudat ja päädyt.</summary>
        static void RaLhKatto(Rakentaja r, float x0, float x1, float zv)
        {
            var prof = new[] { (-0.088f, 0.2975f), (-0.062f, 0.3065f), (-0.032f, 0.3122f), (0f, 0.314f), (0.032f, 0.3122f), (0.062f, 0.3065f), (0.088f, 0.2975f) };
            var k = new Vector3((x0 + x1) * 0.5f, 0.3f, zv);
            for (int i = 0; i + 1 < prof.Length; i++)
            {
                var (za, ya) = prof[i]; var (zb, yb) = prof[i + 1];
                r.NelioKeskelta(new Vector3(x0, ya, zv + za), new Vector3(x1, ya, zv + za), new Vector3(x1, yb, zv + zb), new Vector3(x0, yb, zv + zb), k, RaKatto);
            }
            foreach (float s in new[] { -1f, 1f })
                r.NelioKeskelta(new Vector3(x0, 0.294f, zv + s * 0.088f), new Vector3(x1, 0.294f, zv + s * 0.088f), new Vector3(x1, 0.2975f, zv + s * 0.088f), new Vector3(x0, 0.2975f, zv + s * 0.088f), k, RaKatto);
            r.NelioKeskelta(new Vector3(x0, 0.294f, zv - 0.088f), new Vector3(x1, 0.294f, zv - 0.088f), new Vector3(x1, 0.294f, zv + 0.088f), new Vector3(x0, 0.294f, zv + 0.088f), k, RaKatto);
            foreach (float x in new[] { x0, x1 })
            {
                var pk = new Vector3(x, 0.299f, zv);
                var ulos = new Vector3(x < k.x ? -1f : 1f, 0f, 0f);
                r.KolmioUlos(new Vector3(x, 0.294f, zv - 0.088f), new Vector3(x, 0.2975f, zv - 0.088f), pk, ulos, RaKatto);
                r.KolmioUlos(new Vector3(x, 0.294f, zv + 0.088f), pk, new Vector3(x, 0.2975f, zv + 0.088f), ulos, RaKatto);
                r.KolmioUlos(new Vector3(x, 0.294f, zv - 0.088f), pk, new Vector3(x, 0.294f, zv + 0.088f), ulos, RaKatto);
                for (int i = 0; i + 1 < prof.Length; i++)
                    r.KolmioUlos(new Vector3(x, prof[i].Item2, zv + prof[i].Item1), new Vector3(x, prof[i + 1].Item2, zv + prof[i + 1].Item1), pk, ulos, RaKatto);
            }
        }

        /// <summary>
        /// Lähitason pyörä z-akselin suuntaan (kyljen puolella s = ±1): kulutuspinta n-kulmiona, renkaan etupinta, pinnat
        /// navasta renkaaseen (välit jäävät auki, joten alustan tumma runko näkyy niiden läpi) ja napa; vetopyörässä vastapaino
        /// kampitapin vastakkaisella puolella.
        /// </summary>
        static void RaLhPyora(Rakentaja r, Vector3 c, float sade, float s, int n, int pinnat, bool veto)
        {
            var ulkoZ = new Vector3(0f, 0f, s * 0.009f);
            var nn = new Vector3(0f, 0f, s);
            float rs = sade - (veto ? 0.011f : 0.008f);
            // Tumma tausta pinnojen välissä (varjossa oleva runko), jotta pyörä säilyttää LOD0:n tumman painon.
            var ct = c + nn * 0.002f;
            for (int i = 0; i < n; i++)
            {
                float a0 = (i + 0.5f) * Mathf.PI * 2f / n, a1 = (i + 1.5f) * Mathf.PI * 2f / n;
                r.KolmioUlos(ct, ct + new Vector3(Mathf.Cos(a0), Mathf.Sin(a0), 0f) * (rs + 0.002f), ct + new Vector3(Mathf.Cos(a1), Mathf.Sin(a1), 0f) * (rs + 0.002f), nn, RaPyora);
            }
            for (int i = 0; i < n; i++)
            {
                float a0 = (i + 0.5f) * Mathf.PI * 2f / n, a1 = (i + 1.5f) * Mathf.PI * 2f / n;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), Mathf.Sin(a0), 0f), d1 = new Vector3(Mathf.Cos(a1), Mathf.Sin(a1), 0f);
                r.NelioKeskelta(c + d0 * sade - ulkoZ, c + d1 * sade - ulkoZ, c + d1 * sade + ulkoZ, c + d0 * sade + ulkoZ, c, RaPyora);
                r.NelioUlos(c + d0 * rs + ulkoZ, c + d1 * rs + ulkoZ, c + d1 * sade + ulkoZ, c + d0 * sade + ulkoZ, nn, RaPyoraPinta);
            }
            // Pinnat (hieman kapenevat) ja napa.
            for (int i = 0; i < pinnat; i++)
            {
                float a = (i + 0.25f) * Mathf.PI * 2f / pinnat;
                var u = new Vector3(Mathf.Cos(a), Mathf.Sin(a), 0f); var v = new Vector3(-u.y, u.x, 0f);
                float w0 = veto ? 0.0034f : 0.003f, w1 = veto ? 0.0024f : 0.0022f;
                var z = ulkoZ - nn * 0.0015f;
                r.NelioUlos(c + u * 0.01f - v * w0 + z, c + u * (rs + 0.002f) - v * w1 + z, c + u * (rs + 0.002f) + v * w1 + z, c + u * 0.01f + v * w0 + z, nn, RaPyoraPinta);
            }
            var cz = c + ulkoZ + nn * 0.001f;
            float rn = veto ? 0.0135f : 0.0095f;
            for (int i = 0; i < 8; i++)
            {
                float a0 = i * Mathf.PI / 4f, a1 = (i + 1) * Mathf.PI / 4f;
                r.KolmioUlos(cz, cz + new Vector3(Mathf.Cos(a0), Mathf.Sin(a0), 0f) * rn, cz + new Vector3(Mathf.Cos(a1), Mathf.Sin(a1), 0f) * rn, nn, RaPyoraPinta);
            }
            if (!veto) return;
            // Vastapaino: sirppi renkaan sisäreunaa vasten kampitapin (alhaalla) vastakkaisella puolella.
            var cw = c + ulkoZ + nn * 0.0005f;
            const int nv = 6;
            for (int i = 0; i < nv; i++)
            {
                float a0 = Mathf.PI * 0.5f + (i / (float)nv - 0.5f) * 1.9f, a1 = Mathf.PI * 0.5f + ((i + 1) / (float)nv - 0.5f) * 1.9f;
                Vector3 o0 = new Vector3(Mathf.Cos(a0), Mathf.Sin(a0), 0f) * (rs + 0.001f), o1 = new Vector3(Mathf.Cos(a1), Mathf.Sin(a1), 0f) * (rs + 0.001f);
                float t0 = Mathf.Sin((i / (float)nv) * Mathf.PI), t1 = Mathf.Sin(((i + 1) / (float)nv) * Mathf.PI);
                Vector3 i0 = o0 * (1f - 0.42f * t0), i1 = o1 * (1f - 0.42f * t1);
                r.NelioUlos(cw + i0, cw + i1, cw + o1, cw + o0, nn, RaPyoraPinta);
            }
        }

        /// <summary>Lieriö x-akselin suuntaan profiilista (x, säde) kuten RaLieriX (kärjet kulmissa (i + 0,5) · 2π/n): säde 0
        /// profiilin päässä sulkee päädyn; väri profiilin väleittäin.</summary>
        static void RaLhLieriX(Rakentaja r, Vector3 p, (float x, float sade)[] prof, int n, Func<int, Color> vari)
        {
            for (int j = 0; j + 1 < prof.Length; j++)
            {
                var (x0, r0) = prof[j]; var (x1, r1) = prof[j + 1];
                float nx = r0 - r1, nr = x1 - x0;
                for (int i = 0; i < n; i++)
                {
                    float a0 = (i + 0.5f) * Mathf.PI * 2f / n, a1 = (i + 1.5f) * Mathf.PI * 2f / n, am = (a0 + a1) * 0.5f;
                    Vector3 d0 = new Vector3(0f, Mathf.Cos(a0), Mathf.Sin(a0)), d1 = new Vector3(0f, Mathf.Cos(a1), Mathf.Sin(a1));
                    var ulos = new Vector3(nx, Mathf.Cos(am) * nr, Mathf.Sin(am) * nr);
                    Vector3 A = p + new Vector3(x0, 0f, 0f) + d0 * r0, B = p + new Vector3(x0, 0f, 0f) + d1 * r0;
                    Vector3 C = p + new Vector3(x1, 0f, 0f) + d1 * r1, D = p + new Vector3(x1, 0f, 0f) + d0 * r1;
                    if (r1 <= 0f) r.KolmioUlos(A, B, C, ulos, vari(j));
                    else if (r0 <= 0f) r.KolmioUlos(A, C, D, ulos, vari(j));
                    else r.NelioUlos(A, B, C, D, ulos, vari(j));
                }
            }
        }

        static Mesh RatasLahi() { var r = new Rakentaja(); RatasLahiOsat(r); return r.Verkko("kategoria-Ratas-lahi"); }

        /// <summary>Esikatselu (työkalut): lähitaso.</summary>
        public static Mesh KategoriaRatas3DLahi() => RatasLahi();
    }
}
