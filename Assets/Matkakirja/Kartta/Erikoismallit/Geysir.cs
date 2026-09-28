using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI GEYSIR JA STROKKUR (Haukadalurin geoterminen kenttä Lounais-Islannissa; speksi
    /// docs/raportit/erikoismallit/geysir.md, omistaja hyväksyi elämänidean 27.9.2026, erä 6: Strokkur ja Suuren Geysirin
    /// herääminen). Nosto kohde:geysir, Islanti, 64,3137 N −20,2995 E, taso 1.
    /// Tunnistus sekunnissa: oliivinvihreän saarekkeen keskellä vaalea geoterminen kenttä; edessä keskellä Strokkurin
    /// turkoosi allas matalalla valkoisella piisintterikummulla, ympärillä köysi ja pienten turistien kaari; takana oikealla
    /// Suuren Geysirin leveämpi turkoosi allas laajan vaalean sintterikilven laella; vasemmalla Laugarfjallin loiva
    /// laavakupu, jonka kentälle päin oleva alarinne on kuumuuden värjäämää punaruskeaa ja oranssia maata, ja juurella Blesin
    /// kaksi allasta ja Konungshver; oikealla edessä tie 35 ja sen takana Geysir-keskus ja Hótel Geysir.
    /// Purkauksessa altaaseen nousee turkoosi kupu, joka puhkeaa valkoiseksi vesipatsaaksi punaruskeaa maata vasten, ja höyry
    /// ajautuu tuulen alle.
    /// Mitat: 1,0 ≈ 330 m sijainneille (pohjoinen–etelä tiivistetty noin 0,65 ×, tie ja Geysir-keskus tuotu lähemmäs), altaat
    /// liioiteltu 3–4-kertaisiksi (Strokkur säde 0,052, Geysir 0,071), maaston pystyliioittelu noin 1,5 (Laugarfjallin kupu
    /// 0,10, Geysirin kilpi 0,031, Strokkurin kumpu 0,013). Patsaat: Strokkur 0,40 (0,34–0,46, joskus 0,52), Suuri Geysir 0,80.
    /// SUUNTA TODELLINEN (pohjoinen +Z): kamera katsoo etelästä kuten Geysir-keskuksesta tulevan polun näkymä.
    /// Liikkuvat osat:
    ///   maa             maan pinta (osa ilman ääriviivaa, ei liiku): oliivinen nummi, vaalea geoterminen kenttä,
    ///                   kuumuuden värjäämät laikut, märät valumaviuhkat, polku ja tie; reuna laskee kartan tasoon (ei pohjalevyä)
    ///   allas           Strokkurin vesi (valuu kuiluun ja täyttyy: skaala 1 → 0,72 → 1, pivot altaan alla)
    ///   kupu            Strokkurin turkoosi vesikupu ennen puhkeamista
    ///   patsas          Strokkurin vesipatsas (möykkyjen pino ja putoava suihku)
    ///   roiske          vaahtorengas altaalla, kun patsas putoaa
    ///   hoyry0–4        höyrymöykyt (0–2 ensimmäinen suihku, 3–4 kaksoispurkauksen toinen)
    ///   kuohu           Suuren Geysirin kuohuva allas
    ///   suuri           Suuren Geysirin patsas
    ///   suurihoyry0–2   Suuren Geysirin höyrymöykyt
    ///   turisti0–8      turistit köyden takana (pivot jaloissa, levossa katse altaaseen)
    ///   valot           yöllä Geysir-keskuksen ikkunat (pivot julkisivun juuressa)
    ///   valot1          yöllä Hótel Geysirin ikkunat (pivot julkisivun juuressa)
    /// </summary>
    public sealed partial class Symbolimallit
    {
        // ---- Paikat (samat kuin GeysirLiike-vakiot: muuta molemmat) ----

        /// <summary>Strokkurin altaan keskipiste ja vesiraja sekä veden levyn säde (reuna piilossa altaan seinässä, näkyvä
        /// säde noin 0,052).</summary>
        const float GysSx = -0.05f, GysSz = -0.08f, GysSy = 0.0105f, GysSr = 0.054f;
        /// <summary>Suuren Geysirin altaan keskipiste, vesiraja ja veden levyn säde (näkyvä säde noin 0,071).</summary>
        const float GysGx = 0.15f, GysGz = 0.16f, GysGy = 0.028f, GysGr = 0.074f;
        /// <summary>Maan pinnan korkeus keskellä (pinta laskee loivasti reunaa kohti ja on reunalla kartan tasossa).</summary>
        const float GysMaaY = 0.0015f;
        /// <summary>Köyden säde Strokkurin keskeltä.</summary>
        const float GysKoysiR = 0.118f;
        /// <summary>Turistien paikat köyden takana: kulma asteina (+X:stä vastapäivään ylhäältä, eli itä 0 ja pohjoinen 90) ja
        /// etäisyys Strokkurin keskeltä. Aukko koillisessa ja pohjoisessa (tuulen alapuoli ja Geysirin suunta). Samat kuin
        /// GeysirLiike.TuristiKulma ja TuristiSade.</summary>
        static readonly float[] GysTuristiKulma = { 138f, 160f, 187f, 211f, 236f, 262f, 291f, 318f, 347f };
        static readonly float[] GysTuristiSade = { 0.131f, 0.137f, 0.133f, 0.138f, 0.132f, 0.136f, 0.133f, 0.137f, 0.131f };
        /// <summary>Strokkurin höyrymöykkyjen pivot altaan yllä ja Suuren Geysirin höyryn pivot.</summary>
        const float GysHoyryY = 0.26f, GysSuuriHoyryY = 0.45f;
        /// <summary>Altaan veden pivot altaan alla: skaala 0,72 laskee levyn pohjan tuntumaan niin, että sen reuna pysyy seinän
        /// sisällä (vesi valuu kuiluun).</summary>
        const float GysAllasPivotY = -0.0068f;

        // ---- Paletti (Em-seepiaramppi; aksentti on turkoosi vesi) ----

        /// <summary>Piisintteri: vaalea, varjossa harmaa, reunan valkoinen piireunus, märkä valumauoma ja altaan märkä pohja.</summary>
        static readonly Color GysPii = Hex(0xe3ddcc), GysPiiVarjo = Hex(0xcdc5b2), GysPiiReuna = Hex(0xefeadd), GysMarka = Hex(0xbcc0b2),
            GysAltaanSeina = Hex(0xb9c1b6), GysAltaanPohja = Hex(0xa6b2aa), GysKuilu = Hex(0x3f5a5c);
        /// <summary>Maa: geoterminen kenttä (lämmin harmaa savi), oliivinen nummi ja sen tummempi varvikko, kuumuuden
        /// värjäämä punaruskea ja oranssi, Laugarfjallin oliivinruskea rinne, harmaa kallio ja vaalea ryoliitti.</summary>
        static readonly Color GysKentta = Hex(0xc9bd9c), GysNummi = Hex(0xa9a477), GysVarvikko = Hex(0x979a68), GysPunainen = Hex(0xa9674e),
            GysOranssi = Hex(0xc2874f), GysRinne = Hex(0x9c9369), GysKallio = Hex(0xa39a86), GysRyoliitti = Hex(0xcdb08a);
        /// <summary>Turkoosi vesi (aksentti): altaan reuna, keskusta ja syvä kuilu; Blesin maitoinen allas ja Litli Geysirin muta.</summary>
        static readonly Color GysTurkoosi = Hex(0x5ea9ad), GysTurkoosiVaalea = Hex(0x93c7c1), GysSyva = Hex(0x478f97), GysMaitoinen = Hex(0xb9d3cd),
            GysMuta = Hex(0x9a8d7a);
        /// <summary>Tie, polku ja köysi.</summary>
        static readonly Color GysTie = Hex(0x8f8574), GysPolku = Hex(0xd5c7a2), GysKoysi = Hex(0x6b5238);
        /// <summary>Rakennukset: paperinvaaleat seinät, hillityn punaruskeat katot ja musteikkunat.</summary>
        static readonly Color GysSeina = Hex(0xece3cb), GysKatto = Hex(0x8e5d46), GysIkkuna = Hex(0x4a3b2c);
        /// <summary>Vesipatsas (vaahto), tyven turkoosiin taittuva valkoinen, höyry ja kuvun sävyt alhaalta huipulle.</summary>
        static readonly Color GysVaahto = Hex(0xf6f0e0), GysVaahtoTyvi = Hex(0xd7ebe5), GysHoyry = Hex(0xfbf8f0),
            GysKupuAla = Hex(0x6fb5b4), GysKupuYla = Hex(0x9fd2ca), GysKupuHuippu = Hex(0xcfe8e2);
        /// <summary>Turistien takit (muste, tumma seepia, lämmin harmaa ja tumma oliivi), iho ja pipot.</summary>
        static readonly Color[] GysTakit = { Hex(0x3b2f22), Hex(0x5b4a37), Hex(0x7b6a55), Hex(0x5f6048) };
        static readonly Color[] GysPaat = { Hex(0xd9c1a0), Hex(0xefe4cc), Hex(0xd9c1a0), Hex(0x8a6a44), Hex(0xd9c1a0) };

        // ---- Apurit ----

        /// <summary>Toistettava kohina −1…1 kokonaisluvusta (ei System.Randomia kehyksessä; rakennus kerran).</summary>
        static float GysKohina(int i, int siemen)
        {
            unchecked
            {
                uint h = (uint)(i * 374761393 + siemen * 668265263);
                h = (h ^ (h >> 13)) * 1274126177u; h ^= h >> 16;
                return (h & 0xffff) / 32767.5f - 1f;
            }
        }

        /// <summary>Maan reunan säde kulmassa a (rad): epäsäännöllinen superellipsi (x ±0,5, z ±0,41), jonka reunassa on
        /// loivia pullistumia (ei ympyrä, ei suorakulmio eikä mitali).</summary>
        static float GysReunaSade(float a)
        {
            float c = Mathf.Abs(Mathf.Cos(a)), s = Mathf.Abs(Mathf.Sin(a));
            const double p = 2.6;
            float r = (float)(1.0 / Math.Pow(Math.Pow(c / 0.5, p) + Math.Pow(s / 0.41, p), 1.0 / p));
            // Loiva pullistuma vasemmassa takakulmassa (Laugarfjallin kupu mahtuu saarekkeelle ääriviivoineen).
            // ja pienempi oikeassa etukulmassa (Geysir-keskus ja hotelli mahtuvat).
            float d = (Mathf.Repeat(a - 2.4f + Mathf.PI, Mathf.PI * 2f) - Mathf.PI) / 0.45f, e = (Mathf.Repeat(a + 0.72f + Mathf.PI, Mathf.PI * 2f) - Mathf.PI) / 0.35f;
            return r * (0.962f + 0.020f * Mathf.Sin(a * 3f + 0.7f) + 0.013f * Mathf.Sin(a * 5f + 2.1f) + 0.008f * Mathf.Sin(a * 8f + 0.4f)
                + 0.05f * (float)Math.Exp(-d * d) + 0.035f * (float)Math.Exp(-e * e));
        }

        /// <summary>Maan korkeus kohdassa (x, z): keskellä GysMaaY, laskee suoraviivaisesti reunaa kohti ja on reunalla 0
        /// (loiva kartio, 0,2°: silmä ei näe kallistusta, mutta reuna liittyy karttaan ilman kynnystä).</summary>
        static float GysMaaKorkeus(float x, float z)
        {
            float a = (float)Math.Atan2(z, x);
            float rho = Mathf.Sqrt(x * x + z * z) / GysReunaSade(a);
            return GysMaaY * Mathf.Clamp01(1f - rho);
        }

        /// <summary>Piste maan pinnalla (x, z) nostettuna.</summary>
        static Vector3 GysMaassa(float x, float z, float nosto) => new Vector3(x, GysMaaKorkeus(x, z) + nosto, z);

        /// <summary>Kulman mukaan jatkuva kohina: jaksollinen Catmull–Rom-käyrä perus-kappaleen kohina-arvoista (u = 0…perus).
        /// Kokonaisluvuilla u arvo on täsmälleen GysKohina(u, siemen), joten tiheämpi lähitaso kulkee rungon kärkien kautta.</summary>
        static float GysKohinaKulma(float u, int siemen, int perus)
        {
            u = Mathf.Repeat(u, perus);
            int i1 = (int)u % perus;
            float t = u - (float)Math.Floor(u);
            if (t < 1e-5f) return GysKohina(i1, siemen);
            float p0 = GysKohina((i1 + perus - 1) % perus, siemen), p1 = GysKohina(i1, siemen), p2 = GysKohina((i1 + 1) % perus, siemen),
                p3 = GysKohina((i1 + 2) % perus, siemen);
            return 0.5f * (2f * p1 + (-p0 + p2) * t + (2f * p0 - 5f * p1 + 4f * p2 - p3) * t * t + (-p0 + 3f * p1 - 3f * p2 + p3) * t * t * t);
        }

        /// <summary>Kummun renkaan j piste kulmaindeksissä u (0…k, murtoluku sallittu) k kulman jaolla: sama kaava kuin
        /// GysKumpu (lähitason yksityiskohdat istuvat pinnalle).</summary>
        static Vector3 GysKumpuRengas((float y, float cx, float cz, float rx, float rz, float kohina)[] renkaat, int j, float u, int k, int siemen,
            float kierto, int perus)
        {
            float a = kierto + u * Mathf.PI * 2f / k;
            var q = renkaat[j];
            float s = 1f + q.kohina * GysKohinaKulma(u * perus / k, siemen + j * 31, perus);
            return new Vector3(q.cx + Mathf.Cos(a) * q.rx * s, q.y, q.cz + Mathf.Sin(a) * q.rz * s);
        }

        /// <summary>Kummun pinnan piste: kaista j (renkaiden j ja j + 1 välissä) osuudella f ja kulmaindeksissä u, nostettuna.</summary>
        static Vector3 GysKumpuPinta((float y, float cx, float cz, float rx, float rz, float kohina)[] renkaat, int j, float f, float u, int k,
            int siemen, float kierto, int perus, float nosto)
        {
            var a = GysKumpuRengas(renkaat, j, u, k, siemen, kierto, perus);
            var b = GysKumpuRengas(renkaat, j + 1, u, k, siemen, kierto, perus);
            return a + (b - a) * f + Vector3.up * nosto;
        }

        /// <summary>Kerroksittainen kumpu (sintteri, kupu): renkaat alhaalta ylös (korkeus, keskipiste, säteet ja kohina), k
        /// kulmaa, väri kaistoittain funktiosta (kaista, kulma rad). Pinnat ylöspäin; laki suljetaan, jos huippu ei ole NaN.
        /// Kohina on kulman mukaan jatkuva perus-kappaleen jaolla (0 = k), joten lähitaso (suurempi k) seuraa rungon siluettia.</summary>
        static void GysKumpu(Rakentaja r, (float y, float cx, float cz, float rx, float rz, float kohina)[] renkaat, int k, int siemen,
            Func<int, float, Color> vari, float huippu = float.NaN, float kierto = 0f, int perus = 0)
        {
            if (perus <= 0) perus = k;
            var p = new Vector3[renkaat.Length, k];
            for (int j = 0; j < renkaat.Length; j++)
                for (int i = 0; i < k; i++)
                    p[j, i] = GysKumpuRengas(renkaat, j, i, k, siemen, kierto, perus);
            for (int j = 0; j + 1 < renkaat.Length; j++)
                for (int i = 0; i < k; i++)
                {
                    int i1 = (i + 1) % k;
                    float a = kierto + (i + 0.5f) * Mathf.PI * 2f / k;
                    r.NelioUlos(p[j, i], p[j, i1], p[j + 1, i1], p[j + 1, i], Vector3.up, vari(j, a));
                }
            if (float.IsNaN(huippu)) return;
            int y = renkaat.Length - 1;
            var t = new Vector3(renkaat[y].cx, huippu, renkaat[y].cz);
            for (int i = 0; i < k; i++)
            {
                float a = kierto + (i + 0.5f) * Mathf.PI * 2f / k;
                r.KolmioUlos(t, p[y, i], p[y, (i + 1) % k], Vector3.up, vari(renkaat.Length - 1, a));
            }
        }

        /// <summary>Vaakasuora levy (vesi, laikku): keskipiste, säteet, k sektoria, korkeus y ja reunan kohina.</summary>
        static void GysLevy(Rakentaja r, float cx, float cz, float rx, float rz, float y, int k, Color vari, float kohina = 0f, int siemen = 0,
            float kierto = 0f)
        {
            var c = new Vector3(cx, y, cz);
            for (int i = 0; i < k; i++)
            {
                float a0 = kierto + i * Mathf.PI * 2f / k, a1 = kierto + (i + 1) * Mathf.PI * 2f / k;
                float s0 = 1f + kohina * GysKohina(i, siemen), s1 = 1f + kohina * GysKohina((i + 1) % k, siemen);
                r.KolmioUlos(c, new Vector3(cx + Mathf.Cos(a0) * rx * s0, y, cz + Mathf.Sin(a0) * rz * s0),
                    new Vector3(cx + Mathf.Cos(a1) * rx * s1, y, cz + Mathf.Sin(a1) * rz * s1), Vector3.up, vari);
            }
        }

        /// <summary>Laikku maan pinnalla (kärjet seuraavat maan korkeutta, nosto maan yllä): keskipiste, säteet, k sektoria,
        /// kierto (rad) ja reunan kohina. Soikio kierretään kulmalla kierto.</summary>
        static void GysLaikku(Rakentaja r, float cx, float cz, float rx, float rz, float nosto, int k, Color vari, float kohina, int siemen, float kierto)
        {
            float ck = Mathf.Cos(kierto), sk = Mathf.Sin(kierto);
            var c = GysMaassa(cx, cz, nosto);
            Vector3 P(int i)
            {
                float a = i * Mathf.PI * 2f / k, s = 1f + kohina * GysKohina(i % k, siemen);
                float x = Mathf.Cos(a) * rx * s, z = Mathf.Sin(a) * rz * s;
                return GysMaassa(cx + x * ck - z * sk, cz + x * sk + z * ck, nosto);
            }
            for (int i = 0; i < k; i++) r.KolmioUlos(c, P(i), P(i + 1), Vector3.up, vari);
        }

        /// <summary>Vaakasuora rengas kahden säteen välissä (altaan vyöhyke, piireunus, köysi): k sektoria, korkeudet
        /// sisä- ja ulkoreunalla.</summary>
        static void GysRengas(Rakentaja r, float cx, float cz, float r0, float r1, float y0, float y1, int k, Color vari, float kierto = 0f)
        {
            for (int i = 0; i < k; i++)
            {
                float a0 = kierto + i * Mathf.PI * 2f / k, a1 = kierto + (i + 1) * Mathf.PI * 2f / k;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)), d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1));
                var c = new Vector3(cx, 0f, cz);
                r.NelioUlos(c + d0 * r0 + Vector3.up * y0, c + d0 * r1 + Vector3.up * y1, c + d1 * r1 + Vector3.up * y1, c + d1 * r0 + Vector3.up * y0,
                    Vector3.up, vari);
            }
        }

        /// <summary>Nauha maan pinnalla murtoviivaa pitkin (tie, polku, valumauoma): leveys, nosto maan yllä, ja päiden
        /// kavennus (kapenee = päätypisteen leveyden osuus; 0 = ei kavennusta). Kärjet seuraavat maan korkeutta.</summary>
        static void GysNauha(Rakentaja r, Vector2[] pisteet, float leveys, float nosto, Color vari, float kapenee = 0f, float kapeneeLoppu = -1f)
        {
            if (kapeneeLoppu < 0f) kapeneeLoppu = kapenee;
            for (int i = 0; i + 1 < pisteet.Length; i++)
            {
                Vector2 a = pisteet[i], b = pisteet[i + 1];
                Vector2 ta = GysSuunta(pisteet, i), tb = GysSuunta(pisteet, i + 1);
                float la = leveys * 0.5f * (kapenee > 0f && i == 0 ? kapenee : 1f), lb = leveys * 0.5f * (kapeneeLoppu > 0f && i + 2 == pisteet.Length ? kapeneeLoppu : 1f);
                Vector3 A0 = GysMaassa(a.x + ta.y * la, a.y - ta.x * la, nosto), A1 = GysMaassa(a.x - ta.y * la, a.y + ta.x * la, nosto);
                Vector3 B0 = GysMaassa(b.x + tb.y * lb, b.y - tb.x * lb, nosto), B1 = GysMaassa(b.x - tb.y * lb, b.y + tb.x * lb, nosto);
                r.NelioUlos(A0, B0, B1, A1, Vector3.up, vari);
            }
        }

        /// <summary>Murtoviivan yksikkötangentti pisteessä i (keskiarvo viereisistä janoista).</summary>
        static Vector2 GysSuunta(Vector2[] p, int i)
        {
            Vector2 a = p[Math.Max(0, i - 1)], b = p[Math.Min(p.Length - 1, i + 1)];
            float dx = b.x - a.x, dz = b.y - a.y, l = Mathf.Sqrt(dx * dx + dz * dz);
            return l > 1e-6f ? new Vector2(dx / l, dz / l) : new Vector2(1f, 0f);
        }

        /// <summary>Möykky (höyry, patsaan vaahto): k-kulmainen kaksoispyramidi, yläpuolisko ja alapuolisko omin värein.
        /// Ylä- ja alakärki keskeltä (yla, ala), sivukärjet säteellä. 2k kolmiota.</summary>
        static void GysMoykky(Rakentaja r, Vector3 k, float sade, float yla, float ala, int sivuja, Color ylaVari, Color alaVari, float kierto = 0f,
            float karkiX = 0f, float karkiZ = 0f)
        {
            Vector3 ylin = k + Vector3.up * yla + new Vector3(karkiX, 0f, karkiZ), alin = k - Vector3.up * ala;
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = kierto + i * Mathf.PI * 2f / sivuja, a1 = kierto + (i + 1) * Mathf.PI * 2f / sivuja;
                Vector3 p0 = k + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * sade, p1 = k + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * sade;
                r.KolmioKeskelta(p0, p1, ylin, k, ylaVari);
                r.KolmioKeskelta(p1, p0, alin, k, alaVari);
            }
        }

        // ---- Runko ----

        static Mesh GeysirRunko()
        {
            var r = new Rakentaja();
            GysLaugarfjall(r, false);
            GysStrokkur(r, false);
            GysGeysir(r, false);
            GysPienetAltaat(r, false);
            GysKoysiRengas(r, false);
            GysRakennukset(r, false);
            return r.Verkko("Geysir");
        }

        // ---- Laugarfjall ----

        /// <summary>Laugarfjallin kuvun renkaat (korkeus, keskipiste, säteet, kohina): loiva kupu vasemmalla (lännessä),
        /// pohjois–etelä-suunnassa pitkänomainen, huippu hieman luoteeseen ja loivempi rinne kentälle päin (itään).</summary>
        static readonly (float y, float cx, float cz, float rx, float rz, float kohina)[] GysKupuRenkaat =
        {
            (0.0000f, -0.295f, 0.170f, 0.135f, 0.165f, 0.04f),
            (0.0240f, -0.302f, 0.178f, 0.109f, 0.136f, 0.04f),
            (0.0520f, -0.311f, 0.188f, 0.078f, 0.099f, 0.04f),
            (0.0750f, -0.318f, 0.196f, 0.048f, 0.062f, 0.03f),
            (0.0900f, -0.322f, 0.200f, 0.021f, 0.026f, 0.03f),
        };
        const float GysFjallHuippu = 0.096f, GysFjallKierto = 0.13f;
        /// <summary>Kumpujen kulmajako: runko 14 ja lähitaso 21 (kohina kulman mukaan jatkuva, joten lähitason siluetti kulkee
        /// rungon kärkien kautta).</summary>
        const int GysPerus = 14, GysLahiK = 21;

        /// <summary>Kentälle päin (itä ja kaakko) suuntautuvien tahkojen sektori: kulma (rad) kuvun keskeltä.</summary>
        static bool GysKentalle(float a)
        {
            float d = Mathf.Repeat(a * 180f / Mathf.PI + 100f, 360f);   // −100°…+60° → 0…160
            return d < 160f;
        }

        /// <summary>
        /// Laugarfjallin laavakupu (yksi ääriviivaosa, viiva kiertää kuvun karttaa vasten): alarinne kentälle päin kuumuuden
        /// värjäämää punaruskeaa ja oranssia, keskirinne oranssia ja vaaleaa ryoliittia, ylempänä oliivinruskea rinne ja
        /// harmaa kallio. Lähitasossa kallioreunat, lohkareet ja punaisen rinteen uomat.
        /// </summary>
        static void GysLaugarfjall(Rakentaja r, bool lahi)
        {
            int k = lahi ? GysLahiK : GysPerus;
            r.AloitaOsa();
            GysKumpu(r, GysKupuRenkaat, k, 407, (j, a) =>
            {
                bool kentta = GysKentalle(a);
                float n = GysKohina((int)(a * 100f) + j * 7, 911);
                switch (j)
                {
                    case 0: return kentta ? (n > 0f ? Color.Lerp(GysPunainen, GysRinne, 0.2f) : Color.Lerp(GysOranssi, GysRinne, 0.25f))
                        : (n > 0.5f ? Color.Lerp(GysPunainen, GysRinne, 0.45f) : GysRinne);
                    case 1: return kentta ? (n > 0.2f ? Color.Lerp(GysOranssi, GysRinne, 0.3f) : n > -0.4f ? GysRyoliitti : Color.Lerp(GysPunainen, GysRinne, 0.3f))
                        : (n > 0.3f ? GysKallio : GysRinne);
                    case 2: return kentta ? (n > 0.35f ? GysRyoliitti : GysRinne) : (n > 0.35f ? GysKallio : GysRinne);
                    default: return n > 0f ? GysKallio : Color.Lerp(GysRinne, GysKallio, 0.5f);
                }
            }, GysFjallHuippu, GysFjallKierto, GysPerus);
            // Lähitason kalliot ja uomat samassa ääriviivaosassa (kuvun rajojen sisällä, joten ääriviiva ei muutu).
            if (lahi) GysLhLaugarfjall(r, k);
            r.LopetaOsa();
            if (lahi) GysLhPensaat(r, k);
        }

        // ---- Strokkur ----

        /// <summary>
        /// Strokkurin piisintterikumpu (yksi ääriviivaosa): matala valkoinen kumpu (reuna 0,112, laki 0,013 säteellä 0,060),
        /// altaan märkä seinä ja pohja (näkyvät, kun vesi valuu kuiluun) ja tumma kuilu keskellä. Veden levy on osa "allas".
        /// Lähitasossa valkoinen piireunus, sintteriterassien reunat, halkeamat ja nimikivi.
        /// </summary>
        /// <summary>Strokkurin kummun renkaat: juuri maan alla, sintteririnne, reuna (laki) ja altaan seinä pohjalle.</summary>
        static readonly (float y, float cx, float cz, float rx, float rz, float kohina)[] GysStrokkurRenkaat =
        {
            (0.0004f, GysSx, GysSz, 0.112f, 0.108f, 0.06f),
            (0.0072f, GysSx, GysSz, 0.084f, 0.081f, 0.04f),
            (0.0130f, GysSx, GysSz, 0.060f, 0.060f, 0f),
            (0.0050f, GysSx, GysSz, 0.036f, 0.036f, 0f),
        };

        static void GysStrokkur(Rakentaja r, bool lahi)
        {
            int k = lahi ? GysLahiK : GysPerus;
            r.AloitaOsa();
            GysKumpu(r, GysStrokkurRenkaat, k, 211, (j, a) =>
            {
                if (j == 0) return GysKohina((int)(a * 90f), 57) > 0.45f ? Color.Lerp(GysPiiVarjo, GysOranssi, 0.3f) : GysPiiVarjo;
                if (j == 1) return GysPii;
                return GysAltaanSeina;
            }, 0.0050f, 0f, GysPerus);
            if (lahi) GysLhSintteri(r, GysStrokkurRenkaat, k, 211, 0f, GysLhStrokkurTerassit, 0.62f);
            r.LopetaOsa();
            // Altaan pohja: tummempi märkä pohja ja kuilu (piilossa veden alla, näkyvät kun vesi valuu kuiluun).
            GysLevy(r, GysSx, GysSz, 0.034f, 0.034f, 0.0051f, lahi ? 10 : 8, GysAltaanPohja);
            GysLevy(r, GysSx, GysSz, 0.013f, 0.013f, 0.0053f, 6, GysKuilu, 0f, 0, 0.3f);
        }

        // ---- Suuri Geysir ----

        /// <summary>
        /// Suuren Geysirin sintterikilpi (yksi ääriviivaosa): laaja loiva kilpi (reuna 0,168 × 0,150, laki 0,031 säteellä
        /// 0,08), altaan seinä ja staattinen vesi: vaalea turkoosi reunavyöhyke, syvempi keskusta ja tumma suppilo (kuilu).
        /// Lähitasossa kilven terassireunat ja valumauomat, altaan valkoinen piireunus ja suppilon renkaat.
        /// </summary>
        /// <summary>Suuren Geysirin kilven renkaat: juuri, kilven rinne, allasreuna ja altaan seinä vesirajan alle.</summary>
        static readonly (float y, float cx, float cz, float rx, float rz, float kohina)[] GysGeysirRenkaat =
        {
            (0.0004f, GysGx + 0.004f, GysGz - 0.004f, 0.168f, 0.150f, 0.07f),
            (0.0170f, GysGx + 0.002f, GysGz - 0.002f, 0.118f, 0.110f, 0.04f),
            (0.0310f, GysGx, GysGz, 0.080f, 0.080f, 0f),
            (0.0240f, GysGx, GysGz, 0.060f, 0.060f, 0f),
        };

        static void GysGeysir(Rakentaja r, bool lahi)
        {
            int k = lahi ? GysLahiK : GysPerus;
            r.AloitaOsa();
            GysKumpu(r, GysGeysirRenkaat, k, 307, (j, a) =>
            {
                if (j == 0) return GysKohina((int)(a * 90f), 71) > 0.3f ? Color.Lerp(GysPiiVarjo, GysPunainen, 0.3f) : GysPiiVarjo;
                if (j == 1) return GysPii;
                return GysAltaanSeina;
            }, float.NaN, 0f, GysPerus);
            // Vesi: vaalea reunavyöhyke, syvempi keskusta ja tumma suppilo.
            GysRengas(r, GysGx, GysGz, 0.045f, GysGr, GysGy, GysGy, k, GysTurkoosiVaalea);
            GysLevy(r, GysGx, GysGz, 0.045f, 0.045f, GysGy, k, GysTurkoosi);
            GysLevy(r, GysGx, GysGz, 0.018f, 0.018f, GysGy + 0.0002f, 8, GysSyva, 0f, 0, 0.2f);
            if (lahi) GysLhSintteri(r, GysGeysirRenkaat, k, 307, 0f, GysLhGeysirTerassit, 0.7f);
            r.LopetaOsa();
        }

        // ---- Pienet altaat ----

        /// <summary>Blesin kirkas ja maitoinen allas, Konungshver ja Litli Geysir (keskipiste, veden säde, oranssi reuna, vesi:
        /// 0 kirkas, 1 maitoinen, 2 muta).</summary>
        static readonly (float x, float z, float sade, bool oranssi, int vesi)[] GysPienet =
        {
            (-0.098f, 0.066f, 0.026f, false, 0),   // Blesi, kirkas turkoosi
            (-0.122f, 0.110f, 0.020f, false, 1),   // Blesi, maitoinen
            (-0.078f, 0.268f, 0.019f, true, 0),    // Konungshver (oranssi reuna)
            (-0.200f, -0.240f, 0.017f, false, 2),  // Litli Geysir (mutalähde)
        };

        /// <summary>Pieni allas: sintterireunus (ulkoreuna maan tasossa, sisäreuna 0,004) ja vesi 0,0036:ssa (reuna piilossa
        /// reunuksen alla). Blesin altaiden välissä kapea valumauoma. Lähitasossa Blesin laituri ja Konungshverin kaide.</summary>
        static void GysPienetAltaat(Rakentaja r, bool lahi)
        {
            int k = lahi ? 12 : 8;
            for (int i = 0; i < GysPienet.Length; i++)
            {
                var (x, z, s, oranssi, vesi) = GysPienet[i];
                var reuna = oranssi ? Color.Lerp(GysOranssi, GysPii, 0.3f) : (vesi == 2 ? GysPiiVarjo : GysPii);
                GysRengas(r, x, z, s + 0.001f, s + 0.009f, 0.0040f, 0.0008f, k, reuna, i * 0.4f);
                var v = vesi == 0 ? GysTurkoosi : vesi == 1 ? GysMaitoinen : GysMuta;
                GysLevy(r, x, z, s + 0.0015f, s + 0.0015f, 0.0036f, k, v, 0f, 0, i * 0.4f);
                if (vesi == 0 && !oranssi) GysLevy(r, x, z, s * 0.4f, s * 0.4f, 0.0038f, 6, GysSyva, 0f, 0, 0.5f);
            }
            // Blesin altaiden välinen uoma.
            var a = GysPienet[0]; var b = GysPienet[1];
            GysNauha(r, new[] { new Vector2(a.x - 0.018f, a.z + 0.017f), new Vector2(b.x + 0.012f, b.z - 0.012f) }, 0.007f, 0.0026f, GysMarka);
            if (lahi) GysLhPienet(r);
        }

        // ---- Köysi ----

        /// <summary>Köysi Strokkurin ympärillä: rungossa ohut seepiaviiva maassa (säde GysKoysiR); lähitasossa tolpat ja
        /// niiden välissä roikkuva köysi.</summary>
        static void GysKoysiRengas(Rakentaja r, bool lahi)
        {
            if (!lahi)
            {
                GysRengas(r, GysSx, GysSz, GysKoysiR - 0.0015f, GysKoysiR + 0.0015f, 0.0026f, 0.0026f, 18, GysKoysi);
                return;
            }
            GysLhKoysi(r);
        }

        // ---- Rakennukset ----

        /// <summary>Rakennusten suunta tien mukaan (rad) sekä Geysir-keskuksen ja Hótel Geysirin keskipisteet (pohja maan
        /// tasossa 0, jotta seinän juuri ei jää leijumaan maan kartion yllä) ja mitat (pituus, syvyys, seinä, harja).</summary>
        const float GysTalonSuunta = 0.742f;
        static readonly Vector3 GysKeskusP = new Vector3(0.270f, 0f, -0.284f), GysHotelliP = new Vector3(0.398f, 0f, -0.181f);
        const float GysKeskusL = 0.130f, GysKeskusS = 0.046f, GysKeskusH = 0.024f, GysKeskusHarja = 0.013f;
        const float GysHotelliL = 0.094f, GysHotelliS = 0.042f, GysHotelliH = 0.022f, GysHotelliHarja = 0.012f;

        /// <summary>Talon kanta: pituussuunta, kaakkoisjulkisivun normaali (kameraan päin) ja lounaispäädyn normaali.</summary>
        static (Vector3 ex, Vector3 kaakko, Vector3 lounas) GysTalonKanta()
        {
            var ex = new Vector3(Mathf.Cos(GysTalonSuunta), 0f, Mathf.Sin(GysTalonSuunta));
            return (ex, new Vector3(ex.z, 0f, -ex.x), -ex);
        }

        /// <summary>Ikkunoiden keskipisteet ja normaalit (samat rungossa, lähitasossa ja yövaloissa): kaakkoisjulkisivun rivi ja
        /// lounaispäädyn ikkuna. talo 0 = Geysir-keskus, 1 = hotelli.</summary>
        static int GysIkkunat(int talo, Vector3[] paikat, Vector3[] normaalit)
        {
            var (ex, kaakko, lounas) = GysTalonKanta();
            var p = talo == 0 ? GysKeskusP : GysHotelliP;
            float L = talo == 0 ? GysKeskusL : GysHotelliL, S = talo == 0 ? GysKeskusS : GysHotelliS, H = talo == 0 ? GysKeskusH : GysHotelliH;
            int n = 4, k = 0;
            for (int i = 0; i < n; i++)
            {
                float f = (i + 0.5f) / n - 0.5f;
                paikat[k] = p + ex * (f * L * 0.86f) + kaakko * (S * 0.5f) + Vector3.up * (H * 0.55f);
                normaalit[k++] = kaakko;
            }
            paikat[k] = p + lounas * (L * 0.5f) + Vector3.up * (H * 0.55f);
            normaalit[k++] = lounas;
            return k;
        }

        /// <summary>Ikkunan leveys: Geysir-keskuksen julkisivussa leveät lasiseinät (0,019), hotellissa 0,014, päätyikkuna 0,013.</summary>
        static float GysIkkunaL(int talo, int i, int n) => i == n - 1 ? 0.013f : talo == 0 ? 0.019f : 0.014f;

        /// <summary>Geysir-keskus ja Hótel Geysir tien toisella puolella (kumpikin oma ääriviivaosansa): paperinvaaleat seinät,
        /// hillityn punaruskea harjakatto ja kaakkoisjulkisivun ikkunarivi. Lähitasossa ikkunoiden kehykset, ovet, katos ja
        /// savupiiput.</summary>
        static void GysRakennukset(Rakentaja r, bool lahi)
        {
            r.Talo(GysKeskusP, GysTalonSuunta, GysKeskusL, GysKeskusS, GysKeskusH, GysKeskusHarja, GysSeina, GysKatto);
            r.Talo(GysHotelliP, GysTalonSuunta, GysHotelliL, GysHotelliS, GysHotelliH, GysHotelliHarja, GysSeina, GysKatto);
            var paikat = new Vector3[8]; var normaalit = new Vector3[8];
            for (int talo = 0; talo < 2; talo++)
            {
                int n = GysIkkunat(talo, paikat, normaalit);
                for (int i = 0; i < n; i++)
                    r.Laatta(paikat[i], normaalit[i], GysIkkunaL(talo, i, n), 0.012f, GysIkkuna);
            }
            if (lahi) GysLhRakennukset(r);
        }

        // ---- Liikkuvat osat ----

        /// <summary>Maan reunan kulmia (kartion viuhka).</summary>
        const int GysReunaKulmia = 28;

        /// <summary>Geotermisen kentän säde origosta 16 suunnassa (22,5°:n välein itään 0 alkaen, vastapäivään): kenttä kattaa
        /// Strokkurin köysirenkaan turisteineen, Blesin, Konungshverin, Suuren Geysirin kilven valumineen ja Litli Geysirin.</summary>
        static readonly float[] GysKenttaSade = { 0.40f, 0.39f, 0.40f, 0.37f, 0.33f, 0.31f, 0.245f, 0.215f, 0.225f, 0.255f, 0.325f, 0.29f, 0.262f, 0.25f, 0.28f, 0.33f };

        /// <summary>Geotermisen kentän reuna kulmassa a (rad): jaksollinen Catmull–Rom-käyrä säteistä ja pieni kohina.</summary>
        static float GysKenttaReuna(float a, int i)
        {
            int n = GysKenttaSade.Length;
            float u = Mathf.Repeat(a / (Mathf.PI * 2f) * n, n);
            int i1 = (int)u % n;
            float t = u - (float)Math.Floor(u);
            float p0 = GysKenttaSade[(i1 + n - 1) % n], p1 = GysKenttaSade[i1], p2 = GysKenttaSade[(i1 + 1) % n], p3 = GysKenttaSade[(i1 + 2) % n];
            float v = 0.5f * (2f * p1 + (-p0 + p2) * t + (2f * p0 - 5f * p1 + 4f * p2 - p3) * t * t + (-p0 + 3f * p1 - 3f * p2 + p3) * t * t * t);
            return v * (1f + 0.035f * GysKohina(i, 613));
        }

        /// <summary>
        /// Maa (osa ilman ääriviivaa, pivot origossa, ei liiku): oliivinen nummi loivana kartiona (keskellä GysMaaY, reunalla
        /// kartan taso, joten reuna liittyy karttaan ilman mitalin reunaa), vaalea geoterminen kenttä keskellä, kuumuuden
        /// värjäämät punaruskeat ja oranssit laikut (Strokkurin takana patsaan tausta 30°:ssa), tummempi varvikko nummen
        /// kulmissa, märät valumaviuhkat Strokkurilta ja Geysiriltä, polku Geysir-keskukselta Strokkurille ja Geysirille sekä tie 35.
        /// </summary>
        static Mesh GeysirMaa()
        {
            var r = new Rakentaja();
            int n = GysReunaKulmia;
            var keski = new Vector3(0f, GysMaaY, 0f);
            for (int i = 0; i < n; i++)
            {
                float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)), d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1));
                r.KolmioUlos(keski, d0 * GysReunaSade(a0), d1 * GysReunaSade(a1), Vector3.up, GysNummi);
            }
            // Varvikko nummen kulmissa (tummempi oliivi).
            GysLaikku(r, 0.345f, 0.285f, 0.105f, 0.060f, 0.0003f, 8, GysVarvikko, 0.2f, 31, 0.5f);
            GysLaikku(r, -0.345f, -0.270f, 0.100f, 0.055f, 0.0003f, 8, GysVarvikko, 0.2f, 37, 2.6f);
            // Geoterminen kenttä: viuhka origosta (kartion huipusta), reuna Catmull–Rom-käyrä.
            const int kk = 24;
            var kc = GysMaassa(0f, 0f, 0.0004f);
            for (int i = 0; i < kk; i++)
            {
                float a0 = i * Mathf.PI * 2f / kk, a1 = (i + 1) * Mathf.PI * 2f / kk;
                float s0 = GysKenttaReuna(a0, i), s1 = GysKenttaReuna(a1, (i + 1) % kk);
                r.KolmioUlos(kc, GysMaassa(Mathf.Cos(a0) * s0, Mathf.Sin(a0) * s0, 0.0004f), GysMaassa(Mathf.Cos(a1) * s1, Mathf.Sin(a1) * s1, 0.0004f),
                    Vector3.up, GysKentta);
            }
            // Kuumuuden värjäämät laikut kentällä.
            foreach (var (x, z, rx, rz, c, kierto) in GysLaikut)
                GysLaikku(r, x, z, rx, rz, 0.0008f, 9, c, 0.28f, (int)(x * 1000f + z * 3000f), kierto);
            // Märät valumaviuhkat: Strokkurilta kaakkoon ja Geysiriltä itään.
            GysNauha(r, GysUomaS, 0.030f, 0.0010f, GysMarka, 0.55f, 0.2f);
            GysNauha(r, GysUomaG, 0.026f, 0.0010f, GysMarka, 0.55f, 0.2f);
            // Polku ja tie.
            GysNauha(r, GysPolkuReitti, 0.015f, 0.0012f, GysPolku);
            GysNauha(r, GysPolkuGeysirille, 0.013f, 0.0012f, GysPolku);
            GysNauha(r, GysTieReitti, 0.030f, 0.0014f, GysTie);
            return r.Verkko("Geysir-maa");
        }

        /// <summary>Maan laikut kentällä: (x, z, säde x, säde z, väri, kierto). Punaruskea Strokkurin takana on patsaan tausta
        /// 30°:ssa.</summary>
        static readonly (float x, float z, float rx, float rz, Color c, float kierto)[] GysLaikut =
        {
            (-0.050f, 0.070f, 0.085f, 0.052f, GysPunainen, 0.25f),    // Strokkurin takana (patsaan tausta)
            (-0.150f, 0.210f, 0.046f, 0.078f, Color.Lerp(GysOranssi, GysKentta, 0.3f), 0.2f),   // Laugarfjallin juuri, Blesin ja Konungshverin takana
            (0.020f, 0.175f, 0.046f, 0.030f, GysPunainen, 2.0f),      // Geysirin kilven lounaispuolella
            (-0.185f, -0.232f, 0.048f, 0.034f, Color.Lerp(GysOranssi, GysKentta, 0.35f), 2.4f),   // Litli Geysirin ympäristö
        };

        /// <summary>Märät valumaviuhkat (leveä tyvi altaan kummun juurella, kapeneva kieli alarinteeseen).</summary>
        static readonly Vector2[] GysUomaS = { new Vector2(0.030f, -0.118f), new Vector2(0.080f, -0.138f), new Vector2(0.130f, -0.140f),
            new Vector2(0.180f, -0.156f) };
        static readonly Vector2[] GysUomaG = { new Vector2(0.300f, 0.118f), new Vector2(0.340f, 0.104f), new Vector2(0.378f, 0.098f),
            new Vector2(0.412f, 0.080f) };
        /// <summary>Polku Geysir-keskukselta tien yli köyden kaakkoispuolelle ja köyden itäpuolelta Geysirin kilvelle.</summary>
        static readonly Vector2[] GysPolkuReitti = { new Vector2(0.236f, -0.254f), new Vector2(0.186f, -0.226f), new Vector2(0.130f, -0.210f),
            new Vector2(0.078f, -0.194f), new Vector2(0.040f, -0.176f) };
        static readonly Vector2[] GysPolkuGeysirille = { new Vector2(0.084f, -0.052f), new Vector2(0.092f, -0.012f), new Vector2(0.078f, 0.028f),
            new Vector2(0.058f, 0.058f) };
        /// <summary>Tie 35 (Biskupstungnabraut): maan etureunasta koilliseen oikeaan reunaan (tien toisella puolella
        /// Geysir-keskus ja hotelli); päät maan reunan sisällä.</summary>
        static readonly Vector2[] GysTieReitti = { new Vector2(0.060f, -0.386f), new Vector2(0.140f, -0.315f), new Vector2(0.228f, -0.240f),
            new Vector2(0.316f, -0.162f), new Vector2(0.396f, -0.088f), new Vector2(0.454f, -0.032f) };

        // ---- Strokkurin purkaus ----

        static Vector3 GysPurkausPivot => new Vector3(GysSx, GysSy, GysSz);
        static Vector3 GysAllasPivot => new Vector3(GysSx, GysAllasPivotY, GysSz);
        static Vector3 GysHoyryPivot => new Vector3(GysSx, GysSy + GysHoyryY, GysSz);

        /// <summary>Strokkurin vesi (pivot altaan alla, GysAllasPivotY): levy vesirajassa säteellä GysSr (reuna altaan seinän
        /// sisällä), vaalea reunavyöhyke, turkoosi keskusta ja syvä kuilu. Skaala 0,72 laskee levyn pohjan tuntumaan niin, että
        /// reuna pysyy seinässä ja märkä seinä paljastuu (vesi valuu kuiluun). 42 kolmiota.</summary>
        static Mesh GeysirAllas()
        {
            var r = new Rakentaja();
            float y = GysSy - GysAllasPivotY;
            GysRengas(r, 0f, 0f, 0.030f, GysSr, y, y, 12, GysTurkoosiVaalea);
            GysLevy(r, 0f, 0f, 0.030f, 0.030f, y, 12, GysTurkoosi);
            GysLevy(r, 0f, 0f, 0.011f, 0.011f, y + 0.0002f, 6, GysSyva, 0f, 0, 0.3f);
            return r.Verkko("Geysir-allas");
        }

        /// <summary>Turkoosi vesikupu (pivot altaan keskellä vesirajassa): kupoli (säde 0,047, korkeus 0,040), tyvi syvän
        /// turkoosi ja laki vaalea kuin ohut vesikalvo. Ei ääriviivaa. 40 kolmiota.</summary>
        static Mesh GeysirKupu()
        {
            var r = new Rakentaja();
            var renkaat = new (float y, float cx, float cz, float rx, float rz, float kohina)[]
            {
                (-0.0006f, 0f, 0f, 0.047f, 0.047f, 0f),
                (0.0220f, 0f, 0f, 0.037f, 0.037f, 0f),
                (0.0355f, 0f, 0f, 0.019f, 0.019f, 0f),
            };
            GysKumpu(r, renkaat, 8, 0, (j, a) => j == 0 ? GysKupuAla : j == 1 ? GysKupuYla : GysKupuHuippu, 0.040f, 0.2f);
            return r.Verkko("Geysir-kupu");
        }

        /// <summary>Strokkurin vesipatsaan möykyt (korkeus, säde, ylös, alas, sivusiirto x, z, sivuja): leveä puhjennut tyvi,
        /// vuorotellen sivuun siirtyvät ja ylöspäin levenevät vaahtomöykyt (suihku levenee kuin soihtu) ja kruunu. Möykyn yläpuolisko on korkea ja valoon päin, alapuolisko
        /// matala (lähes vaaka, joten 30°:n kamera ei näe sitä), joten patsas luetaan valkoisena myös kameran puolelta eikä
        /// helminauhana. Korkeus 0,40 skaalalla 1.</summary>
        static readonly (float y, float sade, float yla, float ala, float dx, float dz, int sivuja)[] GysPatsasMoykyt =
        {
            (0.018f, 0.034f, 0.022f, 0.008f, 0f, 0f, 6),
            (0.072f, 0.024f, 0.046f, 0.014f, 0.004f, 0f, 5),
            (0.134f, 0.026f, 0.046f, 0.014f, -0.004f, 0.002f, 5),
            (0.196f, 0.029f, 0.046f, 0.015f, 0.004f, -0.003f, 6),
            (0.256f, 0.033f, 0.044f, 0.016f, -0.003f, 0.003f, 6),
            (0.314f, 0.040f, 0.042f, 0.018f, 0.003f, -0.002f, 6),
            (0.362f, 0.030f, 0.034f, 0.014f, -0.002f, 0.001f, 6),
        };

        /// <summary>
        /// Strokkurin vesipatsas (pivot altaan keskellä vesirajassa, korkeus 0,40 skaalalla 1): kapea varsi (kuusikulmainen
        /// vaippa) ja sen ympärillä vaahtomöykkyjen pino (tyvi turkoosiin taittuva, muut vaahdonvalkoisia, alapinnat hieman
        /// seepiaan), kruunusta putoava suihku (kuusi kapeaa kaksipuolista kieltä) ja tyven roiskekielet. Ei ääriviivaa (osa).
        /// </summary>
        static Mesh GeysirPatsas() => GysPatsas(GysPatsasMoykyt, 6, 4, 0.40f, 0.019f, 0.011f, "Geysir-patsas");

        /// <summary>Patsas: varsi (säde tyvellä), möykyt, kruunusta putoava suihku (kielia kappaletta) ja tyven roiskekielet
        /// (tyvikielia).</summary>
        static Mesh GysPatsas((float y, float sade, float yla, float ala, float dx, float dz, int sivuja)[] moykyt, int kielia, int tyvikielia,
            float korkeus, float varsi, float kieli, string nimi)
        {
            var r = new Rakentaja();
            var alaVari = Color.Lerp(GysVaahto, EmSeepia, 0.2f);
            // Varsi täyttää möykkyjen välit (ei helminauhaa).
            var kruunu = moykyt[moykyt.Length - 2];
            r.Vaippa(Vector3.zero, varsi, varsi * 0.8f, kruunu.y, 6, GysVaahto, 0.3f);
            for (int i = 0; i < moykyt.Length; i++)
            {
                var m = moykyt[i];
                var yla = i == 0 ? GysVaahtoTyvi : GysVaahto;
                // Kärki vinossa (vuorotellen eri suuntiin), joten möykyt eivät pinoudu säännölliseksi pagodaksi.
                float kv = i == 0 ? 0f : m.sade * 0.28f, ka = 1.3f + i * 2.1f;
                GysMoykky(r, new Vector3(m.dx, m.y, m.dz), m.sade, m.yla, m.ala, m.sivuja, yla,
                    i == 0 ? Color.Lerp(GysVaahtoTyvi, EmSeepia, 0.18f) : alaVari, i * 0.55f, Mathf.Cos(ka) * kv, Mathf.Sin(ka) * kv);
            }
            // Putoava suihku: kruunun reunalta alas ja ulos lyhyet leveät terälehdet, jotka koskettavat toisiaan (vaahtohelma,
            // ei piikkejä).
            float lev = kielia > 0 ? kruunu.sade * Mathf.Sin(Mathf.PI / kielia) * 1.05f : 0f;
            for (int i = 0; i < kielia; i++)
            {
                float a = 0.3f + i * Mathf.PI * 2f / kielia;
                var d = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                var t = new Vector3(-d.z, 0f, d.x);
                Vector3 yla = new Vector3(kruunu.dx, kruunu.y + kruunu.yla * 0.15f, kruunu.dz) + d * (kruunu.sade * 0.92f);
                Vector3 ala = new Vector3(kruunu.dx, kruunu.y - korkeus * (0.10f + 0.04f * (i % 2)), kruunu.dz) + d * (kruunu.sade * 1.6f);
                r.KalvoKolmio(yla - t * lev, yla + t * lev, ala, GysVaahto);
            }
            // Tyven roiskekielet.
            var ty = moykyt[0];
            for (int i = 0; i < tyvikielia; i++)
            {
                float a = 0.7f + i * Mathf.PI * 2f / tyvikielia;
                var d = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                var t = new Vector3(-d.z, 0f, d.x);
                Vector3 j0 = d * (ty.sade * 0.7f), j1 = d * (ty.sade * 1.35f) + Vector3.up * (ty.y * 1.5f + ty.y * 0.5f * (i % 2));
                r.KalvoKolmio(j0 - t * kieli, j0 + t * kieli, j1, GysVaahtoTyvi);
            }
            return r.Verkko(nimi);
        }

        /// <summary>Vaahtorengas (pivot altaan keskellä vesirajassa): leviävä vaahto altaalla patsaan pudotessa ja viisi
        /// matalaa roiskekieltä. Ei ääriviivaa. 26 kolmiota.</summary>
        static Mesh GeysirRoiske()
        {
            var r = new Rakentaja();
            GysRengas(r, 0f, 0f, 0.026f, 0.049f, 0.0006f, 0.0004f, 8, GysVaahto, 0.2f);
            for (int i = 0; i < 5; i++)
            {
                float a = 0.5f + i * Mathf.PI * 2f / 5f;
                var d = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                var t = new Vector3(-d.z, 0f, d.x);
                r.KalvoKolmio(d * 0.034f - t * 0.005f + Vector3.up * 0.0006f, d * 0.034f + t * 0.005f + Vector3.up * 0.0006f,
                    d * 0.05f + Vector3.up * (0.016f + 0.006f * (i % 2)), GysVaahto);
            }
            return r.Verkko("Geysir-roiske");
        }

        /// <summary>Höyrymöykkyjen koot (säde): Strokkur 0–4 ja Suuri Geysir 0–2.</summary>
        static readonly float[] GysHoyrySade = { 0.050f, 0.044f, 0.056f, 0.046f, 0.052f }, GysSuuriHoyrySade = { 0.066f, 0.072f, 0.062f };

        /// <summary>Höyrymöykky (pivot möykyn keskellä; liikeydin siirtää sitä tuulen alle): kahdeksankulmainen kaksoispyramidi,
        /// yläpinta vaalea ja alapinta seepiaan (kuten Kronborgin tykinsavu). Ei ääriviivaa. 16 kolmiota.</summary>
        static Mesh GysHoyryVerkko(float sade, int i, string nimi)
        {
            var r = new Rakentaja();
            GysMoykky(r, Vector3.zero, sade, sade * 0.85f, sade * 0.55f, 8, GysHoyry, Color.Lerp(GysHoyry, EmSeepia, 0.4f), i * 0.37f);
            return r.Verkko(nimi);
        }

        static Mesh GeysirHoyry0() => GysHoyryVerkko(GysHoyrySade[0], 0, "Geysir-hoyry0");
        static Mesh GeysirHoyry1() => GysHoyryVerkko(GysHoyrySade[1], 1, "Geysir-hoyry1");
        static Mesh GeysirHoyry2() => GysHoyryVerkko(GysHoyrySade[2], 2, "Geysir-hoyry2");
        static Mesh GeysirHoyry3() => GysHoyryVerkko(GysHoyrySade[3], 3, "Geysir-hoyry3");
        static Mesh GeysirHoyry4() => GysHoyryVerkko(GysHoyrySade[4], 4, "Geysir-hoyry4");
        static Mesh GeysirSuuriHoyry0() => GysHoyryVerkko(GysSuuriHoyrySade[0], 5, "Geysir-suurihoyry0");
        static Mesh GeysirSuuriHoyry1() => GysHoyryVerkko(GysSuuriHoyrySade[1], 6, "Geysir-suurihoyry1");
        static Mesh GeysirSuuriHoyry2() => GysHoyryVerkko(GysSuuriHoyrySade[2], 7, "Geysir-suurihoyry2");

        // ---- Suuri Geysir ----

        static Vector3 GysGeysirPivot => new Vector3(GysGx, GysGy, GysGz);
        static Vector3 GysSuuriHoyryPivot => new Vector3(GysGx, GysGy + GysSuuriHoyryY, GysGz);

        /// <summary>Kuohu (pivot Geysirin altaan keskellä vesirajassa): kuohuva vesikumpu (säde 0,05), vaahtorengas altaan
        /// reunalle ja neljä roiskekieltä. Ei ääriviivaa. 48 kolmiota.</summary>
        static Mesh GeysirKuohu()
        {
            var r = new Rakentaja();
            var renkaat = new (float y, float cx, float cz, float rx, float rz, float kohina)[]
            {
                (0.0002f, 0f, 0f, 0.050f, 0.050f, 0.05f),
                (0.0120f, 0f, 0f, 0.030f, 0.030f, 0.08f),
            };
            GysKumpu(r, renkaat, 8, 5, (j, a) => j == 0 ? GysVaahtoTyvi : GysVaahto, 0.019f, 0.3f);
            GysRengas(r, 0f, 0f, 0.048f, 0.069f, 0.0004f, 0.0003f, 8, GysVaahto, 0.1f);
            for (int i = 0; i < 4; i++)
            {
                float a = 0.8f + i * Mathf.PI * 0.5f;
                var d = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                var t = new Vector3(-d.z, 0f, d.x);
                r.KalvoKolmio(d * 0.04f - t * 0.006f, d * 0.04f + t * 0.006f, d * 0.058f + Vector3.up * (0.022f + 0.006f * (i % 2)), GysVaahto);
            }
            return r.Verkko("Geysir-kuohu");
        }

        /// <summary>Suuren Geysirin patsaan möykyt: leveämpi ja korkeampi pino (0,80 skaalalla 1), sivuun vuorotellen siirtyvät
        /// möykyt ja kaksiosainen kukkakaalimainen kruunu. Alapuolisko on loiva kartio (ei vaakasuoria kerroksia, jotka
        /// näyttäisivät kuuselta), ja kruunusta ei ole putoavia kieliä.</summary>
        static readonly (float y, float sade, float yla, float ala, float dx, float dz, int sivuja)[] GysSuuriMoykyt =
        {
            (0.030f, 0.058f, 0.036f, 0.014f, 0f, 0f, 6),
            (0.110f, 0.042f, 0.070f, 0.028f, 0.008f, -0.003f, 6),
            (0.195f, 0.044f, 0.070f, 0.028f, -0.008f, 0.004f, 6),
            (0.280f, 0.043f, 0.070f, 0.028f, 0.006f, -0.006f, 6),
            (0.365f, 0.047f, 0.070f, 0.028f, -0.007f, 0.005f, 6),
            (0.450f, 0.050f, 0.068f, 0.030f, 0.008f, -0.004f, 6),
            (0.535f, 0.055f, 0.066f, 0.030f, -0.006f, 0.006f, 6),
            (0.615f, 0.062f, 0.062f, 0.032f, 0.007f, -0.005f, 6),
            (0.690f, 0.066f, 0.056f, 0.032f, -0.010f, 0.004f, 6),
            (0.750f, 0.048f, 0.050f, 0.026f, 0.012f, -0.004f, 6),
        };

        /// <summary>Suuren Geysirin patsas (pivot altaan keskellä vesirajassa, korkeus 0,80): varsi, leveämpi möykkypino,
        /// kukkakaalimainen kruunu ja tyven roiskekielet. Ei ääriviivaa.</summary>
        static Mesh GeysirSuuri() => GysPatsas(GysSuuriMoykyt, 0, 6, 0.80f, 0.030f, 0.016f, "Geysir-suuri");

        // ---- Turistit ----

        /// <summary>Turistin i pivot jaloissa köyden takana (maan pinnalla).</summary>
        static Vector3 GysTuristiPivot(int i)
        {
            float a = GysTuristiKulma[i] * Mathf.PI / 180f;
            float x = GysSx + Mathf.Cos(a) * GysTuristiSade[i], z = GysSz + Mathf.Sin(a) * GysTuristiSade[i];
            return new Vector3(x, GysMaaKorkeus(x, z), z);
        }

        /// <summary>
        /// Turisti i (pivot jaloissa, levossa katse Strokkuriin): nelisivuinen levenevä vartalo (takki, korkeus 0,032, hartiat
        /// 0,016), pää tai pipo ja osalla (1, 4 ja 7) puhelin koholla altaaseen päin. Yhteensä noin 0,045 korkea (noin
        /// kymmenkertainen, jotta turistien kaari näkyy 40 pt:ssä tummina pisteinä). 18–20 kolmiota.
        /// </summary>
        static Mesh GysTuristi(int i)
        {
            var r = new Rakentaja();
            float a = GysTuristiKulma[i] * Mathf.PI / 180f;
            var f = new Vector3(-Mathf.Cos(a), 0f, -Mathf.Sin(a));   // katse altaaseen
            var s = new Vector3(-f.z, 0f, f.x);                        // sivu
            var takki = GysTakit[i % GysTakit.Length];
            float h = 0.032f;
            Vector3 P(float sx, float fz, float y) => s * sx + f * fz + Vector3.up * y;
            var ala = new[] { P(-0.0058f, -0.0040f, 0f), P(0.0058f, -0.0040f, 0f), P(0.0058f, 0.0040f, 0f), P(-0.0058f, 0.0040f, 0f) };
            var yla = new[] { P(-0.0080f, -0.0042f, h), P(0.0080f, -0.0042f, h), P(0.0080f, 0.0042f, h), P(-0.0080f, 0.0042f, h) };
            var kk = Vector3.up * (h * 0.5f);
            for (int j = 0; j < 4; j++)
                r.NelioKeskelta(ala[j], ala[(j + 1) % 4], yla[(j + 1) % 4], yla[j], kk, takki);
            r.NelioUlos(yla[0], yla[1], yla[2], yla[3], Vector3.up, takki);
            r.Timantti(Vector3.up * (h + 0.0056f), 0.0052f, 0.0060f, GysPaat[i % GysPaat.Length], 4);
            if (i % 3 == 1)
            {
                // Puhelin koholla altaaseen päin: kapea tumma käsi olalta eteen ja ylös.
                Vector3 o = P(0.0064f, 0.001f, h - 0.002f), k0 = P(0.0070f, 0.013f, h + 0.011f);
                r.KalvoKolmio(o, o + Vector3.up * 0.0035f, k0, GysTakit[0]);
            }
            return r.Verkko("Geysir-turisti" + i);
        }

        static Mesh GeysirTuristi0() => GysTuristi(0);
        static Mesh GeysirTuristi1() => GysTuristi(1);
        static Mesh GeysirTuristi2() => GysTuristi(2);
        static Mesh GeysirTuristi3() => GysTuristi(3);
        static Mesh GeysirTuristi4() => GysTuristi(4);
        static Mesh GeysirTuristi5() => GysTuristi(5);
        static Mesh GeysirTuristi6() => GysTuristi(6);
        static Mesh GeysirTuristi7() => GysTuristi(7);
        static Mesh GeysirTuristi8() => GysTuristi(8);

        // ---- Yövalot ----

        /// <summary>Yövalojen pivot talon kaakkoisjulkisivun juuressa keskellä (hehku ei leijaile).</summary>
        static Vector3 GysValoPivot(int talo)
        {
            var (_, kaakko, _) = GysTalonKanta();
            var p = talo == 0 ? GysKeskusP : GysHotelliP;
            return p + kaakko * ((talo == 0 ? GysKeskusS : GysHotelliS) * 0.5f);
        }

        /// <summary>Talon ikkunoiden yöhehku (pivot julkisivun juuressa): lämmin laatta jokaisen ikkunan edessä (samat paikat
        /// kuin rungossa ja lähitasossa). Valaisematon, ei bloomia.</summary>
        static Mesh GysValot(int talo)
        {
            var r = new Rakentaja();
            var o = GysValoPivot(talo);
            var paikat = new Vector3[8]; var normaalit = new Vector3[8];
            int n = GysIkkunat(talo, paikat, normaalit);
            for (int i = 0; i < n; i++)
                r.Laatta(paikat[i] + normaalit[i] * 0.0008f - o, normaalit[i], GysIkkunaL(talo, i, n) + 0.0015f, 0.0135f, EmIkkunavalo);
            return r.Verkko(talo == 0 ? "Geysir-valot" : "Geysir-valot1");
        }

        static Mesh GeysirValot() => GysValot(0);
        static Mesh GeysirValot1() => GysValot(1);

        static LiikkuvaOsaMaaritys[] GeysirOsat()
        {
            Func<Mesh>[] hoyryt = { GeysirHoyry0, GeysirHoyry1, GeysirHoyry2, GeysirHoyry3, GeysirHoyry4 };
            Func<Mesh>[] suuret = { GeysirSuuriHoyry0, GeysirSuuriHoyry1, GeysirSuuriHoyry2 };
            Func<Mesh>[] turistit = { GeysirTuristi0, GeysirTuristi1, GeysirTuristi2, GeysirTuristi3, GeysirTuristi4, GeysirTuristi5,
                GeysirTuristi6, GeysirTuristi7, GeysirTuristi8 };
            var osat = new LiikkuvaOsaMaaritys[5 + hoyryt.Length + 2 + suuret.Length + turistit.Length + 2];
            int k = 0;
            var sp = GysPurkausPivot;
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "maa", Verkko = GeysirMaa, Pivot = Vector3.zero, Liike = Liike.Liuku, Laajuus = 0f };
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "allas", Verkko = GeysirAllas, Pivot = GysAllasPivot, Liike = Liike.Nousu };
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "kupu", Verkko = GeysirKupu, Pivot = sp, Liike = Liike.Valahdys };
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "patsas", Verkko = GeysirPatsas, Pivot = sp, Liike = Liike.Nousu, Akseli = Vector3.up,
                KayS = 9f, TaukoS = 32f };
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "roiske", Verkko = GeysirRoiske, Pivot = sp, Liike = Liike.Valahdys };
            for (int i = 0; i < hoyryt.Length; i++)
                osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "hoyry" + i, Verkko = hoyryt[i], Pivot = GysHoyryPivot, Liike = Liike.Liuku };
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "kuohu", Verkko = GeysirKuohu, Pivot = GysGeysirPivot, Liike = Liike.Valahdys };
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "suuri", Verkko = GeysirSuuri, Pivot = GysGeysirPivot, Liike = Liike.Nousu, Akseli = Vector3.up };
            for (int i = 0; i < suuret.Length; i++)
                osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "suurihoyry" + i, Verkko = suuret[i], Pivot = GysSuuriHoyryPivot, Liike = Liike.Liuku };
            for (int i = 0; i < turistit.Length; i++)
                osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "turisti" + i, Verkko = turistit[i], Pivot = GysTuristiPivot(i), Liike = Liike.Liuku,
                    Laajuus = 0.016f };
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = GeysirValot, Pivot = GysValoPivot(0), Liike = Liike.Valahdys };
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "valot1", Verkko = GeysirValot1, Pivot = GysValoPivot(1), Liike = Liike.Valahdys };
            return osat;
        }

        static readonly bool geysir = Rekisteroi("geysir",
            new Erikoismalli { Runko = GeysirRunko, Osat = GeysirOsat, Lahi = GeysirLahi, Kolmiot0 = 1428, KokoKerroin = 1.5f });

        // ---- LÄHITASO ----

        /// <summary>
        /// LÄHITASO (Erikoismalli.Lahi, katto 3 000): sama siluetti, mittasuhteet, värit, ääriviivaosat ja pivotit kuin rungossa
        /// (kummut 21 kulmalla, kohina kulman mukaan jatkuva, joten siluetti kulkee rungon kärkien kautta). Lisäkolmiot
        /// kaiverrustyyliseen lähikuvaan: sintterikumpujen valkoiset piireunukset, terassireunat, halkeamat ja valumauomat,
        /// Laugarfjallin kallioreunat, lohkareet, punaisen rinteen uomat ja matalat koivupensaat, köyden tolpat ja roikkuva
        /// köysi, Blesin laituri, Konungshverin kaide ja Litli Geysirin mutakuplat, rakennusten ikkunapuitteet, ovet, katokset
        /// ja savupiiput sekä maan pinnalla tien keskiviiva, polun reunakivet, penkit, opastetaulut, Strokkurin nimikivi,
        /// pensaat ja kaksi pientä höyryävää lähdettä. Liikkuvat osat (maa, allas, patsas, turistit, valot) sopivat
        /// sellaisinaan: altaat, köysi ja ikkunat ovat samoilla paikoilla.
        /// </summary>
        static Mesh GeysirLahi()
        {
            var r = new Rakentaja();
            GysLaugarfjall(r, true);
            GysStrokkur(r, true);
            GysGeysir(r, true);
            GysPienetAltaat(r, true);
            GysKoysiRengas(r, true);
            GysRakennukset(r, true);
            GysLhMaa(r);
            return r.Verkko("Geysir-lahi");
        }

        /// <summary>Lähitason värit: kirkas piireunus, halkeama, tumma punainen uoma, puu (laiturit, penkit), kivi, pensas
        /// ja tien keskiviiva.</summary>
        static readonly Color GysLhHalkeama = Hex(0x9aa39a), GysLhUoma = Hex(0x8f5541), GysLhPuu = Hex(0x7a5c3e), GysLhKivi = Hex(0xa8a08c),
            GysLhPensas = Hex(0x74794f), GysLhPensas2 = Hex(0x858a5c), GysLhViiva = Hex(0xd9ceb0), GysLhTaulu = Hex(0x5b4a37);

        /// <summary>Nelikulmio ylöspäin (maan tai kummun pinnalle).</summary>
        static void GysLhPinta(Rakentaja r, Vector3 a, Vector3 b, Vector3 c, Vector3 d, Color vari) => r.NelioUlos(a, b, c, d, Vector3.up, vari);

        /// <summary>Nauha kahden pisteen välillä (köysi, uoma, viiva): leveys vaakasuunnassa, pinta ylöspäin.</summary>
        static void GysLhNauha3(Rakentaja r, Vector3 a, Vector3 b, float leveys, Color vari)
        {
            var t = b - a; t.y = 0f;
            var n = Vector3.Cross(Vector3.up, t).normalized * (leveys * 0.5f);
            r.NelioUlos(a - n, b - n, b + n, a + n, Vector3.up, vari);
        }

        /// <summary>Kolmisivuinen tolppa (köyden ja kaiteen tolppa, taulun jalka): vain sivut, 6 kolmiota.</summary>
        static void GysLhTolppa(Rakentaja r, Vector3 p, float h, float sade, Color vari)
        {
            var k = p + Vector3.up * (h * 0.5f);
            for (int i = 0; i < 3; i++)
            {
                float a0 = 0.5f + i * Mathf.PI * 2f / 3f, a1 = 0.5f + (i + 1) * Mathf.PI * 2f / 3f;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * sade, d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * sade;
                r.NelioKeskelta(p + d0, p + d1, p + d1 + Vector3.up * h, p + d0 + Vector3.up * h, k, vari);
            }
        }

        /// <summary>Kivi tai pensas: n-sivuinen pyramidi (vain sivut, pohja maassa), kärki hieman sivussa.</summary>
        static void GysLhPyramidi(Rakentaja r, Vector3 p, float sade, float h, int sivuja, float kierto, Color vari)
        {
            var karki = p + new Vector3(Mathf.Cos(kierto * 3f) * sade * 0.2f, h, Mathf.Sin(kierto * 3f) * sade * 0.2f);
            var k = p + Vector3.up * (h * 0.3f);
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = kierto + i * Mathf.PI * 2f / sivuja, a1 = kierto + (i + 1) * Mathf.PI * 2f / sivuja;
                r.KolmioKeskelta(p + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * sade, p + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * sade,
                    karki, k, vari);
            }
        }

        /// <summary>Suunnattu laatikko (penkki, laituri, kallioreuna, savupiippu, katos): keskipohja p, suunta (rad), pituus,
        /// syvyys ja korkeus; sivut ja katto (10 kolmiota).</summary>
        static void GysLhLaatikko(Rakentaja r, Vector3 p, float suunta, float pituus, float syvyys, float h, Color sivu, Color katto)
        {
            var ex = new Vector3(Mathf.Cos(suunta), 0f, Mathf.Sin(suunta)) * (pituus * 0.5f);
            var ez = new Vector3(-Mathf.Sin(suunta), 0f, Mathf.Cos(suunta)) * (syvyys * 0.5f);
            Vector3 up = Vector3.up * h, k = p + up * 0.5f;
            Vector3 A = p - ex - ez, B = p + ex - ez, C = p + ex + ez, D = p - ex + ez;
            r.NelioKeskelta(A, B, B + up, A + up, k, sivu);
            r.NelioKeskelta(B, C, C + up, B + up, k, sivu);
            r.NelioKeskelta(C, D, D + up, C + up, k, sivu);
            r.NelioKeskelta(D, A, A + up, D + up, k, sivu);
            r.NelioUlos(A + up, B + up, C + up, D + up, Vector3.up, katto);
        }

        // ---- Lähitaso: sintterikummut ----

        /// <summary>Strokkurin terassireunat (kaista, osuus, kulmaindeksit u0…u1 lähitason 21 kulman jaolla): alarinteen
        /// kaaret etelässä ja kaakossa (valumisen suunta) sekä lyhyet kaaret lännessä ja koillisessa.</summary>
        static readonly (int j, float f, float u0, float u1)[] GysLhStrokkurTerassit =
        {
            (0, 0.35f, 14.0f, 20.0f), (0, 0.70f, 15.0f, 19.5f), (0, 0.55f, 6.0f, 9.0f), (1, 0.35f, 1.0f, 4.0f),
        };

        /// <summary>Suuren Geysirin kilven terassireunat: laaja kilpi porrastuu joka suuntaan, eniten itään ja etelään.</summary>
        static readonly (int j, float f, float u0, float u1)[] GysLhGeysirTerassit =
        {
            (0, 0.30f, 15.0f, 20.5f), (0, 0.60f, 0.5f, 4.5f), (0, 0.65f, 8.0f, 11.0f), (0, 0.40f, 11.5f, 14.5f), (1, 0.40f, 16.0f, 19.0f),
        };

        /// <summary>
        /// Sintterikummun lähitaso (kutsutaan kummun ääriviivaosan sisällä; kaikki kummun rajojen sisällä): valkoinen piireunus
        /// allasreunan päällä (kaista 1 osuudesta piiF lakeen, hieman koholla), terassireunat vaaleina kynnyksinä, kolme
        /// tummaa halkeamaa ja kolme märkää valumauomaa alarinteeseen (Geysirin kilvellä itään, tien suuntaan).
        /// </summary>
        static void GysLhSintteri(Rakentaja r, (float y, float cx, float cz, float rx, float rz, float kohina)[] renkaat, int k, int siemen,
            float kierto, (int j, float f, float u0, float u1)[] terassit, float piiF)
        {
            Vector3 P(int j, float f, float u, float nosto) => GysKumpuPinta(renkaat, j, f, u, k, siemen, kierto, GysPerus, nosto);
            // Piireunus.
            for (int i = 0; i < k; i++)
                GysLhPinta(r, P(1, piiF, i, 0.0005f), P(1, piiF, i + 1, 0.0005f), P(1, 1f, i + 1, 0.0009f), P(1, 1f, i, 0.0009f), GysPiiReuna);
            // Terassireunat: kapea vaalea kynnys, alareuna koholla (kaiverruksen vaakaviiva).
            foreach (var (j, f, u0, u1) in terassit)
            {
                int n = Mathf.Max(1, (int)Math.Ceiling(u1 - u0));
                for (int i = 0; i < n; i++)
                {
                    float a = u0 + (u1 - u0) * i / n, b = u0 + (u1 - u0) * (i + 1) / n;
                    GysLhPinta(r, P(j, f, a, 0.0011f), P(j, f, b, 0.0011f), P(j, f + 0.09f, b, 0.0005f), P(j, f + 0.09f, a, 0.0005f),
                        j == 0 ? GysPii : GysPiiReuna);
                }
            }
            // Halkeamat (säteittäiset tummat viivat) ja märät uomat alarinteeseen.
            bool onGeysir = siemen == 307;
            float[] halkeamat = onGeysir ? new[] { 6.5f, 10.2f, 13.4f } : new[] { 3.0f, 8.2f, 12.5f };
            foreach (float u in halkeamat)
                GysLhPinta(r, P(1, 0.12f, u - 0.07f, 0.0007f), P(1, 0.12f, u + 0.07f, 0.0007f), P(1, 0.55f, u + 0.05f, 0.0007f), P(1, 0.55f, u - 0.05f, 0.0007f),
                    GysLhHalkeama);
            float[] uomat = onGeysir ? new[] { 20.1f, 18.8f, 1.2f } : new[] { 18.6f, 16.6f, 20.2f };
            foreach (float u in uomat)
            {
                GysLhPinta(r, P(1, 0.25f, u - 0.08f, 0.0008f), P(1, 0.25f, u + 0.08f, 0.0008f), P(0, 1f, u + 0.12f, 0.0008f), P(0, 1f, u - 0.12f, 0.0008f), GysMarka);
                GysLhPinta(r, P(0, 1f, u - 0.12f, 0.0008f), P(0, 1f, u + 0.12f, 0.0008f), P(0, 0.2f, u + 0.18f, 0.0008f), P(0, 0.2f, u - 0.18f, 0.0008f), GysMarka);
            }
        }

        // ---- Lähitaso: Laugarfjall ----

        /// <summary>Laugarfjallin lähitaso kuvun ääriviivaosan sisällä: harmaat kallioreunat ylärinteellä (lännessä ja
        /// pohjoisessa, yksi vaalea ryoliittireuna kentän puolella), lohkareet kentän puoleisella juurella ja tummat punaiset
        /// uomat kuumuuden värjäämällä alarinteellä.</summary>
        static void GysLhLaugarfjall(Rakentaja r, int k)
        {
            Vector3 P(int j, float f, float u, float nosto) => GysKumpuPinta(GysKupuRenkaat, j, f, u, k, 407, GysFjallKierto, GysPerus, nosto);
            // Kallioreunat: suunnattu matala laatikko rinteen suuntaisesti (puoliksi rinteen sisällä).
            var reunat = new (int j, float f, float u, float pituus, bool vaalea)[]
            {
                (1, 0.55f, 6.2f, 0.022f, false), (2, 0.35f, 9.0f, 0.020f, false), (1, 0.6f, 11.8f, 0.020f, false), (2, 0.4f, 16.6f, 0.018f, true),
            };
            foreach (var (j, f, u, pituus, vaalea) in reunat)
            {
                // Puoliksi rinteeseen upotettu matala reuna: siluetti ei muutu, mutta rinne porrastuu lähikuvassa.
                var p = P(j, f, u, -0.0028f);
                var q = P(j, f, u + 0.5f, 0f) - P(j, f, u - 0.5f, 0f);
                float suunta = (float)Math.Atan2(q.z, q.x);
                var sivu = vaalea ? GysRyoliitti : Color.Lerp(GysKallio, GysRinne, 0.3f);
                GysLhLaatikko(r, p, suunta, pituus, 0.009f, 0.0048f, sivu, Color.Lerp(sivu, GysPii, 0.18f));
            }
            // Lohkareet kentän puoleisella juurella.
            float[] lohkareet = { 15.8f, 17.2f, 19.0f, 20.3f, 1.4f };
            for (int i = 0; i < lohkareet.Length; i++)
                GysLhPyramidi(r, P(0, 0.12f + 0.08f * (i % 2), lohkareet[i], -0.0005f), 0.0045f + 0.0012f * (i % 3), 0.0055f, 4, i * 0.9f,
                    i % 2 == 0 ? GysLhKivi : GysKallio);
            // Punaisen rinteen uomat: kapeneva tumma juova kaistalta 2 juurelle.
            float[] uomat = { 16.8f, 18.6f, 20.2f };
            var uoma = Color.Lerp(GysPunainen, GysLhUoma, 0.6f);
            foreach (float u in uomat)
            {
                GysLhPinta(r, P(1, 0.25f, u - 0.04f, 0.0008f), P(1, 0.25f, u + 0.04f, 0.0008f), P(1, 0.85f, u + 0.07f, 0.0008f), P(1, 0.85f, u - 0.07f, 0.0008f), uoma);
                GysLhPinta(r, P(1, 0.85f, u - 0.07f, 0.0008f), P(1, 0.85f, u + 0.07f, 0.0008f), P(0, 0.35f, u + 0.09f, 0.0008f), P(0, 0.35f, u - 0.09f, 0.0008f), uoma);
            }
        }

        /// <summary>Matalat koivupensaat Laugarfjallin varjoisalla alarinteellä (lännessä ja pohjoisessa; ääriviivaosan
        /// ulkopuolella, pienet osat eivät saa ääriviivaa).</summary>
        static void GysLhPensaat(Rakentaja r, int k)
        {
            float[] u = { 5.5f, 7.0f, 9.0f, 11.5f, 13.5f };
            for (int i = 0; i < u.Length; i++)
            {
                var p = GysKumpuPinta(GysKupuRenkaat, 0, 0.45f + 0.15f * (i % 2), u[i], k, 407, GysFjallKierto, GysPerus, -0.001f);
                GysLhPyramidi(r, p, 0.0095f + 0.002f * (i % 3), 0.0095f, 5, i * 1.3f, i % 2 == 0 ? GysLhPensas : GysLhPensas2);
            }
        }

        // ---- Lähitaso: pienet altaat, köysi ja rakennukset ----

        /// <summary>Blesin puinen katselulaituri kaiteineen etelärannalla, Konungshverin kaide eteläpuolella ja Litli Geysirin
        /// kaksi mutakuplaa.</summary>
        static void GysLhPienet(Rakentaja r)
        {
            var b = GysPienet[0];
            float bz = b.z - b.sade - 0.015f;
            GysLhLaatikko(r, new Vector3(b.x, 0.0008f, bz), 0f, 0.034f, 0.011f, 0.0032f, GysLhPuu, Color.Lerp(GysLhPuu, GysPii, 0.25f));
            for (int i = 0; i < 3; i++)
                GysLhTolppa(r, new Vector3(b.x - 0.015f + 0.015f * i, 0.0035f, bz + 0.0045f), 0.0065f, 0.0011f, GysLhPuu);
            GysLhLaatikko(r, new Vector3(b.x, 0.0092f, bz + 0.0045f), 0f, 0.033f, 0.0016f, 0.0014f, GysLhPuu, GysLhPuu);
            // Konungshverin kaide: neljä tolppaa ja kolme johdetta etelässä.
            var kh = GysPienet[2];
            Vector3 KP(float asteet, float y) { float a = asteet * Mathf.PI / 180f; return new Vector3(kh.x + Mathf.Cos(a) * 0.037f, y, kh.z + Mathf.Sin(a) * 0.037f); }
            float[] kulmat = { 205f, 240f, 275f, 310f };
            for (int i = 0; i < kulmat.Length; i++)
            {
                var p = KP(kulmat[i], 0f);
                GysLhTolppa(r, new Vector3(p.x, GysMaaKorkeus(p.x, p.z) - 0.0003f, p.z), 0.0095f, 0.0011f, GysLhPuu);
                if (i + 1 < kulmat.Length)
                {
                    Vector3 a0 = KP(kulmat[i], 0.0085f), a1 = KP(kulmat[i + 1], 0.0085f);
                    r.Kalvo(a0, a1, a1 + Vector3.up * 0.0016f, a0 + Vector3.up * 0.0016f, GysLhPuu);
                }
            }
            // Litli Geysirin mutakuplat.
            var lg = GysPienet[3];
            GysMoykky(r, new Vector3(lg.x + 0.005f, 0.0036f, lg.z + 0.003f), 0.0060f, 0.0030f, 0.0005f, 5, Color.Lerp(GysMuta, GysPii, 0.25f), GysMuta, 0.3f);
            GysMoykky(r, new Vector3(lg.x - 0.006f, 0.0036f, lg.z - 0.004f), 0.0042f, 0.0022f, 0.0005f, 5, Color.Lerp(GysMuta, GysPii, 0.2f), GysMuta, 1.1f);
        }

        /// <summary>Köyden tolpat (12, 30°:n välein) ja niiden välissä roikkuva köysi (tolpan päässä 0,010, jännevälin
        /// keskellä 0,007 maan yllä).</summary>
        static void GysLhKoysi(Rakentaja r)
        {
            const int n = 12;
            Vector3 Tolppa(int i)
            {
                float a = (15f + i * 360f / n) * Mathf.PI / 180f;
                float x = GysSx + Mathf.Cos(a) * GysKoysiR, z = GysSz + Mathf.Sin(a) * GysKoysiR;
                return new Vector3(x, GysMaaKorkeus(x, z), z);
            }
            for (int i = 0; i < n; i++)
            {
                Vector3 p = Tolppa(i), q = Tolppa((i + 1) % n);
                GysLhTolppa(r, p - Vector3.up * 0.0004f, 0.0112f, 0.0013f, GysKoysi);
                Vector3 a = p + Vector3.up * 0.0100f, b = q + Vector3.up * 0.0100f, m = (p + q) * 0.5f + Vector3.up * 0.0070f;
                GysLhNauha3(r, a, m, 0.0022f, GysKoysi);
                GysLhNauha3(r, m, b, 0.0022f, GysKoysi);
            }
        }

        /// <summary>Rakennusten lähitaso: leveiden ikkunoiden välipuitteet, ovet katoksineen kaakkoisjulkisivun koillispäässä ja
        /// savupiiput luoteislappeella (ikkunat samoissa paikoissa kuin rungossa ja yövaloissa).</summary>
        static void GysLhRakennukset(Rakentaja r)
        {
            var (ex, kaakko, _) = GysTalonKanta();
            var paikat = new Vector3[8]; var normaalit = new Vector3[8];
            for (int talo = 0; talo < 2; talo++)
            {
                int n = GysIkkunat(talo, paikat, normaalit);
                for (int i = 0; i < n - 1; i++)
                    r.Laatta(paikat[i] + normaalit[i] * 0.0004f, normaalit[i], 0.0018f, 0.012f, GysSeina);
                var p = talo == 0 ? GysKeskusP : GysHotelliP;
                float S = talo == 0 ? GysKeskusS : GysHotelliS, H = talo == 0 ? GysKeskusH : GysHotelliH, harja = talo == 0 ? GysKeskusHarja : GysHotelliHarja;
                float ovi = talo == 0 ? 0.058f : 0.041f;
                var oviP = p + ex * ovi + kaakko * (S * 0.5f);
                r.Laatta(oviP + Vector3.up * 0.0075f, kaakko, 0.008f, 0.014f, EmMuste);
                GysLhLaatikko(r, oviP + kaakko * 0.0035f + Vector3.up * 0.0152f, GysTalonSuunta, 0.014f, 0.0075f, 0.0014f, GysSeina, GysKatto);
                // Savupiippu luoteislappeella harjan lähellä.
                var piippu = p + ex * (talo == 0 ? -0.030f : 0.020f) - kaakko * 0.007f + Vector3.up * (H + harja * 0.45f);
                GysLhLaatikko(r, piippu, GysTalonSuunta, 0.0065f, 0.0065f, 0.012f, Color.Lerp(GysSeina, EmSeepia, 0.35f), EmMuste);
            }
        }

        // ---- Lähitaso: maan pinta ----

        /// <summary>Pisteet murtoviivalla tasavälein (osuudet 0…1 koko pituudesta): paikka ja suunta.</summary>
        static (Vector2 p, Vector2 t) GysLhViivalla(Vector2[] v, float osuus)
        {
            float L = 0f;
            for (int i = 0; i + 1 < v.Length; i++) L += Mathf.Sqrt((v[i + 1].x - v[i].x) * (v[i + 1].x - v[i].x) + (v[i + 1].y - v[i].y) * (v[i + 1].y - v[i].y));
            float m = osuus * L;
            for (int i = 0; i + 1 < v.Length; i++)
            {
                float dx = v[i + 1].x - v[i].x, dz = v[i + 1].y - v[i].y, l = Mathf.Sqrt(dx * dx + dz * dz);
                if (m <= l || i + 2 == v.Length)
                {
                    float f = Mathf.Clamp01(m / l);
                    return (new Vector2(v[i].x + dx * f, v[i].y + dz * f), new Vector2(dx / l, dz / l));
                }
                m -= l;
            }
            return (v[0], new Vector2(1f, 0f));
        }

        /// <summary>Pensaiden paikat nummella (varvikon laikuissa ja saarekkeen reunoilla, ei tiellä eikä rakennusten luona).</summary>
        static readonly Vector2[] GysLhPensasPaikat =
        {
            new Vector2(-0.100f, -0.335f), new Vector2(-0.020f, -0.350f), new Vector2(-0.270f, -0.310f), new Vector2(-0.400f, -0.200f),
            new Vector2(-0.440f, -0.060f), new Vector2(-0.345f, -0.262f), new Vector2(0.030f, 0.355f), new Vector2(-0.140f, 0.340f),
            new Vector2(0.300f, 0.330f), new Vector2(0.400f, 0.250f), new Vector2(0.440f, 0.130f), new Vector2(0.370f, 0.295f),
        };

        /// <summary>
        /// Maan pinnan lähitaso (lähitason verkossa, maa-osan päällä): tien katkoviiva, polun reunakivet, kaksi penkkiä ja kaksi
        /// opastetaulua polun varrella, Strokkurin nimikivi köyden kaakkoiskulmalla, matalat koivupensaat nummella ja kaksi pientä
        /// kuumaa lähdettä kentällä.
        /// </summary>
        static void GysLhMaa(Rakentaja r)
        {
            // Tien keskiviiva (katkoviiva).
            for (int i = 0; i < 7; i++)
            {
                var (p, t) = GysLhViivalla(GysTieReitti, 0.08f + i * 0.135f);
                var a = GysMaassa(p.x - t.x * 0.008f, p.y - t.y * 0.008f, 0.0019f);
                var b = GysMaassa(p.x + t.x * 0.008f, p.y + t.y * 0.008f, 0.0019f);
                GysLhNauha3(r, a, b, 0.0022f, GysLhViiva);
            }
            // Polun reunakivet vuorotellen kummallakin puolella.
            for (int i = 0; i < 12; i++)
            {
                var polku = i < 8 ? GysPolkuReitti : GysPolkuGeysirille;
                float osuus = i < 8 ? 0.06f + i * 0.125f : 0.1f + (i - 8) * 0.26f;
                var (p, t) = GysLhViivalla(polku, osuus);
                float puoli = (i % 2 == 0 ? 1f : -1f) * 0.0105f;
                var q = GysMaassa(p.x + t.y * puoli, p.y - t.x * puoli, -0.0003f);
                GysLhPyramidi(r, q, 0.0026f, 0.0026f, 4, i * 0.7f, GysLhKivi);
            }
            // Penkit polun varrella.
            GysLhLaatikko(r, GysMaassa(0.100f, -0.190f, -0.0002f), 0.33f, 0.018f, 0.0055f, 0.0042f, GysLhPuu, Color.Lerp(GysLhPuu, GysPii, 0.2f));
            GysLhLaatikko(r, GysMaassa(0.106f, 0.004f, -0.0002f), 1.75f, 0.016f, 0.0055f, 0.0042f, GysLhPuu, Color.Lerp(GysLhPuu, GysPii, 0.2f));
            // Opastetaulut: tolppa ja kallistettu taulu (kaksipuolinen).
            var taulut = new (float x, float z, float suunta)[] { (0.186f, -0.244f, 0.45f), (0.100f, 0.044f, 1.9f) };
            foreach (var (x, z, suunta) in taulut)
            {
                var p = GysMaassa(x, z, -0.0003f);
                GysLhTolppa(r, p, 0.0075f, 0.0010f, GysLhTaulu);
                var ex = new Vector3(Mathf.Cos(suunta), 0f, Mathf.Sin(suunta)) * 0.0075f;
                var ez = new Vector3(-Mathf.Sin(suunta), 0f, Mathf.Cos(suunta));
                Vector3 ala = p + Vector3.up * 0.0068f - ez * 0.002f, yla = p + Vector3.up * 0.0118f + ez * 0.002f;
                r.Kalvo(ala - ex, ala + ex, yla + ex, yla - ex, GysLhTaulu);
            }
            // Strokkurin nimikivi köyden kaakkoiskulmalla polun päässä: matala kivi ja tumma laatta kameraan päin.
            var nk = GysMaassa(0.050f, -0.162f, -0.0004f);
            GysMoykky(r, nk, 0.0062f, 0.0068f, 0.0005f, 5, GysLhKivi, GysLhKivi, 0.4f);
            r.Laatta(nk + new Vector3(0.0018f, 0.0034f, -0.0038f), new Vector3(0.35f, 0f, -1f), 0.0055f, 0.0032f, GysLhTaulu);
            // Koivupensaat nummella.
            for (int i = 0; i < GysLhPensasPaikat.Length; i++)
            {
                var q = GysLhPensasPaikat[i];
                GysLhPyramidi(r, GysMaassa(q.x, q.y, -0.0004f), 0.0095f + 0.0025f * (i % 3), 0.0085f + 0.002f * (i % 2), 5, i * 1.7f,
                    i % 2 == 0 ? GysLhPensas : GysLhPensas2);
            }
            // Kaksi pientä kuumaa lähdettä kentällä (sintterireunus ja turkoosi vesi).
            var lahteet = new (float x, float z, float s)[] { (0.214f, -0.034f, 0.0085f), (-0.020f, 0.262f, 0.0075f) };
            foreach (var (x, z, sade) in lahteet)
            {
                float y = GysMaaKorkeus(x, z);
                GysRengas(r, x, z, sade, sade + 0.0055f, y + 0.0022f, y + 0.0004f, 6, GysPii, 0.3f);
                GysLevy(r, x, z, sade + 0.0008f, sade + 0.0008f, y + 0.0019f, 6, GysTurkoosi, 0f, 0, 0.3f);
            }
        }
    }
}
