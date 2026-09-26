using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ARKKITYYPPIKIRJASTO (löydös 160, omistajan linjaus 26.9. kohta 11): 15 arkkityyppiä koodina samalla rakentajalla,
    /// paletilla ja tasavarjostuksella kuin prototyypin erikoismallit. Kaikki tason 1 nostot, joilla ei ole erikoismallia,
    /// ja tasojen 2–3 nostot (GPU-instansseina) piirretään näillä. Kartoitus nosto → arkkityyppi: ArkkityyppiKartoitus.
    ///
    /// Paikallinen koordinaatisto kuten erikoismalleilla: +Y ylös, +Z pohjoinen, pohja noin 1 yksikön levyinen ja
    /// origo pohjan keskellä. Muodot on liioiteltu, jotta siluetti erottuu 40–90 pt:n koossa (tasot 3–1).
    ///
    /// KOLMIOBUDJETTI (kohta 11): LOD0 ≤ 600, LOD1 ≤ 150 (sama muoto yksinkertaistettuna: vähemmän sivuja, ei hampaita,
    /// ikkunoita eikä pieniä osia). Toteutuneet määrät: <see cref="ArkkityyppiKolmiot"/> ja komento `symbolit tila`.
    /// LOD2 (siluettikvadi atlasista alle 18 pt:n koolle) on TODO: atlas vaatisi leivonnan editorissa.
    /// </summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>LOD0:n ja LOD1:n kolmiokatot (omistaja 26.9. kohta 11).</summary>
        public const int Lod0Katto = 600, Lod1Katto = 150;

        /// <summary>Luolan suu ja portin varjo: kartan muste (#4b3a1c, sama kuin nostomerkkien musterengas).</summary>
        static readonly Color Muste = Hex(0x4b3a1c);
        /// <summary>Vaimennettu terrakotta laajoille pinnoille (majakan raidat; Fable 26.9.: puna-valkoiset raidat olivat
        /// paletin kirkkain asia). Sama sekoitus kuin elävien elementtien MalliVarit.TerrakottaHimmea (45 % pintaa).</summary>
        static readonly Color TerrakottaHimmea = Color.Lerp(Terrakotta, Pinta, 0.45f);

        static readonly Mesh[,] arkkiVerkot = new Mesh[ArkkityyppiKartoitus.Lukumaara, 2];
        /// <summary>Kolmiot verkoittain (Mesh.triangles kopioi taulukon, joten määrä talteen rakennettaessa).</summary>
        static readonly int[,] arkkiKolmiot = new int[ArkkityyppiKartoitus.Lukumaara, 2];

        /// <summary>Arkkityypin verkko (lod 0 tai 1), rakennetaan ensimmäisellä käytöllä ja pidetään muistissa.</summary>
        public static Mesh ArkkityypinVerkko(Arkkityyppi a, int lod)
        {
            lod = lod <= 0 ? 0 : 1;
            var m = arkkiVerkot[(int)a, lod];
            if (m != null) return m;
            var r = new Rakentaja();
            Rakenna(r, a, lod == 1);
            if (r.Kolmioita > (lod == 0 ? Lod0Katto : Lod1Katto))
                Debug.LogWarning($"MATKAKIRJA symbolimallit: {a} LOD{lod} {r.Kolmioita} kolmiota yli budjetin");
            arkkiKolmiot[(int)a, lod] = r.Kolmioita;
            return arkkiVerkot[(int)a, lod] = r.Verkko(a + (lod == 0 ? "" : "-lod1"));
        }

        /// <summary>Arkkityypin kolmiot (lod 0 tai 1), rakentaa verkon tarvittaessa; ei varaa muistia.</summary>
        public static int ArkkityypinKolmiot(Arkkityyppi a, int lod)
        {
            ArkkityypinVerkko(a, lod);
            return arkkiKolmiot[(int)a, lod <= 0 ? 0 : 1];
        }

        /// <summary>Kolmiot arkkityypeittäin (LOD0, LOD1), rakentaa verkot tarvittaessa (tila, raportti).</summary>
        public static (int lod0, int lod1) ArkkityyppiKolmiot(Arkkityyppi a) => (ArkkityypinKolmiot(a, 0), ArkkityypinKolmiot(a, 1));

        static void Rakenna(Rakentaja r, Arkkityyppi a, bool k)
        {
            switch (a)
            {
                case Arkkityyppi.Temppeli: ATemppeli(r, k); break;
                case Arkkityyppi.Kirkko: AKirkko(r, k); break;
                case Arkkityyppi.Luostari: ALuostari(r, k); break;
                case Arkkityyppi.Linna: ALinna(r, k); break;
                case Arkkityyppi.Kaupunginmuuri: AMuuri(r, k); break;
                case Arkkityyppi.Majakka: AMajakka(r, k); break;
                case Arkkityyppi.Silta: ASilta(r, k); break;
                case Arkkityyppi.Mylly: AMylly(r, k); break;
                case Arkkityyppi.Satama: ASatama(r, k); break;
                case Arkkityyppi.Luola: ALuola(r, k); break;
                case Arkkityyppi.Muistomerkki: AMuistomerkki(r, k); break;
                case Arkkityyppi.Raunio: ARaunio(r, k); break;
                case Arkkityyppi.Kaupunkitalo: AKaupunkitalo(r, k); break;
                case Arkkityyppi.Vuori: AVuori(r, k); break;
                default: AMerkkikivi(r, k); break;
            }
        }

        static Vector3 V(float x, float y, float z) => new Vector3(x, y, z);

        // ---- Arkkityypit (k = LOD1) ----

        /// <summary>Temppeli: kaksiportainen stylobaatti, pylväskehä, arkkitraavi ja matala harjakatto päätykolmioineen.</summary>
        static void ATemppeli(Rakentaja r, bool k)
        {
            r.Laatikko(Vector3.zero, V(0.94f, 0.035f, 0.54f), Varjo, Pinta);
            r.Laatikko(V(0, 0.035f, 0), V(0.86f, 0.035f, 0.48f), Pinta, Valo);
            var y = V(0, 0.07f, 0);
            const float h = 0.27f;
            r.Laatikko(y, V(0.5f, h - 0.02f, 0.22f), Pinta, Pinta); // cella pylväiden takana
            if (k)
            {
                // Pitkät sivut: 4 + 4 nelikulmaista pylvästä.
                for (int i = 0; i < 4; i++)
                {
                    float x = -0.33f + i * 0.22f;
                    r.Pylvas(y + V(x, 0, -0.17f), 0.034f, h, 4, Valo);
                    r.Pylvas(y + V(x, 0, 0.17f), 0.034f, h, 4, Valo);
                }
            }
            else
            {
                // Kehä: 5 pylvästä kummallakin pitkällä sivulla ja 2 kummankin päädyn keskellä (8-kulmaiset).
                for (int i = 0; i < 5; i++)
                {
                    float x = -0.36f + i * 0.18f;
                    r.Pylvas(y + V(x, 0, -0.17f), 0.026f, h, 8, Valo);
                    r.Pylvas(y + V(x, 0, 0.17f), 0.026f, h, 8, Valo);
                }
                for (int i = 0; i < 2; i++)
                {
                    float z = -0.057f + i * 0.114f;
                    r.Pylvas(y + V(-0.36f, 0, z), 0.026f, h, 8, Valo);
                    r.Pylvas(y + V(0.36f, 0, z), 0.026f, h, 8, Valo);
                }
            }
            r.Laatikko(y + Vector3.up * h, V(0.8f, 0.035f, 0.42f), Valo, Valo);
            r.Harja(y + Vector3.up * (h + 0.035f), V(0.8f, 0.085f, 0.42f), Pinta, Valo);
        }

        /// <summary>Kirkko: laiva harjakattoineen itä–länsi-suunnassa, länsitorni ja terävä kypärä, itäpään apsis.</summary>
        static void AKirkko(Rakentaja r, bool k)
        {
            var laiva = V(0.08f, 0, 0);
            r.Laatikko(laiva, V(0.6f, 0.24f, 0.3f), Pinta, Pinta);
            r.Harja(laiva + Vector3.up * 0.24f, V(0.6f, 0.18f, 0.3f), Terrakotta, Pinta);
            var torni = V(-0.3f, 0, 0);
            r.Laatikko(torni, V(0.19f, 0.5f, 0.19f), Valo, Valo);
            r.Pyramidi(torni + Vector3.up * 0.5f, 0.21f, 0.21f, 0.34f, Terrakotta);
            if (k) return;
            // Apsis (8-kulmainen, puolet laivan sisällä) kartiokattoineen.
            r.Rengaskallio(V(0.38f, 0, 0), new[] { (0f, 0.24f, 0.24f), (0.19f, 0.24f, 0.24f) }, float.NaN, 8, 1, Pinta, Pinta, 0f);
            r.Kartio(V(0.38f, 0.19f, 0), 0.125f, 0.12f, 8, Terrakotta);
            // Sivulaivat: matalat laatikot pulpettikattoineen.
            for (int s = -1; s <= 1; s += 2)
            {
                var sl = laiva + V(0.02f, 0, s * 0.2f);
                r.Laatikko(sl, V(0.5f, 0.14f, 0.1f), Pinta, Varjo);
                r.NelioKeskelta(sl + V(-0.25f, 0.14f, s * 0.05f), sl + V(0.25f, 0.14f, s * 0.05f), sl + V(0.25f, 0.2f, -s * 0.05f),
                    sl + V(-0.25f, 0.2f, -s * 0.05f), sl + V(0, 0.05f, -s * 0.05f), Terrakotta);
            }
            // Kellotornin äänireiät ja risti kypärän huipulla.
            float yk = 0.36f;
            r.NelioUlos(torni + V(-0.04f, yk, -0.097f), torni + V(-0.04f, yk + 0.08f, -0.097f), torni + V(0.04f, yk + 0.08f, -0.097f),
                torni + V(0.04f, yk, -0.097f), Vector3.back, Muste);
            r.NelioUlos(torni + V(-0.097f, yk, -0.04f), torni + V(-0.097f, yk + 0.08f, -0.04f), torni + V(-0.097f, yk + 0.08f, 0.04f),
                torni + V(-0.097f, yk, 0.04f), Vector3.left, Muste);
            r.Laatikko(torni + Vector3.up * 0.83f, V(0.016f, 0.1f, 0.016f), Varjo, Varjo);
            r.Laatikko(torni + Vector3.up * 0.88f, V(0.06f, 0.016f, 0.016f), Varjo, Varjo);
            // Ikkunat eteläisen sivulaivan seinällä.
            for (int i = 0; i < 3; i++)
            {
                float x = laiva.x - 0.16f + i * 0.16f;
                r.NelioUlos(V(x - 0.022f, 0.04f, -0.252f), V(x - 0.022f, 0.11f, -0.252f), V(x + 0.022f, 0.11f, -0.252f),
                    V(x + 0.022f, 0.04f, -0.252f), Vector3.back, Muste);
            }
        }

        /// <summary>Luostari: kirkko pohjoisreunalla ja sen eteläpuolella umpipiha (neljä siipeä, sage-puutarha).</summary>
        static void ALuostari(Rakentaja r, bool k)
        {
            var kirkko = V(0.02f, 0, 0.26f);
            r.Laatikko(kirkko, V(0.58f, 0.24f, 0.22f), Valo, Valo);
            r.Harja(kirkko + Vector3.up * 0.24f, V(0.58f, 0.14f, 0.22f), Terrakotta, Valo);
            var torni = kirkko + V(-0.2f, 0, -0.02f);
            r.Laatikko(torni, V(0.14f, 0.44f, 0.14f), Valo, Valo);
            r.Pyramidi(torni + Vector3.up * 0.44f, 0.16f, 0.16f, 0.16f, Terrakotta);
            // Umpipiha: siivet 0,82 × 0,5, leveys 0,11.
            var piha = V(0, 0, -0.14f);
            const float lx = 0.82f, lz = 0.5f, w = 0.11f, h = 0.15f;
            r.Laatikko(piha + V(0, 0, -lz * 0.5f + w * 0.5f), V(lx, h, w), Pinta, Pinta);
            r.Laatikko(piha + V(-lx * 0.5f + w * 0.5f, 0, 0), V(w, h, lz - 2 * w), Pinta, Pinta);
            r.Laatikko(piha + V(lx * 0.5f - w * 0.5f, 0, 0), V(w, h, lz - 2 * w), Pinta, Pinta);
            if (k) return;
            r.Harja(piha + V(0, h, -lz * 0.5f + w * 0.5f), V(lx, 0.07f, w), Terrakotta, Pinta);
            r.HarjaZ(piha + V(-lx * 0.5f + w * 0.5f, h, 0), V(w, 0.07f, lz - 2 * w), Terrakotta, Pinta);
            r.HarjaZ(piha + V(lx * 0.5f - w * 0.5f, h, 0), V(w, 0.07f, lz - 2 * w), Terrakotta, Pinta);
            r.Laatikko(piha + V(0, 0, lz * 0.5f - w * 0.5f), V(lx, 0.1f, w), Pinta, Varjo); // pohjoissiipi matalampi
            r.Nelio(piha + V(-lx * 0.5f + w, 0.004f, -lz * 0.5f + w), piha + V(-lx * 0.5f + w, 0.004f, lz * 0.5f - w),
                piha + V(lx * 0.5f - w, 0.004f, lz * 0.5f - w), piha + V(lx * 0.5f - w, 0.004f, -lz * 0.5f + w), Oliivi);
            r.Kartio(piha + V(0, 0.004f, 0), 0.04f, 0.1f, 6, Oliivi); // pihan puu
            // Apsis ja portti eteläsiivessä.
            r.Rengaskallio(kirkko + V(0.29f, 0, 0), new[] { (0f, 0.18f, 0.18f), (0.19f, 0.18f, 0.18f) }, 0.28f, 8, 1, Valo, Terrakotta, 0f);
            r.NelioUlos(piha + V(-0.04f, 0, -lz * 0.5f - 0.002f), piha + V(-0.04f, 0.1f, -lz * 0.5f - 0.002f),
                piha + V(0.04f, 0.1f, -lz * 0.5f - 0.002f), piha + V(0.04f, 0, -lz * 0.5f - 0.002f), Vector3.back, Muste);
        }

        /// <summary>Linna: korkea päätorni hampain, muurikehä ja neljä pyöreää kulmatornia kartiokattoineen.</summary>
        static void ALinna(Rakentaja r, bool k)
        {
            const float lx = 0.8f, lz = 0.62f, hm = 0.2f, w = 0.06f;
            // Muurit.
            r.Laatikko(V(0, 0, -lz * 0.5f), V(lx, hm, w), Pinta, Valo);
            r.Laatikko(V(0, 0, lz * 0.5f), V(lx, hm, w), Pinta, Valo);
            r.Laatikko(V(-lx * 0.5f, 0, 0), V(w, hm, lz), Pinta, Valo);
            r.Laatikko(V(lx * 0.5f, 0, 0), V(w, hm, lz), Pinta, Valo);
            // Päätorni pohjoispuolella.
            var paa = V(0.04f, 0, 0.06f);
            r.Laatikko(paa, V(0.3f, 0.5f, 0.28f), Valo, Varjo);
            int sivut = k ? 6 : 10;
            for (int i = 0; i < 4; i++)
            {
                var p = V((i % 2 == 0 ? -1 : 1) * lx * 0.5f, 0, (i < 2 ? -1 : 1) * lz * 0.5f);
                r.Vaippa(p, 0.085f, 0.075f, 0.32f, sivut, Pinta);
                r.Kartio(p + Vector3.up * 0.32f, 0.1f, 0.2f, sivut, Terrakotta);
            }
            if (k) return;
            // Päätornin hampaat (3 per sivu) ja etumuurin hampaat, portti.
            float yt = 0.5f, hx = 0.15f, hz = 0.14f;
            var hk = V(0.05f, 0.05f, 0.05f);
            r.Hampaat(paa + V(-hx + 0.025f, yt, -hz + 0.025f), paa + V(hx - 0.025f, yt, -hz + 0.025f), 3, hk, Valo, Valo);
            r.Hampaat(paa + V(-hx + 0.025f, yt, hz - 0.025f), paa + V(hx - 0.025f, yt, hz - 0.025f), 3, hk, Valo, Valo);
            r.Hampaat(paa + V(-hx + 0.025f, yt, -hz + 0.1f), paa + V(-hx + 0.025f, yt, hz - 0.1f), 1, hk, Valo, Valo);
            r.Hampaat(paa + V(hx - 0.025f, yt, -hz + 0.1f), paa + V(hx - 0.025f, yt, hz - 0.1f), 1, hk, Valo, Valo);
            r.Hampaat(V(-lx * 0.5f + 0.1f, hm, -lz * 0.5f), V(lx * 0.5f - 0.1f, hm, -lz * 0.5f), 6, V(0.045f, 0.04f, w), Pinta, Valo);
            r.Viuhka(V(0, 0, -lz * 0.5f - w * 0.5f - 0.002f), 0.06f, 0.13f, 5, Vector3.back, Muste);
        }

        /// <summary>Kaupunginmuuri: porttirakennus holvikaarineen, kaksi pyöreää sivutornia ja hammastetut muurinpätkät.</summary>
        static void AMuuri(Rakentaja r, bool k)
        {
            const float z0 = -0.1f, z1 = 0.1f, yt = 0.34f, aukko = 0.16f;
            // Portti: holvi ja sen molemmin puolin pielet, kaaren yllä kansi.
            r.Kaari(0, aukko, 0.12f, aukko * 0.5f, yt, z0, z1, k ? 3 : 7, Pinta, Varjo);
            r.Laatikko(V(-aukko * 0.5f - 0.06f, 0, 0), V(0.12f, yt, z1 - z0), Pinta, Valo);
            r.Laatikko(V(aukko * 0.5f + 0.06f, 0, 0), V(0.12f, yt, z1 - z0), Pinta, Valo);
            r.Laatikko(V(0, yt, 0), V(aukko + 0.24f, 0.03f, z1 - z0), Pinta, Valo);
            // Muurinpätkät.
            r.Laatikko(V(-0.4f, 0, 0.02f), V(0.26f, 0.22f, 0.09f), Pinta, Valo);
            r.Laatikko(V(0.4f, 0, 0.02f), V(0.26f, 0.22f, 0.09f), Pinta, Valo);
            // Sivutornit.
            int sivut = k ? 6 : 10;
            for (int s = -1; s <= 1; s += 2)
            {
                var p = V(s * 0.25f, 0, -0.02f);
                r.Vaippa(p, 0.08f, 0.075f, 0.42f, sivut, Valo);
                r.Kartio(p + Vector3.up * 0.42f, 0.095f, 0.18f, sivut, Terrakotta);
            }
            if (k) return;
            r.Viuhka(V(0, 0, 0), aukko * 0.5f, 0.12f + aukko * 0.5f, 6, Vector3.back, Muste); // varjo holvin keskellä
            r.Hampaat(V(-aukko * 0.5f - 0.1f, yt + 0.03f, z0 + 0.02f), V(aukko * 0.5f + 0.1f, yt + 0.03f, z0 + 0.02f), 4,
                V(0.04f, 0.045f, 0.04f), Pinta, Valo);
            r.Hampaat(V(-0.52f, 0.22f, -0.015f), V(-0.28f, 0.22f, -0.015f), 3, V(0.04f, 0.04f, 0.02f), Pinta, Valo);
            r.Hampaat(V(0.28f, 0.22f, -0.015f), V(0.52f, 0.22f, -0.015f), 3, V(0.04f, 0.04f, 0.02f), Pinta, Valo);
        }

        /// <summary>Majakka: kalliopohja, kapeneva raidallinen torni, parveke, lyhty ja kupoli; vartijan talo.</summary>
        static void AMajakka(Rakentaja r, bool k)
        {
            int s = k ? 6 : 10;
            r.Rengaskallio(Vector3.zero, new[] { (0f, 0.62f, 0.5f), (0.07f, 0.5f, 0.42f) }, float.NaN, k ? 6 : 9, 5, Kivi, Pinta, 0.3f);
            var p = V(0.04f, 0.07f, 0.02f);
            // Torni neljänä raitana (valo ja vaimennettu terrakotta vuorotellen), LOD1 kahtena. Ei lippua.
            float[] y = k ? new[] { 0f, 0.28f, 0.56f } : new[] { 0f, 0.14f, 0.28f, 0.42f, 0.56f };
            for (int i = 0; i + 1 < y.Length; i++)
            {
                float r0 = Mathf.Lerp(0.13f, 0.085f, y[i] / 0.56f), r1 = Mathf.Lerp(0.13f, 0.085f, y[i + 1] / 0.56f);
                r.Vaippa(p + Vector3.up * y[i], r0, r1, y[i + 1] - y[i], s, i % 2 == 0 ? Valo : TerrakottaHimmea);
            }
            var yla = p + Vector3.up * 0.56f;
            r.Rengaskallio(yla, new[] { (0f, 0.26f, 0.26f), (0.025f, 0.26f, 0.26f) }, float.NaN, s, 1, Varjo, Varjo, 0f); // parveke
            r.Pylvas(yla + Vector3.up * 0.025f, 0.06f, 0.08f, s, Valo);                                                     // lyhty
            r.Kartio(yla + Vector3.up * 0.105f, 0.075f, 0.07f, s, Terrakotta);                                              // kupoli
            if (k) return;
            r.Laatikko(V(-0.2f, 0.07f, -0.06f), V(0.16f, 0.1f, 0.12f), Pinta, Pinta);
            r.Harja(V(-0.2f, 0.17f, -0.06f), V(0.16f, 0.07f, 0.12f), Terrakotta, Pinta);
            r.NelioUlos(yla + V(-0.03f, 0.04f, -0.062f), yla + V(-0.03f, 0.09f, -0.062f), yla + V(0.03f, 0.09f, -0.062f),
                yla + V(0.03f, 0.04f, -0.062f), Vector3.back, Muste); // lyhdyn ikkuna etelään
        }

        /// <summary>Silta: kolmiaukkoinen kivinen holvisilta (keskiaukko suurin), kansi ja kaiteet.</summary>
        static void ASilta(Rakentaja r, bool k)
        {
            const float z0 = -0.09f, z1 = 0.09f, yt = 0.26f, ys = 0.04f;
            int n = k ? 3 : 8;
            // Pilarit ja maatuet (x-välit): 0,06 + 0,22 + 0,06 + 0,3 + 0,06 + 0,22 + 0,06 = 0,98.
            float[] pilarit = { -0.46f, -0.18f, 0.18f, 0.46f };
            foreach (float x in pilarit) r.Laatikko(V(x, 0, 0), V(0.06f, yt, z1 - z0), Pinta, Valo);
            r.Kaari(-0.32f, 0.22f, ys, 0.11f, yt, z0, z1, n, Pinta, Varjo);
            r.Kaari(0f, 0.3f, ys, 0.15f, yt, z0, z1, n, Pinta, Varjo);
            r.Kaari(0.32f, 0.22f, ys, 0.11f, yt, z0, z1, n, Pinta, Varjo);
            // Kansi (pilarien kyljet aukkoihin päin ovat laatikoissa).
            r.Laatikko(V(0, yt, 0), V(0.98f, 0.03f, z1 - z0 + 0.02f), Pinta, Valo);
            if (k) return;
            r.Laatikko(V(0, yt + 0.03f, z0 + 0.005f), V(0.98f, 0.045f, 0.012f), Valo, Valo);
            r.Laatikko(V(0, yt + 0.03f, z1 - 0.005f), V(0.98f, 0.045f, 0.012f), Valo, Valo);
            // Virtaa vasten teroitetut pilarinnokat (kaksi keskipilaria, eteläpuolella).
            foreach (float x in new[] { -0.18f, 0.18f })
                r.Pyramidi(V(x, 0, z0 - 0.02f), 0.06f, 0.04f, ys + 0.06f, Pinta);
        }

        /// <summary>Mylly: hollantilainen kattomylly, kahdeksankulmainen runko jalustalla, lakki ja X-asentoiset siivet.</summary>
        static void AMylly(Rakentaja r, bool k)
        {
            int s = 8;
            // Runko olkikaton sävyssä (varjo): paletin sage näytti kartalla sinertävältä (kuten prototyypin oliivipuissa).
            if (!k) r.Vaippa(Vector3.zero, 0.24f, 0.22f, 0.14f, s, Kivi, Mathf.PI / 8f);
            r.Rengaskallio(V(0, k ? 0f : 0.14f, 0), new[] { (0f, 0.44f, 0.44f), (k ? 0.56f : 0.42f, 0.28f, 0.28f) }, float.NaN, s, 1, Varjo, Varjo, 0f);
            float yl = 0.56f;
            r.Rengaskallio(V(0, yl, 0), new[] { (0f, 0.3f, 0.3f), (0.04f, 0.28f, 0.28f) }, 0.14f, s, 1, Terrakotta, Terrakotta, 0f);
            // Siivet X-asennossa etelään päin (akseli hieman lakin edessä).
            var napa = V(0, yl + 0.05f, -0.21f);
            float pit = k ? 0.4f : 0.42f, lev = 0.085f, alku = 0.05f;
            for (int i = 0; i < 4; i++)
            {
                float a = Mathf.PI * 0.25f + i * Mathf.PI * 0.5f;
                Vector3 ulos = V(Mathf.Cos(a), Mathf.Sin(a), 0), sivu = V(-Mathf.Sin(a), Mathf.Cos(a), 0);
                r.Kalvo(napa + ulos * alku, napa + ulos * pit, napa + ulos * pit + sivu * lev, napa + ulos * alku + sivu * lev, Valo);
                if (!k)
                {
                    // Siipipuu ja kaksi ristikon poikkipuuta.
                    r.Kalvo(napa + ulos * 0f - sivu * 0.008f + Vector3.back * 0.003f, napa + ulos * pit - sivu * 0.008f + Vector3.back * 0.003f,
                        napa + ulos * pit + sivu * 0.008f + Vector3.back * 0.003f, napa + sivu * 0.008f + Vector3.back * 0.003f, Varjo);
                    for (int j = 1; j <= 2; j++)
                    {
                        var q = napa + ulos * (alku + (pit - alku) * j / 3f) + Vector3.back * 0.003f;
                        r.Kalvo(q - ulos * 0.007f, q + ulos * 0.007f, q + ulos * 0.007f + sivu * lev, q - ulos * 0.007f + sivu * lev, Varjo);
                    }
                }
            }
            if (k) return;
            r.Laatikko(napa + V(0, -0.015f, 0.04f), V(0.03f, 0.03f, 0.09f), Varjo, Varjo); // akseli lakista napaan
            // Lava (stelling) jalustan päällä ja ovi.
            r.Rengaskallio(V(0, 0.14f, 0), new[] { (0f, 0.62f, 0.62f), (0.015f, 0.62f, 0.62f) }, float.NaN, s, 1, Pinta, Pinta, 0f);
            r.NelioUlos(V(-0.035f, 0, -0.226f), V(-0.035f, 0.1f, -0.226f), V(0.035f, 0.1f, -0.226f), V(0.035f, 0, -0.226f), Vector3.back, Muste);
        }

        /// <summary>Satama: laituri ja pistolaituri, makasiini, purjevene ja pienempi vene, laiturin pään loisto.</summary>
        static void ASatama(Rakentaja r, bool k)
        {
            r.Laatikko(V(0, 0, 0.2f), V(0.94f, 0.06f, 0.22f), Varjo, Pinta);        // rantalaituri
            r.Laatikko(V(0.22f, 0, -0.14f), V(0.12f, 0.05f, 0.5f), Varjo, Pinta);   // pistolaituri etelään
            r.Laatikko(V(-0.2f, 0.06f, 0.22f), V(0.34f, 0.16f, 0.16f), Pinta, Pinta); // makasiini
            r.Harja(V(-0.2f, 0.22f, 0.22f), V(0.34f, 0.08f, 0.16f), Terrakotta, Pinta);
            Vene(r, V(0.04f, 0, -0.12f), 0.13f, 0.4f, 0.36f, k);
            if (k) return;
            Vene(r, V(0.38f, 0, -0.2f), 0.09f, 0.26f, 0.22f, false);
            r.Pylvas(V(0.22f, 0.05f, -0.36f), 0.025f, 0.12f, 6, Valo);               // loisto
            r.Kartio(V(0.22f, 0.17f, -0.36f), 0.035f, 0.05f, 6, Terrakotta);
            r.Laatikko(V(0.18f, 0.06f, 0.2f), V(0.08f, 0.06f, 0.08f), Kivi, Kivi);    // lastia
            r.Laatikko(V(0.3f, 0.06f, 0.18f), V(0.07f, 0.05f, 0.07f), Pinta, Kivi);
            r.NelioUlos(V(-0.24f, 0.06f, 0.138f), V(-0.24f, 0.17f, 0.138f), V(-0.16f, 0.17f, 0.138f), V(-0.16f, 0.06f, 0.138f), Vector3.back, Muste);
        }

        /// <summary>Vene: vinoneliön muotoinen runko (terävä keula ja perä pohjois–etelä-suunnassa), masto ja purje.</summary>
        static void Vene(Rakentaja r, Vector3 p, float leveys, float pituus, float masto, bool k)
        {
            r.Rengaskallio(p, new[] { (0f, leveys * 0.55f, pituus * 0.8f), (0.07f, leveys, pituus) }, float.NaN, 4, 1, Terrakotta, Pinta, 0f);
            var m = p + Vector3.up * 0.07f;
            r.Laatikko(m, V(0.012f, masto, 0.012f), Varjo, Varjo);
            r.KalvoKolmio(m + V(0.008f, 0.03f, -pituus * 0.3f), m + V(0.008f, masto * 0.95f, 0), m + V(0.008f, 0.03f, 0), Valo);
            if (!k) r.KalvoKolmio(m + V(0.008f, 0.03f, 0.01f), m + V(0.008f, masto * 0.8f, 0.01f), m + V(0.008f, 0.03f, pituus * 0.35f), Valo);
        }

        /// <summary>Luola: kallioinen kumpare ruohoisella laella ja kiviportaali, jonka suu on mustetta.</summary>
        static void ALuola(Rakentaja r, bool k)
        {
            r.Rengaskallio(V(0, 0, 0.06f), k
                    ? new[] { (0f, 0.92f, 0.72f), (0.22f, 0.66f, 0.5f) }
                    : new[] { (0f, 0.92f, 0.72f), (0.14f, 0.84f, 0.64f), (0.26f, 0.58f, 0.44f) },
                0.36f, k ? 7 : 11, 3, Kivi, Oliivi, 0.25f);
            const float z0 = -0.4f, z1 = -0.2f, aukko = 0.24f, yt = 0.24f;
            r.Kaari(0, aukko, 0.02f, 0.15f, yt, z0, z1, k ? 3 : 6, Kivi, Varjo);
            r.Laatikko(V(-aukko * 0.5f - 0.05f, 0, (z0 + z1) * 0.5f), V(0.1f, yt, z1 - z0), Kivi, Pinta);
            r.Laatikko(V(aukko * 0.5f + 0.05f, 0, (z0 + z1) * 0.5f), V(0.1f, yt, z1 - z0), Kivi, Pinta);
            r.Laatikko(V(0, yt, (z0 + z1) * 0.5f), V(aukko + 0.2f, 0.03f, z1 - z0), Kivi, Oliivi);
            // Suu: musteinen viuhka portaalin takaosassa ja pielten sisäpinnat.
            r.Viuhka(V(0, 0.02f, z1 - 0.01f), aukko * 0.5f, 0.15f, k ? 4 : 8, Vector3.back, Muste);
            r.Nelio(V(-aukko * 0.5f, 0.003f, z0), V(-aukko * 0.5f, 0.003f, z1), V(aukko * 0.5f, 0.003f, z1), V(aukko * 0.5f, 0.003f, z0), Muste);
            if (k) return;
            // Irtokiviä suun edessä.
            r.Rengaskallio(V(-0.26f, 0, -0.38f), new[] { (0f, 0.09f, 0.07f), (0.04f, 0.06f, 0.05f) }, 0.06f, 5, 8, Kivi, Pinta, 0.4f);
            r.Rengaskallio(V(0.24f, 0, -0.42f), new[] { (0f, 0.07f, 0.06f), (0.03f, 0.05f, 0.04f) }, 0.045f, 5, 9, Kivi, Pinta, 0.4f);
        }

        /// <summary>Muistomerkki: porrastettu jalusta ja obeliski pyramidikärkineen, kaksi lyhtypylvästä.</summary>
        static void AMuistomerkki(Rakentaja r, bool k)
        {
            r.Laatikko(Vector3.zero, V(0.56f, 0.04f, 0.56f), Varjo, Pinta);
            if (!k)
            {
                r.Laatikko(V(0, 0.04f, 0), V(0.44f, 0.04f, 0.44f), Pinta, Valo);
                r.Laatikko(V(0, 0.08f, 0), V(0.32f, 0.04f, 0.32f), Pinta, Valo);
            }
            float y = k ? 0.04f : 0.12f;
            r.Laatikko(V(0, y, 0), V(0.2f, 0.12f, 0.2f), Valo, Valo);
            // Obeliski: kapeneva nelikulmainen varsi (akselisuuntainen) ja pyramidikärki.
            float yv = y + 0.12f, hv = 0.52f, a0 = 0.065f, a1 = 0.04f; // puolileveydet alhaalla ja ylhäällä
            var ala = new[] { V(-a0, yv, -a0), V(a0, yv, -a0), V(a0, yv, a0), V(-a0, yv, a0) };
            var yla = new[] { V(-a1, yv + hv, -a1), V(a1, yv + hv, -a1), V(a1, yv + hv, a1), V(-a1, yv + hv, a1) };
            var kk = V(0, yv + hv * 0.5f, 0);
            for (int i = 0; i < 4; i++)
            {
                int j = (i + 1) % 4;
                r.NelioKeskelta(ala[i], yla[i], yla[j], ala[j], kk, Valo);
            }
            r.Pyramidi(V(0, yv + hv, 0), 2f * a1, 2f * a1, 0.07f, Pinta);
            if (k) return;
            for (int s = -1; s <= 1; s += 2)
            {
                var p = V(s * 0.22f, 0.04f, -0.22f);
                r.Pylvas(p, 0.014f, 0.16f, 6, Varjo);
                r.Kartio(p + Vector3.up * 0.16f, 0.028f, 0.04f, 6, Varjo);
            }
            r.Laatikko(V(0, y + 0.04f, -0.101f), V(0.12f, 0.05f, 0.004f), Varjo, Varjo); // muistolaatta
        }

        /// <summary>Raunio: kaksiportainen alusta, katkenneet pylväät eri korkeuksilla, arkkitraavin pala ja kaatuneita kiviä.</summary>
        static void ARaunio(Rakentaja r, bool k)
        {
            r.Laatikko(Vector3.zero, V(0.9f, 0.035f, 0.52f), Varjo, Pinta);
            if (!k) r.Laatikko(V(0, 0.035f, 0), V(0.82f, 0.03f, 0.44f), Pinta, Valo);
            float y = k ? 0.035f : 0.065f;
            // Pylväsrivi: kaksi ehjää (kannattaa arkkitraavia) ja kolme katkennutta.
            float[] x = { -0.3f, -0.15f, 0.05f, 0.2f, 0.33f };
            float[] h = { 0.36f, 0.36f, 0.2f, 0.12f, 0.26f };
            int s = k ? 4 : 8;
            for (int i = 0; i < x.Length; i++) r.Pylvas(V(x[i], y, -0.1f), k ? 0.035f : 0.03f, h[i], s, Valo);
            r.Laatikko(V(-0.225f, y + 0.36f, -0.1f), V(0.24f, 0.05f, 0.08f), Valo, Pinta);
            r.Laatikko(V(0.15f, y, 0.12f), V(0.14f, 0.05f, 0.08f), Pinta, Valo);                          // kaatunut kivi
            if (k) return;
            r.Laatikko(V(-0.2f, y, 0.14f), V(0.36f, 0.12f, 0.05f), Pinta, Pinta);                          // matala seinänjäänne
            r.Laatikko(V(-0.36f, y, 0.06f), V(0.05f, 0.08f, 0.14f), Pinta, Pinta);
            r.Laatikko(V(0.32f, y, 0.1f), V(0.07f, 0.04f, 0.1f), Kivi, Pinta);
            r.Laatikko(V(0.05f, y, 0.02f), V(0.06f, 0.05f, 0.06f), Kivi, Pinta);
            // Kaatunut rumpu kyljellään (8-kulmainen, x-akselin suuntainen) alustan edessä.
            RumpuKyljellaan(r, V(0.18f, y, -0.25f), 0.03f, 0.12f);
            // Pylväänpäät ehjillä pylväillä.
            r.Laatikko(V(-0.3f, y + 0.345f, -0.1f), V(0.075f, 0.015f, 0.075f), Valo, Valo);
            r.Laatikko(V(-0.15f, y + 0.345f, -0.1f), V(0.075f, 0.015f, 0.075f), Valo, Valo);
        }

        /// <summary>Kaatunut pylväsrumpu: 8-kulmainen lieriö x-akselin suunnassa maassa (keskipohja p).</summary>
        static void RumpuKyljellaan(Rakentaja r, Vector3 p, float sade, float pituus)
        {
            var k = p + Vector3.up * sade;
            for (int i = 0; i < 8; i++)
            {
                float a0 = i * Mathf.PI / 4f, a1 = (i + 1) * Mathf.PI / 4f;
                Vector3 d0 = V(0, Mathf.Sin(a0), Mathf.Cos(a0)) * sade, d1 = V(0, Mathf.Sin(a1), Mathf.Cos(a1)) * sade;
                Vector3 x = Vector3.right * (pituus * 0.5f);
                r.NelioKeskelta(k - x + d0, k + x + d0, k + x + d1, k - x + d1, k, Valo);
                r.KolmioUlos(k + x, k + x + d0, k + x + d1, Vector3.right, Valo);
                r.KolmioUlos(k - x, k - x + d0, k - x + d1, Vector3.left, Valo);
            }
        }

        /// <summary>Kaupunkitalo: neljä kapeaa päätytaloa rivissä (päädyt etelään) ja raatihuoneen kellotorni.</summary>
        static void AKaupunkitalo(Rakentaja r, bool k)
        {
            // (x, leveys, räystäs, harja, seinä, katto)
            var talot = new (float x, float l, float h, float hh, Color s, Color c)[]
            {
                (-0.38f, 0.16f, 0.26f, 0.14f, Pinta, Terrakotta), (-0.21f, 0.15f, 0.32f, 0.13f, Valo, Varjo),
                (0.21f, 0.16f, 0.28f, 0.14f, Valo, Terrakotta), (0.38f, 0.15f, 0.22f, 0.12f, Pinta, Varjo),
            };
            const float d = 0.34f;
            for (int i = 0; i < talot.Length; i++)
            {
                if (k && (i == 0 || i == 3)) continue;
                var t = talot[i];
                r.Laatikko(V(t.x, 0, 0), V(t.l, t.h, d), t.s, t.s);
                r.HarjaZ(V(t.x, t.h, 0), V(t.l, t.hh, d), t.c, t.s);
                if (k) continue;
                // Ovi ja kaksi ikkunaa etupäädyssä.
                r.NelioUlos(V(t.x - 0.022f, 0, -d * 0.5f - 0.002f), V(t.x - 0.022f, 0.08f, -d * 0.5f - 0.002f),
                    V(t.x + 0.022f, 0.08f, -d * 0.5f - 0.002f), V(t.x + 0.022f, 0, -d * 0.5f - 0.002f), Vector3.back, Muste);
                for (int s = -1; s <= 1; s += 2)
                    r.NelioUlos(V(t.x + s * 0.04f - 0.016f, t.h - 0.1f, -d * 0.5f - 0.002f), V(t.x + s * 0.04f - 0.016f, t.h - 0.05f, -d * 0.5f - 0.002f),
                        V(t.x + s * 0.04f + 0.016f, t.h - 0.05f, -d * 0.5f - 0.002f), V(t.x + s * 0.04f + 0.016f, t.h - 0.1f, -d * 0.5f - 0.002f), Vector3.back, Muste);
            }
            // Raatihuone keskellä: leveämpi runko ja torni kypärineen.
            r.Laatikko(V(0, 0, 0.02f), V(0.26f, 0.24f, 0.3f), Valo, Valo);
            r.Harja(V(0, 0.24f, 0.02f), V(0.26f, 0.1f, 0.3f), Terrakotta, Valo);
            r.Laatikko(V(0, 0.24f, -0.06f), V(0.1f, 0.34f, 0.1f), Pinta, Pinta);
            r.Pyramidi(V(0, 0.58f, -0.06f), 0.12f, 0.12f, 0.14f, Varjo);
            if (k) return;
            r.Viuhka(V(0, 0.46f, -0.112f), 0.03f, 0.03f, 4, Vector3.back, Muste);  // kello (ylä- ja alapuolikas)
            r.Viuhka(V(0, 0.46f, -0.112f), 0.03f, -0.03f, 4, Vector3.back, Muste);
            r.NelioUlos(V(-0.03f, 0, -0.132f), V(-0.03f, 0.11f, -0.132f), V(0.03f, 0.11f, -0.132f), V(0.03f, 0, -0.132f), Vector3.back, Muste);
        }

        /// <summary>Vuori: pääkeila lumihuippuineen, sivuhuippu ja matala esikukkula.</summary>
        static void AVuori(Rakentaja r, bool k)
        {
            if (k)
            {
                r.Rengaskallio(V(-0.06f, 0, 0), new[] { (0f, 0.86f, 0.76f), (0.3f, 0.36f, 0.32f) }, 0.6f, 7, 4, Kivi, Valo, 0.3f);
                r.Rengaskallio(V(0.28f, 0, 0.08f), new[] { (0f, 0.5f, 0.44f), (0.18f, 0.2f, 0.18f) }, 0.36f, 5, 6, Kivi, Valo, 0.3f);
                return;
            }
            r.Rengaskallio(V(-0.06f, 0, 0), new[] { (0f, 0.86f, 0.76f), (0.16f, 0.62f, 0.55f), (0.3f, 0.38f, 0.34f), (0.42f, 0.2f, 0.18f) },
                0.6f, 13, 4, Kivi, Valo, 0.3f);
            r.Rengaskallio(V(0.28f, 0, 0.08f), new[] { (0f, 0.5f, 0.44f), (0.12f, 0.32f, 0.28f), (0.24f, 0.14f, 0.12f) }, 0.36f, 9, 6, Kivi, Valo, 0.3f);
            r.Rengaskallio(V(-0.3f, 0, -0.2f), new[] { (0f, 0.36f, 0.3f), (0.08f, 0.2f, 0.16f) }, 0.13f, 7, 7, Pinta, Oliivi, 0.3f);
        }

        /// <summary>Merkkikivi (puuttuva laji): ruohoinen kumpu, pystykivi ja kaksi pientä kiveä.</summary>
        static void AMerkkikivi(Rakentaja r, bool k)
        {
            r.Rengaskallio(Vector3.zero, new[] { (0f, 0.56f, 0.48f), (0.05f, 0.4f, 0.34f) }, float.NaN, k ? 6 : 9, 2, Oliivi, Oliivi, 0.2f);
            r.Rengaskallio(V(0, 0.05f, 0), k
                    ? new[] { (0f, 0.2f, 0.14f), (0.4f, 0.12f, 0.09f) }
                    : new[] { (0f, 0.2f, 0.14f), (0.22f, 0.19f, 0.13f), (0.4f, 0.12f, 0.09f) },
                0.46f, k ? 5 : 7, 5, Kivi, Pinta, 0.4f);
            if (k) return;
            r.Rengaskallio(V(-0.16f, 0.03f, -0.08f), new[] { (0f, 0.1f, 0.08f), (0.04f, 0.07f, 0.06f) }, 0.07f, 5, 8, Kivi, Pinta, 0.4f);
            r.Rengaskallio(V(0.15f, 0.03f, -0.1f), new[] { (0f, 0.08f, 0.07f), (0.03f, 0.05f, 0.05f) }, 0.05f, 5, 9, Kivi, Pinta, 0.4f);
        }
    }
}
