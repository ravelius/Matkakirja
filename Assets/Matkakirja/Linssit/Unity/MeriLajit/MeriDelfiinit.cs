using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// Meren koristeet, laji 6: delfiiniparvi (Välimeri ja Atlantti). Kolmen delfiinin parvi ui pinnan alla vaaleina
    /// läpikuultavina varjoina ja etenee rannikon suuntaan pohjoiseen tai etelään (jaksosta). Aalloittain delfiinit hyppäävät
    /// vuorotellen (porrastus 0,3 s) matalan kaaren: tumma kiinteä runko nousee varjostaan roiskekruunun keskeltä, kaartaa
    /// nokka edellä (varjo jää pinnalle rungon alle) ja sukeltaa toiseen roiskeeseen, ja varjo jatkaa uintia. Näytös 6–10 s,
    /// tauko 40–90 s.
    /// Harvinainen (noin 1/10): viimeinen delfiini hyppää lopuksi korkealle ja pyörähtää pituusakselinsa ympäri (vaalea
    /// vatsa välähtää), ja sukellus nostaa ison roiskeen. Juuri kulkee parven mukana (liioitellun perspektiivin kallistus
    /// kiertyy parven keskeltä). Lapset: 0–2 delfiinit, 3–5 varjot, 6–8 roiskeet.
    /// </summary>
    public static class MeriDelfiinit
    {
        public const string Nimi = "delfiinit";
        public static readonly string[] Meret = { "valimeri", "atlantti" };
        /// <summary>Delfiini 0,091 yksikköä → noin 23 pt ja parvi hypyissä noin 0,28 → 70 pt (valaan mittakaava).</summary>
        public const float KokoPt = 250f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(923, 6f, 10f, 40f, 90f);
        public const int Lapsia = 3, Lapsia2 = 3, Lapsia3 = 3;

        static readonly Color Selka = MalliVarit.Hex(0x3c4749), Kylki = MalliVarit.Hex(0x5d6867), Vatsa = MalliVarit.Hex(0xd5d0c2);
        /// <summary>Roiske kylmän valkoisena kuten valaan suihku (vaahdon sävy katoaa vaaleaan mereen).</summary>
        static readonly Color Roiskevari = new Color(0.99f, 1f, 1f, 1f);

        // Mitat: nokan kärki +z 0,046 ja pyrstön kärjet −z 0,045 origosta (painopiste).
        const float Nokka = 0.046f, Pera = 0.045f;
        // Parven matka näytöksessä (juuri kulkee tasaisesti), hypyn ilma-aika, lakikorkeus ja etenemä uintiin nähden.
        const float Matka = 0.44f, Ilma = 0.85f, Laki = 0.027f, Loikka = 0.04f, Palautus = 1.1f;
        const float KorkeaIlma = 1.35f, KorkeaLaki = 0.07f, KorkeaLoikka = 0.06f, KorkeaViive = 0.3f;
        const float Alku = 0.9f, Porras = 0.3f, RoiskeIka = 0.55f, IsoRoiskeIka = 0.8f;
        /// <summary>Muodostelma parven kehyksessä (+z kulkusuuntaan): kärki edellä, kaksi viistosti takana.</summary>
        static readonly float[] PaikkaX = { 0.004f, 0.036f, -0.034f }, PaikkaZ = { 0.062f, -0.004f, -0.062f };

        public static Mesh Roottori() => HoyryGeometria.Joki();

        /// <summary>
        /// Delfiini (37 kolmiota): nelitahkoinen runko renkain nokka → otsa (meloni) → levein kohta → pyrstönvarsi, tumma
        /// selkä ja vaalea vatsa kylkiviivan alla (kyljestä ja pyörähdyksessä näkyvä vastavarjostus), kaareva selkäevä
        /// takaviistoon, pyrstön kaksi lohkoa ja pienet rintaevät. Origo painopisteessä, +z eteen (nokka), +y ylös.
        /// </summary>
        public static Mesh Lapsi()
        {
            var r = new MalliRakenne();
            // Renkaat: z, puolileveys, selkä y, vatsa y, kylkipisteen y.
            var kaari = new[]
            {
                (z: 0.036f, w: 0.0026f, yt: 0.0014f, yb: -0.0036f, ys: -0.0012f),   // nokan tyvi
                (z: 0.026f, w: 0.0064f, yt: 0.0066f, yb: -0.0058f, ys: 0.0000f),    // otsa (meloni)
                (z: 0.006f, w: 0.0088f, yt: 0.0084f, yb: -0.0070f, ys: 0.0006f),    // levein kohta
                (z: -0.030f, w: 0.0022f, yt: 0.0034f, yb: -0.0022f, ys: 0.0004f),   // pyrstönvarsi
            };
            var p = new Vector3[kaari.Length, 4];
            for (int i = 0; i < kaari.Length; i++)
            {
                var k = kaari[i];
                p[i, 0] = new Vector3(0f, k.yt, k.z); p[i, 1] = new Vector3(k.w, k.ys, k.z);
                p[i, 2] = new Vector3(0f, k.yb, k.z); p[i, 3] = new Vector3(-k.w, k.ys, k.z);
            }
            var karki = new Vector3(0f, -0.0016f, Nokka);
            var tyvi = new Vector3(0f, 0.0006f, -0.036f);
            for (int j = 0; j < 4; j++)
            {
                int j1 = (j + 1) % 4;
                Color v = j == 0 || j == 3 ? Selka : Vatsa;
                Kolmio(r, karki, p[0, j], p[0, j1], j == 0 || j == 3 ? Kylki : Vatsa);
                for (int i = 0; i + 1 < kaari.Length; i++) Nelio(r, p[i, j], p[i, j1], p[i + 1, j1], p[i + 1, j], v);
                Kolmio(r, tyvi, p[kaari.Length - 1, j1], p[kaari.Length - 1, j], j == 0 || j == 3 ? Selka : Kylki);
            }
            // Selkäevä: takaviistoon kaartuva kolmio levein kohdan takana.
            r.Kolmio(new Vector3(0f, 0.0080f, 0.004f), new Vector3(0f, 0.0182f, -0.010f), new Vector3(0f, 0.0060f, -0.010f), Selka);
            // Pyrstö: kaksi lohkoa, kärjet taakse ja lovi keskellä.
            var juuri = new Vector3(0f, 0.0006f, -0.033f);
            foreach (float puoli in new[] { -1f, 1f })
                Kolmio(r, juuri, new Vector3(0.0138f * puoli, 0.0006f, -Pera), new Vector3(0f, 0.0006f, -0.041f), Selka, Vector3.up);
            // Rintaevät: kyljestä ulos ja taakse, hieman alaspäin.
            foreach (float puoli in new[] { -1f, 1f })
                r.Kolmio(new Vector3(0.0062f * puoli, -0.0030f, 0.019f), new Vector3(0.0150f * puoli, -0.0058f, 0.006f),
                    new Vector3(0.0060f * puoli, -0.0034f, 0.012f), Kylki);
            return r.Mesh("Meri: delfiini");
        }

        /// <summary>
        /// Varjo pinnan alla (10 kolmiota): delfiinin ääriviiva ylhäältä litteänä ja läpikuultavana (alfa 0,42, kuten valaan
        /// rintaevät pinnan alla), jotta parvi näkyy koko näytöksen ja hyppy erottuu tummuutena; hypyn ajan se jää pinnalle
        /// rungon alle varjoksi. Origo painopisteessä.
        /// </summary>
        public static Mesh Lapsi2()
        {
            var r = new MalliRakenne();
            Color c = MalliVarit.Hex(0x56625f); c.a = 0.42f;
            Vector3 P(float x, float z) => new Vector3(x, 0f, z);
            Vector3 nokka = P(0f, Nokka), lovi = P(0f, -0.041f), juuri = P(0f, -0.033f);
            float[] rz = { 0.036f, 0.026f, 0.006f, -0.030f }, rw = { 0.0026f, 0.0068f, 0.0094f, 0.0024f };
            KolmioVarit(r, nokka, P(rw[0], rz[0]), P(-rw[0], rz[0]), c, c, c);
            for (int i = 0; i + 1 < rz.Length; i++)
            {
                KolmioVarit(r, P(-rw[i], rz[i]), P(rw[i], rz[i]), P(rw[i + 1], rz[i + 1]), c, c, c);
                KolmioVarit(r, P(-rw[i], rz[i]), P(rw[i + 1], rz[i + 1]), P(-rw[i + 1], rz[i + 1]), c, c, c);
            }
            KolmioVarit(r, P(-rw[3], rz[3]), P(rw[3], rz[3]), juuri, c, c, c);
            foreach (float puoli in new[] { -1f, 1f })
                KolmioVarit(r, juuri, P(0.0145f * puoli, -Pera), lovi, c, c, c);
            return r.Mesh("Meri: delfiinin varjo");
        }

        /// <summary>
        /// Roiske (12 kolmiota): vaahtolätäkkö (valkoinen keskeltä, pehmeä reunoilta) ja kuuden piikin kruunu, joka nousee,
        /// leviää ja painuu; kylmän valkoinen erottuu vaaleasta merestä ylhäältäkin tähtenä.
        /// </summary>
        public static Mesh Lapsi3()
        {
            var r = new MalliRakenne();
            Color keski = Roiskevari, reuna = MeriGeometria.Vaahto, piikki = Roiskevari;
            keski.a = 0.85f; reuna.a = 0.25f; piikki.a = 0.95f;
            const int sivuja = 6;
            var o = new Vector3(0f, 0.001f, 0f);
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = i * Mathf.PI * 2f / sivuja, a1 = (i + 1) * Mathf.PI * 2f / sivuja;
                KolmioVarit(r, o, new Vector3(Mathf.Cos(a1) * 0.011f, 0.001f, Mathf.Sin(a1) * 0.011f),
                    new Vector3(Mathf.Cos(a0) * 0.011f, 0.001f, Mathf.Sin(a0) * 0.011f), keski, reuna, reuna);
                float a = a0 + Mathf.PI / sivuja, d = 0.32f;
                Vector3 b0 = new Vector3(Mathf.Cos(a - d) * 0.0075f, 0.0005f, Mathf.Sin(a - d) * 0.0075f);
                Vector3 b1 = new Vector3(Mathf.Cos(a + d) * 0.0075f, 0.0005f, Mathf.Sin(a + d) * 0.0075f);
                Vector3 kk = new Vector3(Mathf.Cos(a) * 0.0145f, 0.013f, Mathf.Sin(a) * 0.0145f);
                r.Kolmio(b0, kk, b1, piikki);
            }
            return r.Mesh("Meri: delfiinin roiske");
        }

        /// <summary>Kolmio kärkikohtaisin värein (roiskeen ja varjon alfa), normaali ylös.</summary>
        static void KolmioVarit(MalliRakenne r, Vector3 a, Vector3 b, Vector3 c, Color ca, Color cb, Color cc)
        {
            var n = Vector3.Cross(b - a, c - a).normalized;
            if (n.y < 0f) { var v = b; b = c; c = v; var cv = cb; cb = cc; cc = cv; n = -n; }
            int k = r.P.Count;
            r.P.Add(a); r.P.Add(b); r.P.Add(c);
            r.N.Add(n); r.N.Add(n); r.N.Add(n);
            r.C.Add(ca); r.C.Add(cb); r.C.Add(cc);
            r.T.Add(k); r.T.Add(k + 1); r.T.Add(k + 2);
        }

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : MeriGeometria.Pehmea(s / 1f) * MeriGeometria.Pehmea((pituus - s) / 1f);
        }

        /// <summary>
        /// Näytös: parvi ui tasaisesti (juuri 0,44 yksikköä näytöksessä) ja hyppää 2 tai 3 aaltoa näytöksen pituuden mukaan;
        /// aallossa delfiinit vuorotellen kärjestä alkaen. Hypyssä painopiste kulkee paraabelia (laki 0,024–0,030) ja asento
        /// seuraa kaaren tangenttia (lähtökulma noin 50°); ilmassa delfiini etenee uintia nopeammin ja jää pinnan alla
        /// pehmeästi takaisin paikalleen muodostelmaan. Roiske jää veteen, kun parvi etenee. Harvinaisessa viimeisen
        /// delfiinin viimeinen hyppy on korkea (laki 0,07, 1,35 s) ja siinä on täysi pyörähdys.
        /// </summary>
        public static void Animoi(Transform roottori, Transform[] lapset, float t, float nopeus)
        {
            if (lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);
            bool pohjoiseen = Aikataulu.Arvo(n, 3) < 0.5f;
            var suunta = Quaternion.Euler(0f, (pohjoiseen ? 0f : 180f) + (Aikataulu.Arvo(n, 4) - 0.5f) * 14f, 0f);
            float x0 = -0.08f + (Aikataulu.Arvo(n, 5) - 0.5f) * 0.04f, peili = Aikataulu.Arvo(n, 6) < 0.5f ? 1f : -1f;
            float v = Matka / pituus;
            roottori.localPosition = new Vector3(x0, 0f, 0f) + suunta * new Vector3(0f, 0f, v * s - Matka * 0.5f);
            roottori.localRotation = suunta;
            // Aallot: viimeinen sukellus ja roiske ehtivät ennen häivytystä (harvinaisessa korkea hyppy viiveineen ja iso roiske).
            int aaltoja = pituus >= (harv ? 8.8f : 7.4f) ? 3 : 2;
            float jakso = Mathf.Clamp((pituus - (harv ? 4.95f : 3.85f)) / (aaltoja - 1), 1.5f, 2.8f);

            for (int k = 0; k < Lapsia; k++)
            {
                var delfiini = lapset[k];
                var varjo = lapset[Lapsia + k];
                var roiske = lapset[Lapsia + Lapsia2 + k];
                float x = PaikkaX[k] * peili, z = PaikkaZ[k] + Siirto(n, k, s, aaltoja, jakso, v, harv);

                // Ilmassa oleva hyppy ja uusin roisketapahtuma (lähtö tai sukellus, roiske jää veteen parven edetessä).
                int ilmassa = -1; float q = 0f, laki = 0f, kaari = 1f; bool korkea = false;
                float ika = -1f, koko = 0f, zr = 0f;
                for (int j = 0; j < aaltoja; j++)
                {
                    var (T, A, h, L, kor) = Hyppy(n, k, j, aaltoja, jakso, v, harv);
                    if (s < T) break;
                    if (s <= T + A) { ilmassa = j; q = (s - T) / A; laki = h; kaari = L; korkea = kor; }
                    float elin = kor ? IsoRoiskeIka : RoiskeIka;
                    if (s - T - A >= 0f && s - T - A < elin)
                    {
                        ika = (s - T - A) / elin; koko = kor ? 1.9f : 1.3f;
                        zr = PaikkaZ[k] + Siirto(n, k, T + A, aaltoja, jakso, v, harv) - v * (s - T - A);
                    }
                    else if (s - T < RoiskeIka)
                    {
                        ika = (s - T) / RoiskeIka; koko = 0.9f;
                        zr = PaikkaZ[k] + Siirto(n, k, T, aaltoja, jakso, v, harv) - v * (s - T);
                    }
                }

                if (ilmassa >= 0)
                {
                    // Painopiste paraabelilla, asento kaaren tangentin mukaan (nokka ylös lähdössä, alas sukelluksessa).
                    float y = 4f * laki * q * (1f - q);
                    float kallistus = Mathf.Atan2(4f * laki * (1f - 2f * q), kaari) * Mathf.Rad2Deg;
                    float kierto = korkea ? 360f * MeriGeometria.Pehmea((q - 0.15f) / 0.7f) * (peili > 0f ? 1f : -1f) : 0f;
                    delfiini.localPosition = new Vector3(x, y, z);
                    delfiini.localRotation = Quaternion.Euler(-kallistus, 0f, kierto);
                    delfiini.localScale = Vector3.one;
                    // Varjo jää pinnalle delfiinin alle (lyhenee kallistuksen mukaan), joten kallistetusta kamerasta kaaren
                    // korkeus näkyy rungon ja varjon välinä; suoraan ylhäältä runko peittää sen.
                    varjo.localPosition = new Vector3(x, -0.0015f, z);
                    varjo.localRotation = Quaternion.identity;
                    varjo.localScale = new Vector3(1f, 1f, Mathf.Max(0.5f, Mathf.Cos(kallistus * Mathf.Deg2Rad)));
                }
                else
                {
                    // Uinti pinnan alla: varjo luikertelee (kääntyy ±5°, 1,2 Hz) ja heiluu sivuttain hieman.
                    float vaihe = s * 7.5f + k * 2.1f;
                    delfiini.localScale = Vector3.zero;
                    varjo.localPosition = new Vector3(x + 0.0012f * Mathf.Sin(vaihe - 1f), -0.0015f, z);
                    varjo.localRotation = Quaternion.Euler(0f, 5f * Mathf.Sin(vaihe), 0f);
                    varjo.localScale = Vector3.one;
                }

                if (ika >= 0f)
                {
                    // Kruunu nousee nopeasti (0,15 elinajasta), leviää ja painuu; lopuksi kutistuu pois.
                    float levea = koko * (0.6f + 0.7f * MeriGeometria.Pehmea(ika / 0.45f)) * (1f - MeriGeometria.Pehmea((ika - 0.55f) / 0.45f));
                    float nousu = koko * MeriGeometria.Pehmea(ika / 0.15f) * (1f - MeriGeometria.Pehmea((ika - 0.25f) / 0.75f));
                    roiske.localPosition = new Vector3(x, 0f, zr);
                    roiske.localRotation = Quaternion.Euler(0f, 30f * k + 20f * ika, 0f);
                    roiske.localScale = levea > 0.01f ? new Vector3(levea, Mathf.Max(0.05f, nousu), levea) : Vector3.zero;
                }
                else roiske.localScale = Vector3.zero;
            }
        }

        /// <summary>
        /// Hypyn j ajoitus ja muoto delfiinille k: lähtöhetki (aalto, porrastus ja ±0,06 s vaihtelu), ilma-aika, lakikorkeus
        /// (±10 %), kaaren vaakapituus (uinti ilma-ajan verran ja loikka) ja onko hyppy harvinaisen korkea.
        /// </summary>
        static (float T, float A, float laki, float kaari, bool korkea) Hyppy(int n, int k, int j, int aaltoja, float jakso, float v, bool harv)
        {
            bool korkea = harv && k == Lapsia - 1 && j == aaltoja - 1;
            float T = Alku + j * jakso + k * Porras + (Aikataulu.Arvo(n, 10 + 4 * k + j) - 0.5f) * 0.12f + (korkea ? KorkeaViive : 0f);
            float A = korkea ? KorkeaIlma : Ilma * (0.95f + 0.1f * Aikataulu.Arvo(n, 30 + 4 * k + j));
            float laki = korkea ? KorkeaLaki : Laki * (0.9f + 0.2f * Aikataulu.Arvo(n, 50 + 4 * k + j));
            return (T, A, laki, v * A + (korkea ? KorkeaLoikka : Loikka), korkea);
        }

        /// <summary>
        /// Delfiinin siirtymä muodostelmapaikasta kulkusuuntaan hetkellä s: ilmassa loikka kertyy tasaisesti (vaakanopeus
        /// vakio), ja pinnan alla delfiini jää pehmeästi takaisin paikalleen Palautus-ajassa.
        /// </summary>
        static float Siirto(int n, int k, float s, int aaltoja, float jakso, float v, bool harv)
        {
            float o = 0f;
            for (int j = 0; j < aaltoja; j++)
            {
                var (T, A, _, L, _) = Hyppy(n, k, j, aaltoja, jakso, v, harv);
                if (s <= T) break;
                float loikka = L - v * A;
                o += s <= T + A ? loikka * (s - T) / A : loikka * (1f - MeriGeometria.Pehmea((s - T - A) / Palautus));
            }
            return o;
        }

        /// <summary>Kolmio ulospäin (normaali poispäin rungon akselista) tai annettuun suuntaan.</summary>
        static void Kolmio(MalliRakenne r, Vector3 a, Vector3 b, Vector3 c, Color v, Vector3? ulos = null)
        {
            var n = Vector3.Cross(b - a, c - a);
            var keski = (a + b + c) / 3f;
            var o = ulos ?? new Vector3(keski.x, keski.y - 0.0006f, 0f);
            if (Vector3.Dot(n, o) < 0f) r.Kolmio(a, c, b, v); else r.Kolmio(a, b, c, v);
        }

        static void Nelio(MalliRakenne r, Vector3 a, Vector3 b, Vector3 c, Vector3 d, Color v)
        {
            var n = Vector3.Cross(b - a, d - a);
            var keski = (a + b + c + d) / 4f;
            if (Vector3.Dot(n, new Vector3(keski.x, keski.y - 0.0006f, 0f)) < 0f) r.Nelio(a, d, c, b, v); else r.Nelio(a, b, c, d, v);
        }
    }
}
