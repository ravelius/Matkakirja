using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI OLAVINLINNA (Erik Axelsson Tottin 1475 perustama linna Kyrönsalmen kalliosaarella Savonlinnassa; speksi
    /// docs/raportit/erikoismallit/olavinlinna.md, omistaja hyväksyi elämänidean 27.9.2026, erä 6: höyrylaiva ja musta pässi).
    /// Nosto kohde:olavinlinna, Suomi, 61,8639 N 28,9011 E, taso 1.
    /// Tunnistus sekunnissa: kolme tanakkaa pyöreää kivitornia rivissä linnan pohjoislaidalla (lännessä leveä Kellotorni tumma
    /// matala kartiokatto päällään, keskellä Kirkkotorni ja koillisessa Kijlin torni kuparinvihreine kartioineen), tornien
    /// tiilikruunut pyöreine ampuma-aukkoineen, harmaat kehämuurit kalliosaaren reunalla (päälinna taivutettuine lounaismuureineen
    /// lännessä, esilinna pihoineen idässä, Vesiportin bastioni, Pikkuportin bastioni puukattoineen ja massiivinen Paksu bastioni)
    /// ja kapea salmi saaren ympärillä. Lännessä Linnansalmen yli kulkee kääntyvä ponttonisilta Tallisaaren kärkeen.
    /// Mitat: 1,0 ≈ 225 m (OpenStreetMapin ääriviiva metreinä, vain viitteenä); linna 168 × 98 m → 0,75 × 0,44. Korkeudet: kallio
    /// 0,012, bastionit 0,052–0,055, kehämuurit 0,062–0,08, päälinna 0,096, Paksu bastioni 0,082, tornien räystäät 0,228–0,25 ja
    /// huiput 0,272–0,303 (tornien korkeus/halkaisija kuten kuvissa, halkaisija noin 1,2–1,3 ×; muurit hieman matalampia suhteessa
    /// torneihin, jotta kolme kartiota luetaan 40 pt:ssä etelän 30°:n kamerasta). Linnansalmea on kavennettu (silta 0,2 eli noin
    /// 45 m, todellinen noin 78 m), jotta linna hallitsee.
    /// SUUNTA TODELLINEN (pohjoinen +Z): tornit pohjoislaidalla takana, kamera etelästä kuten droonikuvassa AKDG7576-10.
    /// Liikkuvat osat:
    ///   silta        ponttonisillan kääntyvä osa (pivot Tallisaaren päässä vesirajassa): kääntyy virran mukana etelään
    ///   laiva        valkoinen höyrylaiva Linnansalmessa (pivot vesirajassa keskellä, keula +Z; lepoasento väylällä sillan eteläpuolella)
    ///   laivavalot   yöllä laivan ikkunat (sama pivot ja asento kuin laivalla)
    ///   vana         vaahto-V laivan perässä (sama pivot)
    ///   savu0–2      savutuprut (pivot piipun suulla laivan lepoasennossa; tupru jää ilmaan, kun laiva etenee)
    ///   pilvi        tumma ukkospilvi linnan pohjoisosan yllä (harvinainen, ei salamaa eikä välähdystä)
    ///   passi        musta pässi Paksun bastionin tykkitasanteella (pivot takajaloissa, keula +Z)
    ///   passinpaa    pässin pää sarvineen (pivot niskassa pässin lepoasennossa)
    ///   vene0–2      piirittäjien soutuveneet salmessa Paksun bastionin edessä (pivot vesirajassa, keula +Z)
    ///   valot0–2     yöllä Kellotornin, Kirkkotornin ja Kijlin tornin aukot ja ikkunat (pivot tornin etupinnalla ryhmän alla)
    ///   valot3       yöllä päälinnan lounaismuurin ikkunat (pivot muurin juuressa)
    ///   valot4       yöllä esilinnan pihan oopperavalo (pivot pihan lattialla)
    /// </summary>
    public sealed partial class Symbolimallit
    {
        // ---- Mitat (mallin yksiköissä) ----

        /// <summary>Veden pinta, kallion laki, pihojen lattia ja Tallisaaren nurmi.</summary>
        const float OlvVesiY = 0.0015f, OlvKallioY = 0.012f, OlvPihaY = 0.0135f, OlvTalliY = 0.004f;
        /// <summary>Muurien ylälaidat: Vesiportin ja Kellobastionin muurit, Pikkuportin bastioni, eteläinen ja pohjoinen kehämuuri,
        /// Suvorovin esilinnan muuri, esilinnan itämuuri, Paksu bastioni (rintavarustus ja tykkitasanne) ja päälinna.</summary>
        const float OlvBastioniH = 0.055f, OlvPikkuH = 0.052f, OlvEtelaH = 0.062f, OlvPohjoisH = 0.08f, OlvSuvorovH = 0.044f,
            OlvItaH = 0.068f, OlvPaksuH = 0.082f, OlvPaksuTaso = 0.071f, OlvPaalinnaH = 0.096f;

        /// <summary>Tornit: keskipiste (x, z), pohjan säde, kruunun säde, tiilikruunun alaraja, räystäs, katon huippu, aukkorivin korkeus.</summary>
        struct OlvTorni { public float X, Z, R0, R, Tiili, Raystas, Huippu, Aukot; public bool Tumma; }
        static readonly OlvTorni OlvKello = new OlvTorni { X = -0.169f, Z = 0.058f, R0 = 0.052f, R = 0.049f, Tiili = 0.18f, Raystas = 0.25f, Huippu = 0.303f, Aukot = 0.233f, Tumma = true };
        static readonly OlvTorni OlvKirkko = new OlvTorni { X = -0.038f, Z = 0.102f, R0 = 0.045f, R = 0.042f, Tiili = 0.182f, Raystas = 0.244f, Huippu = 0.292f, Aukot = 0.228f };
        static readonly OlvTorni OlvKijl = new OlvTorni { X = 0.244f, Z = 0.209f, R0 = 0.043f, R = 0.04f, Tiili = 0.19f, Raystas = 0.228f, Huippu = 0.272f, Aukot = 0.214f };
        const int OlvTorniSivuja = 12;
        /// <summary>Lähitason rintavarustuksen korkeus muurien ulkoreunalla.</summary>
        const float OlvRinta = 0.0045f;

        /// <summary>Pyhän Eerikin tornin raunio (päälinnan etelänurkka).</summary>
        static readonly Vector3 OlvEerik = new Vector3(0.02f, 0f, -0.047f);

        // ---- Paletti ----

        static readonly Color OlvKivi = Hex(0xc2b69a), OlvKiviVarjo = Hex(0xaea286), OlvKaytava = Hex(0xbdb296), OlvTorniKivi = Hex(0xd5caae),
            OlvTiili = Hex(0xa2735a), OlvAukko = Hex(0x3b2f22), OlvKallio = Hex(0x9b9079), OlvKallioSivu = Hex(0x8e836e), OlvPiha = Hex(0xb9aa89),
            OlvNurmi = Hex(0xaeb07c), OlvPuisto = Hex(0xb3b184), OlvLiuske = Hex(0x5a5046), OlvKupari = Hex(0x86a08a), OlvPalatsiKatto = Hex(0x8c8878),
            OlvPuukatto = Hex(0xa0927a), OlvLankku = Hex(0xab977a), OlvValo = Hex(0xf4d898), OlvTasanne = Hex(0xb3a78c);

        // ---- Vesi ja saari (OpenStreetMapin ääriviivasta tyyliteltynä, myötäpäivään) ----

        /// <summary>Kalliosaaren reuna myötäpäivään luoteesta (veden raja; ohut musteviiva kiertää sen).</summary>
        static readonly Vector2[] OlvSaariReuna =
        {
            new Vector2(-0.305f, 0.094f), new Vector2(-0.25f, 0.112f), new Vector2(-0.18f, 0.126f), new Vector2(-0.11f, 0.13f), new Vector2(-0.05f, 0.158f),
            new Vector2(0.02f, 0.175f), new Vector2(0.12f, 0.218f), new Vector2(0.21f, 0.254f), new Vector2(0.285f, 0.262f), new Vector2(0.352f, 0.254f),
            new Vector2(0.414f, 0.13f), new Vector2(0.447f, 0.13f), new Vector2(0.462f, 0.056f), new Vector2(0.43f, -0.025f), new Vector2(0.395f, -0.074f),
            new Vector2(0.315f, -0.086f), new Vector2(0.25f, -0.108f), new Vector2(0.19f, -0.142f), new Vector2(0.148f, -0.208f), new Vector2(0.07f, -0.144f),
            new Vector2(0f, -0.115f), new Vector2(-0.088f, -0.149f), new Vector2(-0.205f, -0.187f), new Vector2(-0.236f, -0.086f), new Vector2(-0.262f, -0.012f),
            new Vector2(-0.288f, 0.014f), new Vector2(-0.318f, 0.04f),
        };

        /// <summary>
        /// Linnansalmi (höyrylaivan väylä) tikapuina etelästä pohjoiseen: rivit (z, länsiraja, itäraja). Itäraja kulkee
        /// kalliosaaren alla (vesi jää kallion alle piiloon), länsiraja Tallisaaren nurmen alla, joten rannat määrää saari ja
        /// Tallisaari; etelä- ja pohjoispää kapenevat karttaan.
        /// </summary>
        static readonly (float z, float xl, float xi)[] OlvVayla =
        {
            (-0.295f, -0.465f, -0.3f), (-0.232f, -0.478f, -0.214f), (-0.17f, -0.488f, -0.215f), (-0.105f, -0.497f, -0.225f), (-0.04f, -0.5f, -0.245f),
            (0.022f, -0.5f, -0.27f), (0.075f, -0.5f, -0.3f), (0.108f, -0.425f, -0.262f), (0.13f, -0.43f, -0.243f), (0.19f, -0.448f, -0.262f),
            (0.25f, -0.462f, -0.29f), (0.295f, -0.45f, -0.31f),
        };

        /// <summary>
        /// Salmi saaren ympärillä pareina (sisä kallion reunalla tai sen alla, ulko = veden reuna karttaa vasten) myötäpäivään
        /// luoteesta lounaaseen; peräkkäiset parit rajaavat nelikulmion. Kapea kaista (noin 0,04), Paksun bastionin edessä hieman
        /// leveämpi lahti piirittäjien veneille. Väylän itäraja ja renkaan päät limittyvät, joten saumaa ei jää.
        /// </summary>
        static readonly (Vector2 sisa, Vector2 ulko)[] OlvVesiParit =
        {
            (new Vector2(-0.25f, 0.112f), new Vector2(-0.243f, 0.13f)), (new Vector2(-0.18f, 0.126f), new Vector2(-0.19f, 0.172f)),
            (new Vector2(-0.11f, 0.13f), new Vector2(-0.11f, 0.172f)), (new Vector2(-0.05f, 0.158f), new Vector2(-0.05f, 0.198f)),
            (new Vector2(0.02f, 0.175f), new Vector2(0.02f, 0.214f)), (new Vector2(0.085f, 0.2f), new Vector2(0.085f, 0.242f)),
            (new Vector2(0.15f, 0.23f), new Vector2(0.15f, 0.27f)), (new Vector2(0.21f, 0.254f), new Vector2(0.212f, 0.293f)),
            (new Vector2(0.285f, 0.262f), new Vector2(0.29f, 0.298f)), (new Vector2(0.352f, 0.254f), new Vector2(0.372f, 0.29f)),
            (new Vector2(0.383f, 0.19f), new Vector2(0.412f, 0.225f)), (new Vector2(0.414f, 0.13f), new Vector2(0.445f, 0.162f)),
            (new Vector2(0.447f, 0.13f), new Vector2(0.49f, 0.14f)), (new Vector2(0.462f, 0.056f), new Vector2(0.5f, 0.05f)),
            (new Vector2(0.445f, 0.012f), new Vector2(0.49f, -0.003f)), (new Vector2(0.43f, -0.025f), new Vector2(0.472f, -0.06f)),
            (new Vector2(0.395f, -0.074f), new Vector2(0.45f, -0.132f)), (new Vector2(0.36f, -0.08f), new Vector2(0.39f, -0.162f)),
            (new Vector2(0.315f, -0.086f), new Vector2(0.332f, -0.172f)), (new Vector2(0.25f, -0.108f), new Vector2(0.265f, -0.18f)),
            (new Vector2(0.19f, -0.142f), new Vector2(0.203f, -0.205f)), (new Vector2(0.17f, -0.175f), new Vector2(0.176f, -0.23f)),
            (new Vector2(0.148f, -0.208f), new Vector2(0.15f, -0.258f)), (new Vector2(0.11f, -0.176f), new Vector2(0.108f, -0.225f)),
            (new Vector2(0.07f, -0.144f), new Vector2(0.07f, -0.192f)), (new Vector2(0f, -0.115f), new Vector2(0f, -0.165f)),
            (new Vector2(-0.088f, -0.149f), new Vector2(-0.09f, -0.198f)), (new Vector2(-0.15f, -0.168f), new Vector2(-0.155f, -0.218f)),
            (new Vector2(-0.205f, -0.187f), new Vector2(-0.215f, -0.24f)),
        };

        /// <summary>Tallisaaren kärki (puisto ja sillan Tallisaaren pää): pieni maakieli mallin vasemmassa reunassa.</summary>
        static readonly Vector2[] OlvTalli =
        {
            new Vector2(-0.5f, 0.075f), new Vector2(-0.47f, 0.085f), new Vector2(-0.44f, 0.095f), new Vector2(-0.425f, 0.108f), new Vector2(-0.43f, 0.13f),
            new Vector2(-0.44f, 0.17f), new Vector2(-0.455f, 0.205f), new Vector2(-0.48f, 0.225f), new Vector2(-0.5f, 0.232f),
        };

        // ---- Apurit ----

        static Vector3 OlvP(Vector2 p, float y = 0f) => new Vector3(p.x, y, p.y);
        static Vector3 OlvP(float x, float z, float y = 0f) => new Vector3(x, y, z);
        static bool OlvSama(Vector2 a, Vector2 b) => Mathf.Abs(a.x - b.x) < 1e-5f && Mathf.Abs(a.y - b.y) < 1e-5f;

        /// <summary>Palan suurin rajalaatikko: puolileveys pysyy alle ääriviivan kynnyksen 0,035, joten vesi ja nurmi eivät saa
        /// ääriviivaa eivätkä tummaa kehystä.</summary>
        const float OlvPala = 0.069f;

        /// <summary>Vaakasuora nelikulmio a–b–c–d pieninä paloina: tasainen n × m -jako (bilineaarinen), pienin palamäärä, jolla
        /// jokaisen palan rajalaatikko on alle OlvPala (ei ääriviivaa). Kolmio saadaan toistamalla kärki (a = b).</summary>
        static void OlvPalat(Rakentaja r, Vector3 a, Vector3 b, Vector3 c, Vector3 d, Color vari)
        {
            int parasN = 8, parasM = 8;
            for (int n = 1; n <= 8; n++)
                for (int m = 1; m <= 8; m++)
                {
                    if (n * m >= parasN * parasM) continue;
                    if (OlvJakoKay(a, b, c, d, n, m)) { parasN = n; parasM = m; }
                }
            for (int i = 0; i < parasN; i++)
                for (int j = 0; j < parasM; j++)
                {
                    Vector3 p00 = OlvBilin(a, b, c, d, i / (float)parasN, j / (float)parasM), p10 = OlvBilin(a, b, c, d, (i + 1) / (float)parasN, j / (float)parasM),
                        p11 = OlvBilin(a, b, c, d, (i + 1) / (float)parasN, (j + 1) / (float)parasM), p01 = OlvBilin(a, b, c, d, i / (float)parasN, (j + 1) / (float)parasM);
                    if ((p10 - p00).sqrMagnitude < 1e-10f) r.KolmioUlos(p00, p11, p01, Vector3.up, vari);
                    else if ((p11 - p10).sqrMagnitude < 1e-10f) r.KolmioUlos(p00, p10, p01, Vector3.up, vari);
                    else if ((p01 - p00).sqrMagnitude < 1e-10f) r.KolmioUlos(p00, p10, p11, Vector3.up, vari);
                    else if ((p11 - p01).sqrMagnitude < 1e-10f) r.KolmioUlos(p00, p10, p11, Vector3.up, vari);
                    else r.NelioUlos(p00, p10, p11, p01, Vector3.up, vari);
                }
        }

        /// <summary>Bilineaarinen piste nelikulmiossa a–b–c–d (u pitkin a→b, v pitkin a→d).</summary>
        static Vector3 OlvBilin(Vector3 a, Vector3 b, Vector3 c, Vector3 d, float u, float v) =>
            Vector3.Lerp(Vector3.Lerp(a, b, u), Vector3.Lerp(d, c, u), v);

        static bool OlvJakoKay(Vector3 a, Vector3 b, Vector3 c, Vector3 d, int n, int m)
        {
            for (int i = 0; i < n; i++)
                for (int j = 0; j < m; j++)
                {
                    float x0 = 9f, x1 = -9f, z0 = 9f, z1 = -9f;
                    for (int k = 0; k < 4; k++)
                    {
                        var p = OlvBilin(a, b, c, d, (i + (k == 1 || k == 2 ? 1 : 0)) / (float)n, (j + (k >= 2 ? 1 : 0)) / (float)m);
                        x0 = Mathf.Min(x0, p.x); x1 = Mathf.Max(x1, p.x); z0 = Mathf.Min(z0, p.z); z1 = Mathf.Max(z1, p.z);
                    }
                    if (Mathf.Max(x1 - x0, z1 - z0) > OlvPala) return false;
                }
            return true;
        }

        /// <summary>Pystytahko pisteiden a ja b välillä korkeuksilla y0–y1, etupuoli suuntaan n.</summary>
        static void OlvTahko(Rakentaja r, Vector3 a, Vector3 b, float y0, float y1, Vector3 n, Color vari) =>
            r.NelioUlos(new Vector3(a.x, y0, a.z), new Vector3(b.x, y0, b.z), new Vector3(b.x, y1, b.z), new Vector3(a.x, y1, a.z), n, vari);

        /// <summary>
        /// Muuri murtoviivaa pitkin: pisteet ovat muurin ULKOPINNAN linja myötäpäivään (sisäpuoli kulkusuunnan oikealla), paksuus
        /// sisäänpäin viistetyin liitoksin. Ulkopinta, sisäpinta ja käytävä (yläpinta); avoimen viivan päihin päätytahkot.
        /// </summary>
        static void OlvMuuri(Rakentaja r, Vector2[] p2, float y0, float y1, float paksuus, Color ulko, Color sisa, Color yla, bool suljettu = false,
            bool paadyt = true, float rinta = 0f)
        {
            int n = p2.Length;
            var p = new Vector3[n];
            for (int i = 0; i < n; i++) p[i] = OlvP(p2[i]);
            var q = OlvSisalinja(p, paksuus, suljettu);
            int seg = suljettu ? n : n - 1;
            for (int i = 0; i < seg; i++)
            {
                int j = (i + 1) % n;
                var d = (p[j] - p[i]).normalized;
                var ulos = new Vector3(-d.z, 0f, d.x);
                OlvTahko(r, p[i], p[j], y0, y1, ulos, ulko);
                OlvTahko(r, q[i], q[j], y0, y1, -ulos, sisa);
                r.NelioUlos(new Vector3(p[i].x, y1, p[i].z), new Vector3(p[j].x, y1, p[j].z), new Vector3(q[j].x, y1, q[j].z), new Vector3(q[i].x, y1, q[i].z),
                    Vector3.up, yla);
                if (rinta > 0f)
                {
                    // Lähitason rintavarustus muurin ulkoreunalla: ulkopinta jatkuu, kapea laki ja sisäpinta käytävälle.
                    float w = Mathf.Min(0.0045f, paksuus * 0.35f) / paksuus;
                    Vector3 pi = Vector3.Lerp(p[i], q[i], w), pj = Vector3.Lerp(p[j], q[j], w);
                    OlvTahko(r, p[i], p[j], y1, y1 + rinta, ulos, ulko);
                    r.NelioUlos(new Vector3(p[i].x, y1 + rinta, p[i].z), new Vector3(p[j].x, y1 + rinta, p[j].z), new Vector3(pj.x, y1 + rinta, pj.z),
                        new Vector3(pi.x, y1 + rinta, pi.z), Vector3.up, Color.Lerp(yla, EmPaperi, 0.18f));
                    OlvTahko(r, pi, pj, y1, y1 + rinta, -ulos, sisa);
                }
            }
            if (!suljettu && paadyt)
            {
                var d0 = (p[1] - p[0]).normalized; var dn = (p[n - 1] - p[n - 2]).normalized;
                OlvTahko(r, p[0], q[0], y0, y1, -d0, ulko);
                OlvTahko(r, p[n - 1], q[n - 1], y0, y1, dn, ulko);
            }
        }

        /// <summary>Murtoviivan sisälinja (paksuus oikealle, viistetyt liitokset).</summary>
        static Vector3[] OlvSisalinja(Vector3[] p, float paksuus, bool suljettu)
        {
            int n = p.Length;
            var q = new Vector3[n];
            for (int i = 0; i < n; i++)
            {
                Vector3 d0 = i > 0 || suljettu ? (p[i] - p[(i + n - 1) % n]).normalized : (p[1] - p[0]).normalized;
                Vector3 d1 = i < n - 1 || suljettu ? (p[(i + 1) % n] - p[i]).normalized : d0;
                var n0 = new Vector3(d0.z, 0f, -d0.x); var n1 = new Vector3(d1.z, 0f, -d1.x);
                float k = paksuus / Mathf.Max(0.35f, 1f + Vector3.Dot(n0, n1));
                q[i] = p[i] + (n0 + n1) * k;
            }
            return q;
        }

        /// <summary>Monikulmion keskipiste (kärkien keskiarvo) mallin avaruudessa.</summary>
        static Vector3 OlvKeski(Vector2[] p, float y)
        {
            float x = 0f, z = 0f;
            foreach (var v in p) { x += v.x; z += v.y; }
            return new Vector3(x / p.Length, y, z / p.Length);
        }

        /// <summary>Umpinainen tähtimäinen monikulmio (bastioni): sivut ja kansi korkeudella y1.</summary>
        static void OlvKappale(Rakentaja r, Vector2[] p, float y0, float y1, Color sivu, Color kansi)
        {
            var c = OlvKeski(p, y1);
            for (int i = 0; i < p.Length; i++)
            {
                int j = (i + 1) % p.Length;
                Vector3 a = OlvP(p[i]), b = OlvP(p[j]);
                var m = (a + b) * 0.5f - new Vector3(c.x, 0f, c.z);
                OlvTahko(r, a, b, y0, y1, m, sivu);
                r.KolmioUlos(c, new Vector3(a.x, y1, a.z), new Vector3(b.x, y1, b.z), Vector3.up, kansi);
            }
        }

        /// <summary>Vaakasuora tähtimäinen monikulmio (piha) tuulettimena keskipisteestä.</summary>
        static void OlvLattia(Rakentaja r, Vector2[] p, float y, Color vari)
        {
            var c = OlvKeski(p, y);
            for (int i = 0; i < p.Length; i++) r.KolmioUlos(c, OlvP(p[i], y), OlvP(p[(i + 1) % p.Length], y), Vector3.up, vari);
        }

        /// <summary>Tornin tahkon keskisuunta (12-kulmio, kärjet 15°:n välein alkaen 15°:sta, tahkot 30° · k): k = 9 on etelä.</summary>
        static Vector3 OlvTahkoSuunta(int k)
        {
            float a = k * Mathf.PI / 6f;
            return new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
        }

        /// <summary>Pyöreä aukko pystypinnassa (lähitaso): kuusikulmio keskellä p, normaali n.</summary>
        static void OlvReika(Rakentaja r, Vector3 p, Vector3 n, float sade, Color vari, int sivuja = 6)
        {
            n = new Vector3(n.x, 0f, n.z).normalized;
            var t = Vector3.Cross(Vector3.up, n);
            var q = p + n * 0.0015f;
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = i * Mathf.PI * 2f / sivuja, a1 = (i + 1) * Mathf.PI * 2f / sivuja;
                r.KolmioUlos(q, q + (t * Mathf.Cos(a0) + Vector3.up * Mathf.Sin(a0)) * sade, q + (t * Mathf.Cos(a1) + Vector3.up * Mathf.Sin(a1)) * sade, n, vari);
            }
        }

        // ---- Runko ----

        static Mesh OlavinlinnaRunko()
        {
            var r = new Rakentaja();
            OlvRakenna(r, false);
            return r.Verkko("Olavinlinna");
        }

        /// <summary>Koko staattinen malli (runko tai lähitaso).</summary>
        static void OlvRakenna(Rakentaja r, bool lahi)
        {
            OlvVesi(r, lahi);
            OlvTallisaari(r, lahi);
            OlvKalliosaari(r, lahi);
            OlvMuurit(r, lahi);
            OlvPaalinna(r, lahi);
            OlvTornit(r, lahi);
            OlvSillanPaat(r, lahi);
        }

        // ---- Vesi, kallio ja Tallisaari ----

        /// <summary>Salmi pieninä paloina (ei ääriviivaa eikä kehystä): Linnansalmen tikapuurivit ruudukkona ja renkaan parien
        /// väliset nelikulmiot tasaisesti jaettuina.</summary>
        static void OlvVesi(Rakentaja r, bool lahi)
        {
            for (int i = 0; i + 1 < OlvVayla.Length; i++)
            {
                var (z0, l0, i0) = OlvVayla[i];
                var (z1, l1, i1) = OlvVayla[i + 1];
                OlvRuudukko(r, new[] { new Vector2(l0, z0), new Vector2(i0, z0), new Vector2(i1, z1), new Vector2(l1, z1) }, OlvVesiY, EmVesi);
            }
            for (int i = 0; i + 1 < OlvVesiParit.Length; i++)
            {
                var (s0, u0) = OlvVesiParit[i];
                var (s1, u1) = OlvVesiParit[i + 1];
                OlvPalat(r, OlvP(s0, OlvVesiY), OlvP(s1, OlvVesiY), OlvP(u1, OlvVesiY), OlvP(u0, OlvVesiY), EmVesi);
            }
        }

        /// <summary>
        /// Kupera vaakamonikulmio pieninä paloina: tasainen ruudukko monikulmion rajalaatikon yli (kukin ruutu alle OlvPala),
        /// jokainen ruutu leikataan monikulmiolla (Sutherland–Hodgman) ja täytetään tuulettimena (ei ääriviivaa).
        /// </summary>
        static void OlvRuudukko(Rakentaja r, Vector2[] monikulmio, float y, Color vari)
        {
            float x0 = 9f, x1 = -9f, z0 = 9f, z1 = -9f;
            foreach (var p in monikulmio) { x0 = Mathf.Min(x0, p.x); x1 = Mathf.Max(x1, p.x); z0 = Mathf.Min(z0, p.y); z1 = Mathf.Max(z1, p.y); }
            int nx = Math.Max(1, (int)Math.Ceiling((x1 - x0) / OlvPala - 1e-4)), nz = Math.Max(1, (int)Math.Ceiling((z1 - z0) / OlvPala - 1e-4));
            for (int i = 0; i < nx; i++)
                for (int j = 0; j < nz; j++)
                {
                    var pala = OlvLeikkaa(monikulmio, 0, x0 + (x1 - x0) * i / nx, true);
                    pala = OlvLeikkaa(pala, 0, x0 + (x1 - x0) * (i + 1) / nx, false);
                    pala = OlvLeikkaa(pala, 1, z0 + (z1 - z0) * j / nz, true);
                    pala = OlvLeikkaa(pala, 1, z0 + (z1 - z0) * (j + 1) / nz, false);
                    for (int k = 1; k + 1 < pala.Count; k++) r.KolmioUlos(OlvP(pala[0], y), OlvP(pala[k], y), OlvP(pala[k + 1], y), Vector3.up, vari);
                }
        }

        /// <summary>Monikulmion leikkaus akselin suuntaisella puolitasolla (akseli 0 = x, 1 = z; pidetään ≥ tai ≤ arvo).</summary>
        static System.Collections.Generic.List<Vector2> OlvLeikkaa(System.Collections.Generic.IList<Vector2> p, int akseli, float arvo, bool suurempi)
        {
            var ulos = new System.Collections.Generic.List<Vector2>();
            for (int i = 0; i < p.Count; i++)
            {
                Vector2 a = p[i], b = p[(i + 1) % p.Count];
                float va = akseli == 0 ? a.x : a.y, vb = akseli == 0 ? b.x : b.y;
                bool ina = suurempi ? va >= arvo : va <= arvo, inb = suurempi ? vb >= arvo : vb <= arvo;
                if (ina) ulos.Add(a);
                if (ina != inb)
                {
                    float t = (arvo - va) / (vb - va);
                    ulos.Add(new Vector2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t));
                }
            }
            // Toistuvat kärjet pois (leikkaus kärjen kohdalta).
            for (int i = ulos.Count - 1; i > 0 && ulos.Count > 0; i--)
                if (OlvSama(ulos[i], ulos[i - 1])) ulos.RemoveAt(i);
            if (ulos.Count > 1 && OlvSama(ulos[0], ulos[ulos.Count - 1])) ulos.RemoveAt(ulos.Count - 1);
            return ulos;
        }

        /// <summary>Tallisaaren kärki: puistonurmi pieninä paloina (ei ääriviivaa), länsireuna rajautuu karttaan.</summary>
        static void OlvTallisaari(Rakentaja r, bool lahi)
        {
            OlvRuudukko(r, OlvTalli, OlvTalliY, OlvPuisto);
            if (!lahi) return;
            // LÄHITASO: puiston puut, hiekkapolku sillalta ja rantakivet.
            OlvPuu(r, new Vector3(-0.478f, OlvTalliY, 0.196f), 0.017f, 0.05f);
            OlvPuu(r, new Vector3(-0.486f, OlvTalliY, 0.135f), 0.015f, 0.044f);
            OlvPuu(r, new Vector3(-0.456f, OlvTalliY, 0.168f), 0.013f, 0.04f);
            var y = Vector3.up * (OlvTalliY + 0.0005f);
            Vector3 p0 = OlvSiltaT + new Vector3(-0.014f, 0f, 0f), p1 = new Vector3(-0.46f, 0f, 0.112f), p2 = new Vector3(-0.5f, 0f, 0.118f);
            foreach (var (a, b) in new[] { (p0, p1), (p1, p2) })
            {
                var t = Vector3.Cross(Vector3.up, (b - a).normalized) * 0.0035f;
                r.NelioUlos(new Vector3(a.x, 0f, a.z) - t + y, new Vector3(b.x, 0f, b.z) - t + y, new Vector3(b.x, 0f, b.z) + t + y, new Vector3(a.x, 0f, a.z) + t + y,
                    Vector3.up, EmHiekka);
            }
            OlvKivet(r, new Vector3(-0.438f, 0.001f, 0.15f), 0.006f, 3);
            OlvKivet(r, new Vector3(-0.452f, 0.001f, 0.1f), 0.005f, 5);
            OlvKivet(r, new Vector3(-0.47f, 0.001f, 0.212f), 0.007f, 7);
        }

        /// <summary>Kalliosaari: harmaa graniittijalusta veden rajasta kallion lakeen; yksi ääriviivaosa, joten ohut muste kiertää
        /// saaren veden reunassa (ainoa viiva vettä vasten).</summary>
        static void OlvKalliosaari(Rakentaja r, bool lahi)
        {
            var s = OlvSaariReuna;
            int n = s.Length;
            r.AloitaOsa();
            var c = OlvP(0.07f, 0.03f, OlvKallioY);
            for (int i = 0; i < n; i++)
            {
                var a = OlvP(s[i]); var b = OlvP(s[(i + 1) % n]);
                var d = (b - a).normalized;
                var ulos = new Vector3(-d.z, 0f, d.x);
                r.NelioUlos(a, b, b + Vector3.up * OlvKallioY, a + Vector3.up * OlvKallioY, ulos, OlvKallioSivu);
                r.KolmioUlos(c, a + Vector3.up * OlvKallioY, b + Vector3.up * OlvKallioY, Vector3.up, OlvKallio);
            }
            r.LopetaOsa();
            if (!lahi) return;
            // LÄHITASO: rantakivet veden rajassa (joka toisen reunapisteen ulkopuolella, koko ja kierto vaihtelevat) ja nurmitupsut
            // pohjoisrannan kalliolla.
            for (int i = 0; i < n; i += 2)
            {
                var a = OlvP(s[(i + n - 1) % n]); var b = OlvP(s[i]); var e = OlvP(s[(i + 1) % n]);
                var t = (e - a).normalized; var ulos = new Vector3(-t.z, 0f, t.x);
                float koko = 0.006f + 0.004f * Mathf.Abs(Mathf.Sin(i * 1.7f));
                OlvKivet(r, b + ulos * (koko * 0.7f) + t * (0.004f * Mathf.Sin(i * 2.3f)), koko, i);
            }
            var tupsu = Color.Lerp(OlvNurmi, OlvKallio, 0.35f);
            foreach (var (x, z, sade) in new[] { (-0.2f, 0.108f, 0.009f), (0.06f, 0.17f, 0.011f), (0.13f, 0.2f, 0.01f), (0.4f, 0.1f, 0.008f) })
            {
                var k = new Vector3(x, OlvKallioY + 0.0006f, z);
                for (int j = 0; j < 5; j++)
                {
                    float a0 = j * Mathf.PI * 2f / 5f, a1 = (j + 1) * Mathf.PI * 2f / 5f;
                    r.KolmioUlos(k, k + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0) * 0.6f) * sade, k + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1) * 0.6f) * sade, Vector3.up, tupsu);
                }
            }
        }

        /// <summary>Rantakivi (lähitaso): litteä nelitahkoinen kaksoispyramidi vedessä, kierto siemenestä i.</summary>
        static void OlvKivet(Rakentaja r, Vector3 p, float koko, int i)
        {
            float kierto = i * 0.9f;
            Vector3 yla = p + Vector3.up * (koko * 0.75f), ala = p + Vector3.up * -0.001f;
            var kk = p + Vector3.up * (koko * 0.2f);
            for (int j = 0; j < 4; j++)
            {
                float a0 = kierto + j * Mathf.PI / 2f, a1 = a0 + Mathf.PI / 2f;
                Vector3 p0 = kk + new Vector3(Mathf.Cos(a0) * koko, 0f, Mathf.Sin(a0) * koko * 0.75f), p1 = kk + new Vector3(Mathf.Cos(a1) * koko, 0f, Mathf.Sin(a1) * koko * 0.75f);
                r.KolmioKeskelta(p0, p1, yla, kk, j % 2 == 0 ? OlvKallio : OlvKallioSivu);
                r.KolmioKeskelta(p1, p0, ala, kk, OlvKallioSivu);
            }
        }

        // ---- Muurit ----

        /// <summary>Vesiportin bastioni (lounas): ulkoreuna myötäpäivään eteläiseltä kehämuurilta etelänurkan kautta länsiportille.</summary>
        static readonly Vector2[] OlvVesiportti =
        {
            new Vector2(-0.0541f, -0.0806f), new Vector2(-0.0883f, -0.135f), new Vector2(-0.197f, -0.1715f), new Vector2(-0.224f, -0.0843f),
            new Vector2(-0.2043f, -0.0532f), new Vector2(-0.245f, -0.0072f),
        };

        /// <summary>Pikkuportin bastioni (nuolenkärki etelään) ja Paksu bastioni (kaakko).</summary>
        static readonly Vector2[] OlvPikku =
        {
            new Vector2(0.0565f, -0.098f), new Vector2(0.0788f, -0.1303f), new Vector2(0.1484f, -0.1923f), new Vector2(0.1942f, -0.123f), new Vector2(0.2078f, -0.0934f),
        };
        static readonly Vector2[] OlvPaksu =
        {
            new Vector2(0.258f, 0f), new Vector2(0.27f, 0.044f), new Vector2(0.3727f, 0.0283f), new Vector2(0.3895f, -0.0127f),
            new Vector2(0.3072f, -0.0672f), new Vector2(0.2518f, -0.0475f),
        };

        /// <summary>
        /// Kehämuurit ja bastionit (yksi ääriviivaosa, johon myös pihat kuuluvat): Kellobastioni ja porttikurtiini lännessä, Vesiportin
        /// bastioni, eteläinen kehämuuri, Pikkuportin bastioni (harmaantunut puinen aumakatto), Paksu bastioni (rintavarustus ja
        /// tykkitasanne), Suvorovin esilinna, esilinnan itämuuri ja pohjoinen kehämuuri Kirkkotornista Kijlin torniin. Pihat
        /// hillityllä keskisävyllä (laaja vaalea lattia luettaisiin tyhjänä maana).
        /// </summary>
        static void OlvMuurit(Rakentaja r, bool lahi)
        {
            r.AloitaOsa();
            // Länsi: porttikurtiini ja Kellobastioni länsiportilta Kellotornille (myötäpäivään, paksuus sisään).
            OlvMuuri(r, OlvKellobastioni, 0f, OlvBastioniH, 0.016f, OlvKivi, OlvKiviVarjo, OlvKaytava, rinta: lahi ? OlvRinta : 0f);
            // Vesiportin bastioni ja eteläinen kehämuuri Pikkuportin bastionilta länsiportille.
            OlvMuuri(r, OlvVesiportti, 0f, OlvBastioniH, 0.016f, OlvKivi, OlvKiviVarjo, OlvKaytava, rinta: lahi ? OlvRinta : 0f);
            OlvMuuri(r, OlvEtelaLansi, 0f, OlvEtelaH, 0.018f, OlvKivi, OlvKiviVarjo, OlvKaytava, rinta: lahi ? OlvRinta : 0f);
            // Pikkuportin bastioni: nuolen muotoinen kappale ja harmaantunut puinen aumakatto.
            OlvKappale(r, OlvPikku, 0f, OlvPikkuH, OlvKivi, OlvKaytava);
            OlvPyramidikatto(r, OlvPikku, OlvPikkuH, 0.03f, lahi);
            // Eteläinen kehämuuri Paksusta bastionista Pikkuportin bastioniin.
            OlvMuuri(r, OlvEtelaIta, 0f, OlvEtelaH, 0.018f, OlvKivi, OlvKiviVarjo, OlvKaytava, rinta: lahi ? OlvRinta : 0f);
            // Paksu bastioni: massiivinen rintavarustus ja upotettu tykkitasanne.
            OlvMuuri(r, OlvPaksu, 0f, OlvPaksuH, 0.02f, OlvKivi, OlvKiviVarjo, OlvKaytava, suljettu: true, rinta: lahi ? OlvRinta : 0f);
            OlvLattia(r, OlvSisalinja2(OlvPaksu, 0.02f), OlvPaksuTaso, OlvTasanne);
            // Suvorovin esilinna (matala muuri) ja esilinnan itämuuri.
            OlvMuuri(r, OlvSuvorov, 0f, OlvSuvorovH, 0.014f, OlvKivi, OlvKiviVarjo, OlvKaytava, rinta: lahi ? OlvRinta : 0f);
            OlvMuuri(r, new[] { new Vector2(0.27f, 0.044f), new Vector2(0.262f, 0.1f), new Vector2(0.252f, 0.176f) }, 0f, OlvItaH, 0.016f, OlvKiviVarjo, OlvKivi, OlvKaytava);
            // Pohjoinen kehämuuri Kirkkotornista Kijlin torniin (leveä käytävä, "pohjoinen patteri").
            OlvMuuri(r, OlvPohjoinen, 0f, OlvPohjoisH, 0.028f, OlvKiviVarjo, OlvKivi, OlvKaytava, rinta: lahi ? OlvRinta : 0f);
            // Pihat: esilinnan suuri piha, Suvorovin esilinnan nurmi, Vesiportin bastionin puukansi ja Kellobastionin piha.
            OlvLattia(r, OlvEsilinnaPiha, OlvPihaY, OlvPiha);
            OlvLattia(r, new[] { new Vector2(0.29f, 0.222f), new Vector2(0.33f, 0.226f), new Vector2(0.388f, 0.11f), new Vector2(0.428f, 0.064f),
                new Vector2(0.37f, 0.042f), new Vector2(0.28f, 0.05f), new Vector2(0.266f, 0.17f) }, OlvPihaY, OlvNurmi);
            OlvLattia(r, new[] { new Vector2(-0.187f, -0.157f), new Vector2(-0.098f, -0.127f), new Vector2(-0.07f, -0.085f), new Vector2(-0.12f, -0.03f),
                new Vector2(-0.2f, -0.05f), new Vector2(-0.21f, -0.085f) }, OlvPihaY, OlvLankku);
            OlvLattia(r, new[] { new Vector2(-0.285f, 0.042f), new Vector2(-0.274f, 0.07f), new Vector2(-0.205f, 0.064f), new Vector2(-0.22f, 0.02f),
                new Vector2(-0.262f, 0.028f) }, OlvPihaY, OlvPiha);
            r.LopetaOsa();
            if (!lahi)
            {
                // Tykkiaukot kameran puolella (tummat kärkivärit): Vesiportin bastionin eteläsivu, Pikkuportin bastioni ja Paksu bastioni.
                OlvAukkorivi(r, OlvVesiportti[1], OlvVesiportti[2], 3, 0.034f, 0.009f, 0.011f);
                OlvAukkorivi(r, OlvPikku[2], OlvPikku[1], 2, 0.028f, 0.008f, 0.01f);
                OlvAukkorivi(r, OlvPikku[3], OlvPikku[2], 2, 0.028f, 0.008f, 0.01f);
                OlvAukkorivi(r, OlvPaksu[4], OlvPaksu[5], 2, 0.05f, 0.009f, 0.012f);
                OlvAukkorivi(r, OlvPaksu[3], OlvPaksu[4], 3, 0.05f, 0.009f, 0.012f);
                return;
            }
            // LÄHITASO: kaarevat tykkiaukot ulkopinnoilla (kameran puolella samat paikat kuin rungon neliöaukot, lisäksi länsi-,
            // itä- ja pohjoispuolen aukot), Paksun bastionin tykit, Vesiportin bastionin puu ja katos sekä Suvorovin esilinnan puu.
            OlvHolvirivi(r, OlvVesiportti[1], OlvVesiportti[2], 3, 0.034f, 0.009f, 0.013f);
            OlvHolvirivi(r, OlvVesiportti[1], OlvVesiportti[2], 4, 0.015f, 0.006f, 0.008f);
            OlvHolvirivi(r, OlvVesiportti[2], OlvVesiportti[3], 3, 0.03f, 0.008f, 0.012f);
            OlvHolvirivi(r, OlvEtelaLansi[0], OlvEtelaLansi[1], 3, 0.04f, 0.008f, 0.012f);
            OlvHolvirivi(r, OlvPikku[2], OlvPikku[1], 2, 0.028f, 0.008f, 0.012f);
            OlvHolvirivi(r, OlvPikku[3], OlvPikku[2], 2, 0.028f, 0.008f, 0.012f);
            OlvHolvirivi(r, OlvEtelaIta[1], OlvEtelaIta[2], 1, 0.036f, 0.008f, 0.012f);
            OlvHolvirivi(r, OlvPaksu[4], OlvPaksu[5], 2, 0.05f, 0.009f, 0.014f);
            OlvHolvirivi(r, OlvPaksu[3], OlvPaksu[4], 3, 0.05f, 0.009f, 0.014f);
            OlvHolvirivi(r, OlvPaksu[3], OlvPaksu[4], 4, 0.022f, 0.007f, 0.01f);
            OlvHolvirivi(r, OlvPaksu[2], OlvPaksu[3], 2, 0.05f, 0.009f, 0.014f);
            OlvHolvirivi(r, OlvKellobastioni[3], OlvKellobastioni[4], 2, 0.03f, 0.008f, 0.012f);
            OlvHolvirivi(r, OlvKellobastioni[4], OlvKellobastioni[5], 3, 0.03f, 0.008f, 0.012f);
            OlvHolvirivi(r, OlvPohjoinen[0], OlvPohjoinen[1], 6, 0.052f, 0.008f, 0.012f);
            OlvHolvirivi(r, OlvSuvorov[1], OlvSuvorov[2], 3, 0.024f, 0.007f, 0.01f);
            OlvHolvirivi(r, OlvSuvorov[3], OlvSuvorov[4], 2, 0.024f, 0.007f, 0.01f);
            // Länsiportti: kaari porttikurtiinissa laiturin päässä.
            OlvHolvirivi(r, OlvKellobastioni[0], OlvKellobastioni[1], 1, 0.02f, 0.012f, 0.024f);
            // Paksun bastionin tykit tasanteella (tummat putket kameraan päin ja lavetit).
            foreach (var (x, z, suunta) in new[] { (0.29f, -0.035f, -0.35f), (0.325f, -0.03f, -0.6f), (0.35f, -0.005f, -0.95f) })
            {
                var d = new Vector3(Mathf.Sin(suunta), 0f, -Mathf.Cos(suunta));
                var c = new Vector3(x, OlvPaksuTaso, z);
                r.Laatikko(c, new Vector3(0.012f, 0.004f, 0.012f), OlvLankku, OlvLankku);
                var t = Vector3.Cross(Vector3.up, d) * 0.0022f;
                Vector3 a0 = c + Vector3.up * 0.005f - d * 0.004f, a1 = c + Vector3.up * 0.0055f + d * 0.014f;
                r.NelioUlos(a0 - t, a1 - t * 0.8f, a1 + t * 0.8f, a0 + t, Vector3.up, OlvPiippuVari);
                r.NelioUlos(a0 - t + Vector3.up * -0.002f, a1 - t * 0.8f + Vector3.up * -0.002f, a1 - t * 0.8f, a0 - t, -t, OlvPiippuVari);
                r.NelioUlos(a0 + t + Vector3.up * -0.002f, a1 + t * 0.8f + Vector3.up * -0.002f, a1 + t * 0.8f, a0 + t, t, OlvPiippuVari);
            }
            // Vesiportin bastionin iso lehtipuu ja puinen katos pihan kannella.
            OlvPuu(r, new Vector3(-0.155f, OlvPihaY, -0.1f), 0.024f, 0.06f);
            r.Talo(new Vector3(-0.115f, OlvPihaY, -0.06f), 0.95f, 0.04f, 0.018f, 0.018f, 0.01f, OlvLankku, OlvPuukatto);
            // Suvorovin esilinnan puu.
            OlvPuu(r, new Vector3(0.36f, OlvPihaY, 0.16f), 0.018f, 0.045f);
            // Oopperan katsomo ja näyttämö esilinnan pihalla (näyttämö samassa paikassa kuin yövalossa).
            r.Laatikko(OlvNayttamo, new Vector3(0.05f, 0.006f, 0.014f), OlvLankku, OlvPuukatto);
            for (int i = 0; i < 5; i++)
            {
                float z = OlvNayttamo.z - 0.03f - i * 0.009f, y = OlvPihaY + 0.002f + i * 0.0018f;
                // Penkkirivi kahtena puolikkaana (kumpikin alle ääriviivan kynnyksen, ei tummaa kehystä).
                foreach (float sgn in new[] { -1f, 1f })
                {
                    var a0 = new Vector3(OlvNayttamo.x, y, z); var a1 = new Vector3(OlvNayttamo.x + sgn * (0.035f + i * 0.003f), y, z);
                    r.NelioUlos(a0, a1, a1 + new Vector3(0f, 0f, -0.006f), a0 + new Vector3(0f, 0f, -0.006f), Vector3.up, OlvKatsomo);
                    r.NelioUlos(a0 + new Vector3(0f, -0.0018f, -0.006f), a1 + new Vector3(0f, -0.0018f, -0.006f), a1 + new Vector3(0f, 0f, -0.006f),
                        a0 + new Vector3(0f, 0f, -0.006f), Vector3.back, OlvAukko);
                }
            }
        }

        /// <summary>Muurien ulkoreunat myötäpäivään (sisäpuoli kulkusuunnan oikealla, ulkopinta vasemmalla).</summary>
        static readonly Vector2[] OlvKellobastioni =
        {
            new Vector2(-0.245f, -0.0072f), new Vector2(-0.2566f, 0.0221f), new Vector2(-0.2731f, 0.0138f), new Vector2(-0.3031f, 0.0418f),
            new Vector2(-0.2882f, 0.0798f), new Vector2(-0.2022f, 0.0717f),
        };
        static readonly Vector2[] OlvEtelaLansi = { new Vector2(0.0565f, -0.098f), new Vector2(-0.0193f, -0.1012f), new Vector2(-0.0541f, -0.0806f) };
        static readonly Vector2[] OlvEtelaIta = { new Vector2(0.2518f, -0.0475f), new Vector2(0.2291f, -0.0934f), new Vector2(0.2078f, -0.0934f) };
        static readonly Vector2[] OlvSuvorov =
        {
            new Vector2(0.2774f, 0.2338f), new Vector2(0.34f, 0.2384f), new Vector2(0.4006f, 0.1196f), new Vector2(0.4324f, 0.1204f),
            new Vector2(0.4464f, 0.0569f), new Vector2(0.3958f, 0.0366f), new Vector2(0.3727f, 0.0283f),
        };
        static readonly Vector2[] OlvPohjoinen = { new Vector2(-0.0103f, 0.1281f), new Vector2(0.211f, 0.2144f) };
        static readonly Color OlvKatsomo = Hex(0x8a7556);

        /// <summary>Kaarevien aukkojen rivi muurin ulkopinnassa janalla a → b (ulkopinta vasemmalla): n aukkoa korkeudella y.</summary>
        static void OlvHolvirivi(Rakentaja r, Vector2 a, Vector2 b, int n, float y, float leveys, float korkeus)
        {
            var d = (OlvP(b) - OlvP(a)).normalized;
            var ulos = new Vector3(-d.z, 0f, d.x);
            for (int i = 0; i < n; i++)
                r.Holvi(Vector3.Lerp(OlvP(a), OlvP(b), (i + 0.5f) / n) + Vector3.up * y, ulos, leveys, korkeus, OlvAukko);
        }

        /// <summary>Lehtipuu (lähitaso): kapea runko ja kaksi päällekkäistä kuusitahkoista latvusmöykkyä (ei ääriviivaa).</summary>
        static void OlvPuu(Rakentaja r, Vector3 p, float sade, float korkeus)
        {
            r.Vaippa(p, 0.0026f, 0.002f, korkeus * 0.45f, 4, EmSeepia);
            OlvMoykky(r, p + Vector3.up * (korkeus * 0.55f), sade, EmPuu, Color.Lerp(EmPuu, EmSeepia, 0.4f), 0.9f, 6);
            OlvMoykky(r, p + new Vector3(sade * 0.25f, korkeus * 0.78f, -sade * 0.15f), sade * 0.72f, Color.Lerp(EmPuu, EmPaperi, 0.12f), EmPuu, 0.9f, 6);
        }

        /// <summary>Esilinnan suuri piha (oopperan katsomo lähitasossa, yövalo valot4).</summary>
        static readonly Vector2[] OlvEsilinnaPiha =
        {
            new Vector2(-0.02f, 0.082f), new Vector2(0.2f, 0.17f), new Vector2(0.246f, 0.05f), new Vector2(0.252f, -0.02f),
            new Vector2(0.21f, -0.08f), new Vector2(0.06f, -0.085f), new Vector2(0.03f, -0.07f),
        };

        /// <summary>Suljetun monikulmion sisälinja (paksuus sisään) 2D-pisteinä.</summary>
        static Vector2[] OlvSisalinja2(Vector2[] p, float paksuus)
        {
            var p3 = new Vector3[p.Length];
            for (int i = 0; i < p.Length; i++) p3[i] = OlvP(p[i]);
            var q = OlvSisalinja(p3, paksuus, true);
            var ulos = new Vector2[p.Length];
            for (int i = 0; i < p.Length; i++) ulos[i] = new Vector2(q[i].x, q[i].z);
            return ulos;
        }

        /// <summary>Tummien aukkojen rivi muurin ulkopinnassa janalla a → b (ulkopinta vasemmalla kuten OlvMuurissa): n aukkoa
        /// korkeudella y, leveys ja korkeus.</summary>
        static void OlvAukkorivi(Rakentaja r, Vector2 a, Vector2 b, int n, float y, float leveys, float korkeus, Color? vari = null)
        {
            var d = (OlvP(b) - OlvP(a)).normalized;
            var ulos = new Vector3(-d.z, 0f, d.x);
            for (int i = 0; i < n; i++)
            {
                var p = Vector3.Lerp(OlvP(a), OlvP(b), (i + 0.5f) / n) + Vector3.up * y;
                r.Laatta(p, ulos, leveys, korkeus, vari ?? OlvAukko);
            }
        }

        /// <summary>Puinen aumakatto monikulmion päälle: lappeet kärkeen, joka on korkeudella h monikulmion keskellä.</summary>
        static void OlvPyramidikatto(Rakentaja r, Vector2[] p, float y, float h, bool lahi = false)
        {
            var c = OlvKeski(p, y);
            var k = c + Vector3.up * h;
            var keski = c + Vector3.up * (h * 0.3f);
            for (int i = 0; i < p.Length; i++)
            {
                int j = (i + 1) % p.Length;
                // Räystäs hieman muurin ulkopuolella.
                Vector3 a = c + (OlvP(p[i], y) - c) * 1.04f, b = c + (OlvP(p[j], y) - c) * 1.04f;
                r.KolmioKeskelta(a, b, k, keski, OlvPuukatto);
                if (lahi)
                {
                    // Harjalinja (vaalea harjalauta) nurkasta kärkeen.
                    var t = Vector3.Cross(Vector3.up, (k - a).normalized) * 0.0014f;
                    r.NelioUlos(a - t + Vector3.up * 0.0008f, k - t * 0.3f + Vector3.up * 0.0008f, k + t * 0.3f + Vector3.up * 0.0008f, a + t + Vector3.up * 0.0008f,
                        (a - c).normalized + Vector3.up, OlvKaytava);
                }
            }
        }

        // ---- Päälinna ----

        /// <summary>Päälinnan taivutettu lounaismuuri ulkopinnan linjana myötäpäivään (Eerikin tornilta Kellotornille).</summary>
        static readonly Vector2[] OlvTaipunut =
        {
            new Vector2(0.004f, -0.058f), new Vector2(-0.03f, -0.058f), new Vector2(-0.098f, -0.037f), new Vector2(-0.132f, -0.012f), new Vector2(-0.19f, 0.03f),
        };

        /// <summary>
        /// Päälinna (yksi ääriviivaosa): pohjoismuuri Kellotornista Kirkkotorniin, taivutettu lounaismuuri Pyhän Eerikin tornin
        /// raunioilta Kellotornille (katettu muurikäytävä), palatsi pohjoismuurin sisäpuolella (hillitty harmaanvihreä katto),
        /// itäsiipi Kirkkotornista etelään (tumma harjakatto) ja pieni sisäpiha. Pyhän Eerikin tornin raunio matalana kivikehänä.
        /// </summary>
        static void OlvPaalinna(Rakentaja r, bool lahi)
        {
            float h = OlvPaalinnaH;
            r.AloitaOsa();
            OlvMuuri(r, new[] { new Vector2(-0.2022f, 0.0717f), new Vector2(-0.1377f, 0.0858f), new Vector2(-0.0751f, 0.1053f) }, 0f, h, 0.02f, OlvKiviVarjo,
                OlvKivi, OlvKaytava, rinta: lahi ? OlvRinta : 0f);
            OlvMuuri(r, OlvTaipunut, 0f, h, 0.022f, OlvKivi, OlvKiviVarjo, OlvPuukatto);
            // Palatsi pohjoismuurin sisäpuolella ja itäsiipi (Kuninkaansalin siipi).
            r.Talo(OlvP(-0.11f, 0.046f), 0.26f, 0.09f, 0.05f, h - 0.006f, 0.03f, OlvKivi, OlvPalatsiKatto);
            r.Talo(OlvP(-0.016f, 0.028f), -1.25f, 0.105f, 0.048f, h - 0.004f, 0.03f, OlvKivi, OlvPalatsiKatto);
            OlvLattia(r, new[] { new Vector2(-0.118f, -0.004f), new Vector2(-0.09f, 0.018f), new Vector2(-0.05f, 0.012f), new Vector2(-0.04f, -0.036f),
                new Vector2(-0.09f, -0.024f) }, OlvPihaY + 0.004f, OlvPiha);
            r.LopetaOsa();
            // Ikkunat lounaismuurissa (samat paikat kuin yövaloissa valot3).
            foreach (var (i, u, y) in OlvPaalinnaIkkunat)
            {
                var a = OlvP(OlvTaipunut[i]); var b = OlvP(OlvTaipunut[i + 1]);
                var d = (b - a).normalized;
                r.Laatta(Vector3.Lerp(a, b, u) + Vector3.up * y, new Vector3(-d.z, 0f, d.x), 0.0065f, 0.011f, OlvAukko);
            }
            // Pyhän Eerikin tornin raunio: matala kivikehä (8 sivua), sisällä nurmi.
            var e = OlvEerik;
            r.AloitaOsa();
            r.Vaippa(new Vector3(e.x, 0f, e.z), 0.022f, 0.021f, 0.052f, 8, OlvKivi, Mathf.PI / 8f);
            r.Rengas(0.052f, (e.x, e.z, 0.012f, 0.012f), (e.x, e.z, 0.021f, 0.021f), 8, OlvKaytava);
            r.LopetaOsa();
            r.Kiekko(new Vector3(e.x, 0.034f, e.z), 0.013f, 0.013f, 8, OlvNurmi);
            if (!lahi) return;
            // LÄHITASO: palatsin savupiiput, lounaismuurin alemmat rakoaukot kynnyksineen, pohjoismuurin ikkunat, Eerikin tornin
            // raunion rosoinen laki ja puu.
            foreach (var (x, z) in new[] { (-0.132f, 0.038f), (-0.09f, 0.05f) })
                r.Laatikko(new Vector3(x, h + 0.014f, z), new Vector3(0.007f, 0.018f, 0.007f), OlvTiili, OlvAukko);
            for (int i = 0; i + 1 < OlvTaipunut.Length; i++)
            {
                var a = OlvP(OlvTaipunut[i]); var b = OlvP(OlvTaipunut[i + 1]);
                var d = (b - a).normalized; var ulos = new Vector3(-d.z, 0f, d.x);
                int m = (b - a).magnitude > 0.06f ? 2 : 1;
                for (int j = 0; j < m; j++)
                {
                    var q = Vector3.Lerp(a, b, (j + 0.5f) / m) + Vector3.up * 0.036f;
                    r.Laatta(q, ulos, 0.004f, 0.01f, OlvAukko);
                    r.Laatta(q + Vector3.up * -0.0062f, ulos, 0.0065f, 0.0015f, OlvKaytava);
                }
            }
            OlvAukkorivi(r, new Vector2(-0.2022f, 0.0717f), new Vector2(-0.1377f, 0.0858f), 1, 0.07f, 0.0055f, 0.01f);
            OlvAukkorivi(r, new Vector2(-0.1377f, 0.0858f), new Vector2(-0.0751f, 0.1053f), 2, 0.07f, 0.0055f, 0.01f);
            foreach (float a in new[] { 0.3f, 1.9f, 3.6f, 5.1f })
            {
                var d = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                r.Laatikko(new Vector3(e.x, 0.052f, e.z) + d * 0.0165f, new Vector3(0.008f, 0.004f + 0.003f * Mathf.Sin(a * 3f), 0.008f), OlvKivi, OlvKaytava);
            }
            OlvPuu(r, new Vector3(e.x + 0.002f, 0.034f, e.z + 0.002f), 0.013f, 0.04f);
        }

        /// <summary>Päälinnan lounaismuurin ikkunat: segmentti (OlvTaipunut), osuus segmentillä ja korkeus.</summary>
        static readonly (int seg, float u, float y)[] OlvPaalinnaIkkunat =
        {
            (1, 0.3f, 0.072f), (1, 0.72f, 0.072f), (2, 0.5f, 0.078f), (3, 0.45f, 0.072f), (0, 0.5f, 0.066f),
        };

        // ---- Tornit ----

        /// <summary>
        /// Kolme pyöreää tornia (kukin oma ääriviivaosansa): hieman kapeneva kivirunko, tiilikruunu, jonka räystään alla kiertää
        /// pyöreiden ampuma-aukkojen rivi (rungossa kameran puoleiset viisi), ja matala kartiokatto räystäineen: Kellotornilla tumma
        /// liuske, Kirkkotornilla ja Kijlin tornilla kuparinvihreä (aksentti). Kattonuppi on ääriviivaosan ulkopuolella (ohut piikki).
        /// </summary>
        static void OlvTornit(Rakentaja r, bool lahi)
        {
            OlvTorniRunko(r, OlvKello, 0, lahi);
            OlvTorniRunko(r, OlvKirkko, 1, lahi);
            OlvTorniRunko(r, OlvKijl, 2, lahi);
        }

        /// <summary>Kameran puolen tahkot (etelä ± 60°), joissa rungon ampuma-aukot ja yövalot ovat.</summary>
        static readonly int[] OlvEtuTahkot = { 7, 8, 9, 10, 11 };

        /// <summary>Tornien ikkunat kivirungossa kameran puolella: tahko ja korkeus (osuus tiilikruunun alarajasta); samat paikat
        /// rungossa, lähitasossa ja yövaloissa.</summary>
        static readonly (int tahko, float osuus)[][] OlvTorniIkkunat =
        {
            new[] { (8, 0.55f), (10, 0.72f), (9, 0.86f) },
            new[] { (9, 0.62f), (10, 0.84f), (8, 0.8f) },
            new[] { (9, 0.66f), (8, 0.84f), (10, 0.78f) },
        };

        const float OlvAukkoKoko = 0.0085f, OlvIkkunaL = 0.006f, OlvIkkunaK = 0.011f;

        static void OlvTorniRunko(Rakentaja r, OlvTorni t, int nro, bool lahi)
        {
            int n = OlvTorniSivuja;
            var p = new Vector3(t.X, 0f, t.Z);
            float kulma = Mathf.PI / n;
            float apo = Mathf.Cos(Mathf.PI / n);
            var katto = t.Tumma ? OlvLiuske : OlvKupari;
            float rr = t.R * 1.1f, ye = t.Raystas - 0.004f;
            var k = p + Vector3.up * t.Huippu;
            r.AloitaOsa();
            r.Vaippa(p, t.R0, t.R, t.Tiili, n, OlvTorniKivi, kulma);
            r.Vaippa(p + Vector3.up * t.Tiili, t.R, t.R, t.Raystas - t.Tiili, n, OlvTiili, kulma);
            // Katto: räystäs 1,1 × säteeseen, lappeet kärkeen.
            var keski = p + Vector3.up * (ye + (t.Huippu - ye) * 0.3f);
            for (int i = 0; i < n; i++)
            {
                float a0 = kulma + i * Mathf.PI * 2f / n, a1 = a0 + Mathf.PI * 2f / n;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)), d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1));
                r.KolmioKeskelta(p + Vector3.up * ye + d0 * rr, p + Vector3.up * ye + d1 * rr, k, keski, katto);
            }
            if (lahi)
            {
                // Kruunun alareunan vaalea kivilista ja räystään tumma otsalauta (samassa ääriviivaosassa, siluetti ennallaan).
                r.Vaippa(p + Vector3.up * (t.Tiili - 0.0015f), t.R + 0.0016f, t.R + 0.0016f, 0.0036f, n, OlvKaytava, kulma);
                r.Vaippa(p + Vector3.up * (ye - 0.0032f), rr * 0.985f, rr * 0.985f, 0.0032f, n, Color.Lerp(katto, OlvAukko, 0.45f), kulma);
                // Katon saumat (vaaleat harjat lappeiden rajoilla).
                var sauma = Color.Lerp(katto, EmPaperi, 0.42f);
                for (int i = 0; i < n; i++)
                {
                    float a0 = kulma + i * Mathf.PI * 2f / n;
                    var d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0));
                    var e = p + Vector3.up * ye + d0 * rr;
                    var tt = Vector3.Cross(Vector3.up, d0) * 0.0008f;
                    var nn = (e - k).normalized; var ulos = d0 * 0.8f + Vector3.up * 0.6f;
                    r.NelioUlos(e - tt + ulos * 0.0006f, k - tt * 0.2f + ulos * 0.0006f, k + tt * 0.2f + ulos * 0.0006f, e + tt + ulos * 0.0006f, ulos, sauma);
                }
            }
            r.LopetaOsa();
            // Kattonuppi (ohut piikki ääriviivaosan ulkopuolella); Kellotornissa lähitasossa lipputanko ilman lippua.
            r.Timantti(k + Vector3.up * 0.004f, 0.0035f, 0.0045f, katto, 4);
            if (lahi && t.Tumma)
            {
                r.Vaippa(k + Vector3.up * 0.007f, 0.0011f, 0.0009f, 0.042f, 3, EmMuste);
                r.Timantti(k + Vector3.up * 0.0505f, 0.0018f, 0.0018f, EmKulta, 3);
            }
            if (!lahi)
            {
                // Ampuma-aukot tiilikruunussa (kameran puolen tahkot).
                foreach (int f in OlvEtuTahkot)
                {
                    var dn = OlvTahkoSuunta(f);
                    r.Laatta(new Vector3(t.X, t.Aukot, t.Z) + dn * (t.R * apo), dn, OlvAukkoKoko, OlvAukkoKoko, OlvAukko);
                }
            }
            else
            {
                // Lähitaso: kaikki 12 ampuma-aukkoa pyöreinä (kameran puolen viisi samoissa kohdissa kuin rungon neliöt ja yövalot)
                // vaalein kynnyksin.
                for (int f = 1; f <= n; f++)
                {
                    var dn = OlvTahkoSuunta(f);
                    var c = new Vector3(t.X, t.Aukot, t.Z) + dn * (t.R * apo);
                    OlvReika(r, c, dn, OlvAukkoKoko * 0.56f, OlvAukko);
                    r.Laatta(c + Vector3.up * (-OlvAukkoKoko * 0.66f), dn, OlvAukkoKoko * 1.15f, 0.0017f, OlvKaytava);
                }
                // Lisää rakoikkunoita kivirungon muille tahkoille.
                foreach (var (f, osuus) in OlvTorniLisaIkkunat[nro])
                {
                    var dn = OlvTahkoSuunta(f);
                    float y = t.Tiili * osuus;
                    float rs = Mathf.Lerp(t.R0, t.R, osuus) * apo;
                    r.Laatta(new Vector3(t.X, y, t.Z) + dn * rs, dn, OlvIkkunaL * 0.8f, OlvIkkunaK, OlvAukko);
                    r.Laatta(new Vector3(t.X, y - OlvIkkunaK * 0.62f, t.Z) + dn * rs, dn, OlvIkkunaL * 1.3f, 0.0015f, OlvKaytava);
                }
            }
            // Pienet ikkunat kivirungossa kameran puolella (samat paikat rungossa, lähitasossa ja yövaloissa).
            foreach (var (f, osuus) in OlvTorniIkkunat[nro])
            {
                var dn = OlvTahkoSuunta(f);
                float y = t.Tiili * osuus;
                float rs = Mathf.Lerp(t.R0, t.R, osuus) * apo;
                r.Laatta(new Vector3(t.X, y, t.Z) + dn * rs, dn, OlvIkkunaL, OlvIkkunaK, OlvAukko);
                if (lahi) r.Laatta(new Vector3(t.X, y - OlvIkkunaK * 0.62f, t.Z) + dn * rs, dn, OlvIkkunaL * 1.3f, 0.0015f, OlvKaytava);
            }
        }

        /// <summary>Lähitason lisäikkunat tornien muilla tahkoilla (tahko ja korkeus tiilikruunun alarajasta).</summary>
        static readonly (int tahko, float osuus)[][] OlvTorniLisaIkkunat =
        {
            new[] { (1, 0.5f), (3, 0.7f), (5, 0.42f), (6, 0.8f), (12, 0.62f), (11, 0.35f) },
            new[] { (2, 0.55f), (4, 0.72f), (6, 0.4f), (12, 0.8f), (7, 0.5f), (11, 0.66f) },
            new[] { (1, 0.6f), (3, 0.45f), (5, 0.75f), (6, 0.5f), (12, 0.7f), (11, 0.4f) },
        };

        static OlvTorni OlvTorniNro(int nro) => nro == 0 ? OlvKello : nro == 1 ? OlvKirkko : OlvKijl;

        // ---- Ponttonisilta ----

        /// <summary>Sillan kääntyvän osan Tallisaaren pää (pivot) ja linnan pää; kannen korkeus ja leveys.</summary>
        static readonly Vector3 OlvSiltaT = new Vector3(-0.43f, OlvVesiY, 0.1f), OlvSiltaC = new Vector3(-0.285f, OlvVesiY, -0.035f);
        const float OlvSiltaLeveys = 0.012f, OlvSiltaKansi = 0.006f;

        /// <summary>Sillan kiinteät laiturit: linnan länsiportin laituri (lyhyt kansi portilta veteen) ja Tallisaaren laituri
        /// (pieniä paloja ilman ääriviivaa).</summary>
        static void OlvSillanPaat(Rakentaja r, bool lahi)
        {
            var a = new Vector3(-0.25f, 0f, -0.01f);
            var b = OlvSiltaC;
            var d = b - a; d.y = 0f;
            var t = Vector3.Cross(Vector3.up, d.normalized) * (OlvSiltaLeveys * 0.5f);
            float y = OlvSiltaKansi;
            r.NelioUlos(new Vector3(a.x, y, a.z) - t, new Vector3(b.x, y, b.z) - t, new Vector3(b.x, y, b.z) + t, new Vector3(a.x, y, a.z) + t, Vector3.up, OlvLankku);
            r.NelioUlos(new Vector3(a.x, 0f, a.z) - t, new Vector3(b.x, 0f, b.z) - t, new Vector3(b.x, y, b.z) - t, new Vector3(a.x, y, a.z) - t, -t, EmSeepia);
            var c = OlvSiltaT;
            r.NelioUlos(c + new Vector3(-0.016f, y - c.y, -0.008f), c + new Vector3(0.004f, y - c.y, -0.008f), c + new Vector3(0.004f, y - c.y, 0.008f),
                c + new Vector3(-0.016f, y - c.y, 0.008f), Vector3.up, OlvLankku);
            if (!lahi) return;
            // LÄHITASO: laiturin kaiteet ja tolpat, ponttonin tumma kylki sekä Tallisaaren laiturin pollarit ja lyhtypylväs.
            var u = d.normalized;
            foreach (float sgn in new[] { -1f, 1f })
            {
                var o = t * sgn * 0.9f;
                Vector3 k0 = new Vector3(a.x, y, a.z) + o, k1 = new Vector3(b.x, y, b.z) + o;
                r.Kalvo(k0 + Vector3.up * 0.004f, k1 + Vector3.up * 0.004f, k1 + Vector3.up * 0.0055f, k0 + Vector3.up * 0.0055f, EmSeepia);
                foreach (var k in new[] { k0, k1 })
                    r.Kalvo(k - u * 0.0007f, k + u * 0.0007f, k + u * 0.0007f + Vector3.up * 0.0058f, k - u * 0.0007f + Vector3.up * 0.0058f, EmMuste);
            }
            r.NelioUlos(new Vector3(a.x, 0f, a.z) + t, new Vector3(b.x, 0f, b.z) + t, new Vector3(b.x, y, b.z) + t, new Vector3(a.x, y, a.z) + t, t, EmSeepia);
            foreach (var o in new[] { new Vector3(0.002f, 0f, -0.006f), new Vector3(0.002f, 0f, 0.006f) })
                r.Vaippa(c + o + Vector3.up * (y - c.y), 0.0016f, 0.0014f, 0.004f, 4, EmMuste);
            var lp = c + new Vector3(-0.012f, y - c.y, 0.006f);
            r.Vaippa(lp, 0.0009f, 0.0008f, 0.02f, 3, EmMuste);
            r.Timantti(lp + Vector3.up * 0.0215f, 0.0022f, 0.0026f, EmIkkunavalo, 3);
        }

        // ================================================================================================================
        // ---- Liikkuvat osat ----
        // ================================================================================================================

        /// <summary>Ponttonisillan kääntyvä osa (pivot Tallisaaren päässä): lankkukansi ja tummat ponttonikyljet kolmena palana
        /// (kukin alle ääriviivan kynnyksen), suljettuna linnan laituriin.</summary>
        static Mesh OlavinlinnaSilta()
        {
            var r = new Rakentaja();
            var d = OlvSiltaC - OlvSiltaT; d.y = 0f;
            float L = d.magnitude; var u = d / L; var t = Vector3.Cross(Vector3.up, u);
            float w = OlvSiltaLeveys * 0.5f, y = OlvSiltaKansi - OlvVesiY;
            const int palat = 3;
            for (int i = 0; i < palat; i++)
            {
                Vector3 a = u * (L * i / palat), b = u * (L * (i + 1) / palat);
                r.NelioUlos(a - t * w + Vector3.up * y, b - t * w + Vector3.up * y, b + t * w + Vector3.up * y, a + t * w + Vector3.up * y, Vector3.up, OlvLankku);
                r.NelioUlos(a - t * w, b - t * w, b - t * w + Vector3.up * y, a - t * w + Vector3.up * y, -t, EmSeepia);
                r.NelioUlos(a + t * w, b + t * w, b + t * w + Vector3.up * y, a + t * w + Vector3.up * y, t, EmSeepia);
            }
            // Vapaa pää (linnan puoli).
            var e = u * L;
            r.NelioUlos(e - t * w, e + t * w, e + t * w + Vector3.up * y, e - t * w + Vector3.up * y, u, EmSeepia);
            return r.Verkko("Olavinlinna-silta");
        }

        // ---- Höyrylaiva ----

        /// <summary>Laivan pivot (lepoasento väylällä sillan eteläpuolella, keula pohjoiseen) ja piipun suu laivan avaruudessa.</summary>
        static readonly Vector3 OlvLaivaP = new Vector3(-0.39f, OlvVesiY, -0.12f);
        static readonly Vector3 OlvPiippu = new Vector3(0f, 0.034f, -0.004f);
        static Vector3 OlvSavuP => OlvLaivaP + OlvPiippu;

        /// <summary>Rungon ääriviiva (keula +Z): keula, kyljet ja peräpeili; korkeudet vesiraja 0, raita 0,003 ja kansi 0,009.</summary>
        static readonly Vector3[] OlvLaivaReuna =
        {
            new Vector3(0f, 0f, 0.05f), new Vector3(0.011f, 0f, 0.016f), new Vector3(0.0112f, 0f, -0.036f), new Vector3(0.0055f, 0f, -0.05f),
            new Vector3(-0.0055f, 0f, -0.05f), new Vector3(-0.0112f, 0f, -0.036f), new Vector3(-0.011f, 0f, 0.016f),
        };
        const float OlvLaivaRaita = 0.003f, OlvLaivaKansi = 0.009f;
        static readonly Color OlvLaivaValkea = Hex(0xf3ecd9), OlvLaivaPuu = Hex(0xc9aa7c), OlvPiippuVari = Hex(0x2b241c), OlvSavuVari = Hex(0xfbf8f0);

        /// <summary>
        /// Valkoinen höyrylaiva (pivot vesirajassa keskellä, keula +Z, pituus 0,1 eli noin 23 m kuten Riihisaaren museolaivat):
        /// paperinvalkoinen runko, jonka alaosa on mustetta, vaalea kansi, vaalean puun kansirakennus valkoisine yläkansineen ja
        /// tummine ikkunariveineen sekä musta savupiippu vaalealla raidalla. Jokainen kappale alle ääriviivan kynnyksen.
        /// </summary>
        static Mesh OlavinlinnaLaiva()
        {
            var r = new Rakentaja();
            var R = OlvLaivaReuna;
            var keski = new Vector3(0f, OlvLaivaKansi * 0.5f, 0f);
            for (int i = 0; i < R.Length; i++)
            {
                var a = R[i]; var b = R[(i + 1) % R.Length];
                r.NelioKeskelta(a * 0.9f, b * 0.9f, b + Vector3.up * OlvLaivaRaita, a + Vector3.up * OlvLaivaRaita, keski, EmMuste);
                r.NelioKeskelta(a + Vector3.up * OlvLaivaRaita, b + Vector3.up * OlvLaivaRaita, b + Vector3.up * OlvLaivaKansi, a + Vector3.up * OlvLaivaKansi, keski, OlvLaivaValkea);
            }
            var yk = Vector3.up * OlvLaivaKansi;
            r.KolmioUlos(R[0] + yk, R[1] + yk, R[6] + yk, Vector3.up, EmPaperi);
            r.NelioUlos(R[1] + yk, R[2] + yk, R[5] + yk, R[6] + yk, Vector3.up, EmPaperi);
            r.NelioUlos(R[2] + yk, R[3] + yk, R[4] + yk, R[5] + yk, Vector3.up, EmPaperi);
            // Kansirakennus ja ikkunarivit.
            r.Laatikko(new Vector3(0f, OlvLaivaKansi, -0.008f), new Vector3(0.016f, 0.009f, 0.052f), OlvLaivaPuu, OlvLaivaValkea);
            foreach (float s in new[] { -1f, 1f })
                r.Laatta(new Vector3(s * 0.008f, OlvLaivaKansi + 0.0052f, -0.008f), new Vector3(s, 0f, 0f), 0.044f, 0.0026f, EmMuste);
            // Savupiippu: musta vaippa, vaalea raita yläosassa ja tumma suu.
            float y0 = OlvLaivaKansi + 0.009f, hp = OlvPiippu.y - y0;
            var pp = new Vector3(OlvPiippu.x, y0, OlvPiippu.z);
            r.Vaippa(pp, 0.0043f, 0.0039f, hp * 0.62f, 5, OlvPiippuVari);
            r.Vaippa(pp + Vector3.up * (hp * 0.62f), 0.0039f, 0.0037f, hp * 0.38f, 5, EmKiviVaalea);
            r.Kiekko(new Vector3(OlvPiippu.x, OlvPiippu.y, OlvPiippu.z), 0.0037f, 0.0037f, 5, OlvPiippuVari);
            return r.Verkko("Olavinlinna-laiva");
        }

        /// <summary>Laivan yövalot (sama pivot ja asento kuin laivalla): lämmin ikkunarivi kummallakin kyljellä tummien ikkunoiden
        /// edessä ja keulalyhty.</summary>
        static Mesh OlavinlinnaLaivaValot()
        {
            var r = new Rakentaja();
            foreach (float s in new[] { -1f, 1f })
                r.Laatta(new Vector3(s * 0.0088f, OlvLaivaKansi + 0.0052f, -0.008f), new Vector3(s, 0f, 0f), 0.042f, 0.0028f, EmIkkunavalo);
            r.Timantti(new Vector3(0f, OlvLaivaKansi + 0.004f, 0.044f), 0.0025f, 0.0025f, EmIkkunavalo, 3);
            return r.Verkko("Olavinlinna-laivavalot");
        }

        /// <summary>Laivan vana (pivot laivan pivotissa): vaahto-V perän takana, kaksi kapenevaa viirua (ilman ääriviivaa).</summary>
        static Mesh OlavinlinnaVana()
        {
            var r = new Rakentaja();
            foreach (float s in new[] { -1f, 1f })
            {
                Vector3 a = new Vector3(s * 0.007f, 0.0004f, -0.046f), m = new Vector3(s * 0.016f, 0.0004f, -0.074f), b = new Vector3(s * 0.024f, 0.0004f, -0.102f);
                var t = new Vector3(0.0028f, 0f, 0f);
                r.NelioUlos(a - t, m - t * 0.7f, m + t * 0.7f, a + t, Vector3.up, EmVaahto);
                r.NelioUlos(m - t * 0.7f, b - t * 0.25f, b + t * 0.25f, m + t * 0.7f, Vector3.up, EmVaahto);
            }
            return r.Verkko("Olavinlinna-vana");
        }

        /// <summary>Savutupru (pivot tuprun keskellä): kahdeksankulmainen kaksoispyramidi, yläpuolisko vaalea ja alapuolisko
        /// seepiaan taittuva (ei ääriviivaa, kukin kolmio oma pieni osansa). Halkaisija 0,03, jotta näkyy 40 pt:ssä. 16 kolmiota.</summary>
        static Mesh OlavinlinnaSavu()
        {
            var r = new Rakentaja();
            OlvMoykky(r, Vector3.zero, 0.015f, OlvSavuVari, Color.Lerp(OlvSavuVari, EmSeepia, 0.45f));
            return r.Verkko("Olavinlinna-savu");
        }

        /// <summary>Möykky: kahdeksankulmainen kaksoispyramidi (savu, pilvi): yläpuolisko ja alapuolisko omilla väreillään.</summary>
        static void OlvMoykky(Rakentaja r, Vector3 k, float sade, Color yla, Color ala, float litteys = 1f, int sivuja = 8)
        {
            Vector3 ky = k + Vector3.up * (sade * 0.9f * litteys), ka = k - Vector3.up * (sade * 0.6f * litteys);
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = i * Mathf.PI * 2f / sivuja + 0.3f, a1 = (i + 1) * Mathf.PI * 2f / sivuja + 0.3f;
                Vector3 p0 = k + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * sade, p1 = k + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * sade;
                r.KolmioKeskelta(p0, p1, ky, k, yla);
                r.KolmioKeskelta(p1, p0, ka, k, ala);
            }
        }

        // ---- Musta pässi, ukkospilvi ja piirittäjien veneet (harvinainen) ----

        /// <summary>Ukkospilven pivot: linnan pohjoisosan yllä tornien huippujen yläpuolella (ei peitä Paksua bastionia).</summary>
        static readonly Vector3 OlvPilviP = new Vector3(0.04f, 0.345f, 0.17f);
        static readonly Color OlvPilviVari = Hex(0x5d5a58), OlvPilviAla = Hex(0x48453f);

        /// <summary>Tumma ukkospilvi (pivot keskellä): neljä litteää möykkyä, yläpinta liuskeensininen ja alapinta tummempi
        /// (ei ääriviivaa, ei salamaa). Noin 0,24 leveä.</summary>
        static Mesh OlavinlinnaPilvi()
        {
            var r = new Rakentaja();
            OlvMoykky(r, new Vector3(-0.05f, 0f, 0f), 0.05f, OlvPilviVari, OlvPilviAla, 0.75f, 6);
            OlvMoykky(r, new Vector3(0.035f, 0.008f, 0.01f), 0.058f, OlvPilviVari, OlvPilviAla, 0.8f, 6);
            OlvMoykky(r, new Vector3(0.095f, -0.004f, -0.008f), 0.04f, OlvPilviVari, OlvPilviAla, 0.75f, 6);
            OlvMoykky(r, new Vector3(-0.1f, -0.006f, 0.006f), 0.034f, OlvPilviVari, OlvPilviAla, 0.75f, 6);
            return r.Verkko("Olavinlinna-pilvi");
        }

        /// <summary>Pässin pivot (takajaloissa Paksun bastionin tykkitasanteella) ja niska pässin avaruudessa (keula +Z).</summary>
        static readonly Vector3 OlvPassiP = new Vector3(0.302f, OlvPaksuTaso, -0.012f);
        static readonly Vector3 OlvNiska = new Vector3(0f, 0.024f, 0.036f);
        static Vector3 OlvPaaP => OlvPassiP + OlvNiska;
        static readonly Color OlvPassiVari = Hex(0x2e261d), OlvSarvi = Hex(0xd9c9a3);

        /// <summary>
        /// Musta pässi (pivot takajaloissa, keula +Z, noin 0,05 pitkä pää mukaan lukien eli noin 8 × kuten Kronborgin haamu, jotta
        /// näkyy 40 pt:ssä): pyöreä kuusitahkoinen villavartalo pyöristetyin päin, neljä lyhyttä jalkaa ja pieni häntä, kaikki
        /// mustetta. Pää sarvineen on oma osansa (passinpaa), jotta se voi heiluttaa sarviaan.
        /// </summary>
        static Mesh OlavinlinnaPassi()
        {
            var r = new Rakentaja();
            // Vartalo: kuusikulmainen prisma pituussuunnassa, päissä matalat pyramidit (pyöreä villakeho); takapää matalammalla, joten
            // takajaloilleen noustessa (kierto takajalkojen ympäri) pässi seisoo tukevasti ja etujalat huitovat eteen.
            const float z0 = 0.0f, z1 = 0.032f, y0 = 0.0165f, y1 = 0.0215f;
            float rw = 0.012f, rh = 0.0105f;
            var ala = new Vector3[6]; var yla = new Vector3[6];
            for (int i = 0; i < 6; i++)
            {
                float a = i * Mathf.PI / 3f + Mathf.PI / 6f;
                ala[i] = new Vector3(Mathf.Cos(a) * rw, y0 + Mathf.Sin(a) * rh, z0);
                yla[i] = new Vector3(Mathf.Cos(a) * rw * 0.95f, y1 + Mathf.Sin(a) * rh * 0.95f, z1);
            }
            var kk = new Vector3(0f, (y0 + y1) * 0.5f, (z0 + z1) * 0.5f);
            for (int i = 0; i < 6; i++)
            {
                int j = (i + 1) % 6;
                r.NelioKeskelta(ala[i], ala[j], yla[j], yla[i], kk, OlvPassiVari);
                r.KolmioKeskelta(new Vector3(0f, y0, z0 - 0.007f), ala[i], ala[j], kk, OlvPassiVari);
                r.KolmioKeskelta(new Vector3(0f, y1 + 0.001f, z1 + 0.006f), yla[i], yla[j], kk, OlvPassiVari);
            }
            // Jalat: lyhyet takajalat pivotin kohdalla (piiloon vartalon alle pystyssä) ja etujalat edessä, ohuina kaksipuolisina levyinä.
            foreach (float x in new[] { -0.0062f, 0.0062f })
            {
                r.Kalvo(new Vector3(x, 0f, 0.0012f), new Vector3(x, 0f, 0.0052f), new Vector3(x, 0.008f, 0.0058f), new Vector3(x, 0.008f, 0.0006f), OlvPassiVari);
                r.Kalvo(new Vector3(x, 0.0005f, 0.028f), new Vector3(x, 0.0005f, 0.0322f), new Vector3(x, 0.0135f, 0.0312f), new Vector3(x, 0.0135f, 0.0252f), OlvPassiVari);
            }
            // Häntä.
            r.KalvoKolmio(new Vector3(-0.0025f, 0.022f, -0.005f), new Vector3(0.0025f, 0.022f, -0.005f), new Vector3(0f, 0.012f, -0.01f), OlvPassiVari);
            return r.Verkko("Olavinlinna-passi");
        }

        /// <summary>Pässin pää (pivot niskassa): musta kiilamainen pää kuonoineen eteen ja kummallakin sivulla suuri vaalea kiertynyt
        /// sarvi (kaksipuolinen kuusikulmiokiekko, jonka keskellä tumma kierteen silmä), joten sarvet erottuvat pienessäkin koossa.</summary>
        static Mesh OlavinlinnaPassinPaa()
        {
            var r = new Rakentaja();
            var k = new Vector3(0f, 0.004f, 0.009f);
            r.Timantti(k, 0.0068f, 0.0078f, OlvPassiVari, 4);
            r.Kalvo(new Vector3(-0.0032f, 0.0012f, 0.013f), new Vector3(0.0032f, 0.0012f, 0.013f), new Vector3(0.0022f, -0.0045f, 0.022f), new Vector3(-0.0022f, -0.0045f, 0.022f), OlvPassiVari);
            foreach (float s in new[] { -1f, 1f })
            {
                var c = new Vector3(s * 0.0078f, 0.0055f, 0.0045f);
                var n = new Vector3(s, 0f, 0.25f).normalized;
                var t = Vector3.Cross(Vector3.up, n);
                const float rs = 0.0078f;
                for (int i = 0; i < 6; i++)
                {
                    float a0 = i * Mathf.PI / 3f, a1 = (i + 1) * Mathf.PI / 3f;
                    Vector3 p0 = c + (t * Mathf.Cos(a0) + Vector3.up * Mathf.Sin(a0)) * rs, p1 = c + (t * Mathf.Cos(a1) + Vector3.up * Mathf.Sin(a1)) * rs;
                    r.KalvoKolmio(c, p0, p1, OlvSarvi);
                }
                // Kierteen tumma silmä sarven ulkopinnalla.
                var cs = c + n * 0.0012f + t * (0.0015f * s) + Vector3.up * -0.001f;
                for (int i = 0; i < 4; i++)
                {
                    float a0 = i * Mathf.PI / 2f, a1 = (i + 1) * Mathf.PI / 2f;
                    r.KolmioUlos(cs, cs + (t * Mathf.Cos(a0) + Vector3.up * Mathf.Sin(a0)) * 0.0028f, cs + (t * Mathf.Cos(a1) + Vector3.up * Mathf.Sin(a1)) * 0.0028f, n,
                        Color.Lerp(OlvSarvi, EmSeepia, 0.55f));
                }
            }
            return r.Verkko("Olavinlinna-passinpaa");
        }

        /// <summary>Piirittäjien veneiden pivotit (lähestymispaikka vedessä Paksun bastionin edessä; liikeydin tuo veneet ulompaa ja
        /// vie pois salmen reunoille).</summary>
        static readonly Vector3[] OlvVeneP =
        {
            new Vector3(0.3f, OlvVesiY, -0.122f), new Vector3(0.405f, OlvVesiY, -0.108f), new Vector3(0.225f, OlvVesiY, -0.152f),
        };
        static readonly Color OlvVeneVari = Hex(0x6b5238), OlvVeneSisus = Hex(0x8f7454);

        /// <summary>Piirittäjien soutuvene (pivot vesirajassa keskellä, keula +Z, pituus 0,04): tumma puurunko, vaalea sisus, kaksi
        /// soutajaa (muste) ja airot.</summary>
        static Mesh OlavinlinnaVene()
        {
            var r = new Rakentaja();
            var reuna = new[] { new Vector3(0f, 0f, 0.02f), new Vector3(0.0065f, 0f, 0.004f), new Vector3(0.0055f, 0f, -0.018f), new Vector3(-0.0055f, 0f, -0.018f),
                new Vector3(-0.0065f, 0f, 0.004f) };
            const float hr = 0.005f;
            var keski = new Vector3(0f, hr * 0.5f, 0f);
            for (int i = 0; i < reuna.Length; i++)
            {
                var a = reuna[i]; var b = reuna[(i + 1) % reuna.Length];
                r.NelioKeskelta(a * 0.8f, b * 0.8f, b + Vector3.up * hr, a + Vector3.up * hr, keski, OlvVeneVari);
            }
            var yk = Vector3.up * hr;
            r.KolmioUlos(reuna[0] + yk, reuna[1] + yk, reuna[4] + yk, Vector3.up, OlvVeneSisus);
            r.NelioUlos(reuna[1] + yk, reuna[2] + yk, reuna[3] + yk, reuna[4] + yk, Vector3.up, OlvVeneSisus);
            r.Kartio(new Vector3(0f, hr, 0.006f), 0.0034f, 0.011f, 3, EmMuste);
            r.Kartio(new Vector3(0f, hr, -0.007f), 0.0034f, 0.011f, 3, EmMuste);
            foreach (float s in new[] { -1f, 1f })
                r.NelioUlos(new Vector3(s * 0.003f, hr + 0.002f, 0.001f), new Vector3(s * 0.003f, hr + 0.002f, -0.002f),
                    new Vector3(s * 0.018f, 0.0008f, -0.004f), new Vector3(s * 0.018f, 0.0008f, 0.0f), Vector3.up, EmMuste);
            return r.Verkko("Olavinlinna-vene");
        }

        // ---- Yövalot ----

        /// <summary>Tornin valojen pivot: tornin etelätahkon pinnalla alimman ikkunan alla (hehku kasvaa tornin pinnalta).</summary>
        static Vector3 OlvTorniValoP(int nro)
        {
            var t = OlvTorniNro(nro);
            float ymin = t.Tiili;
            foreach (var (f, osuus) in OlvTorniIkkunat[nro]) ymin = Mathf.Min(ymin, t.Tiili * osuus);
            float apo = Mathf.Cos(Mathf.PI / OlvTorniSivuja);
            return new Vector3(t.X, ymin - 0.01f, t.Z - Mathf.Lerp(t.R0, t.R, 0.5f) * apo);
        }

        /// <summary>Tornin yövalot (pivot tornin etupinnalla): lämmin hehku kruunun ampuma-aukkojen ja kivirungon ikkunoiden edessä
        /// (samat paikat kuin rungossa ja lähitasossa).</summary>
        static Mesh OlvTorniValot(int nro)
        {
            var r = new Rakentaja();
            var t = OlvTorniNro(nro);
            var o = OlvTorniValoP(nro);
            float apo = Mathf.Cos(Mathf.PI / OlvTorniSivuja);
            foreach (int f in OlvEtuTahkot)
            {
                var dn = OlvTahkoSuunta(f);
                r.Laatta(new Vector3(t.X, t.Aukot, t.Z) + dn * (t.R * apo + 0.0008f) - o, dn, OlvAukkoKoko * 1.05f, OlvAukkoKoko * 1.05f, EmIkkunavalo);
            }
            foreach (var (f, osuus) in OlvTorniIkkunat[nro])
            {
                var dn = OlvTahkoSuunta(f);
                float y = t.Tiili * osuus;
                float rs = Mathf.Lerp(t.R0, t.R, osuus) * apo + 0.0008f;
                r.Laatta(new Vector3(t.X, y, t.Z) + dn * rs - o, dn, OlvIkkunaL * 1.05f, OlvIkkunaK * 1.05f, EmIkkunavalo);
            }
            return r.Verkko("Olavinlinna-valot" + nro);
        }

        static Mesh OlavinlinnaValot0() => OlvTorniValot(0);
        static Mesh OlavinlinnaValot1() => OlvTorniValot(1);
        static Mesh OlavinlinnaValot2() => OlvTorniValot(2);

        /// <summary>Päälinnan valojen pivot: lounaismuurin juuressa keskisegmentin kohdalla.</summary>
        static Vector3 OlvPaalinnaValoP => (OlvP(OlvTaipunut[1], OlvKallioY) + OlvP(OlvTaipunut[3], OlvKallioY)) * 0.5f;

        /// <summary>Päälinnan lounaismuurin yövalot (pivot muurin juuressa): hehku ikkunoiden edessä.</summary>
        static Mesh OlavinlinnaValot3()
        {
            var r = new Rakentaja();
            var o = OlvPaalinnaValoP;
            foreach (var (i, u, y) in OlvPaalinnaIkkunat)
            {
                var a = OlvP(OlvTaipunut[i]); var b = OlvP(OlvTaipunut[i + 1]);
                var d = (b - a).normalized; var n = new Vector3(-d.z, 0f, d.x);
                r.Laatta(Vector3.Lerp(a, b, u) + Vector3.up * y + n * 0.0008f - o, n, 0.007f, 0.0115f, EmIkkunavalo);
            }
            return r.Verkko("Olavinlinna-valot3");
        }

        /// <summary>Oopperavalon pivot: esilinnan pihan lattialla näyttämön edessä.</summary>
        static readonly Vector3 OlvOopperaP = new Vector3(0.14f, OlvPihaY, 0.055f);

        /// <summary>Oopperajuhlien valo esilinnan pihalla (pivot pihan lattialla): valaistu näyttämö pohjoisreunalla, lämmin pieni
        /// hehku sen edessä ja kaksi lyhtyriviä katsomon reunoilla (pieniä kolmioita, ei ääriviivaa, ei bloomia).</summary>
        static Mesh OlavinlinnaValot4()
        {
            var r = new Rakentaja();
            const int n = 8;
            var y = new Vector3(0f, 0.0012f, 0.02f);
            for (int i = 0; i < n; i++)
            {
                float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n;
                r.KolmioUlos(y, y + new Vector3(Mathf.Cos(a0) * 0.036f, 0f, Mathf.Sin(a0) * 0.022f), y + new Vector3(Mathf.Cos(a1) * 0.036f, 0f, Mathf.Sin(a1) * 0.022f),
                    Vector3.up, Color.Lerp(OlvValo, OlvPiha, 0.35f));
            }
            // Näyttämö: matala valaistu laatta.
            r.Laatikko(OlvNayttamo - OlvOopperaP, new Vector3(0.05f, 0.006f, 0.014f), EmIkkunavalo, OlvValo);
            // Lyhtyrivit katsomon kyljissä.
            foreach (float sx in new[] { -1f, 1f })
                for (int i = 0; i < 3; i++)
                {
                    var l = new Vector3(sx * 0.045f, 0.0035f, -0.018f + i * 0.016f);
                    r.NelioUlos(l + new Vector3(-0.0024f, 0f, -0.0024f), l + new Vector3(0.0024f, 0f, -0.0024f), l + new Vector3(0.0024f, 0f, 0.0024f),
                        l + new Vector3(-0.0024f, 0f, 0.0024f), Vector3.up, EmIkkunavalo);
                }
            return r.Verkko("Olavinlinna-valot4");
        }

        /// <summary>Näyttämön paikka esilinnan pihalla (sama rungossa, lähitasossa ja valoissa).</summary>
        static readonly Vector3 OlvNayttamo = new Vector3(0.14f, OlvPihaY, 0.1f);

        static LiikkuvaOsaMaaritys[] OlavinlinnaOsat()
        {
            var lp = OlvLaivaP;
            return new[]
            {
                new LiikkuvaOsaMaaritys { Nimi = "silta", Verkko = OlavinlinnaSilta, Pivot = OlvSiltaT, Liike = Liike.Kierto, Akseli = Vector3.up, Laajuus = 60f, KayS = 5f, TaukoS = 100f },
                new LiikkuvaOsaMaaritys { Nimi = "laiva", Verkko = OlavinlinnaLaiva, Pivot = lp, Liike = Liike.Liuku, Akseli = Vector3.forward, Laajuus = 0.5f, KayS = 16f, TaukoS = 100f },
                new LiikkuvaOsaMaaritys { Nimi = "laivavalot", Verkko = OlavinlinnaLaivaValot, Pivot = lp, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "vana", Verkko = OlavinlinnaVana, Pivot = lp, Liike = Liike.Liuku, Akseli = Vector3.forward, Laajuus = 0.5f },
                new LiikkuvaOsaMaaritys { Nimi = "savu0", Verkko = OlavinlinnaSavu, Pivot = OlvSavuP, Liike = Liike.Nousu, Akseli = Vector3.up, Laajuus = 0.03f },
                new LiikkuvaOsaMaaritys { Nimi = "savu1", Verkko = OlavinlinnaSavu, Pivot = OlvSavuP, Liike = Liike.Nousu, Akseli = Vector3.up, Laajuus = 0.03f },
                new LiikkuvaOsaMaaritys { Nimi = "savu2", Verkko = OlavinlinnaSavu, Pivot = OlvSavuP, Liike = Liike.Nousu, Akseli = Vector3.up, Laajuus = 0.03f },
                new LiikkuvaOsaMaaritys { Nimi = "pilvi", Verkko = OlavinlinnaPilvi, Pivot = OlvPilviP, Liike = Liike.Liuku, Akseli = Vector3.right, Laajuus = 0.3f },
                new LiikkuvaOsaMaaritys { Nimi = "passi", Verkko = OlavinlinnaPassi, Pivot = OlvPassiP, Liike = Liike.Keinunta, Akseli = Vector3.right, Laajuus = 55f },
                new LiikkuvaOsaMaaritys { Nimi = "passinpaa", Verkko = OlavinlinnaPassinPaa, Pivot = OlvPaaP, Liike = Liike.Keinunta, Akseli = Vector3.up, Laajuus = 30f },
                new LiikkuvaOsaMaaritys { Nimi = "vene0", Verkko = OlavinlinnaVene, Pivot = OlvVeneP[0], Liike = Liike.Liuku, Akseli = Vector3.back, Laajuus = 0.05f },
                new LiikkuvaOsaMaaritys { Nimi = "vene1", Verkko = OlavinlinnaVene, Pivot = OlvVeneP[1], Liike = Liike.Liuku, Akseli = Vector3.back, Laajuus = 0.05f },
                new LiikkuvaOsaMaaritys { Nimi = "vene2", Verkko = OlavinlinnaVene, Pivot = OlvVeneP[2], Liike = Liike.Liuku, Akseli = Vector3.back, Laajuus = 0.05f },
                new LiikkuvaOsaMaaritys { Nimi = "valot0", Verkko = OlavinlinnaValot0, Pivot = OlvTorniValoP(0), Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "valot1", Verkko = OlavinlinnaValot1, Pivot = OlvTorniValoP(1), Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "valot2", Verkko = OlavinlinnaValot2, Pivot = OlvTorniValoP(2), Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "valot3", Verkko = OlavinlinnaValot3, Pivot = OlvPaalinnaValoP, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "valot4", Verkko = OlavinlinnaValot4, Pivot = OlvOopperaP, Liike = Liike.Valahdys },
            };
        }

        static readonly bool olavinlinna = Rekisteroi("olavinlinna",
            new Erikoismalli { Runko = OlavinlinnaRunko, Osat = OlavinlinnaOsat, Lahi = OlavinlinnaLahi, Kolmiot0 = 1404, KokoKerroin = 1.5f });

        // ================================================================================================================
        // ---- LÄHITASO ----
        // ================================================================================================================

        /// <summary>
        /// LÄHITASO (Erikoismalli.Lahi, 2 509 kolmiota eli 2,6 × runko, katto 3 000): sama siluetti, mittasuhteet, värit,
        /// ääriviivaosat ja pivotit kuin rungossa. Lisäkolmiot lähikuvan yksityiskohtiin: tornien kaikki 12 pyöreää ampuma-aukkoa
        /// kynnyksineen, kruunun kivilista, räystään otsalauta, kattojen saumat, lisää rakoikkunoita ja Kellotornin lipputanko;
        /// muurien rintavarustus ja kaarevat tykkiaukot joka suunnalla, länsiportin kaari, Paksun bastionin tykit, Pikkuportin
        /// bastionin katon harjat, Vesiportin bastionin puu ja katos, Suvorovin esilinnan puu, oopperan katsomo ja näyttämö,
        /// päälinnan savupiiput ja pohjoisikkunat, Eerikin tornin raunion rosoinen laki ja puu, rantakivet ja nurmitupsut, laiturin
        /// kaiteet, pollarit ja lyhty sekä Tallisaaren puut ja hiekkapolku.
        /// </summary>
        static Mesh OlavinlinnaLahi()
        {
            var r = new Rakentaja();
            OlvRakenna(r, true);
            return r.Verkko("Olavinlinna-lahi");
        }
    }
}
