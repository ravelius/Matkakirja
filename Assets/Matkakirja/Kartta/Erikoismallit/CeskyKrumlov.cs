using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI ČESKÝ KRUMLOV (speksi docs/raportit/erikoismallit/cesky-krumlov.md, omistaja valitsi elämänidean A 27.9.
    /// klo 18.4x Fablen kautta). Nosto kohde:cesky-krumlov, Tšekki (CZE), 48,8102 N 14,315 E, taso 1.
    /// Tunnistus sekunnissa: maalattu pyöreä linnantorni "kynttilänä" pitkän linnakallion itäpäässä (vaalea runko, punainen
    /// maalattu vyö, pylväikkö-ochoz, kapeampi yläosa, parveke ja kuparinvihreä lyhty kultaisine huippuineen), pitkä Horní hrad
    /// jyrkän harmaan kallion laella ja Vltavan mutka, joka kiertää vanhankaupungin edestä, vasemmalta ja takaa. Länsipäässä
    /// Plášťový most kolmine kaarikerroksineen kallion rotkon yli ja barokkiteatteri; vanhakaupunki matalana kattorykelmänä
    /// Pyhän Vituksen hoikan tornin kanssa.
    /// Mittakaava: vaakasuunnassa 1,0 ≈ 480 m (linnakallio teatterista itäpään portaaseen 0,84), vanhankaupungin syvyys
    /// tiivistetty noin 0,48-kertaiseksi (niemi 0,27), joki 0,07 leveä (noin 1,1 ×). Pystyliioittelu 1,8 ja tornille lisäksi noin
    /// 1,4: kallio 0,10, Horní hradin räystäs 0,158 ja harja 0,188, tornin huippu 0,388 (speksin 0,36 + 0,03, jotta kynttilä nousee
    /// linnan kattojen yli myös 30°:n kallistuksessa). Torni on vaakasuunnassa noin 2,4-kertainen (säde 0,03). Mitat 1,01 × 0,39 ×
    /// 0,61, juuri jalanjäljen keskellä (z-keskikohta −0,02). Kanootti on noin viisinkertainen (0,05) ja puulautta 0,16.
    /// v2 (koordinaattori 27.9. ilta): joen ulkoreunalla vaalea rantakaista ja puolileveä musteviiva täysleveän tumman kehyksen
    /// sijaan (CkUlkoranta, CkJokiMuste); joki itse, kouru ja osien reitit ennallaan.
    /// SUUNTA TODELLINEN: linna on joen pohjoisrannalla, joten etelästä kallistuva kamera näkee tornin ja Horní hradin
    /// eteläjulkisivun vanhankaupungin yli; torni oikealla (idässä), Plášťový most ja teatteri vasemmalla (lännessä). Joki
    /// virtaa todelliseen suuntaan: vanhankaupungin edessä länteen, vasemmalla pohjoiseen ja linnan alla itään
    /// (OpenStreetMapin keskilinja ja Heberin nuoli 1844). Jelení lávkan pato ja kouru ovat speksin mukaisesti takakaaren
    /// keskellä Horní hradin alla (x ≈ −0,14; todellisuudessa noin 80 m lännempänä V pihan kohdalla), jotta kanootti kourussa näkyy
    /// kallion edessä. Joen S-mutkan alempi silmukka, Latrán, linnan puutarha ja I pihan Punainen portti jätetään pois.
    /// Liikkuvat osat (pivotit mallin avaruudessa, verkot pivotin suhteen):
    ///   kanootti0–2  punaiset kanootit (1–3 jonossa) kiertävät joen mutkan ja laskevat padon kourun (perusliike)
    ///   kumilautta   joskus kumilautta kanootin paikalla
    ///   vana0–2      kapea V-vana veneen perässä (skaala vauhdin mukaan)
    ///   roiske       vaahtokaari kourun alapuolella veneen kohdalla (lautalla kaksinkertainen)
    ///   lautta0–1    harvinainen puinen lautta (keula- ja peräosa taipuvat toisiinsa nähden mutkissa ja kourussa)
    ///   mies0–1      lauttamiehet sauvoineen keulassa ja perässä (heilauttavat sauvaa ±8°)
    ///   lyhty        lautan keulalyhty yöllä (napautuksen lautta)
    ///   valot        yöllä linnan eteläjulkisivut (pivot Horní hradin julkisivun juuressa, hehku kasvaa tasossaan)
    ///   valot1       yöllä Hrádek, tornin ochoz ja lyhty (pivot tornin akselilla, hehku piilossa tornin sisällä kunnes syttyy)
    ///   valot2       yöllä vanhankaupungin ikkunat
    /// </summary>
    public sealed partial class Symbolimallit
    {
        // ---- Joki: keskilinja ja mitat ----

        /// <summary>
        /// Vltavan keskilinja virtaussuuntaan (14 ohjauspistettä, Catmull-Rom): tulo idästä vanhankaupungin eteläpuolelle (oikea
        /// etukulma), länteen niemen edestä, vasemmalla pohjoiseen, linnan kallion alta itään ja ulos itäreunasta tornin alta (oikea
        /// takakulma). OpenStreetMapin Vltava-linjasta (ODbL) mallin yksiköihin: x = (X + 26 m) / 480 m, z pohjoiseen tiivistettynä
        /// joen eteläpuolella. SAMA TAULUKKO liikeytimessä (CeskyKrumlovLiike.JokiX/JokiZ): muuta molemmat.
        /// </summary>
        static readonly float[] CkJokiX = { 0.50f, 0.33f, 0.16f, -0.01f, -0.16f, -0.28f, -0.358f, -0.38f, -0.335f, -0.24f, -0.10f, 0.05f, 0.24f, 0.50f };
        static readonly float[] CkJokiZ = { -0.185f, -0.207f, -0.243f, -0.276f, -0.268f, -0.215f, -0.145f, -0.07f, -0.007f, 0.045f, 0.065f, 0.033f, -0.025f, -0.067f };
        /// <summary>Veden pinta ja joen puolileveys.</summary>
        const float CkVesiY = 0.004f, CkJokiPuoli = 0.035f;
        /// <summary>Jelení lávkan padon kouru keskilinjan pituusosuutena (sama liikeytimessä: CeskyKrumlovLiike.KouruU).</summary>
        const float CkKouruU = 0.66f;
        /// <summary>Näytteitä ohjausväliä kohden keskilinjan pituustaulukossa (sama liikeytimessä).</summary>
        const int CkNayte = 16;

        /// <summary>Catmull-Rom-käyrän piste ohjausvälillä i (0–12) osuudella t; päissä peilatut haamupisteet.</summary>
        static Vector3 CkCR(int i, float t)
        {
            int n = CkJokiX.Length;
            float X(int k) => k < 0 ? 2f * CkJokiX[0] - CkJokiX[1] : k >= n ? 2f * CkJokiX[n - 1] - CkJokiX[n - 2] : CkJokiX[k];
            float Z(int k) => k < 0 ? 2f * CkJokiZ[0] - CkJokiZ[1] : k >= n ? 2f * CkJokiZ[n - 1] - CkJokiZ[n - 2] : CkJokiZ[k];
            float t2 = t * t, t3 = t2 * t;
            float Cr(float p0, float p1, float p2, float p3) =>
                0.5f * (2f * p1 + (-p0 + p2) * t + (2f * p0 - 5f * p1 + 4f * p2 - p3) * t2 + (-p0 + 3f * p1 - 3f * p2 + p3) * t3);
            return new Vector3(Cr(X(i - 1), X(i), X(i + 1), X(i + 2)), CkVesiY, Cr(Z(i - 1), Z(i), Z(i + 1), Z(i + 2)));
        }

        static float[] CkTauluX, CkTauluZ, CkTauluS;

        /// <summary>Keskilinjan tiheä näytteistys (13 × 16 + 1 pistettä) ja kertymäpituus (laskettu kerran).</summary>
        static void CkTaulu()
        {
            if (CkTauluX != null) return;
            int n = (CkJokiX.Length - 1) * CkNayte + 1;
            CkTauluX = new float[n]; CkTauluZ = new float[n]; CkTauluS = new float[n];
            for (int k = 0; k < n; k++)
            {
                int i = Mathf.Min(k / CkNayte, CkJokiX.Length - 2);
                float t = (k - i * CkNayte) / (float)CkNayte;
                var p = CkCR(i, t);
                CkTauluX[k] = p.x; CkTauluZ[k] = p.z;
                CkTauluS[k] = k == 0 ? 0f : CkTauluS[k - 1] + Mathf.Sqrt((p.x - CkTauluX[k - 1]) * (p.x - CkTauluX[k - 1]) + (p.z - CkTauluZ[k - 1]) * (p.z - CkTauluZ[k - 1]));
            }
        }

        /// <summary>Keskilinjan kokonaispituus.</summary>
        static float CkPituus { get { CkTaulu(); return CkTauluS[CkTauluS.Length - 1]; } }

        /// <summary>Keskilinjan piste pituusosuudella u (0–1) veden pinnassa ja virtaussuunta (yksikkövektori).</summary>
        static Vector3 CkPolku(float u, out Vector3 suunta)
        {
            CkTaulu();
            float s = Mathf.Clamp01(u) * CkTauluS[CkTauluS.Length - 1];
            int k = 1;
            while (k < CkTauluS.Length - 1 && CkTauluS[k] < s) k++;
            float f = (s - CkTauluS[k - 1]) / Mathf.Max(1e-6f, CkTauluS[k] - CkTauluS[k - 1]);
            suunta = new Vector3(CkTauluX[k] - CkTauluX[k - 1], 0f, CkTauluZ[k] - CkTauluZ[k - 1]).normalized;
            return new Vector3(Mathf.Lerp(CkTauluX[k - 1], CkTauluX[k], f), CkVesiY, Mathf.Lerp(CkTauluZ[k - 1], CkTauluZ[k], f));
        }

        /// <summary>Vasen normaali (virtaussuunnasta vasemmalle, ylhäältä katsottuna vastapäivään).</summary>
        static Vector3 CkVasen(Vector3 suunta) => new Vector3(-suunta.z, 0f, suunta.x);

        /// <summary>Joen pohjoisrannan (linnan puoli) z pisteessä x takakaarella (x ≥ −0,33): etsitään keskilinjan näyte, jonka x
        /// on lähimpänä, ja siirretään rannalle (virtaussuunnasta vasemmalle on pohjoinen, koska joki virtaa itään).</summary>
        static float CkPohjoisranta(float x)
        {
            CkTaulu();
            float paras = float.MaxValue, z = 0f;
            for (int k = 0; k < CkTauluX.Length; k++)
            {
                if (CkTauluS[k] < CkTauluS[CkTauluS.Length - 1] * 0.45f) continue;   // vain takakaari
                float e = Mathf.Abs(CkTauluX[k] - x);
                if (e < paras)
                {
                    paras = e;
                    int k0 = Mathf.Max(0, k - 1), k1 = Mathf.Min(CkTauluX.Length - 1, k + 1);
                    var d = new Vector3(CkTauluX[k1] - CkTauluX[k0], 0f, CkTauluZ[k1] - CkTauluZ[k0]).normalized;
                    z = CkTauluZ[k] + CkVasen(d).z * CkJokiPuoli;
                }
            }
            return z;
        }

        // ---- Paletti (Em-seepiaramppi; aksentti punainen #9a3b2c tornin maalatussa vyössä ja kanooteissa) ----
        static readonly Color CkPunainen = Hex(0x9a3b2c), CkKupari = Hex(0x86a08a), CkVaaleaKivi = Hex(0xe2d8bd), CkHehku = Hex(0xf4d898);
        /// <summary>Johdetut sävyt ominaisuuksina (Em-paletti on toisessa tiedostossa; staattisten kenttien alustusjärjestys
        /// osittaisluokan tiedostojen välillä ei ole taattu).</summary>
        static Color CkRinne => Color.Lerp(EmKivi, EmPuu, 0.55f);
        static Color CkKallioTumma => Color.Lerp(EmKivi, EmMuste, 0.14f);
        static Color CkPiha => Color.Lerp(EmPaperi, EmKivi, 0.35f);
        static Color CkPuuTumma => Color.Lerp(EmSeepia, EmMuste, 0.35f);
        static Color CkKumi => Color.Lerp(EmPuu, EmMuste, 0.35f);
        /// <summary>Vaahtoinen vesi (vana ja padon ylivuoto): vaahto veteen sekoitettuna, ei valkoista viivaa.</summary>
        static Color CkVaahtoVesi => Color.Lerp(EmVesi, EmVaahto, 0.62f);

        // ---- Kallio ----

        /// <summary>
        /// Linnakallion asemat lännestä itään: x, kallion laen korkeus, laen pohjoisreuna ja pohjoisjuuri (z). Eteläreuna seuraa
        /// joen pohjoisrantaa (CkPohjoisranta), lännessä teatterin kohdalla kiinteä. Asemat 4–6 ovat Plášťový mostin rotko (V-lovi
        /// koko harjanteen läpi), asema 12 on torni, itäpää laskee II pihan kohdalla ja päätyasemat 0 ja 16 viettävät maahan.
        /// </summary>
        static readonly float[] CkKallioX = { -0.505f, -0.48f, -0.42f, -0.365f, -0.335f, -0.308f, -0.28f, -0.2f, -0.12f, -0.04f, 0.04f, 0.1f, 0.155f, 0.21f, 0.26f, 0.30f, 0.335f };
        static readonly float[] CkKallioH = { 0f, 0.07f, 0.086f, 0.09f, 0.09f, 0.028f, 0.1f, 0.1f, 0.1f, 0.1f, 0.098f, 0.096f, 0.095f, 0.082f, 0.07f, 0.052f, 0f };
        static readonly float[] CkKallioPohjoinen = { 0.1f, 0.12f, 0.15f, 0.17f, 0.18f, 0.18f, 0.2f, 0.225f, 0.23f, 0.225f, 0.205f, 0.165f, 0.125f, 0.1f, 0.075f, 0.055f, 0.03f };
        static readonly float[] CkKallioJuuri = { 0.12f, 0.2f, 0.23f, 0.25f, 0.26f, 0.26f, 0.265f, 0.275f, 0.28f, 0.275f, 0.255f, 0.21f, 0.17f, 0.14f, 0.11f, 0.085f, 0.05f };

        /// <summary>Kallion eteläjuuri (y 0) asemalla i: joen pohjoisranta (hieman rannan takana), lännessä teatterin edessä kiinteä.</summary>
        static float CkEtelaJuuri(int i)
        {
            float x = CkKallioX[i];
            if (x < -0.34f) return Mathf.Lerp(0.005f, 0.012f, Mathf.Clamp01((x + 0.48f) / 0.14f));
            return CkPohjoisranta(x) + 0.004f;
        }

        /// <summary>Kallion laen eteläreuna: jyrkkä seinä joen puolella (vaakasiirto 0,008 juuresta).</summary>
        static float CkEtelaReuna(int i) => CkEtelaJuuri(i) + 0.008f;

        static Vector3 CkKallioPiste(int i, int kerros)
        {
            // kerros 0 = eteläjuuri, 1 = rinteen yläreuna (0,42 korkeudesta), 2 = laen eteläreuna, 3 = laen pohjoisreuna, 4 = pohjoisjuuri
            float x = CkKallioX[i], h = CkKallioH[i];
            switch (kerros)
            {
                case 0: return new Vector3(x, 0f, CkEtelaJuuri(i));
                case 1: return new Vector3(x, h * 0.42f, CkEtelaJuuri(i) + 0.001f);
                case 2: return new Vector3(x, h, CkEtelaReuna(i));
                case 3: return new Vector3(x, h, CkKallioPohjoinen[i]);
                default: return new Vector3(x, 0f, CkKallioJuuri[i]);
            }
        }

        /// <summary>
        /// Linnakallio yhtenä ääriviivaosana: eteläseinä kahtena vyönä (ylempi jyrkkä harmaa kallio, alempi rinne pensaineen),
        /// laki (pihojen taso) ja pohjoisrinne; päädyt lännessä ja idässä. Plášťový mostin kohdalla V-lovi (rotko).
        /// </summary>
        static void CkKallio(Rakentaja r)
        {
            int n = CkKallioX.Length;
            r.AloitaOsa();
            for (int i = 0; i + 1 < n; i++)
            {
                var keski = (CkKallioPiste(i, 2) + CkKallioPiste(i + 1, 3)) * 0.5f - Vector3.up * 0.05f;
                // Kallioseinän sävy vaihtelee lohkoittain (harmaat kivilohkot ja tummemmat rakoilevat kohdat).
                r.NelioKeskelta(CkKallioPiste(i, 1), CkKallioPiste(i + 1, 1), CkKallioPiste(i + 1, 2), CkKallioPiste(i, 2), keski, i % 3 == 1 ? CkKallioTumma : EmKivi);
                r.NelioKeskelta(CkKallioPiste(i, 0), CkKallioPiste(i + 1, 0), CkKallioPiste(i + 1, 1), CkKallioPiste(i, 1), keski, CkRinne);
                r.NelioUlos(CkKallioPiste(i, 2), CkKallioPiste(i + 1, 2), CkKallioPiste(i + 1, 3), CkKallioPiste(i, 3), Vector3.up, CkPiha);
                r.NelioKeskelta(CkKallioPiste(i, 3), CkKallioPiste(i + 1, 3), CkKallioPiste(i + 1, 4), CkKallioPiste(i, 4), keski, CkRinne);
            }
            // Päädyt.
            foreach (int i in new[] { 0, n - 1 })
            {
                var ulos = i == 0 ? Vector3.left : Vector3.right;
                var p0 = CkKallioPiste(i, 0); var p1 = CkKallioPiste(i, 1); var p2 = CkKallioPiste(i, 2); var p3 = CkKallioPiste(i, 3); var p4 = CkKallioPiste(i, 4);
                r.KolmioUlos(p0, p1, p2, ulos, EmKivi);
                r.KolmioUlos(p0, p2, p3, ulos, EmKivi);
                r.KolmioUlos(p0, p3, p4, ulos, CkRinne);
            }
            r.LopetaOsa();
        }

        /// <summary>Kallion laen korkeus kohdassa x (lineaarinen asemien välillä).</summary>
        static float CkLaki(float x)
        {
            for (int i = 0; i + 1 < CkKallioX.Length; i++)
                if (x <= CkKallioX[i + 1]) return Mathf.Lerp(CkKallioH[i], CkKallioH[i + 1], Mathf.Clamp01((x - CkKallioX[i]) / (CkKallioX[i + 1] - CkKallioX[i])));
            return CkKallioH[CkKallioH.Length - 1];
        }

        /// <summary>Kallion laen eteläreuna kohdassa x (lineaarinen asemien välillä).</summary>
        static float CkReunaZ(float x)
        {
            for (int i = 0; i + 1 < CkKallioX.Length; i++)
                if (x <= CkKallioX[i + 1]) return Mathf.Lerp(CkEtelaReuna(i), CkEtelaReuna(i + 1), Mathf.Clamp01((x - CkKallioX[i]) / (CkKallioX[i + 1] - CkKallioX[i])));
            return CkEtelaReuna(CkKallioX.Length - 1);
        }

        // ---- Rakennukset ----

        /// <summary>Lonkkakatto: räystään keskikohta p, suunta (rad, harja itäakselista vastapäivään ylhäältä), pituus harjan
        /// suunnassa, syvyys ja korkeus. 6 kolmiota.</summary>
        static void CkLonkka(Rakentaja r, Vector3 p, float suunta, float pituus, float syvyys, float korkeus, Color katto)
        {
            var ex = new Vector3(Mathf.Cos(suunta), 0f, Mathf.Sin(suunta));
            var ez = new Vector3(-Mathf.Sin(suunta), 0f, Mathf.Cos(suunta));
            float x = pituus * 0.5f, z = syvyys * 0.5f, hx = Mathf.Max(0f, x - z * 0.9f);
            Vector3 A = p - ex * x - ez * z, B = p + ex * x - ez * z, C = p + ex * x + ez * z, D = p - ex * x + ez * z;
            Vector3 H1 = p - ex * hx + Vector3.up * korkeus, H2 = p + ex * hx + Vector3.up * korkeus, k = p + Vector3.up * (korkeus * 0.3f);
            r.NelioKeskelta(A, B, H2, H1, k, katto);
            r.NelioKeskelta(C, D, H1, H2, k, katto);
            r.KolmioKeskelta(D, A, H1, k, katto);
            r.KolmioKeskelta(B, C, H2, k, katto);
        }

        /// <summary>Suunnattu laatikko ilman pohjaa ja kattoa (seinät): keskipohja p, suunta, pituus, syvyys, korkeus. 8 kolmiota.</summary>
        static void CkSeinat(Rakentaja r, Vector3 p, float suunta, float pituus, float syvyys, float korkeus, Color seina)
        {
            var ex = new Vector3(Mathf.Cos(suunta), 0f, Mathf.Sin(suunta)) * (pituus * 0.5f);
            var ez = new Vector3(-Mathf.Sin(suunta), 0f, Mathf.Cos(suunta)) * (syvyys * 0.5f);
            Vector3 up = Vector3.up * korkeus;
            Vector3 A = p - ex - ez, B = p + ex - ez, C = p + ex + ez, D = p - ex + ez;
            var keski = p + up * 0.5f;
            r.NelioKeskelta(A, B, B + up, A + up, keski, seina);
            r.NelioKeskelta(B, C, C + up, B + up, keski, seina);
            r.NelioKeskelta(C, D, D + up, C + up, keski, seina);
            r.NelioKeskelta(D, A, A + up, D + up, keski, seina);
        }

        /// <summary>Lonkkakattoinen talo yhtenä ääriviivaosana: seinät ja lonkkakatto (räystäs hieman ulkona). 14 kolmiota.</summary>
        static void CkLinnaTalo(Rakentaja r, Vector3 p, float suunta, float pituus, float syvyys, float korkeus, float katto, Color seina)
        {
            r.AloitaOsa();
            CkSeinat(r, p, suunta, pituus, syvyys, korkeus, seina);
            CkLonkka(r, p + Vector3.up * korkeus, suunta, pituus + 0.006f, syvyys + 0.006f, katto, EmKatto);
            r.LopetaOsa();
        }

        /// <summary>Ikkunarivi suunnatun talon etelään kääntyvällä pitkällä seinällä: n ikkunaa korkeudella y.</summary>
        static void CkIkkunat(Rakentaja r, Vector3 p, float suunta, float pituus, float syvyys, float y, int n, float lev, float kork)
        {
            var ex = new Vector3(Mathf.Cos(suunta), 0f, Mathf.Sin(suunta));
            var ez = new Vector3(-Mathf.Sin(suunta), 0f, Mathf.Cos(suunta));
            var m = ez.z > 0f ? -ez : ez;   // etelään kääntyvän pitkän seinän ulkonormaali
            var c = p + m * (syvyys * 0.5f) + Vector3.up * y;
            for (int k = 0; k < n; k++)
                r.Laatta(c + ex * (pituus * (-0.44f + 0.88f * (k + 0.5f) / n)), m, lev, kork, EmMuste);
        }

        // ---- Horní hrad, III–II pihan siivet ja Hrádek ----

        /// <summary>Linnan siiven kehys kallion reunalla: länsi- ja itäpään x ja syvyys pohjoiseen → keskipohja (kallion laella),
        /// suunta ja pituus. Eteläjulkisivu kulkee 0,003 kallion reunan takana, eikä se ulotu reunan yli pullistumissakaan.</summary>
        static void CkReunaSiipi(float x0, float x1, float syvyys, out Vector3 p, out float suunta, out float pituus)
        {
            float z0 = CkReunaZ(x0) + 0.003f, z1 = CkReunaZ(x1) + 0.003f;
            // Julkisivu ei saa ulota kallion reunan yli: siirretään koko siipeä pohjoiseen, jos reuna pullistuu välillä.
            float lisa = 0f;
            for (int k = 1; k < 8; k++)
            {
                float f = k / 8f, x = Mathf.Lerp(x0, x1, f);
                lisa = Mathf.Max(lisa, CkReunaZ(x) + 0.003f - Mathf.Lerp(z0, z1, f));
            }
            z0 += lisa; z1 += lisa;
            suunta = (float)Math.Atan2(z1 - z0, x1 - x0);
            pituus = Mathf.Sqrt((x1 - x0) * (x1 - x0) + (z1 - z0) * (z1 - z0));
            var ez = new Vector3(-Mathf.Sin(suunta), 0f, Mathf.Cos(suunta));
            float xm = (x0 + x1) * 0.5f;
            p = new Vector3(xm, CkLaki(xm), (z0 + z1) * 0.5f) + ez * (syvyys * 0.5f);
        }

        /// <summary>Linnan siivet (sama taulukko rungossa, lähitasossa ja yövaloissa): länsi- ja itäpää kallion reunalla,
        /// syvyys, seinän ja katon korkeus. 0–1 Horní hrad (länsi- ja itäosa, itäosa korkeampi), 2 Dolní hrad (III piha),
        /// 3 Hrádek tornin länsipuolella (vaalea kivi).</summary>
        static readonly (float x0, float x1, float syvyys, float korkeus, float katto)[] CkSiivet =
        {
            (-0.268f, -0.14f, 0.08f, 0.052f, 0.028f),
            (-0.142f, -0.03f, 0.09f, 0.058f, 0.03f),
            (-0.026f, 0.082f, 0.058f, 0.044f, 0.026f),
            (0.084f, 0.138f, 0.05f, 0.05f, 0.024f),
        };

        static void CkSiipi(int i, out Vector3 p, out float suunta, out float pituus)
        {
            var s = CkSiivet[i];
            CkReunaSiipi(s.x0, s.x1, s.syvyys, out p, out suunta, out pituus);
        }

        /// <summary>Torni: akselin paikka (x, z) ja juuren korkeus (Hrádekin kallion laki); z lasketaan kallion reunasta.</summary>
        static Vector3 CkTorni => new Vector3(0.158f, CkLaki(0.158f), CkReunaZ(0.158f) + 0.031f);
        const float CkTorniR = 0.03f, CkT1 = 0.185f, CkT2 = 0.22f, CkT3 = 0.25f, CkT4 = 0.305f, CkT5 = 0.333f, CkT6 = 0.363f, CkTHuippu = 0.388f;
        /// <summary>Ochozin säde (ulkonee rungosta), yläosan säde, parvekkeen säde ja lyhdyn säde.</summary>
        const float CkOchozR = 0.033f, CkYlaR = 0.0225f, CkParvekeR = 0.027f, CkLyhtyR = 0.014f;

        /// <summary>Muut linnan siivet (keskipohja x, z; suunta; pituus; syvyys; seinän ja katon korkeus): 0 IV pihan
        /// pohjoissiipi Horní hradin takana, 1 III pihan pohjoissiipi, 2 barokkiteatteri länsipäässä (pääty etelään), 3 V pihan
        /// matala siipi teatterin ja Plášťový mostin välissä. Kallion laella (y = laki − 0,002).</summary>
        static readonly (float x, float z, float suunta, float pituus, float syvyys, float h, float katto)[] CkMuutSiivet =
        {
            (-0.15f, 0.2f, -0.06f, 0.15f, 0.042f, 0.042f, 0.024f),
            (0.035f, 0.176f, -0.05f, 0.1f, 0.04f, 0.034f, 0.021f),
            (-0.415f, 0.085f, 1.25f, 0.105f, 0.055f, 0.044f, 0.026f),
            (-0.36f, 0.058f, 0.2f, 0.035f, 0.04f, 0.026f, 0.016f),
        };

        /// <summary>Staré purkrabství tornin itäpuolella alemmalla kallioportaalla (julkisivu kallion reunalla).</summary>
        static void CkStare(out Vector3 p, out float suunta, out float pituus) =>
            CkReunaSiipi(0.198f, 0.268f, 0.048f, out p, out suunta, out pituus);

        static void CkLinna(Rakentaja r)
        {
            // Horní hrad (kaksi osaa kallion reunan mukaan), Dolní hrad ja Hrádek: vaaleat julkisivut etelään, tummat lonkkakatot,
            // kaksi ikkunariviä Horní hradissa.
            for (int i = 0; i < CkSiivet.Length; i++)
            {
                var s = CkSiivet[i];
                CkSiipi(i, out var p, out float suunta, out float pituus);
                CkLinnaTalo(r, p, suunta, pituus, s.syvyys, s.korkeus, s.katto, i == 3 ? CkVaaleaKivi : EmPaperi);
                int n = Mathf.Max(2, (int)(pituus / 0.026f));
                if (i < 2)
                {
                    CkIkkunat(r, p, suunta, pituus, s.syvyys, s.korkeus * 0.38f, n, 0.0085f, 0.011f);
                    CkIkkunat(r, p, suunta, pituus, s.syvyys, s.korkeus * 0.74f, n, 0.0085f, 0.011f);
                }
                else CkIkkunat(r, p, suunta, pituus, s.syvyys, s.korkeus * 0.6f, n, 0.008f, 0.011f);
            }
            // Muut siivet (IV ja III pihan pohjoissiivet, teatteri ja V piha) ja Staré purkrabství tornin itäpuolella alemmalla
            // kallioportaalla; tornin taakse ei rakennuksia, jotta torni erottuu kallistetussa kamerassa taustaansa vasten.
            foreach (var m in CkMuutSiivet)
                CkLinnaTalo(r, new Vector3(m.x, CkLaki(m.x) - 0.002f, m.z), m.suunta, m.pituus, m.syvyys, m.h, m.katto, EmPaperi);
            CkStare(out var sp, out float ss, out float sl);
            CkLinnaTalo(r, sp, ss, sl, 0.048f, 0.034f, 0.022f, EmPaperi);
            CkIkkunat(r, sp, ss, sl, 0.048f, 0.021f, 3, 0.008f, 0.011f);
            CkTorniRunko(r);
        }

        /// <summary>
        /// Maalattu pyöreä torni (12-kulmainen) yhtenä ääriviivaosana: vaalea runko, punainen maalattu vyö ochozin alla, ulkoneva
        /// ochoz (pylväikkö: 10 tummaa aukkoa kärkiväreinä), ochozin katto, kapeampi yläosa, parveke, kuparinvihreä lyhty ja
        /// kultainen huippu. Juuri 0,01 kallion laen alapuolella (ei rakoa).
        /// </summary>
        static void CkTorniRunko(Rakentaja r)
        {
            var t = CkTorni;
            var c = new Vector3(t.x, 0f, t.z);
            var up = Vector3.up;
            const int k = 12;
            float a0 = Mathf.PI / k;
            r.AloitaOsa();
            r.Vaippa(c + up * (t.y - 0.01f), CkTorniR, CkTorniR, CkT1 - t.y + 0.01f, k, CkVaaleaKivi, a0);
            r.Vaippa(c + up * CkT1, CkTorniR, CkTorniR, CkT2 - CkT1, k, CkPunainen, a0);
            r.Vaippa(c + up * CkT2, CkOchozR, CkOchozR, CkT3 - CkT2, k, EmPaperi, a0);
            CkRengas(r, c + up * CkT3, CkYlaR, CkOchozR, k, a0, true, CkVaaleaKivi);
            r.Vaippa(c + up * CkT3, CkYlaR, CkYlaR, CkT4 - CkT3, k, EmPaperi, a0);
            // Parveke: kiekko yläosan päällä.
            r.Kiekko(c + up * CkT4, CkParvekeR, CkParvekeR, 8, CkVaaleaKivi);
            // Lyhty ja kuparinen kupu, huipussa kultainen nuppi ja piikki.
            r.Vaippa(c + up * CkT4, CkLyhtyR, CkLyhtyR, CkT5 - CkT4, 8, EmPaperi, Mathf.PI / 8f);
            r.Kartio(c + up * CkT5, CkLyhtyR * 1.25f, CkT6 - CkT5, 8, CkKupari);
            r.Timantti(c + up * (CkT6 + 0.006f), 0.0045f, 0.0065f, EmKulta, 4);
            r.Kartio(c + up * (CkT6 + 0.011f), 0.0018f, CkTHuippu - CkT6 - 0.011f, 3, EmKulta);
            r.LopetaOsa();
            // Ochozin aukot (10 kpl, pohjoisen kaksi sivua ilman): tummat aukot sivujen keskellä.
            float ap = CkOchozR * Mathf.Cos(Mathf.PI / k);
            for (int i = 0; i < k; i++)
            {
                float a = i * Mathf.PI * 2f / k + a0 + Mathf.PI / k;
                var nn = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                if (nn.z > 0.8f) continue;
                r.Laatta(c + nn * ap + up * ((CkT2 + CkT3) * 0.5f - 0.001f), nn, 0.0095f, CkT3 - CkT2 - 0.007f, EmMuste);
            }
        }

        /// <summary>Vaakasuora rengas säteiden ri ja ru välillä (k sivua, aloituskulma a0), etupuoli ylös tai alas.</summary>
        static void CkRengas(Rakentaja r, Vector3 c, float ri, float ru, int k, float a0, bool ylos, Color vari)
        {
            for (int i = 0; i < k; i++)
            {
                float a = a0 + i * Mathf.PI * 2f / k, b = a + Mathf.PI * 2f / k;
                Vector3 d0 = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a)), d1 = new Vector3(Mathf.Cos(b), 0f, Mathf.Sin(b));
                r.NelioUlos(c + d0 * ri, c + d1 * ri, c + d1 * ru, c + d0 * ru, ylos ? Vector3.up : -Vector3.up, vari);
            }
        }

        // ---- Plášťový most ----

        /// <summary>Plášťový mostin keskilinja (rotkon yli lännestä itään) ja kannen korkeus.</summary>
        const float CkMostiX0 = -0.352f, CkMostiX1 = -0.272f, CkMostiZ = 0.105f, CkMostiY = 0.088f;

        /// <summary>
        /// Plášťový most yhtenä ääriviivaosana: vaalea kaariseinä rotkon yli ja sen päällä katettu käytävä (kaksi kerrosta,
        /// harjakatto). Etelään (kameraan) päin kolme kaarikerrosta tummina kaarina: alhaalla 1, keskellä 3 ja ylhäällä 5.
        /// </summary>
        static void CkPlastovyMostRunko(Rakentaja r)
        {
            float x0 = CkMostiX0, x1 = CkMostiX1, z0 = CkMostiZ - 0.012f, z1 = CkMostiZ + 0.012f, y0 = 0.018f;
            r.AloitaOsa();
            r.NelioUlos(new Vector3(x0, y0, z0), new Vector3(x1, y0, z0), new Vector3(x1, CkMostiY, z0), new Vector3(x0, CkMostiY, z0), Vector3.back, EmPaperi);
            r.NelioUlos(new Vector3(x0, y0, z1), new Vector3(x1, y0, z1), new Vector3(x1, CkMostiY, z1), new Vector3(x0, CkMostiY, z1), Vector3.forward, EmPaperi);
            // Katettu käytävä kannella (hieman kapeampi), harjakatto.
            float kz0 = CkMostiZ - 0.01f, kz1 = CkMostiZ + 0.01f, ky = CkMostiY + 0.026f;
            r.NelioUlos(new Vector3(x0, CkMostiY, kz0), new Vector3(x1, CkMostiY, kz0), new Vector3(x1, ky, kz0), new Vector3(x0, ky, kz0), Vector3.back, EmPaperi);
            r.NelioUlos(new Vector3(x0, CkMostiY, kz1), new Vector3(x1, CkMostiY, kz1), new Vector3(x1, ky, kz1), new Vector3(x0, ky, kz1), Vector3.forward, EmPaperi);
            r.Harja(new Vector3((x0 + x1) * 0.5f, ky, CkMostiZ), new Vector3(x1 - x0 + 0.004f, 0.012f, 0.024f), EmKatto, EmPaperi);
            r.LopetaOsa();
        }

        static void CkPlastovyMost(Rakentaja r)
        {
            CkPlastovyMostRunko(r);
            float x0 = CkMostiX0, x1 = CkMostiX1, z0 = CkMostiZ - 0.012f;
            // Kaarikerrokset etupinnassa (tummat kaaret): ylhäällä 5, keskellä 3, alhaalla 1.
            var z = new Vector3(0f, 0f, z0);
            float L = x1 - x0;
            for (int k = 0; k < 5; k++)
                r.Holvi(new Vector3(x0 + L * (k + 0.5f) / 5f, 0.074f, 0f) + z, Vector3.back, L / 5f * 0.62f, 0.016f, EmMuste);
            for (int k = 0; k < 3; k++)
                r.Holvi(new Vector3(x0 + L * (k + 0.5f) / 3f, 0.049f, 0f) + z, Vector3.back, L / 3f * 0.6f, 0.024f, EmMuste);
            r.Holvi(new Vector3(x0 + L * 0.5f, 0.027f, 0f) + z, Vector3.back, L * 0.34f, 0.02f, EmMuste);
            // Käytävän ikkunat.
            float kz0 = CkMostiZ - 0.01f;
            for (int k = 0; k < 4; k++)
                r.Laatta(new Vector3(x0 + L * (k + 0.5f) / 4f, CkMostiY + 0.013f, kz0), Vector3.back, 0.007f, 0.008f, EmMuste);
        }

        // ---- Joki, pato ja sillat ----

        /// <summary>Joen lohkot (24) tasaisin pituusvälein. Joki rantoineen on yksi ääriviivaosa, joten musteviiva kiertää mutkan
        /// ulkoreunaa yhtenäisenä (lohkoittaiset osat tekivät viivasta sahalaitaisen); sisäreunan erottaa vaalea rantakaista.</summary>
        const int CkLohkoja = 24;
        /// <summary>Ulkorannan vaalea kaista (v2, koordinaattori 27.9. ilta): v1:ssä ulkoreunaa kehysti täysleveä musteviiva, joka
        /// luettiin 40 pt:ssä ja 30°:ssa raskaana tummana nauhana. Nyt ulkoreunalla on vaalea rantakaista (sama sävy kuin
        /// sisärannalla) ja sen takana puolileveä musteviiva (CkJokiMuste), joten tumma nauha on noin puolet kapeampi.</summary>
        const float CkUlkoranta = 0.015f;
        /// <summary>Joen ääriviivaosan musteviivan leveyskerroin (0,5 = puolet mallin 1,2 pt:n viivasta, varjostimessa suunta ×
        /// _Tila.z). Joki on maan tasossa, joten ohuempi viiva rajaa veden raskaan kehyksen sijaan.</summary>
        const float CkJokiMuste = 0.5f;

        static void CkJoki(Rakentaja r)
        {
            int alku = r.Kolmioita;
            r.AloitaOsa();
            for (int k = 0; k < CkLohkoja; k++)
            {
                float u0 = k / (float)CkLohkoja, u1 = (k + 1) / (float)CkLohkoja;
                var p0 = CkPolku(u0, out var d0); var p1 = CkPolku(u1, out var d1);
                var v0 = CkVasen(d0) * CkJokiPuoli; var v1 = CkVasen(d1) * CkJokiPuoli;
                r.NelioUlos(p0 + v0, p1 + v1, p1 - v1, p0 - v0, Vector3.up, EmVesi);
            }
            // Rannat: vaalea kivireunus vanhankaupungin puolella (niemi on joen sisäkaarella eli virtaussuunnasta oikealla,
            // koska joki kiertää niemen myötäpäivään ylhäältä katsottuna).
            for (int k = 0; k < CkLohkoja; k++)
            {
                float u0 = k / (float)CkLohkoja, u1 = (k + 1) / (float)CkLohkoja;
                var p0 = CkPolku(u0, out var d0); var p1 = CkPolku(u1, out var d1);
                var o0 = -CkVasen(d0); var o1 = -CkVasen(d1);
                var y = Vector3.up * 0.0004f;
                r.NelioUlos(p0 + o0 * (CkJokiPuoli - 0.0005f) + y, p1 + o1 * (CkJokiPuoli - 0.0005f) + y, p1 + o1 * (CkJokiPuoli + 0.007f) + y,
                    p0 + o0 * (CkJokiPuoli + 0.007f) + y, Vector3.up, EmKiviVaalea);
            }
            CkUlkorannat(r);
            r.LopetaOsa();
            r.CkOhutReuna(alku, CkJokiMuste);
        }

        /// <summary>Ulkorannan vaalea kaista (mutkan ulkoreuna eli virtaussuunnasta vasemmalla) joen ääriviivaosan sisällä, joten
        /// musteviiva kulkee kaistan ulkoreunaa. Linnan alla kaista jää kallion juurelle (kallio peittää sen ulko-osan). 48 kolmiota.</summary>
        static void CkUlkorannat(Rakentaja r)
        {
            for (int k = 0; k < CkLohkoja; k++)
            {
                float u0 = k / (float)CkLohkoja, u1 = (k + 1) / (float)CkLohkoja;
                var p0 = CkPolku(u0, out var d0); var p1 = CkPolku(u1, out var d1);
                var o0 = CkVasen(d0); var o1 = CkVasen(d1);
                var y = Vector3.up * 0.0004f;
                r.NelioUlos(p0 + o0 * (CkJokiPuoli - 0.0005f) + y, p1 + o1 * (CkJokiPuoli - 0.0005f) + y, p1 + o1 * (CkJokiPuoli + CkUlkoranta) + y,
                    p0 + o0 * (CkJokiPuoli + CkUlkoranta) + y, Vector3.up, EmKiviVaalea);
            }
        }

        /// <summary>
        /// Rakentajan lisäys (vain tässä tiedostossa, Ck-etuliite): ääriviivan leveyskerroin kolmiosta <c>alkuKolmio</c> alkaen.
        /// Kutsutaan osan LopetaOsa():n jälkeen, kun Loppu on laskenut suunnat (UV1) osan rajoista; kerroin skaalaa suunnat, joten
        /// varjostimen siirto suunta × _Tila.z ja siten musteviiva kapenee samassa suhteessa kaikilla zoomeilla. Verkko ei muutu.
        /// Pohjalla ilman ääriviivan osajakoa (Rakentajassa ei UV1-listaa u) toteutusrivi poistetaan kuten ErikoismalliApureissa.
        /// </summary>
        sealed partial class Rakentaja
        {
            public void CkOhutReuna(int alkuKolmio, float kerroin) => CkReunaKerroin(alkuKolmio * 3, kerroin);
            partial void CkReunaKerroin(int alku, float kerroin);
            partial void CkReunaKerroin(int alku, float kerroin)
            {
                for (int i = alku; i < u.Count; i++) u[i] = new Vector2(u[i].x * kerroin, u[i].y * kerroin);
            }
        }

        /// <summary>Padon ja kourun kehys kourun kohdalla: keskipiste veden pinnassa, virtaussuunta ja vasen normaali.</summary>
        static Vector3 CkKouru(out Vector3 d, out Vector3 v)
        {
            var p = CkPolku(CkKouruU, out d);
            v = CkVasen(d);
            return p;
        }

        /// <summary>
        /// Jelení lávkan pato: vaalea kivinen harja vinosti joen poikki ja keskellä kouru (vaahdon värinen ramppi, sivuseinät).
        /// Harja on 0,005 veden yllä (matala), joten vene liukuu kourun kohdalla sen läpi. Pieni osa ilman ääriviivaa.
        /// </summary>
        static void CkPato(Rakentaja r)
        {
            var p = CkKouru(out var d, out var v);
            // Vino harja: vasen (pohjoinen) pää ylävirtaan, oikea pää alavirtaan; keskellä kourun aukko.
            float kouru = 0.009f, vino = 0.022f, l = CkJokiPuoli + 0.002f;
            var y = Vector3.up * 0.0045f;
            Vector3 vasenPaa = p + v * l - d * vino, oikeaPaa = p - v * l + d * vino;
            Vector3 kv = p + v * kouru - d * (vino * kouru / l), ko = p - v * kouru + d * (vino * kouru / l);
            var t = d * 0.0045f;
            r.NelioUlos(vasenPaa + y - t, kv + y - t, kv + y + t, vasenPaa + y + t, Vector3.up, EmKiviVaalea);
            r.NelioUlos(ko + y - t, oikeaPaa + y - t, oikeaPaa + y + t, ko + y + t, Vector3.up, EmKiviVaalea);
            // Alavirran puolella vaahtoviiva (ylivuoto) harjan koko matkalla ja kourussa vaahtoramppi.
            var f = d * 0.012f; var yv = Vector3.up * 0.0006f;
            r.NelioUlos(vasenPaa + t + yv, kv + t + yv, kv + t + f + yv, vasenPaa + t + f + yv, Vector3.up, CkVaahtoVesi);
            r.NelioUlos(ko + t + yv, oikeaPaa + t + yv, oikeaPaa + t + f + yv, ko + t + f + yv, Vector3.up, CkVaahtoVesi);
            r.NelioUlos(kv - t + yv, ko - t + yv, ko + d * 0.024f + yv, kv + d * 0.024f + yv, Vector3.up, EmVaahto);
        }

        /// <summary>Sillat: keskilinjan osuus, kannen korkeus (maasta), leveys virtaussuunnassa ja laji. Kansi on niin korkealla,
        /// että lauttamiehet sauvoineen mahtuvat alta (sama taulukko lähitasossa). 0 Jelení lávka (puinen kävelysilta padon
        /// alapuolella), 1 Lazebnický most tornin edessä.</summary>
        static readonly (float u, float y, float leveys, int laji)[] CkSillat = { (0.722f, 0.036f, 0.011f, 0), (0.797f, 0.034f, 0.016f, 1) };

        static Color CkSiltaVari(int laji) => laji == 0 ? Color.Lerp(EmSeepia, EmKiviVaalea, 0.45f) : EmKiviVaalea;

        /// <summary>Silta joen poikki: suora kansi rannalta rannalle (tumma reunapalkki) ja maatuet molemmilla rannoilla (suunnattu
        /// laatikko maasta kanteen). 22 kolmiota, pienet osat ilman ääriviivaa.</summary>
        static void CkSilta(Rakentaja r, int i)
        {
            var sl = CkSillat[i];
            var p = CkPolku(sl.u, out var d);
            var v = CkVasen(d);
            var w = d * (sl.leveys * 0.5f);
            float l = CkJokiPuoli + 0.012f;
            var h = Vector3.up * (sl.y - CkVesiY);
            Vector3 A = p + v * l + h, B = p - v * l + h, alas = Vector3.up * 0.0035f;
            r.NelioUlos(A - w, B - w, B + w, A + w, Vector3.up, CkSiltaVari(sl.laji));
            r.NelioUlos(A - w - alas, B - w - alas, B - w, A - w, -d, EmSeepia);
            r.NelioUlos(A + w - alas, B + w - alas, B + w, A + w, d, EmSeepia);
            float suunta = (float)Math.Atan2(v.z, v.x);
            foreach (float sv in new[] { 1f, -1f })
            {
                var q = p + v * (sv * (CkJokiPuoli + 0.006f)); q.y = 0f;
                r.AloitaOsa();
                CkSeinat(r, q, suunta, 0.012f, sl.leveys + 0.002f, sl.y - 0.0035f, sl.laji == 0 ? EmKivi : EmKiviVaalea);
                r.LopetaOsa();
            }
        }

        // ---- Vanhakaupunki ----

        /// <summary>
        /// Vanhankaupungin talot (keskipohja x, z; suunta rad harja itäakselista vastapäivään; pituus; syvyys; seinän korkeus;
        /// harjan korkeus; seinäsävy 0–2). Rivit OpenStreetMapin korttelien mukaan: pohjoisrannan rivi linnan alla, etelärannan
        /// rivi, kaksi sisäriviä, Horní-kadun rivit niskaa kohti ja Svornostin aukio avoimena. Jokainen talo on pieni (puoliväli
        /// alle 0,035), joten ne jäävät ilman ääriviivaa ja luetaan tummana kattopintana vaalean linnan edessä.
        /// </summary>
        static readonly (float x, float z, float suunta, float pituus, float syvyys, float h, float harja, int savy)[] CkTalot =
        {
            // Pohjoisrannan rivi linnan alla (lännestä itään).
            (-0.288f, -0.022f, 0.55f, 0.052f, 0.026f, 0.028f, 0.02f, 0), (-0.222f, 0.004f, 0.25f, 0.058f, 0.026f, 0.034f, 0.018f, 1),
            (-0.157f, 0.014f, 0.04f, 0.058f, 0.026f, 0.03f, 0.022f, 2), (-0.093f, 0.012f, -0.1f, 0.058f, 0.026f, 0.036f, 0.019f, 0),
            (-0.03f, -0.003f, -0.28f, 0.056f, 0.026f, 0.029f, 0.021f, 1), (0.035f, -0.024f, -0.3f, 0.05f, 0.026f, 0.033f, 0.018f, 0),
            // Etelärannan rivi (lännestä itään) ja niskan rivi.
            (-0.283f, -0.158f, -0.62f, 0.05f, 0.026f, 0.028f, 0.02f, 2), (-0.215f, -0.193f, -0.33f, 0.058f, 0.026f, 0.031f, 0.018f, 0),
            (-0.15f, -0.211f, -0.12f, 0.058f, 0.026f, 0.027f, 0.022f, 1), (-0.085f, -0.219f, -0.03f, 0.058f, 0.026f, 0.033f, 0.018f, 0),
            (-0.02f, -0.219f, 0.03f, 0.058f, 0.026f, 0.029f, 0.021f, 2), (0.045f, -0.211f, 0.14f, 0.056f, 0.026f, 0.031f, 0.018f, 0),
            (0.285f, -0.165f, 0.18f, 0.058f, 0.026f, 0.028f, 0.02f, 1), (0.36f, -0.152f, 0.15f, 0.056f, 0.026f, 0.03f, 0.017f, 0),
            // Sisärivit länsikärjestä Svornostin aukiolle (aukio avoin x 0,05–0,11).
            (-0.3f, -0.09f, 1.35f, 0.05f, 0.026f, 0.028f, 0.019f, 0), (-0.225f, -0.07f, 0.12f, 0.052f, 0.028f, 0.032f, 0.022f, 2),
            (-0.22f, -0.135f, -0.18f, 0.052f, 0.028f, 0.029f, 0.018f, 0), (-0.15f, -0.065f, 0f, 0.056f, 0.03f, 0.035f, 0.02f, 1),
            (-0.15f, -0.15f, -0.05f, 0.056f, 0.03f, 0.03f, 0.023f, 0), (-0.083f, -0.07f, 1.62f, 0.056f, 0.03f, 0.033f, 0.02f, 0),
            (-0.083f, -0.155f, 0f, 0.056f, 0.03f, 0.03f, 0.018f, 2), (-0.018f, -0.085f, 0.15f, 0.05f, 0.03f, 0.04f, 0.021f, 1),
            (-0.015f, -0.16f, 1.57f, 0.05f, 0.028f, 0.031f, 0.019f, 0),
            // Horní-katu aukiolta niskaan (pohjoinen ja eteläinen rivi).
            (0.135f, -0.062f, -0.28f, 0.056f, 0.026f, 0.03f, 0.02f, 2), (0.14f, -0.13f, 0.08f, 0.05f, 0.028f, 0.034f, 0.018f, 0),
            (0.215f, -0.09f, -0.22f, 0.058f, 0.026f, 0.029f, 0.021f, 1), (0.295f, -0.103f, -0.16f, 0.058f, 0.026f, 0.031f, 0.018f, 0),
            (0.375f, -0.118f, -0.12f, 0.056f, 0.024f, 0.027f, 0.02f, 2), (0.448f, -0.127f, -0.1f, 0.05f, 0.024f, 0.026f, 0.017f, 0),
        };

        /// <summary>Kattosävy: joka kolmas talo hieman vaaleampi (vanhat tiilikatot vaihtelevat), ei aksenttia.</summary>
        static Color CkKattoSavy(int i) => i % 3 == 1 ? Color.Lerp(EmKatto, EmSeepia, 0.32f) : EmKatto;

        /// <summary>Vanhankaupungin seinäsävyt: paperi, lämmin hiekka ja vaalea okra (hillitty vaihtelu, ei aksenttia).</summary>
        static Color CkSeinaSavy(int i) => i == 1 ? EmHiekka : i == 2 ? Color.Lerp(EmHiekka, EmKiviVaalea, 0.6f) : EmPaperi;

        /// <summary>
        /// Kaupunkitalo yhtenä pienenä osana: seinät paitsi pohjoiseen kääntyvä (ei näy etelästä kallistuvaan kameraan),
        /// harjakatto harjan suunnassa ja päätykolmiot. 12 kolmiota.
        /// </summary>
        static void CkTalo(Rakentaja r, Vector3 p, float suunta, float pituus, float syvyys, float h, float harja, Color seina, Color katto)
        {
            r.AloitaOsa();
            var ex = new Vector3(Mathf.Cos(suunta), 0f, Mathf.Sin(suunta)) * (pituus * 0.5f);
            var ez = new Vector3(-Mathf.Sin(suunta), 0f, Mathf.Cos(suunta)) * (syvyys * 0.5f);
            Vector3 up = Vector3.up * h;
            Vector3 A = p - ex - ez, B = p + ex - ez, C = p + ex + ez, D = p - ex + ez;
            var keski = p + up * 0.5f;
            var seinat = new[] { (A, B), (B, C), (C, D), (D, A) };
            // Pohjoisimpaan osoittava seinä jätetään pois.
            int pois = -1; float pz = 0.5f;
            for (int i = 0; i < 4; i++)
            {
                var (a, b) = seinat[i];
                var nn = (a + b) * 0.5f - p;
                float nz = nn.z / Mathf.Max(1e-6f, nn.magnitude);
                if (nz > pz) { pz = nz; pois = i; }
            }
            for (int i = 0; i < 4; i++)
            {
                if (i == pois) continue;
                var (a, b) = seinat[i];
                r.NelioKeskelta(a, b, b + up, a + up, keski, seina);
            }
            Vector3 H1 = p - ex + up + Vector3.up * harja, H2 = p + ex + up + Vector3.up * harja;
            var kk = p + up + Vector3.up * (harja * 0.3f);
            r.NelioKeskelta(A + up, B + up, H2, H1, kk, katto);
            r.NelioKeskelta(D + up, C + up, H2, H1, kk, katto);
            r.KolmioKeskelta(A + up, D + up, H1, kk, seina);
            r.KolmioKeskelta(B + up, C + up, H2, kk, seina);
            r.LopetaOsa();
        }

        /// <summary>Pyhän Vituksen kirkko: laiva (harjakatto) ja hoikka neliötorni länsipäässä pyramidikypärineen (ei
        /// liioiteltu, jotta se ei kilpaile linnan tornin kanssa). Laiva ja torni ovat kumpikin pieniä osia.</summary>
        static readonly Vector3 CkKirkko = new Vector3(0.19f, 0f, -0.176f);

        static void CkVanhakaupunki(Rakentaja r)
        {
            for (int i = 0; i < CkTalot.Length; i++)
            {
                var t = CkTalot[i];
                CkTalo(r, new Vector3(t.x, 0f, t.z), t.suunta, t.pituus, t.syvyys, t.h, t.harja, CkSeinaSavy(t.savy), CkKattoSavy(i));
            }
            var k = CkKirkko;
            CkTalo(r, k, 0.12f, 0.066f, 0.03f, 0.038f, 0.022f, EmPaperi, EmKatto);
            var tp = k + new Vector3(-0.038f, 0f, -0.004f);
            r.AloitaOsa();
            r.Laatikko(tp, new Vector3(0.014f, 0.066f, 0.014f), EmPaperi, EmPaperi);
            r.Pyramidi(tp + Vector3.up * 0.066f, 0.017f, 0.017f, 0.042f, EmKatto);
            r.LopetaOsa();
        }

        /// <summary>Puut (5-kulmaiset kartiot, ei ääriviivaa): kallion pohjoisrinteellä, rinteen juurella joen varressa, itäpään
        /// pivovarská zahradassa ja joen mutkan länsipuolella.</summary>
        static readonly (float x, float z, float koko)[] CkPuut =
        {
            (-0.44f, 0.18f, 1f), (-0.3f, 0.235f, 1.1f), (-0.2f, 0.25f, 1f), (-0.07f, 0.255f, 1.05f), (0.06f, 0.25f, 1f), (0.2f, 0.19f, 1f),
            (0.3f, 0.02f, 1.1f), (0.36f, -0.005f, 1f), (0.42f, -0.02f, 1.15f), (0.47f, -0.035f, 0.9f),
            (-0.44f, -0.1f, 1.1f), (-0.45f, -0.18f, 1f), (0.43f, -0.14f, 0.9f), (-0.25f, -0.13f, 0.85f),
        };

        static void CkPuusto(Rakentaja r)
        {
            foreach (var (x, z, koko) in CkPuut)
            {
                float y = 0f;
                // Kallion rinteellä puu seisoo rinteen pinnalla (arvio: lineaarinen pohjoisreunan ja juuren välillä).
                for (int i = 0; i + 1 < CkKallioX.Length; i++)
                    if (x >= CkKallioX[i] && x <= CkKallioX[i + 1] && z > CkKallioPohjoinen[i] - 0.02f)
                    {
                        float f = (x - CkKallioX[i]) / (CkKallioX[i + 1] - CkKallioX[i]);
                        float zn = Mathf.Lerp(CkKallioPohjoinen[i], CkKallioPohjoinen[i + 1], f), zj = Mathf.Lerp(CkKallioJuuri[i], CkKallioJuuri[i + 1], f);
                        float h = Mathf.Lerp(CkKallioH[i], CkKallioH[i + 1], f);
                        y = Mathf.Clamp01((zj - z) / Mathf.Max(0.01f, zj - zn)) * h;
                    }
                r.Kartio(new Vector3(x, Mathf.Max(0f, y - 0.006f), z), 0.017f * koko, 0.042f * koko, 5, EmPuu);
            }
        }

        // ---- Runko ----

        static Mesh CeskyKrumlovRunko()
        {
            var r = new Rakentaja();
            CkJoki(r);
            CkKallio(r);
            CkLinna(r);
            CkPlastovyMost(r);
            CkPato(r);
            // Jelení lávka (kapea puinen kävelysilta padon alapuolella) ja Lazebnický most tornin edessä.
            CkSilta(r, 0);
            CkSilta(r, 1);
            CkVanhakaupunki(r);
            CkPuusto(r);
            return r.Verkko("CeskyKrumlov");
        }

        // ---- LÄHITASO (Natiivisepän Erikoismalli.Lahi, katto 3 000 kolmiota; omistajan hyväksymä tyyli 27.9. klo 09.0x) ----

        /// <summary>Lähitason sävyt rungon paletista (ominaisuuksina: Em-paletti on toisessa tiedostossa, eikä staattisten
        /// kenttien alustusjärjestys osittaisluokan tiedostojen välillä ole taattu).</summary>
        static Color CkLhKiviTumma => Color.Lerp(CkVaaleaKivi, EmKivi, 0.5f);
        static Color CkLhRaystas => Color.Lerp(EmPaperi, EmKivi, 0.3f);
        static Color CkLhHalkeama => Color.Lerp(EmKivi, EmMuste, 0.42f);
        static Color CkLhReunus => Color.Lerp(EmKivi, EmPaperi, 0.4f);
        static Color CkLhPuuVaalea => Color.Lerp(EmPuu, CkRinne, 0.4f);
        static Color CkLhMaalaus => Color.Lerp(CkPunainen, EmPaperi, 0.6f);
        static Color CkLhKehys => Color.Lerp(EmPaperi, CkPunainen, 0.12f);

        /// <summary>
        /// LÄHITASO (Natiivisepän Erikoismalli.Lahi, katto 3 000): sama siluetti (rajat samat kuin rungossa), mittasuhteet, värit,
        /// ääriviivaosat (joki, kallio, jokainen linnan siipi, torni, Plášťový most) ja osien pivotit kuin rungossa, noin 2,5 ×
        /// kolmiot lähikuvan yksityiskohtiin kaiverrustyyliin. Korvaa rungon vain lähellä; kanootit, lautta, roiske ja yövalot pysyvät
        /// ennallaan: joen keskilinja, vedenpinta, padon harja ja siltojen kannet ovat samat, joten veneet kulkevat samaa reittiä ja
        /// siltojen alta; linnan julkisivut ovat samoissa tasoissa, joten yövalon hehku jää ikkunoiden taakse (ikkunat tummina
        /// valaistulla julkisivulla), ja vanhankaupungin valaistut ikkunat osuvat talojen ikkunoiden kohdalle.
        ///   torni      24-kulmainen: timanttikvaadereiksi maalattu alaosa (ruutukuvio kärkiväreinä), punaisen vyön vaaleat maalatut
        ///              pilasterit, ochozin 17 kaariaukkoa ja kattoreunus, yläosan ikkunat, parvekkeen kaide, lyhdyn kaariaukot,
        ///              neljä pientä kulmatornia, kuparinen kupu ja kullattu huippu
        ///   linna      Horní hradissa kolme ikkunariviä, räystäslistat, kattolyhdyt ja savupiiput sekä kuparinen kattoratsastaja;
        ///              muissa siivissä ikkunat ja päätyikkunat
        ///   kallio     eteläseinässä kaksi reunusta (vaalea hylly ja tumma jyrkänne vuorotellen), halkeamat ja neljä muurattua
        ///              tukipilaria Horní hradin alla
        ///   most       kaarien väliset pilasterit, käytävän kahdeksan ikkunaa ja neljä patsasta rotkon reunoilla
        ///   kaupunki   talojen ikkunat, ovet, savupiiput ja kattoikkunat, Pyhän Vituksen kahdeksankulmainen torni ja kaari-ikkunat,
        ///              Svornostin aukion ruttopylväs; rantamuurit, padon kivet ja kouru, siltojen kaiteet ja 20 puuta lisää
        /// </summary>
        static Mesh CeskyKrumlovLahi()
        {
            var r = new Rakentaja();
            CkLhJoki(r);
            CkLhKallio(r);
            CkLhLinna(r);
            CkLhTorni(r);
            CkLhPlastovyMost(r);
            CkLhPato(r);
            CkLhSilta(r, 0);
            CkLhSilta(r, 1);
            CkLhVanhakaupunki(r);
            CkLhPuusto(r);
            return r.Verkko("CeskyKrumlov-lahi");
        }

        /// <summary>Lähitason joki: rungon vesi samoina lohkoina ja samana ääriviivaosana (sama ulkorannan vaalea kaista ja
        /// puolileveä musteviiva), vanhankaupungin puolella rantamuuri (vaalea harja 0,0035 veden yllä, pystypinnat veteen ja
        /// maahan) sekä vaaleat väreet virran suunnassa.</summary>
        static void CkLhJoki(Rakentaja r)
        {
            int alku = r.Kolmioita;
            r.AloitaOsa();
            for (int k = 0; k < CkLohkoja; k++)
            {
                float u0 = k / (float)CkLohkoja, u1 = (k + 1) / (float)CkLohkoja;
                var p0 = CkPolku(u0, out var d0); var p1 = CkPolku(u1, out var d1);
                var v0 = CkVasen(d0) * CkJokiPuoli; var v1 = CkVasen(d1) * CkJokiPuoli;
                r.NelioUlos(p0 + v0, p1 + v1, p1 - v1, p0 - v0, Vector3.up, EmVesi);
            }
            for (int k = 0; k < CkLohkoja; k++)
            {
                float u0 = k / (float)CkLohkoja, u1 = (k + 1) / (float)CkLohkoja;
                var p0 = CkPolku(u0, out var d0); var p1 = CkPolku(u1, out var d1);
                var o0 = -CkVasen(d0); var o1 = -CkVasen(d1);
                Vector3 s0 = p0 + o0 * (CkJokiPuoli - 0.0005f), s1 = p1 + o1 * (CkJokiPuoli - 0.0005f);
                Vector3 m0 = p0 + o0 * (CkJokiPuoli + 0.007f), m1 = p1 + o1 * (CkJokiPuoli + 0.007f);
                Vector3 y = Vector3.up * 0.0035f, maa = Vector3.up * -CkVesiY;
                r.NelioUlos(s0 + y, s1 + y, m1 + y, m0 + y, Vector3.up, EmKiviVaalea);
                r.NelioUlos(s0, s1, s1 + y, s0 + y, -(o0 + o1), EmKivi);
                r.NelioUlos(m0 + maa, m1 + maa, m1 + y, m0 + y, o0 + o1, EmKivi);
            }
            // Väreet: kapeat vaaleat viirut virran suunnassa (suvannoissa, padon alla ja tornin edessä).
            foreach (var (u, sivu) in new[] { (0.07f, 0.4f), (0.16f, -0.35f), (0.29f, 0.3f), (0.42f, -0.4f), (0.54f, 0.35f), (0.705f, -0.3f), (0.74f, 0.45f), (0.88f, -0.35f) })
            {
                var p = CkPolku(u, out var d);
                var c = p + CkVasen(d) * (CkJokiPuoli * sivu) + Vector3.up * 0.0003f;
                var w = CkVasen(d) * 0.0008f;
                r.NelioUlos(c - d * 0.012f - w, c + d * 0.012f - w, c + d * 0.012f + w, c - d * 0.012f + w, Vector3.up, CkVaahtoVesi);
            }
            CkUlkorannat(r);
            r.LopetaOsa();
            r.CkOhutReuna(alku, CkJokiMuste);
        }

        /// <summary>Lähitason kallion eteläseinän profiili asemalla i: k 0 juuri, 1 rinteen yläreuna, 2 alempi hylly, 3 alempi
        /// jyrkänne, 4 ylempi hylly, 5 ylempi jyrkänne (laen reuna). Vaakasiirto reunasta vaihtelee asemittain (siemen 1753),
        /// joten reunukset eivät ole viivasuoria; kaikki pisteet ovat rungon juuren ja reunan välissä (sama siluetti).</summary>
        static Vector3 CkLhSeina(int i, int k)
        {
            float x = CkKallioX[i], h = CkKallioH[i], zr = CkEtelaReuna(i), zj = CkEtelaJuuri(i);
            float v = ((i * 7919 + 1753) % 13) / 13f;   // toistettava vaihtelu 0–1
            switch (k)
            {
                case 0: return new Vector3(x, 0f, zj);
                case 1: return new Vector3(x, h * 0.42f, zj + 0.001f);
                case 2: return new Vector3(x, h * (0.56f + 0.04f * v), zr - 0.0065f);
                case 3: return new Vector3(x, h * (0.6f + 0.04f * v), zr - 0.0045f);
                case 4: return new Vector3(x, h * (0.79f - 0.03f * v), zr - 0.004f);
                default: return new Vector3(x, h * (0.82f - 0.03f * v), zr - 0.0015f);
            }
        }

        /// <summary>
        /// Lähitason kallio: rungon asemat, laki, pohjoisrinne ja päädyt samana ääriviivaosana; eteläseinässä kaksi reunusta
        /// (vaalea hylly, tumma jyrkänne vuorotellen kuten Mont-Saint-Michelin kerrostumissa) ja pienempinä osina halkeamat sekä
        /// neljä muurattua tukipilaria Horní hradin alla.
        /// </summary>
        static void CkLhKallio(Rakentaja r)
        {
            int n = CkKallioX.Length;
            r.AloitaOsa();
            for (int i = 0; i + 1 < n; i++)
            {
                var keski = (CkKallioPiste(i, 2) + CkKallioPiste(i + 1, 3)) * 0.5f - Vector3.up * 0.05f;
                bool tumma = i % 3 == 1;
                // Ylhäältä alas: laen reuna → ylempi jyrkänne → ylempi hylly → alempi jyrkänne → alempi hylly → rinne → juuri.
                Vector3 E(int j, int k) => k == 6 ? CkKallioPiste(j, 2) : CkLhSeina(j, k);
                r.NelioKeskelta(E(i, 5), E(i + 1, 5), E(i + 1, 6), E(i, 6), keski, tumma ? CkKallioTumma : EmKivi);
                r.NelioKeskelta(E(i, 4), E(i + 1, 4), E(i + 1, 5), E(i, 5), keski, CkLhReunus);
                r.NelioKeskelta(E(i, 3), E(i + 1, 3), E(i + 1, 4), E(i, 4), keski, tumma ? EmKivi : CkKallioTumma);
                r.NelioKeskelta(E(i, 2), E(i + 1, 2), E(i + 1, 3), E(i, 3), keski, CkLhReunus);
                r.NelioKeskelta(E(i, 1), E(i + 1, 1), E(i + 1, 2), E(i, 2), keski, EmKivi);
                r.NelioKeskelta(E(i, 0), E(i + 1, 0), E(i + 1, 1), E(i, 1), keski, CkRinne);
                r.NelioUlos(CkKallioPiste(i, 2), CkKallioPiste(i + 1, 2), CkKallioPiste(i + 1, 3), CkKallioPiste(i, 3), Vector3.up, CkPiha);
                r.NelioKeskelta(CkKallioPiste(i, 3), CkKallioPiste(i + 1, 3), CkKallioPiste(i + 1, 4), CkKallioPiste(i, 4), keski, CkRinne);
            }
            foreach (int i in new[] { 0, n - 1 })
            {
                var ulos = i == 0 ? Vector3.left : Vector3.right;
                var p0 = CkKallioPiste(i, 0); var p1 = CkKallioPiste(i, 1); var p2 = CkKallioPiste(i, 2); var p3 = CkKallioPiste(i, 3); var p4 = CkKallioPiste(i, 4);
                r.KolmioUlos(p0, p1, p2, ulos, EmKivi);
                r.KolmioUlos(p0, p2, p3, ulos, EmKivi);
                r.KolmioUlos(p0, p3, p4, ulos, CkRinne);
            }
            r.LopetaOsa();
            // Halkeamat jyrkänteissä (tummat pystyviirut, pienet osat) ja tukipilarit Horní hradin alla.
            foreach (var (x, kork) in new[] { (-0.232f, 0.022f), (-0.168f, 0.018f), (-0.105f, 0.026f), (-0.052f, 0.02f), (0.012f, 0.018f), (0.066f, 0.022f),
                (0.125f, 0.02f), (-0.44f, 0.014f), (-0.395f, 0.016f), (0.232f, 0.014f) })
            {
                float zr = CkReunaZ(x), h = CkLaki(x);
                float dz = CkReunaZ(x + 0.01f) - CkReunaZ(x - 0.01f);
                var nn = new Vector3(dz, 0f, -0.02f).normalized;
                r.Laatta(new Vector3(x, h * 0.68f, zr - 0.0042f), nn, 0.0016f, kork * h / 0.1f, CkLhHalkeama);
            }
            foreach (float x in new[] { -0.24f, -0.19f, -0.13f, -0.075f })
            {
                float zr = CkReunaZ(x), h = CkLaki(x), w = 0.0045f;
                Vector3 yla0 = new Vector3(x - w, h - 0.002f, zr - 0.001f), yla1 = new Vector3(x + w, h - 0.002f, zr - 0.001f);
                Vector3 ala0 = new Vector3(x - w, h * 0.45f, zr - 0.013f), ala1 = new Vector3(x + w, h * 0.45f, zr - 0.013f);
                Vector3 taka0 = new Vector3(x - w, h * 0.45f, zr - 0.006f), taka1 = new Vector3(x + w, h * 0.45f, zr - 0.006f);
                r.AloitaOsa();
                r.NelioUlos(yla0, yla1, ala1, ala0, new Vector3(0f, 0.6f, -1f), EmKiviVaalea);
                r.KolmioUlos(yla0, ala0, taka0, Vector3.left, CkLhReunus);
                r.KolmioUlos(yla1, ala1, taka1, Vector3.right, CkLhReunus);
                r.LopetaOsa();
            }
        }

        /// <summary>Kattolyhty (päätyikkuna) lonkkakaton etulappeella (kuten Hohensalzburgin lähitasossa): p = etuseinän alareunan
        /// keskikohta lappeen pinnassa, n = etuseinän suunta, k = lappeen nousu vaakamatkaa kohden. 12 kolmiota.</summary>
        static void CkLhKattolyhty(Rakentaja r, Vector3 p, Vector3 n, float k, float lev, float hs, float hp, Color seina, Color katto)
        {
            n = new Vector3(n.x, 0f, n.z).normalized;
            var t = Vector3.Cross(Vector3.up, n);
            var d = -n;
            float w = lev * 0.5f, ze = hs / k, zh = (hs + hp) / k;
            Vector3 A = p - t * w, B = p + t * w, A1 = A + Vector3.up * hs, B1 = B + Vector3.up * hs, H = p + Vector3.up * (hs + hp);
            var keski = p + Vector3.up * (hs * 0.5f) + d * (ze * 0.5f);
            r.NelioUlos(A, B, B1, A1, n, seina);
            r.KolmioUlos(A1, B1, H, n, seina);
            r.KolmioKeskelta(A, A1, A1 + d * ze, keski, seina);
            r.KolmioKeskelta(B, B1, B1 + d * ze, keski, seina);
            var o = n * 0.002f;
            r.NelioKeskelta(A1 + o - t * 0.0012f, H + o, H + d * zh, A1 + d * ze - t * 0.0012f, keski, katto);
            r.NelioKeskelta(B1 + o + t * 0.0012f, H + o, H + d * zh, B1 + d * ze + t * 0.0012f, keski, katto);
            var q = p + n * 0.0006f;
            r.NelioUlos(q - t * (w * 0.5f) + Vector3.up * (hs * 0.2f), q + t * (w * 0.5f) + Vector3.up * (hs * 0.2f), q + t * (w * 0.5f) + Vector3.up * (hs * 0.85f),
                q - t * (w * 0.5f) + Vector3.up * (hs * 0.85f), n, EmMuste);
        }

        /// <summary>
        /// Lähitason linna: jokaisen siiven seinät ja lonkkakatto rungon mitoin samana ääriviivaosana (etulappeella kattolyhdyt),
        /// räystäslista ja ikkunarivit etelään (Horní hradissa kolme riviä, ikkunat hehkun edessä), savupiiput harjan takana ja
        /// Horní hradin kuparinen kattoratsastaja; muissa siivissä ikkunat pitkällä seinällä ja teatterin päädyssä.
        /// </summary>
        static void CkLhLinna(Rakentaja r)
        {
            for (int i = 0; i < CkSiivet.Length; i++)
            {
                var s = CkSiivet[i];
                CkSiipi(i, out var p, out float suunta, out float pituus);
                var ex = new Vector3(Mathf.Cos(suunta), 0f, Mathf.Sin(suunta));
                var ez = new Vector3(-Mathf.Sin(suunta), 0f, Mathf.Cos(suunta));
                var m = ez.z > 0f ? -ez : ez;
                Color seina = i == 3 ? CkVaaleaKivi : EmPaperi;
                r.AloitaOsa();
                CkSeinat(r, p, suunta, pituus, s.syvyys, s.korkeus, seina);
                CkLonkka(r, p + Vector3.up * s.korkeus, suunta, pituus + 0.006f, s.syvyys + 0.006f, s.katto, EmKatto);
                // Kattolyhdyt etulappeella (lappeen nousu = katto / (syvyys / 2)).
                float syv = (s.syvyys + 0.006f) * 0.5f, kk = s.katto / syv, f = 0.3f;
                int lyhtyja = Mathf.Max(1, (int)(pituus / 0.045f));
                for (int k = 0; k < lyhtyja; k++)
                {
                    float x = pituus * (-0.35f + 0.7f * (k + 0.5f) / lyhtyja);
                    CkLhKattolyhty(r, p + ex * x + m * (syv * (1f - f)) + Vector3.up * (s.korkeus + s.katto * f), m, kk, 0.011f, 0.009f, 0.006f, seina, EmKatto);
                }
                r.LopetaOsa();
                // Räystäslista julkisivun yläreunassa ja ikkunarivit.
                var c = p + m * (s.syvyys * 0.5f);
                r.Laatta(c + Vector3.up * (s.korkeus - 0.0022f), m, pituus * 0.99f, 0.0035f, CkLhRaystas);
                float[] rivit = i < 2 ? new[] { 0.22f, 0.47f, 0.72f } : new[] { 0.3f, 0.64f };
                int n = Mathf.Max(2, (int)(pituus / 0.019f));
                foreach (float y in rivit)
                    for (int k = 0; k < n; k++)
                        r.Laatta(c + ex * (pituus * (-0.45f + 0.9f * (k + 0.5f) / n)) + Vector3.up * (s.korkeus * y), m, 0.0065f, 0.0095f, EmMuste);
                // Savupiiput harjan takana (latvat harjan yläpuolella vain vähän).
                for (int k = 0; k < (i < 2 ? 2 : 1); k++)
                {
                    var q = p - m * (syv * 0.35f) + ex * (pituus * (k == 0 ? 0.28f : -0.3f)) + Vector3.up * (s.korkeus + s.katto * 0.55f);
                    r.Laatikko(q, new Vector3(0.006f, s.katto * 0.55f + 0.004f, 0.006f), seina, EmMuste);
                }
                if (i == 1)
                {
                    // Kattoratsastaja: kuparinvihreä kuusikulmainen lyhty harjalla ja kultainen piikki.
                    var q = p + Vector3.up * (s.korkeus + s.katto) + ex * (pituus * 0.12f);
                    r.AloitaOsa();
                    r.Vaippa(q - Vector3.up * 0.004f, 0.0045f, 0.0045f, 0.013f, 6, CkKupari);
                    r.Kartio(q + Vector3.up * 0.009f, 0.0058f, 0.012f, 6, CkKupari);
                    r.Kartio(q + Vector3.up * 0.021f, 0.0012f, 0.008f, 3, EmKulta);
                    r.LopetaOsa();
                }
            }
            // Muut siivet: rungon talot ja ikkunarivi pitkällä etelään kääntyvällä seinällä; teatterin päädyssä ikkunat ja ovi.
            for (int j = 0; j < CkMuutSiivet.Length; j++)
            {
                var ms = CkMuutSiivet[j];
                var q = new Vector3(ms.x, CkLaki(ms.x) - 0.002f, ms.z);
                CkLinnaTalo(r, q, ms.suunta, ms.pituus, ms.syvyys, ms.h, ms.katto, EmPaperi);
                CkIkkunat(r, q, ms.suunta, ms.pituus, ms.syvyys, ms.h * 0.36f, Mathf.Max(2, (int)(ms.pituus / 0.022f)), 0.0065f, 0.009f);
                CkIkkunat(r, q, ms.suunta, ms.pituus, ms.syvyys, ms.h * 0.7f, Mathf.Max(2, (int)(ms.pituus / 0.022f)), 0.0065f, 0.009f);
                if (j == 2)
                {
                    // Teatterin eteläpääty: kaksi ikkunaa ja ovi.
                    var ex = new Vector3(Mathf.Cos(ms.suunta), 0f, Mathf.Sin(ms.suunta));
                    var pa = ex.z > 0f ? -ex : ex;
                    var c = q + pa * (ms.pituus * 0.5f);
                    var t = Vector3.Cross(Vector3.up, pa);
                    foreach (float sv in new[] { -1f, 1f })
                        r.Laatta(c + t * (sv * 0.013f) + Vector3.up * (ms.h * 0.62f), pa, 0.007f, 0.01f, EmMuste);
                    r.Holvi(c + Vector3.up * 0.009f, pa, 0.009f, 0.016f, EmMuste);
                }
            }
            CkStare(out var sp, out float ss, out float sl);
            CkLinnaTalo(r, sp, ss, sl, 0.048f, 0.034f, 0.022f, EmPaperi);
            CkIkkunat(r, sp, ss, sl, 0.048f, 0.012f, 4, 0.0065f, 0.009f);
            CkIkkunat(r, sp, ss, sl, 0.048f, 0.025f, 4, 0.0065f, 0.009f);
        }

        /// <summary>
        /// Lähitason torni (24-kulmainen, rungon mitat ja yksi ääriviivaosa): alaosa kolmena kivirenkaana ruutukuviona (maalattu
        /// timanttikvaaderi kärkiväreinä), punainen vyö ja sen vaaleat maalatut pilasterit, ochoz ja sen katto, yläosa, parveke
        /// kaiteineen, 12-kulmainen lyhty, neljä pientä kulmatornia, kuparinen kupu ja kullattu huippu; pienempinä osina ochozin
        /// 17 kaariaukkoa, yläosan ikkunat ja lyhdyn kaariaukot etelän puolella.
        /// </summary>
        static void CkLhTorni(Rakentaja r)
        {
            var t = CkTorni;
            var c = new Vector3(t.x, 0f, t.z);
            var up = Vector3.up;
            const int k = 24;
            float a0 = Mathf.PI / k;
            r.AloitaOsa();
            // Alaosa: kolme rengasta, ruudut vuorotellen vaalea ja tummempi kivi (timanttikvaaderin vaikutelma).
            float y0 = t.y - 0.01f, kh = (CkT1 - y0) / 3f;
            for (int j = 0; j < 3; j++)
                for (int i = 0; i < k; i++)
                {
                    float a = a0 + i * Mathf.PI * 2f / k, b = a + Mathf.PI * 2f / k;
                    Vector3 d0 = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a)) * CkTorniR, d1 = new Vector3(Mathf.Cos(b), 0f, Mathf.Sin(b)) * CkTorniR;
                    Vector3 alaY = up * (y0 + j * kh), ylaY = up * (y0 + (j + 1) * kh);
                    r.NelioUlos(c + d0 + alaY, c + d1 + alaY, c + d1 + ylaY, c + d0 + ylaY, (d0 + d1), (i + j) % 2 == 0 ? CkVaaleaKivi : CkLhKiviTumma);
                }
            r.Vaippa(c + up * CkT1, CkTorniR, CkTorniR, CkT2 - CkT1, k, CkPunainen, a0);
            r.Vaippa(c + up * CkT2, CkOchozR, CkOchozR, CkT3 - CkT2, k, EmPaperi, a0);
            CkRengas(r, c + up * CkT3, CkYlaR, CkOchozR, k, a0, true, CkVaaleaKivi);
            r.Vaippa(c + up * CkT3, CkYlaR, CkYlaR, CkT4 - CkT3, k, EmPaperi, a0);
            // Parveke: kiekko ja kaide (ulkoreunan pystypinta etelän puolella).
            r.Kiekko(c + up * CkT4, CkParvekeR, CkParvekeR, 16, CkVaaleaKivi);
            for (int i = 0; i < 16; i++)
            {
                float a = i * Mathf.PI * 2f / 16f, b = a + Mathf.PI * 2f / 16f;
                Vector3 d0 = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a)) * CkParvekeR, d1 = new Vector3(Mathf.Cos(b), 0f, Mathf.Sin(b)) * CkParvekeR;
                if ((d0 + d1).z > 0.02f) continue;
                r.NelioUlos(c + d0 + up * CkT4, c + d1 + up * CkT4, c + d1 + up * (CkT4 + 0.0045f), c + d0 + up * (CkT4 + 0.0045f), d0 + d1, CkLhKehys);
            }
            // Lyhty (12-kulmainen), neljä pientä kulmatornia, kupu ja huippu.
            r.Vaippa(c + up * CkT4, CkLyhtyR, CkLyhtyR, CkT5 - CkT4, 12, EmPaperi, Mathf.PI / 12f);
            r.Kartio(c + up * CkT5, CkLyhtyR * 1.25f, CkT6 - CkT5, 12, CkKupari);
            for (int i = 0; i < 4; i++)
            {
                float a = Mathf.PI * 0.25f + i * Mathf.PI * 0.5f;
                var q = c + new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a)) * (CkLyhtyR + 0.0045f) + up * (CkT5 - 0.004f);
                r.Kartio(q, 0.0024f, 0.012f, 4, CkKupari);
            }
            r.Timantti(c + up * (CkT6 + 0.006f), 0.0045f, 0.0065f, EmKulta, 6);
            r.Kartio(c + up * (CkT6 + 0.011f), 0.0018f, CkTHuippu - CkT6 - 0.011f, 4, EmKulta);
            r.LopetaOsa();
            // Punaisen vyön vaaleat maalatut pilasterit (joka toisella sivulla etelän puolella).
            float apR = CkTorniR * Mathf.Cos(Mathf.PI / k);
            for (int i = 0; i < k; i += 2)
            {
                float a = a0 + (i + 0.5f) * Mathf.PI * 2f / k;
                var nn = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                if (nn.z > 0.35f) continue;
                r.Laatta(c + nn * apR + up * ((CkT1 + CkT2) * 0.5f), nn, 0.0022f, CkT2 - CkT1 - 0.006f, CkLhMaalaus);
            }
            // Ochozin kaariaukot (pylväiden välissä), yläosan ikkunat ja lyhdyn kaariaukot etelän puolella.
            float apO = CkOchozR * Mathf.Cos(Mathf.PI / k);
            for (int i = 0; i < k; i++)
            {
                float a = a0 + (i + 0.5f) * Mathf.PI * 2f / k;
                var nn = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                if (nn.z > 0.55f) continue;
                r.Holvi(c + nn * apO + up * ((CkT2 + CkT3) * 0.5f - 0.0005f), nn, 0.0058f, CkT3 - CkT2 - 0.006f, EmMuste);
            }
            float apY = CkYlaR * Mathf.Cos(Mathf.PI / k);
            for (int i = 0; i < k; i += 3)
            {
                float a = a0 + (i + 0.5f) * Mathf.PI * 2f / k;
                var nn = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                if (nn.z > 0.3f) continue;
                r.Laatta(c + nn * apY + up * (CkT3 + (CkT4 - CkT3) * 0.55f), nn, 0.0045f, 0.011f, EmMuste);
            }
            float apL = CkLyhtyR * Mathf.Cos(Mathf.PI / 12f);
            for (int i = 0; i < 12; i++)
            {
                float a = Mathf.PI / 12f + (i + 0.5f) * Mathf.PI * 2f / 12f;
                var nn = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                if (nn.z > 0.3f) continue;
                r.Holvi(c + nn * apL + up * ((CkT4 + CkT5) * 0.5f), nn, 0.0042f, CkT5 - CkT4 - 0.008f, EmMuste);
            }
        }

        /// <summary>Lähitason Plášťový most: rungon kaariseinä ja katettu käytävä samana ääriviivaosana; kaarikerrosten kaaret ja
        /// niiden väliset vaaleat pilasterit, käytävän kahdeksan ikkunaa ja neljä patsasta rotkon reunoilla (pienet osat).</summary>
        static void CkLhPlastovyMost(Rakentaja r)
        {
            CkPlastovyMostRunko(r);
            float x0 = CkMostiX0, x1 = CkMostiX1, z0 = CkMostiZ - 0.012f, L = x1 - x0;
            var z = new Vector3(0f, 0f, z0);
            for (int k = 0; k < 5; k++)
                r.Holvi(new Vector3(x0 + L * (k + 0.5f) / 5f, 0.074f, 0f) + z, Vector3.back, L / 5f * 0.62f, 0.016f, EmMuste);
            for (int k = 0; k < 3; k++)
                r.Holvi(new Vector3(x0 + L * (k + 0.5f) / 3f, 0.049f, 0f) + z, Vector3.back, L / 3f * 0.6f, 0.024f, EmMuste);
            r.Holvi(new Vector3(x0 + L * 0.5f, 0.027f, 0f) + z, Vector3.back, L * 0.34f, 0.02f, EmMuste);
            // Kerrosten väliset vaaleat vyöt (kordonit).
            foreach (float y in new[] { 0.0625f, 0.0365f })
                r.Laatta(new Vector3((x0 + x1) * 0.5f, y, z0 - 0.0002f), Vector3.back, L * 0.98f, 0.0022f, CkLhRaystas);
            float kz0 = CkMostiZ - 0.01f;
            for (int k = 0; k < 8; k++)
                r.Laatta(new Vector3(x0 + L * (k + 0.5f) / 8f, CkMostiY + 0.013f, kz0), Vector3.back, 0.0048f, 0.0075f, EmMuste);
            // Patsaat rotkon reunoilla (tumma kivijalka ja vaalea hahmo).
            foreach (float x in new[] { x0 - 0.008f, x0 - 0.016f, x1 + 0.008f, x1 + 0.016f })
            {
                float y = CkLaki(x);
                var q = new Vector3(x, y, CkMostiZ - 0.02f);
                r.Laatikko(q, new Vector3(0.005f, 0.004f, 0.005f), EmKivi, EmKiviVaalea);
                r.Kartio(q + Vector3.up * 0.004f, 0.0022f, 0.011f, 4, EmKiviVaalea);
                r.Timantti(q + Vector3.up * 0.0155f, 0.0016f, 0.0018f, EmKiviVaalea, 3);
            }
        }

        /// <summary>Lähitason pato: rungon harja ja vaahto, kourun sivuseinät ja harjan alapuolella neljä kiveä (pienet osat).</summary>
        static void CkLhPato(Rakentaja r)
        {
            CkPato(r);
            var p = CkKouru(out var d, out var v);
            float kouru = 0.009f, vino = 0.022f, l = CkJokiPuoli + 0.002f;
            foreach (float sv in new[] { 1f, -1f })
            {
                var a = p + v * (sv * kouru) - d * (sv * vino * kouru / l);
                var y = Vector3.up * 0.0045f;
                r.NelioUlos(a + d * 0.004f, a + d * 0.024f, a + d * 0.024f + y * 0.6f, a + d * 0.004f + y, v * -sv, EmKiviVaalea);
                r.NelioUlos(a + d * 0.004f + y, a + d * 0.024f + y * 0.6f, a + d * 0.024f + y * 0.6f + v * (sv * 0.002f), a + d * 0.004f + y + v * (sv * 0.002f), Vector3.up, EmKiviVaalea);
            }
            foreach (var (f, sv) in new[] { (0.016f, 0.55f), (0.02f, -0.6f), (0.026f, 0.8f), (0.03f, -0.35f) })
            {
                var q = p + d * f + v * (CkJokiPuoli * sv) - Vector3.up * 0.001f;
                r.Timantti(q, 0.0022f, 0.0018f, CkKallioTumma, 4);
            }
        }

        /// <summary>Lähitason silta: rungon kansi ja maatuet, kannen reunoilla kaiteet ja Lazebnický mostissa keskituki.</summary>
        static void CkLhSilta(Rakentaja r, int i)
        {
            CkSilta(r, i);
            var sl = CkSillat[i];
            var p = CkPolku(sl.u, out var d);
            var v = CkVasen(d);
            float l = CkJokiPuoli + 0.012f;
            var h = Vector3.up * (sl.y - CkVesiY);
            var kaide = Vector3.up * 0.0045f;
            foreach (float sv in new[] { -1f, 1f })
            {
                var w = d * (sv * (sl.leveys * 0.5f - 0.0007f));
                Vector3 A = p + v * l + h + w, B = p - v * l + h + w;
                r.NelioUlos(A, B, B + kaide, A + kaide, d * sv, i == 0 ? CkPuuTumma : EmKiviVaalea);
                r.NelioUlos(B, A, A + kaide, B + kaide, d * -sv, i == 0 ? CkPuuTumma : EmKiviVaalea);
            }
            if (i == 1)
            {
                var q = p; q.y = CkVesiY;
                r.AloitaOsa();
                CkSeinat(r, q, (float)Math.Atan2(d.z, d.x), sl.leveys + 0.003f, 0.007f, sl.y - 0.0035f - CkVesiY, EmKiviVaalea);
                r.LopetaOsa();
            }
        }

        /// <summary>
        /// Lähitason vanhakaupunki: rungon talot samoina pieninä osina; etelään kääntyvässä seinässä kaksi ikkunaa (valaistujen talojen
        /// ikkuna on yövalon kohdalla, hehku peittää sen), joka toisessa talossa ovi, joka kolmannessa savupiippu harjalla ja joka
        /// neljännessä kattoikkuna etulappeella. Pyhän Vituksen kirkossa kaari-ikkunat ja kahdeksankulmainen torni, Svornostin
        /// aukiolla ruttopylväs kultaisine patsaineen.
        /// </summary>
        static void CkLhVanhakaupunki(Rakentaja r)
        {
            for (int i = 0; i < CkTalot.Length; i++)
            {
                var t = CkTalot[i];
                var p = new Vector3(t.x, 0f, t.z);
                var seina = CkSeinaSavy(t.savy);
                CkTalo(r, p, t.suunta, t.pituus, t.syvyys, t.h, t.harja, seina, CkKattoSavy(i));
                var ex = new Vector3(Mathf.Cos(t.suunta), 0f, Mathf.Sin(t.suunta));
                var ez = new Vector3(-Mathf.Sin(t.suunta), 0f, Mathf.Cos(t.suunta));
                var m = ez.z > 0f ? -ez : ez;
                var c = p + m * (t.syvyys * 0.5f - 0.0005f);
                foreach (float f in new[] { -0.2f, 0.2f })
                    r.Laatta(c + ex * (t.pituus * f) + Vector3.up * (t.h * 0.6f), m, 0.0065f, 0.0075f, EmMuste);
                if (i % 2 == 0) r.Laatta(c + ex * (t.pituus * 0.02f) + Vector3.up * 0.0055f, m, 0.0055f, 0.01f, CkPuuTumma);
                float kk = t.harja / (t.syvyys * 0.5f);
                if (i % 3 == 0)
                {
                    var q = p - m * (t.syvyys * 0.12f) + ex * (t.pituus * 0.3f) + Vector3.up * (t.h + t.harja * 0.72f);
                    r.Laatikko(q, new Vector3(0.0045f, t.harja * 0.28f + 0.004f, 0.0045f), seina, EmMuste);
                }
                if (i % 4 == 1)
                {
                    float f = 0.35f;
                    CkLhKattolyhty(r, p - ex * (t.pituus * 0.18f) + m * (t.syvyys * 0.5f * (1f - f)) + Vector3.up * (t.h + t.harja * f), m, kk, 0.009f, 0.0065f, 0.0045f,
                        seina, CkKattoSavy(i));
                }
            }
            // Pyhän Vituksen kirkko: rungon laiva, kolme kaari-ikkunaa etelään, kahdeksankulmainen torni (varsi, ikkunat, kypärä).
            var k = CkKirkko;
            CkTalo(r, k, 0.12f, 0.066f, 0.03f, 0.038f, 0.022f, EmPaperi, EmKatto);
            var kex = new Vector3(Mathf.Cos(0.12f), 0f, Mathf.Sin(0.12f)); var kez = new Vector3(-Mathf.Sin(0.12f), 0f, Mathf.Cos(0.12f));
            foreach (float f in new[] { -0.12f, 0.12f, 0.34f })
                r.Holvi(k - kez * 0.0152f + kex * (0.066f * f) + Vector3.up * 0.021f, -kez, 0.0065f, 0.02f, EmMuste);
            var tp = k + new Vector3(-0.038f, 0f, -0.004f);
            r.AloitaOsa();
            r.Vaippa(tp, 0.0082f, 0.0078f, 0.066f, 8, EmPaperi, Mathf.PI / 8f);
            r.Kartio(tp + Vector3.up * 0.066f, 0.0092f, 0.042f, 8, EmKatto);
            r.LopetaOsa();
            foreach (float y in new[] { 0.036f, 0.054f })
                r.Laatta(tp + new Vector3(0f, y, -0.0077f), Vector3.back, 0.0035f, 0.008f, EmMuste);
            // Ruttopylväs Svornostin aukiolla: jalusta, pylväs ja kultainen patsas.
            var sp = new Vector3(0.078f, 0f, -0.108f);
            r.Laatikko(sp, new Vector3(0.011f, 0.005f, 0.011f), EmKiviVaalea, EmKiviVaalea);
            r.Pylvas(sp + Vector3.up * 0.005f, 0.002f, 0.026f, 6, EmKiviVaalea);
            r.Timantti(sp + Vector3.up * 0.0335f, 0.0026f, 0.0035f, EmKulta, 4);
        }

        /// <summary>Lähitason puut: rungon 14 puuta samoilla paikoilla ja 20 pienempää lisää kallion pohjoisrinteelle, linnan
        /// puutarhan reunaan, joen mutkan länsipuolelle ja pivovarská zahradaan tornin itäpuolelle.</summary>
        static readonly (float x, float z, float koko)[] CkLhPuut =
        {
            (-0.46f, 0.15f, 0.7f), (-0.38f, 0.21f, 0.75f), (-0.33f, 0.225f, 0.65f), (-0.25f, 0.245f, 0.7f), (-0.13f, 0.255f, 0.7f),
            (-0.01f, 0.25f, 0.72f), (0.12f, 0.205f, 0.7f), (0.25f, 0.13f, 0.65f), (0.28f, 0.07f, 0.7f), (0.33f, 0.035f, 0.75f),
            (0.39f, -0.005f, 0.7f), (0.45f, -0.02f, 0.65f), (0.32f, -0.015f, 0.6f), (-0.47f, -0.05f, 0.75f), (-0.48f, -0.14f, 0.7f),
            (-0.43f, -0.24f, 0.7f), (-0.4f, -0.29f, 0.62f), (0.47f, -0.14f, 0.6f), (-0.27f, -0.115f, 0.6f), (0.105f, -0.155f, 0.55f),
        };

        static void CkLhPuusto(Rakentaja r)
        {
            CkPuusto(r);
            foreach (var (x, z, koko) in CkLhPuut)
            {
                float y = 0f;
                for (int i = 0; i + 1 < CkKallioX.Length; i++)
                    if (x >= CkKallioX[i] && x <= CkKallioX[i + 1] && z > CkKallioPohjoinen[i] - 0.02f)
                    {
                        float f = (x - CkKallioX[i]) / (CkKallioX[i + 1] - CkKallioX[i]);
                        float zn = Mathf.Lerp(CkKallioPohjoinen[i], CkKallioPohjoinen[i + 1], f), zj = Mathf.Lerp(CkKallioJuuri[i], CkKallioJuuri[i + 1], f);
                        float h = Mathf.Lerp(CkKallioH[i], CkKallioH[i + 1], f);
                        y = Mathf.Clamp01((zj - z) / Mathf.Max(0.01f, zj - zn)) * h;
                    }
                r.Kartio(new Vector3(x, Mathf.Max(0f, y - 0.005f), z), 0.017f * koko, 0.042f * koko, 5, CkLhPuuVaalea);
            }
        }

        // ---- LIIKKUVAT OSAT ----

        /// <summary>Veneiden, lautan ja lauttamiesten pivot: mallin juuri veden pinnassa (liikeydin antaa siirron suoraan
        /// keskilinjan pisteenä, keula +X, kierto Y:n ympäri kulkusuuntaan).</summary>
        static readonly Vector3 CkVenePivot = new Vector3(0f, CkVesiY + 0.0004f, 0f);

        /// <summary>
        /// Kanootti (verkon origo vesirajassa keskellä, keula +X): suippo runko (kuusikulmainen reunus ja köli, kyljet tummempaa
        /// punaista), punainen kansi ja kaksi melojaa tummina päinä. Noin viisinkertainen (0,052 × 0,013), jotta punainen viiva
        /// näkyy joella 40 pt:ssä. 18 kolmiota.
        /// </summary>
        static Mesh CeskyKrumlovKanootti()
        {
            var r = new Rakentaja();
            const float L = 0.026f, B = 0.0065f, h = 0.006f;
            var reuna = new[] { new Vector3(L, h + 0.001f, 0f), new Vector3(0.01f, h, B), new Vector3(-0.01f, h, B), new Vector3(-L, h + 0.001f, 0f),
                new Vector3(-0.01f, h, -B), new Vector3(0.01f, h, -B) };
            Vector3 kb = new Vector3(0.019f, 0f, 0f), ks = new Vector3(-0.019f, 0f, 0f);
            var keski = new Vector3(0f, h * 0.5f, 0f);
            // Kyljet: reunuksen särmät kölille (keula- ja peräkolmiot, keskellä nelikulmio), tummempi punainen.
            var kylki = Color.Lerp(CkPunainen, EmMuste, 0.25f);
            r.KolmioKeskelta(reuna[0], reuna[1], kb, keski, kylki);
            r.NelioKeskelta(reuna[1], reuna[2], ks, kb, keski, kylki);
            r.KolmioKeskelta(reuna[2], reuna[3], ks, keski, kylki);
            r.KolmioKeskelta(reuna[3], reuna[4], ks, keski, kylki);
            r.NelioKeskelta(reuna[4], reuna[5], kb, ks, keski, kylki);
            r.KolmioKeskelta(reuna[5], reuna[0], kb, keski, kylki);
            // Kansi punaisena (aksentti näkyy ylhäältä), keskellä kaksi melojaa tummina päinä.
            r.KolmioUlos(reuna[0], reuna[1], reuna[5], Vector3.up, CkPunainen);
            r.NelioUlos(reuna[1], reuna[2], reuna[4], reuna[5], Vector3.up, CkPunainen);
            r.KolmioUlos(reuna[2], reuna[3], reuna[4], Vector3.up, CkPunainen);
            r.Kartio(new Vector3(0.008f, h, 0f), 0.0033f, 0.0085f, 3, EmMuste);
            r.Kartio(new Vector3(-0.009f, h, 0f), 0.0033f, 0.0085f, 3, EmMuste);
            return r.Verkko("CeskyKrumlov-kanootti");
        }

        /// <summary>Kumilautta (verkon origo vesirajassa, keula +X): tumma oliivinharmaa pyöreähkö kuusikulmio (paksu reunaputki),
        /// vaalea pohja ja kolme melojaa. 29 kolmiota.</summary>
        static Mesh CeskyKrumlovKumilautta()
        {
            var r = new Rakentaja();
            const float h = 0.0065f;
            var ulko = new Vector3[6]; var sisa = new Vector3[6];
            for (int i = 0; i < 6; i++)
            {
                float a = i * Mathf.PI / 3f;
                ulko[i] = new Vector3(Mathf.Cos(a) * 0.022f, h, Mathf.Sin(a) * 0.012f);
                sisa[i] = new Vector3(Mathf.Cos(a) * 0.014f, h + 0.0003f, Mathf.Sin(a) * 0.0055f);
            }
            var keski = new Vector3(0f, h * 0.5f, 0f);
            for (int i = 0; i < 6; i++)
            {
                int j = (i + 1) % 6;
                r.NelioKeskelta(new Vector3(ulko[i].x, 0f, ulko[i].z), new Vector3(ulko[j].x, 0f, ulko[j].z), ulko[j], ulko[i], keski, CkKumi);
            }
            // Putken yläpinta ja vaalea pohja (sisäkuusikulmio hieman päällä).
            for (int i = 1; i < 5; i++) r.KolmioUlos(ulko[0], ulko[i], ulko[i + 1], Vector3.up, CkKumi);
            for (int i = 1; i < 5; i++) r.KolmioUlos(sisa[0], sisa[i], sisa[i + 1], Vector3.up, EmKiviVaalea);
            foreach (var (x, z) in new[] { (0.009f, 0.0f), (-0.001f, 0.003f), (-0.01f, -0.002f) })
                r.Kartio(new Vector3(x, h, z), 0.003f, 0.007f, 3, EmMuste);
            return r.Verkko("CeskyKrumlov-kumilautta");
        }

        /// <summary>Vana: kaksi vaaleaa viirua levenee veneen perästä taaksepäin (pivot kuten veneellä, sama kierto).</summary>
        static Mesh CeskyKrumlovVana()
        {
            var r = new Rakentaja();
            foreach (float sv in new[] { -1f, 1f })
            {
                Vector3 a = new Vector3(-0.018f, 0.0003f, sv * 0.0045f), b = new Vector3(-0.055f, 0.0003f, sv * 0.014f);
                var t = new Vector3(0f, 0f, 0.0016f);
                r.NelioUlos(a - t, b - t * 0.35f, b + t * 0.35f, a + t, Vector3.up, CkVaahtoVesi);
            }
            return r.Verkko("CeskyKrumlov-vana");
        }

        /// <summary>Roiskeen pivot: kourun alapää 0,012 padon harjan alapuolella veden pinnassa (siinä vene sukeltaa vaahtoon).</summary>
        static Vector3 CkRoiskePivot => CkPolku(CkKouruU + 0.012f / CkPituus, out _) + Vector3.up * 0.0004f;

        /// <summary>
        /// Roiske (pivot kourun alapäässä veden pinnassa, akselit virtaussuunnan mukaan): vaahtokaari kourun alapuolella —
        /// vaalea puolikuu veden pinnassa ja kuusi matalaa vaahtokieltä (kaksipuolisia), animaatio skaalaa 0 → 1 → 0 (lautalla
        /// 0 → 2 → 0). 24 kolmiota.
        /// </summary>
        static Mesh CeskyKrumlovRoiske()
        {
            var r = new Rakentaja();
            CkKouru(out var d, out var v);
            const int n = 6;
            for (int i = 0; i < n; i++)
            {
                float a0 = Mathf.PI * i / n - Mathf.PI * 0.5f, a1 = Mathf.PI * (i + 1) / n - Mathf.PI * 0.5f;
                Vector3 s0 = d * Mathf.Cos(a0) + v * Mathf.Sin(a0), s1 = d * Mathf.Cos(a1) + v * Mathf.Sin(a1);
                var y = Vector3.up * 0.0006f;
                r.NelioUlos(s0 * 0.007f + y, s1 * 0.007f + y, s1 * 0.017f + y, s0 * 0.017f + y, Vector3.up, EmVaahto);
                // Vaahtokielet: matalat kaksipuoliset kolmiot kaaren ulkoreunalla, joka toinen korkeampi.
                var m = (s0 + s1).normalized;
                r.KalvoKolmio(m * 0.01f + Vector3.up * 0.0008f, m * 0.017f + Vector3.up * 0.0008f,
                    m * 0.016f + Vector3.up * (0.006f + 0.003f * (i % 2)), EmVaahto);
            }
            return r.Verkko("CeskyKrumlov-roiske");
        }

        /// <summary>
        /// Puulautan puolisko (verkon origo puoliskon keskellä vesirajassa, keula +X): tumma tukkilautta (0,08 × 0,026), jonka
        /// pinnassa tukkien raot tummina viivoina; keulapuoliskossa nokka kapenee ja siinä on lyhtytolppa. Kaksi puoliskoa peräkkäin
        /// on 0,16 pitkä lautta, joka taipuu niiden välistä (liikeydin asettaa kummankin keskilinjalle omaan kohtaansa).
        /// </summary>
        static Mesh CkLauttaPuolisko(bool keula)
        {
            var r = new Rakentaja();
            const float L = 0.04f, B = 0.013f, h = 0.004f;
            float nokka = keula ? 0.006f : 0f;
            var ala = new[] { new Vector3(-L, 0f, -B), new Vector3(L - nokka, 0f, -B), new Vector3(L, 0f, -B + nokka), new Vector3(L, 0f, B - nokka),
                new Vector3(L - nokka, 0f, B), new Vector3(-L, 0f, B) };
            var keski = new Vector3(0f, h * 0.5f, 0f);
            for (int i = 0; i < ala.Length; i++)
            {
                var a = ala[i]; var b = ala[(i + 1) % ala.Length];
                if ((a - b).sqrMagnitude < 1e-8f) continue;
                r.NelioKeskelta(a, b, b + Vector3.up * h, a + Vector3.up * h, keski, CkPuuTumma);
            }
            var y = Vector3.up * h;
            r.NelioUlos(ala[0] + y, ala[1] + y, ala[4] + y, ala[5] + y, Vector3.up, Color.Lerp(EmSeepia, EmKatto, 0.5f));
            r.NelioUlos(ala[1] + y, ala[2] + y, ala[3] + y, ala[4] + y, Vector3.up, Color.Lerp(EmSeepia, EmKatto, 0.5f));
            // Tukkien raot pituussuunnassa.
            foreach (float z in new[] { -0.0065f, 0f, 0.0065f })
                r.NelioUlos(new Vector3(-L + 0.002f, h + 0.0002f, z - 0.0007f), new Vector3(L - nokka - 0.002f, h + 0.0002f, z - 0.0007f),
                    new Vector3(L - nokka - 0.002f, h + 0.0002f, z + 0.0007f), new Vector3(-L + 0.002f, h + 0.0002f, z + 0.0007f), Vector3.up, CkPuuTumma);
            if (keula) r.Pylvas(new Vector3(L - 0.008f, h, 0f), 0.0011f, 0.0135f, 3, CkPuuTumma);
            return r.Verkko(keula ? "CeskyKrumlov-lautta0" : "CeskyKrumlov-lautta1");
        }

        static Mesh CeskyKrumlovLautta0() => CkLauttaPuolisko(true);
        static Mesh CeskyKrumlovLautta1() => CkLauttaPuolisko(false);

        /// <summary>Lauttamies sauvoineen (verkon origo jalkojen välissä, katse +X): tumma hahmo ja pitkä sauva vinosti taakse
        /// veteen. Liikeydin asettaa hahmon puoliskonsa kannelle ja keinuttaa sitä ±8° sivuakselin ympäri (sauvalla työntäminen).
        /// Hahmo sauvoineen on alle 0,03 korkea, joten se mahtuu siltojen alta.</summary>
        static Mesh CeskyKrumlovMies()
        {
            var r = new Rakentaja();
            r.Kartio(Vector3.zero, 0.003f, 0.014f, 4, EmMuste);
            r.Timantti(Vector3.up * 0.0152f, 0.0024f, 0.0026f, EmMuste, 4);
            // Sauva: kaksipuolinen kapea nauha käsien yläpuolelta vinosti taakse ja alas veteen.
            Vector3 a = new Vector3(0.005f, 0.02f, 0.004f), b = new Vector3(-0.011f, -0.006f, 0.005f);
            var w = new Vector3(0.0008f, 0f, 0f);
            r.Kalvo(a - w, b - w, b + w, a + w, EmMuste);
            return r.Verkko("CeskyKrumlov-mies");
        }

        /// <summary>Lautan keulalyhty (pivot lyhtytolpan päässä): lämmin pieni timantti, näkyy vain yöllä.</summary>
        static Mesh CeskyKrumlovLyhty()
        {
            var r = new Rakentaja();
            r.Timantti(Vector3.zero, 0.0048f, 0.0056f, CkHehku, 4);
            return r.Verkko("CeskyKrumlov-lyhty");
        }

        /// <summary>Lyhtytolpan pää keulapuoliskon pivotista (keula +X): liikeydin kiertää sen puoliskon mukana.</summary>
        static readonly Vector3 CkLyhtyPaikka = new Vector3(0.032f, 0.0215f, 0f);

        // ---- Yövalot ----

        /// <summary>Horní hradin itäosan eteläjulkisivun juuri (valot-osan pivot): hehku kasvaa julkisivun tasossa alhaalta.</summary>
        static Vector3 CkValoPivot
        {
            get
            {
                CkSiipi(1, out var p, out float suunta, out float pituus);
                var ez = new Vector3(-Mathf.Sin(suunta), 0f, Mathf.Cos(suunta));
                return p - ez * (CkSiivet[1].syvyys * 0.5f + 0.0008f);
            }
        }

        /// <summary>Yövalot, linna (pivot Horní hradin julkisivun juuressa): lämmin hehku Horní hradin ja Dolní hradin
        /// eteläjulkisivuilla (ikkunoiden takana, joten ikkunat näkyvät tummina).</summary>
        static Mesh CeskyKrumlovValot()
        {
            var r = new Rakentaja();
            var o = CkValoPivot;
            for (int i = 0; i < 3; i++)
            {
                CkSiipi(i, out var p, out float suunta, out float pituus);
                CkJulkisivuHehku(r, p, suunta, pituus, CkSiivet[i].syvyys, CkSiivet[i].korkeus, o, EmIkkunavalo);
            }
            return r.Verkko("CeskyKrumlov-valot");
        }

        /// <summary>Hehku talon etelään kääntyvällä pitkällä seinällä (0,0008 seinän edessä, ikkunoiden takana), miinus pivot.</summary>
        static void CkJulkisivuHehku(Rakentaja r, Vector3 p, float suunta, float pituus, float syvyys, float korkeus, Vector3 o, Color vari)
        {
            var ez = new Vector3(-Mathf.Sin(suunta), 0f, Mathf.Cos(suunta));
            var m = ez.z > 0f ? -ez : ez;
            // Laatta siirtää 0,0015 ulos: keskipiste 0,0007 seinän sisäpuolella → hehku 0,0008 seinän edessä.
            r.Laatta(p + m * (syvyys * 0.5f - 0.0007f) + Vector3.up * (korkeus * 0.5f) - o, m, pituus * 0.92f, korkeus * 0.86f, vari);
        }

        /// <summary>Tornin valojen pivot: tornin akseli ochozin keskikorkeudella (hehku on tornin sisällä, kunnes syttyy).</summary>
        static Vector3 CkTorniValoPivot => new Vector3(CkTorni.x, (CkT2 + CkT3) * 0.5f, CkTorni.z);

        /// <summary>Yövalot, torni (pivot tornin akselilla): ochozin aukot hehkuvat (lämmin rengas aukkojen edessä etelän
        /// puolella), lyhty hehkuu ja Hrádekin julkisivu valaistaan.</summary>
        static Mesh CeskyKrumlovValot1()
        {
            var r = new Rakentaja();
            var o = CkTorniValoPivot;
            var c = new Vector3(CkTorni.x, 0f, CkTorni.z);
            const int k = 12;
            float ap = CkOchozR * Mathf.Cos(Mathf.PI / k) + 0.0012f;
            for (int i = 0; i < k; i++)
            {
                // Sivujen keskikohdat kuten rungon ochozissa (ensimmäinen kärki π / 12, sivun keskikohta sen jälkeen π / 12).
                float a = i * Mathf.PI * 2f / k + 2f * Mathf.PI / k;
                var nn = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                if (nn.z > 0.3f) continue;
                r.Laatta(c + nn * ap + Vector3.up * ((CkT2 + CkT3) * 0.5f - 0.001f) - o, nn, 0.0105f, CkT3 - CkT2 - 0.006f, CkHehku);
            }
            // Lyhty: hehkuva vaippa hieman lyhdyn ulkopuolella.
            var lp = c + Vector3.up * (CkT4 + 0.002f) - o;
            r.Vaippa(lp, CkLyhtyR + 0.0012f, CkLyhtyR + 0.0012f, CkT5 - CkT4 - 0.006f, 8, CkHehku, Mathf.PI / 8f);
            CkSiipi(3, out var hp, out float hs, out float hl);
            CkJulkisivuHehku(r, hp, hs, hl, CkSiivet[3].syvyys, CkSiivet[3].korkeus, o, EmIkkunavalo);
            return r.Verkko("CeskyKrumlov-valot1");
        }

        /// <summary>Vanhankaupungin valojen pivot: Svornostin aukio ikkunoiden korkeudella (ruttopylvään kohdalla). Syttyessä
        /// ikkunavalot leviävät aukiolta taloihin kuin lyhdynsytyttäjän kierros (1,5 s), sammuessa ne palaavat aukiolle.</summary>
        static readonly Vector3 CkKaupunkiValoPivot = new Vector3(0.078f, 0.018f, -0.108f);

        /// <summary>Yövalot, vanhakaupunki: joka kolmannessa talossa lämmin ikkuna etelään kääntyvällä pitkällä seinällä
        /// (lähitason ikkunan kohdalla ja sen edessä, joten ikkuna syttyy).</summary>
        static Mesh CeskyKrumlovValot2()
        {
            var r = new Rakentaja();
            var o = CkKaupunkiValoPivot;
            for (int i = 1; i < CkTalot.Length; i += 3)
            {
                var t = CkTalot[i];
                var ez = new Vector3(-Mathf.Sin(t.suunta), 0f, Mathf.Cos(t.suunta));
                var m = ez.z > 0f ? -ez : ez;
                var ex = new Vector3(Mathf.Cos(t.suunta), 0f, Mathf.Sin(t.suunta));
                var p = new Vector3(t.x, t.h * 0.6f, t.z) + m * (t.syvyys * 0.5f) + ex * (t.pituus * (i % 2 == 0 ? -0.2f : 0.2f));
                r.Laatta(p - o, m, 0.013f, 0.012f, EmIkkunavalo);
            }
            return r.Verkko("CeskyKrumlov-valot2");
        }

        static LiikkuvaOsaMaaritys[] CeskyKrumlovOsat()
        {
            var p = CkVenePivot;
            return new[]
            {
                new LiikkuvaOsaMaaritys { Nimi = "kanootti0", Verkko = CeskyKrumlovKanootti, Pivot = p, Liike = Liike.Liuku, Akseli = Vector3.right, KayS = 22f, TaukoS = 30f },
                new LiikkuvaOsaMaaritys { Nimi = "kanootti1", Verkko = CeskyKrumlovKanootti, Pivot = p, Liike = Liike.Liuku, Akseli = Vector3.right, KayS = 22f, TaukoS = 30f },
                new LiikkuvaOsaMaaritys { Nimi = "kanootti2", Verkko = CeskyKrumlovKanootti, Pivot = p, Liike = Liike.Liuku, Akseli = Vector3.right, KayS = 22f, TaukoS = 30f },
                new LiikkuvaOsaMaaritys { Nimi = "kumilautta", Verkko = CeskyKrumlovKumilautta, Pivot = p, Liike = Liike.Liuku, Akseli = Vector3.right, KayS = 22f, TaukoS = 30f },
                new LiikkuvaOsaMaaritys { Nimi = "vana0", Verkko = CeskyKrumlovVana, Pivot = p, Liike = Liike.Liuku, Akseli = Vector3.right, KayS = 22f, TaukoS = 30f },
                new LiikkuvaOsaMaaritys { Nimi = "vana1", Verkko = CeskyKrumlovVana, Pivot = p, Liike = Liike.Liuku, Akseli = Vector3.right, KayS = 22f, TaukoS = 30f },
                new LiikkuvaOsaMaaritys { Nimi = "vana2", Verkko = CeskyKrumlovVana, Pivot = p, Liike = Liike.Liuku, Akseli = Vector3.right, KayS = 22f, TaukoS = 30f },
                new LiikkuvaOsaMaaritys { Nimi = "roiske", Verkko = CeskyKrumlovRoiske, Pivot = CkRoiskePivot, Liike = Liike.Aalto, Akseli = Vector3.up },
                new LiikkuvaOsaMaaritys { Nimi = "lautta0", Verkko = CeskyKrumlovLautta0, Pivot = p, Liike = Liike.Liuku, Akseli = Vector3.right, KayS = 30f, TaukoS = 240f },
                new LiikkuvaOsaMaaritys { Nimi = "lautta1", Verkko = CeskyKrumlovLautta1, Pivot = p, Liike = Liike.Liuku, Akseli = Vector3.right, KayS = 30f, TaukoS = 240f },
                new LiikkuvaOsaMaaritys { Nimi = "mies0", Verkko = CeskyKrumlovMies, Pivot = p, Liike = Liike.Keinunta, Akseli = Vector3.forward, Laajuus = 8f },
                new LiikkuvaOsaMaaritys { Nimi = "mies1", Verkko = CeskyKrumlovMies, Pivot = p, Liike = Liike.Keinunta, Akseli = Vector3.forward, Laajuus = 8f },
                new LiikkuvaOsaMaaritys { Nimi = "lyhty", Verkko = CeskyKrumlovLyhty, Pivot = p, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = CeskyKrumlovValot, Pivot = CkValoPivot, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "valot1", Verkko = CeskyKrumlovValot1, Pivot = CkTorniValoPivot, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "valot2", Verkko = CeskyKrumlovValot2, Pivot = CkKaupunkiValoPivot, Liike = Liike.Valahdys },
            };
        }

        static readonly bool ceskyKrumlov = Rekisteroi("cesky-krumlov",
            new Erikoismalli { Runko = CeskyKrumlovRunko, Osat = CeskyKrumlovOsat, Lahi = CeskyKrumlovLahi, Kolmiot0 = 1460, KokoKerroin = 1.5f });
    }
}
