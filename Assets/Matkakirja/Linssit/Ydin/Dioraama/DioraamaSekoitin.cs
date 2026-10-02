// SKINNATUN HAHMON ANIMAATIOSEKOITIN (Siirtoseppä 2.10.2026, omistaja loki 59b9df127: valmiit CC0-mallit, sulavin mahdollinen
// liike). Webin THREE.AnimationMixer-pariteetti siinä laajuudessa kuin dioraama tarvitsee: yksi soiva leike kerrallaan,
// crossFade edellisestä (molemmat etenevät häivytyksen ajan, paino lineaarisesti), silmukka, aikakerroin (kävely sidotaan
// reittinopeuteen: DioraamaHahmot3D asettaa Nopeus = m/s × kesto / kavely_sykli_m). Puhdas C# (Linssit-testit): tulos
// on solmukohtainen paikallinen TRS (T 3, R 4, S 3 per solmu), jonka Unity-puoli kirjoittaa Transformeihin.
// Interpolointi: LINEAR (T/S lineaarinen, R nlerp lyhyempää kaarta — sama kuin THREE.QuaternionLinearInterpolant pienillä
// kehysväleillä), STEP. CUBICSPLINE luetaan arvopisteinä (DioraamaGlb) ja interpoloidaan lineaarisesti.
using System;

namespace Matkakirja.Linssit.Dioraama
{
    public sealed class DioraamaSekoitin
    {
        readonly GlbMalli malli;
        /// <summary>Solmujen paikallinen TRS sekoituksen jälkeen (lepoasento solmuille, joita leike ei animoi).</summary>
        public readonly float[] T, R, S;
        /// <summary>Solmu, jota jokin soiva leike animoi (vain nämä tarvitsee kirjoittaa Transformiin).</summary>
        public readonly bool[] Animoitu;
        readonly float[] tT, tR, tS;

        GlbAnimaatio nyky, edellinen;
        double aikaNyky, aikaEdellinen;
        float edellisenNopeus = 1f, haivytys, haivytysKesto;

        /// <summary>Nykyisen leikkeen aikakerroin (1 = luonnollinen nopeus).</summary>
        public float Nopeus = 1f;
        public string Nykyinen => nyky?.Nimi;
        public double Aika => aikaNyky;

        public DioraamaSekoitin(GlbMalli malli)
        {
            this.malli = malli ?? throw new ArgumentNullException(nameof(malli));
            int n = malli.Solmut.Count;
            T = new float[n * 3]; R = new float[n * 4]; S = new float[n * 3];
            tT = new float[n * 3]; tR = new float[n * 4]; tS = new float[n * 3];
            Animoitu = new bool[n];
            Lepo(T, R, S);
        }

        /// <summary>Vaihtaa leikkeen (crossFade haivytysS sekunnissa). Sama leike jatkuu keskeytyksettä, ellei alusta.
        /// false, jos leikettä ei ole mallissa.</summary>
        public bool Toista(string nimi, float haivytysS = 0.25f, bool alusta = false)
        {
            var a = malli.Animaatio(nimi);
            if (a == null) return false;
            if (a == nyky && !alusta) return true;
            if (nyky != null && haivytysS > 0f)
            {
                edellinen = nyky; aikaEdellinen = aikaNyky; edellisenNopeus = Nopeus;
                haivytys = 0f; haivytysKesto = haivytysS;
            }
            else edellinen = null;
            nyky = a; aikaNyky = 0;
            foreach (var k in a.Kanavat) Animoitu[k.Solmu] = true;
            return true;
        }

        /// <summary>Etenee dt sekuntia ja laskee T/R/S:n.</summary>
        public void Paivita(float dt)
        {
            if (nyky == null) return;
            aikaNyky = Kierra(aikaNyky + dt * Nopeus, nyky.Kesto);
            if (edellinen != null)
            {
                aikaEdellinen = Kierra(aikaEdellinen + dt * edellisenNopeus, edellinen.Kesto);
                haivytys += dt;
                if (haivytys >= haivytysKesto) edellinen = null;
            }

            Lepo(T, R, S);
            if (edellinen == null) { Nayte(nyky, (float)aikaNyky, T, R, S); return; }
            Nayte(edellinen, (float)aikaEdellinen, T, R, S);
            Lepo(tT, tR, tS);
            Nayte(nyky, (float)aikaNyky, tT, tR, tS);
            float w = haivytysKesto > 0f ? Math.Min(1f, haivytys / haivytysKesto) : 1f;
            for (int i = 0; i < T.Length; i++) { T[i] += (tT[i] - T[i]) * w; S[i] += (tS[i] - S[i]) * w; }
            for (int n = 0; n < Animoitu.Length; n++) Nlerp(R, n * 4, tR, n * 4, w, R, n * 4);
        }

        static double Kierra(double t, float kesto) => kesto > 0f ? t % kesto : 0;

        void Lepo(float[] t, float[] r, float[] s)
        {
            for (int n = 0; n < malli.Solmut.Count; n++)
            {
                var g = malli.Solmut[n];
                Array.Copy(g.Translation, 0, t, n * 3, 3);
                Array.Copy(g.Rotation, 0, r, n * 4, 4);
                Array.Copy(g.Scale, 0, s, n * 3, 3);
            }
        }

        /// <summary>Leikkeen näyte hetkellä aika kohteisiin (kanavat kirjoittavat oman solmunsa polun).</summary>
        public static void Nayte(GlbAnimaatio a, float aika, float[] t, float[] r, float[] s)
        {
            foreach (var k in a.Kanavat)
            {
                int c = k.Polku == 1 ? 4 : 3;
                var kohde = k.Polku == 0 ? t : k.Polku == 1 ? r : s;
                int o = k.Solmu * c, n = k.Ajat.Length;
                if (n == 0) continue;
                if (n == 1 || aika <= k.Ajat[0]) { Array.Copy(k.Arvot, 0, kohde, o, c); continue; }
                if (aika >= k.Ajat[n - 1]) { Array.Copy(k.Arvot, (n - 1) * c, kohde, o, c); continue; }
                int i = Etsi(k.Ajat, aika);
                if (k.Askel) { Array.Copy(k.Arvot, i * c, kohde, o, c); continue; }
                float u = (aika - k.Ajat[i]) / Math.Max(1e-6f, k.Ajat[i + 1] - k.Ajat[i]);
                if (c == 4) Nlerp(k.Arvot, i * 4, k.Arvot, (i + 1) * 4, u, kohde, o);
                else for (int q = 0; q < 3; q++) kohde[o + q] = k.Arvot[i * 3 + q] + (k.Arvot[(i + 1) * 3 + q] - k.Arvot[i * 3 + q]) * u;
            }
        }

        /// <summary>Suurin i, jolle ajat[i] ≤ aika (ajat nousevat, aika välillä).</summary>
        static int Etsi(float[] ajat, float aika)
        {
            int a = 0, b = ajat.Length - 1;
            while (b - a > 1) { int m = (a + b) >> 1; if (ajat[m] <= aika) a = m; else b = m; }
            return a;
        }

        /// <summary>Kvaternioiden nlerp lyhyempää kaarta (etumerkki pistetulosta), normalisoitu.</summary>
        static void Nlerp(float[] a, int ao, float[] b, int bo, float u, float[] ulos, int uo)
        {
            float d = a[ao] * b[bo] + a[ao + 1] * b[bo + 1] + a[ao + 2] * b[bo + 2] + a[ao + 3] * b[bo + 3];
            float sb = d < 0f ? -u : u, sa = 1f - u;
            float x = a[ao] * sa + b[bo] * sb, y = a[ao + 1] * sa + b[bo + 1] * sb, z = a[ao + 2] * sa + b[bo + 2] * sb, w = a[ao + 3] * sa + b[bo + 3] * sb;
            float l = (float)Math.Sqrt(x * x + y * y + z * z + w * w);
            if (l < 1e-8f) { ulos[uo] = 0; ulos[uo + 1] = 0; ulos[uo + 2] = 0; ulos[uo + 3] = 1; return; }
            ulos[uo] = x / l; ulos[uo + 1] = y / l; ulos[uo + 2] = z / l; ulos[uo + 3] = w / l;
        }
    }
}
