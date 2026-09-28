using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI KRONBORG (Frederik II:n renessanssilinna Juutinrauman kapeimmassa kohdassa Helsingørissä; speksi
    /// docs/raportit/erikoismallit/kronborg.md, omistaja hyväksyi elämänidean 27.9.2026: Juutinrauman tulli). Nosto
    /// kohde:kronborg, Tanska, 56,039 N 12,623 E, taso 1.
    /// Tunnistus sekunnissa: neliön muotoinen nelisiipinen hiekkakivilinna, jonka jyrkät kuparinvihreät katot kiertävät
    /// vaaleaa sisäpihaa; keskellä eteläsiiven pihapuolella Trompetertårnetin korkea vihreä neula lyhtyineen (mallin korkein
    /// kohta), kulmissa Kongens tårnin kypärä (luode), Dronningens tårnin majakka ja kupoli (koillinen), Kakkelborgin
    /// kivikupoli (kaakko) ja massiivinen tasakattoinen Telegraftårnet (lounas). Linnaa kiertää tähden muotoinen päävalli
    /// neljine kärkibastioneineen (ruohoinen laki, tiilinen luiska) ja maan puolella vallihauta; edessä Juutinrauma, jolla
    /// valkoinen Helsingborgin lautta lähtee satamasta ja palaa ja purjealus lipuu ohi.
    /// Mitat: 1,0 ≈ 235 m (linna 80 × 80 m → 0,37 × 0,37; tähtivalli tiivistetty noin 0,8 ×: kärjet 0,297 ja kurtiinit 0,225
    /// linnan keskeltä), pystyliioittelu noin 1,65: vallin laki 0,03, räystäs 0,105, harja 0,172, Telegraftårnet 0,175,
    /// Kakkelborg 0,221, Dronningens tårn 0,252, Kongens tårn 0,31 ja Trompetertårnetin neula 0,428 (godt 60 m, kum.dk).
    /// Jalanjälki x −0,5…0,5 ja z −0,411…0,386 (juuri 0,012 jalanjäljen keskeltä pohjoiseen); salmi 0,09 leveä kaista edessä.
    /// SUUNTA TODELLINEN (pohjoinen +Z): eteläsiipi Telegraftårnetineen katsoo kameraan kuten satamasta ja lautalta otetuissa
    /// kuvissa. Juutinrauma on tyylitelty kaistaksi linnan eteen (todellisuudessa salmi on linnan pohjois-, itä- ja
    /// kaakkoispuolella; lautan reitti kulkee kaakossa itään), ja kaistan oikea pää kaartuu niemen kärjen ympäri itäpuolelle.
    /// Satama ja lautan laituri ovat vasemmalla edessä (todellisuudessa lounaassa).
    /// Liikkuvat osat:
    ///   lautta       kaksisuuntainen lautta (keula ja perä samanlaiset): laiturista itään kääntöpisteeseen ja takaisin
    ///   lauttavana   vaahto-V lautan perässä kulkusuunnan mukaan (skaala vauhdista)
    ///   lauttavalot  yöllä lautan ikkunat (seuraavat lauttaa)
    ///   laiva        kolmimastoinen purjealus ulkokaistalla (runko ja mastot)
    ///   purjeet      laivan purjeet (lepattavat, kun alus kääntyy tuuleen)
    ///   laivavana    vaahto-V laivan perässä
    ///   tullivene    soutuvene tullilaiturissa kaakkoisbastionin alla (tulli: soutaa laivan kylkeen ja takaisin)
    ///   savu         tykinsavu kaakkoisbastionin tykin suulla (tulli)
    ///   roiske       roiske laivan keulan edessä (tulli)
    ///   haamu        Hamletin isän haamu eteläisen kurtiinin vallilla (yön harvinainen)
    ///   valot        yöllä eteläjulkisivun ikkunat ja päädyt (pivot julkisivun juuressa)
    ///   valot1       yöllä pohjoissiiven pihajulkisivun ikkunat (pivot julkisivun juuressa)
    ///   valot2       yöllä itäjulkisivun ikkunat, linna salmen puolelta (pivot julkisivun juuressa)
    ///   lyhty0       yöllä Trompetertårnetin alempi lyhty (pivot lyhdyn keskellä)
    ///   lyhty1       yöllä majakka Dronningens tårnissa (Kronborg Fyr, pivot lyhdyn keskellä)
    /// </summary>
    public sealed partial class Symbolimallit
    {
        // ---- Mitat (mallin yksiköissä) ----

        /// <summary>Linnan keskipiste ja puolileveys (80 × 80 m → 0,37; 1,0 ≈ 235 m).</summary>
        const float KbKx = 0.06f, KbKz = 0.06f, KbP = 0.185f;
        /// <summary>Siipien syvyys (OpenStreetMap: länsi 18 m, etelä noin 20 m, pohjoinen 13 m, itä 9 m).</summary>
        const float KbSiipiL = 0.076f, KbSiipiE = 0.083f, KbSiipiP = 0.058f, KbSiipiI = 0.04f;
        /// <summary>Vallin laki (linnan jalka ja sisäpiha), räystäs, harja (etelä-, länsi- ja pohjoissiipi) ja itäsiiven matalampi harja.</summary>
        const float KbV = 0.03f, KbRaystas = 0.105f, KbHarja = 0.172f, KbHarjaI = 0.14f;
        /// <summary>Tähtivalli linnan keskipisteestä: kurtiinin etäisyys, kurtiinin puolipituus (kylki), kyljen pituus (olka)
        /// ja bastionin kärki (diagonaalilla).</summary>
        const float KbKurtiini = 0.225f, KbKylki = 0.112f, KbOlka = 0.04f, KbKarki = 0.297f;
        /// <summary>Vallihaudan leveys: tasalevyinen kaista tähden reunan ulkopuolella maan puolella (piirtää tähden sinisenä).</summary>
        const float KbHauta = 0.024f;
        /// <summary>Vesi: pinta hieman maan yläpuolella; salmen kaistan sisäreuna (ranta) ja kameran puoleinen reuna.</summary>
        const float KbVesiY = 0.0015f, KbSalmiTaka = -0.312f, KbSalmiEtu = -0.405f;
        /// <summary>Kaistat: lautta sisäkaistalla, purjealus ulkokaistalla (eivät kohtaa).</summary>
        const float KbLauttaZ = -0.337f, KbLaivaZ = -0.378f;
        /// <summary>Lautan laituri (lepopaikan keskikohta) ja tullilaiturin paikka x.</summary>
        const float KbLaituriX = -0.42f, KbTulliX = 0.33f;

        // ---- Paletti (Em-seepiaramppi; kupari materiaalivärinä kuten Pannonhalman kupoli, ei punaista aksenttia) ----

        static readonly Color KbKivi = Hex(0xe2d8bd), KbPiha = Hex(0xd6caa9), KbAukko = Hex(0x4a3b2c), KbPaatyVari = Hex(0xefe4cc);
        /// <summary>Kupari: kypärät, sipulit ja kupolit kirkkaampana ja kattojen tasainen, hieman tummempi patina (speksin kohta 11:
        /// vihreää noin 14 % mallin pikseleistä; hillitty vaihtoehto B #86917f kuvassa kronborg-katto-AB.png).</summary>
        static readonly Color KbKupari = Hex(0x86a08a), KbKatto = Hex(0x7b9384);
        /// <summary>Vartiokäytävän kaide räystäällä (vaalea hiekkakivi): kuparikatot nousevat kaiteellisten vartiokäytävien
        /// yläpuolelta (Trap Danmark), joten lappeen alin kaista on kiveä eikä kuparia.</summary>
        static readonly Color KbKattoRaystas = Hex(0xd9cfb3);
        /// <summary>Vallin ruoho (keltaisempi kuin kupari), tiilinen luiska ja rannan kivikko.</summary>
        static readonly Color KbNiitty = Hex(0xaeb07c), KbTiili = Hex(0x9a7256), KbRanta = Hex(0xd9cba6);
        /// <summary>Lautta (paperinvalkoinen), purjealuksen runko ja purjeet, savu ja haamu.</summary>
        static readonly Color KbLauttaVari = Hex(0xf3ecd9), KbLaivaRunko = Hex(0x5a4632), KbPurje = Hex(0xf3ebd6), KbSavu = Hex(0xfbf8f0),
            KbHaamuVari = Hex(0xf7f3e8), KbLyhtyValo = Hex(0xf4d898);

        // ---- Johdetut rajat ----

        static float KbX0 => KbKx - KbP;
        static float KbX1 => KbKx + KbP;
        static float KbZ0 => KbKz - KbP;
        static float KbZ1 => KbKz + KbP;

        // ---- Runko ----

        static Mesh KronborgRunko()
        {
            var r = new Rakentaja();
            KbValli(r, false);
            KbVallihauta(r);
            KbSalmi(r);
            KbRannat(r, false);
            KbSatama(r, false);
            KbLinna(r, false);
            KbTornit(r, false);
            KbTykit(r, false);
            return r.Verkko("Kronborg");
        }

        // ---- Tähtivalli ----

        /// <summary>Tähtivallin ulkoreuna linnan keskipisteestä vastapäivään ylhäältä (itä → pohjoinen → länsi → etelä):
        /// neljä kurtiinia ja neljä kärkibastionia (kylki, kaksi pintaa ja kylki), 20 kärkeä.</summary>
        static readonly Vector2[] KbTahti = KbTeeTahti();

        static Vector2[] KbTeeTahti()
        {
            float K = KbKurtiini, F = KbKylki, O = KbOlka, T = KbKarki;
            return new[]
            {
                new Vector2(K, -F), new Vector2(K, F),                                                       // itäkurtiini
                new Vector2(K + O, F), new Vector2(T, T), new Vector2(F, K + O), new Vector2(F, K),          // koillinen (Lippubastioni)
                new Vector2(-F, K),                                                                          // pohjoiskurtiini
                new Vector2(-F, K + O), new Vector2(-T, T), new Vector2(-K - O, F), new Vector2(-K, F),      // luode
                new Vector2(-K, -F),                                                                         // länsikurtiini
                new Vector2(-K - O, -F), new Vector2(-T, -T), new Vector2(-F, -K - O), new Vector2(-F, -K),  // lounas
                new Vector2(F, -K),                                                                          // eteläkurtiini
                new Vector2(F, -K - O), new Vector2(T, -T), new Vector2(K + O, -F),                          // kaakko
            };
        }

        /// <summary>Tähden kärki i maailmassa korkeudella y.</summary>
        static Vector3 KbT(int i, float y) => new Vector3(KbKx + KbTahti[i].x, y, KbKz + KbTahti[i].y);
        static Vector3 KbL(float x, float y, float z) => new Vector3(KbKx + x, y, KbKz + z);

        /// <summary>
        /// Päävalli: tähden muotoinen ruohoinen laki (keskineliö ja neljä kuperaa bastionia) ja tiilinen luiska joka reunalla
        /// (alareuna 0,004 ulompana). Yksi ääriviivaosa, joten muste kiertää tähden. Lähitasossa ruohoinen rintavarustus
        /// ulkoreunalla.
        /// </summary>
        static void KbValli(Rakentaja r, bool lahi)
        {
            float K = KbKurtiini, v = KbV;
            r.AloitaOsa();
            r.NelioUlos(KbL(-K, v, -K), KbL(K, v, -K), KbL(K, v, K), KbL(-K, v, K), Vector3.up, KbNiitty);
            // Bastionit: kupera viisikulmio (kurtiinin pää, olka, kärki, olka, kurtiinin pää), tuuletin kärjestä.
            for (int b = 0; b < 4; b++)
            {
                int i0 = 1 + b * 5;
                var p = new[] { KbT(i0, v), KbT(i0 + 1, v), KbT(i0 + 2, v), KbT(i0 + 3, v), KbT((i0 + 4) % 20, v) };
                for (int k = 1; k < 4; k++) r.KolmioUlos(p[0], p[k], p[k + 1], Vector3.up, KbNiitty);
            }
            // Luiskat: jokainen tähden reuna, alareuna ulospäin (luiska).
            for (int i = 0; i < 20; i++)
            {
                Vector3 a = KbT(i, 0f), b = KbT((i + 1) % 20, 0f);
                var d = (b - a).normalized;
                var n = new Vector3(d.z, 0f, -d.x);
                Vector3 a0 = a + n * 0.004f, b0 = b + n * 0.004f;
                r.NelioUlos(a0, b0, b + Vector3.up * v, a + Vector3.up * v, n + Vector3.up * 0.1f, KbTiili);
            }
            if (lahi)
            {
                // Rintavarustus: ruohoinen penger vallin ulkoreunalla (laki 0,004 vallin yllä, sisäluiska) ja luiskan
                // vaalea kivireunus; sama tähden muoto, joten siluetti ja ääriviiva pysyvät.
                for (int i = 0; i < 20; i++)
                {
                    Vector3 a = KbT(i, v), b = KbT((i + 1) % 20, v);
                    Vector3 ia = KbRintaSisa(i, 0.009f), ib = KbRintaSisa((i + 1) % 20, 0.009f), ja = KbRintaSisa(i, 0.018f), jb = KbRintaSisa((i + 1) % 20, 0.018f);
                    var yl = Vector3.up * 0.004f;
                    r.NelioUlos(a + yl, b + yl, ib + yl, ia + yl, Vector3.up, Color.Lerp(KbNiitty, EmPaperi, 0.12f));
                    r.NelioUlos(ia + yl, ib + yl, jb, ja, Vector3.up, Color.Lerp(KbNiitty, EmSeepia, 0.12f));
                    var d = (b - a).normalized;
                    var n = new Vector3(d.z, 0f, -d.x);
                    r.NelioUlos(a, b, b + yl, a + yl, n, Color.Lerp(KbTiili, EmPaperi, 0.35f));
                }
            }
            r.LopetaOsa();
            if (lahi) KbLhValli(r);
        }

        /// <summary>Rintavarustuksen sisäreuna: tähden kärki i siirrettynä sisäänpäin (viereisten reunojen normaalien puolittaja).</summary>
        static Vector3 KbRintaSisa(int i, float d)
        {
            Vector3 p = KbT((i + 19) % 20, KbV), v = KbT(i, KbV), q = KbT((i + 1) % 20, KbV);
            var d0 = (v - p).normalized; var d1 = (q - v).normalized;
            var n0 = new Vector3(d0.z, 0f, -d0.x); var n1 = new Vector3(d1.z, 0f, -d1.x);
            return v - (n0 + n1) * (d / Mathf.Max(0.25f, 1f + Vector3.Dot(n0, n1)));
        }

        /// <summary>
        /// Vallin lähitaso: vartiokoju luoteisbastionin kärjessä (kahdeksankulmainen, pyramidikatto), Mørkeportin portaali
        /// pohjoiskurtiinissa ja Slotsbroen haudan yli, Lippubastionin tykkirivi ja lipputanko (ilman lippua: punaista ei
        /// käytetä) sekä ampuma-aukot meren puoleisissa rintavarustuksissa.
        /// </summary>
        static void KbLhValli(Rakentaja r)
        {
            float v = KbV;
            // Vartiokoju luoteisbastionin kärjessä.
            var sk = KbT(8, v) + (KbL(0f, v, 0f) - KbT(8, v)).normalized * 0.018f;
            r.Pylvas(sk, 0.0055f, 0.01f, 8, EmKiviVaalea);
            r.Kartio(sk + Vector3.up * 0.01f, 0.0068f, 0.007f, 8, KbKupari);
            // Mørkeportin portaali pohjoiskurtiinissa ja silta haudan yli.
            var pp = KbL(0f, 0f, KbKurtiini);
            r.Laatikko(pp + new Vector3(0f, 0f, 0.002f), new Vector3(0.026f, v + 0.008f, 0.006f), EmKiviVaalea, EmKiviVaalea);
            r.Holvi(pp + new Vector3(0f, 0.012f, 0.005f), Vector3.forward, 0.011f, 0.017f, KbAukko);
            r.Laatikko(pp + new Vector3(0f, 0.004f, 0.005f + KbHauta * 0.55f), new Vector3(0.012f, 0.003f, KbHauta * 1.1f), EmSeepia, Color.Lerp(EmSeepia, EmPaperi, 0.35f));
            // Lippubastionin tykit (tummat putket itään) ja lipputanko.
            for (int i = 0; i < 4; i++)
            {
                var p = KbL(0.215f + i * 0.02f, v, 0.105f + i * 0.028f);
                r.Laatikko(p, new Vector3(0.009f, 0.004f, 0.007f), EmSeepia, EmSeepia);
                r.Laatikko(p + new Vector3(0.007f, 0.003f, 0f), new Vector3(0.014f, 0.0032f, 0.0032f), EmMuste, EmMuste);
            }
            var lt = KbL(0.235f, v, 0.225f);
            r.Kalvo(lt + new Vector3(-0.0007f, 0f, 0f), lt + new Vector3(0.0007f, 0f, 0f), lt + new Vector3(0.0005f, 0.07f, 0f), lt + new Vector3(-0.0005f, 0.07f, 0f), EmMuste);
            // Ampuma-aukot: tummat lovet meren puoleisten bastionipintojen rintavarustuksessa (Lippubastioni ja kaakkoisbastioni).
            foreach (int i in new[] { 2, 18 })
                for (int k = 1; k <= 4; k++)
                {
                    Vector3 a = KbT(i, v), b = KbT((i + 1) % 20, v);
                    var d = (b - a).normalized;
                    var n = new Vector3(d.z, 0f, -d.x);
                    r.Laatta(Vector3.Lerp(a, b, k / 5f) + Vector3.up * 0.002f, n, 0.006f, 0.004f, KbAukko);
                }
        }

        // ---- Vesi (pienistä paloista: ei ääriviivaa eikä kehystä) ----

        /// <summary>Suurin vesipalan sivu: kolmion rajalaatikon puolileveys pysyy alle ääriviivan kynnyksen 0,035.</summary>
        const float KbPala = 0.066f;

        /// <summary>Vesikolmio pienissä paloissa: jaetaan pisimmän sivun keskeltä, kunnes jokainen pala on alle KbPala.</summary>
        static void KbVesiKolmio(Rakentaja r, Vector3 a, Vector3 b, Vector3 c, Color vari, int syvyys = 0)
        {
            float ab = (b - a).magnitude, bc = (c - b).magnitude, ca = (a - c).magnitude;
            float m = Mathf.Max(ab, Mathf.Max(bc, ca));
            if (m <= KbPala || syvyys > 8) { r.KolmioUlos(a, b, c, Vector3.up, vari); return; }
            if (ab >= bc && ab >= ca) { var p = (a + b) * 0.5f; KbVesiKolmio(r, a, p, c, vari, syvyys + 1); KbVesiKolmio(r, p, b, c, vari, syvyys + 1); }
            else if (bc >= ca) { var p = (b + c) * 0.5f; KbVesiKolmio(r, a, b, p, vari, syvyys + 1); KbVesiKolmio(r, a, p, c, vari, syvyys + 1); }
            else { var p = (c + a) * 0.5f; KbVesiKolmio(r, a, b, p, vari, syvyys + 1); KbVesiKolmio(r, p, b, c, vari, syvyys + 1); }
        }

        /// <summary>Kupera vesimonikulmio (tuuletin ensimmäisestä kärjestä) pieninä paloina.</summary>
        static void KbVesiKupera(Rakentaja r, Color vari, params Vector3[] p)
        {
            for (int i = 1; i + 1 < p.Length; i++) KbVesiKolmio(r, p[0], p[i], p[i + 1], vari);
        }

        /// <summary>
        /// Vallihauta maan puolella (pohjoinen, länsi ja etelä; idässä valli kohtaa rantapatterit ja salmen): tasalevyinen
        /// KbHauta-kaista tähden reunan ulkopuolella koillisbastionin kärjestä kaakkoisbastionin kärkeen, joten tähden muoto
        /// piirtyy sinisenä ääriviivana. Palat ovat pieniä, joten haudalle ei tule ääriviivaa eikä kehystä; tähden muste ja
        /// tiililuiska näkyvät haudan sisäreunassa.
        /// </summary>
        static void KbVallihauta(Rakentaja r)
        {
            // Haudan reunat: tähden kärjet 3 (koillisbastionin kärki) … 18 (kaakkoisbastionin kärki) vastapäivään.
            for (int i = 3; i < 18; i++)
            {
                Vector3 a = KbT(i, KbVesiY), b = KbT(i + 1, KbVesiY), oa = KbHautaReuna(i), ob = KbHautaReuna(i + 1);
                // Kaista paloiksi reunan suunnassa (noin 0,055 pitkiä nelikulmioita), jotta palat pysyvät ääriviivan kynnyksen alla
                // ilman turhaa kolmiojakoa.
                int k = Mathf.Max(1, (int)Math.Ceiling(Mathf.Max((b - a).magnitude, (ob - oa).magnitude) / 0.055f));
                for (int j = 0; j < k; j++)
                {
                    float f0 = j / (float)k, f1 = (j + 1) / (float)k;
                    KbVesiKupera(r, EmVesi, Vector3.Lerp(a, b, f0), Vector3.Lerp(a, b, f1), Vector3.Lerp(oa, ob, f1), Vector3.Lerp(oa, ob, f0));
                }
            }
        }

        /// <summary>Haudan ulkoreunan kärki i: tähden kärki siirrettynä KbHauta ulospäin viereisten reunojen normaalien
        /// kulmanpuolittajaa pitkin (kuperissa kärjissä ulos, sisäkulmissa sisään).</summary>
        static Vector3 KbHautaReuna(int i)
        {
            Vector3 p = KbT((i + 19) % 20, KbVesiY), v = KbT(i, KbVesiY), q = KbT((i + 1) % 20, KbVesiY);
            var d0 = (v - p).normalized; var d1 = (q - v).normalized;
            var n0 = new Vector3(d0.z, 0f, -d0.x); var n1 = new Vector3(d1.z, 0f, -d1.x);
            var m = n0 + n1;
            float k = KbHauta / Mathf.Max(0.25f, 1f + Vector3.Dot(n0, n1));
            return v + m * k;
        }

        /// <summary>Salmen kameran puoleinen reuna ja ranta (sisäreuna) kohdassa x: loivat epäsäännölliset mutkat; oikeassa
        /// päässä ranta kaartuu pohjoiseen niemen kärjen merkiksi.</summary>
        static float KbEtuReuna(float x) => KbSalmiEtu + 0.004f * Mathf.Sin(x * 8.3f + 0.4f) + 0.002f * Mathf.Sin(x * 21.7f);
        static float KbRantaZ(float x) => KbSalmiTaka + 0.0035f * Mathf.Sin(x * 11.1f + 1.3f) + 0.0015f * Mathf.Sin(x * 27.3f) +
            (x > 0.36f ? 2.6f * (x - 0.36f) * (x - 0.36f) : 0f);

        /// <summary>
        /// Juutinrauma: kapea kaista linnan edessä pieninä paloina (15 saraketta, 2–3 riviä), joten vedelle ei tule ääriviivaa
        /// eikä kehystä. Kameran puoleinen reuna ja päät rajautuvat suoraan karttaan.
        /// </summary>
        static void KbSalmi(Rakentaja r)
        {
            const int sarakkeita = 15;
            float y = KbVesiY;
            for (int i = 0; i < sarakkeita; i++)
            {
                float x0 = -0.5f + i / (float)sarakkeita, x1 = -0.5f + (i + 1) / (float)sarakkeita;
                float e0 = KbEtuReuna(x0), e1 = KbEtuReuna(x1), t0 = KbRantaZ(x0), t1 = KbRantaZ(x1);
                int riveja = Mathf.Max(2, (int)Math.Ceiling((Mathf.Max(t0, t1) - Mathf.Min(e0, e1)) / 0.045f));
                for (int j = 0; j < riveja; j++)
                {
                    float f0 = j / (float)riveja, f1 = (j + 1) / (float)riveja;
                    r.NelioUlos(new Vector3(x0, y, Mathf.Lerp(e0, t0, f0)), new Vector3(x1, y, Mathf.Lerp(e1, t1, f0)),
                        new Vector3(x1, y, Mathf.Lerp(e1, t1, f1)), new Vector3(x0, y, Mathf.Lerp(e0, t0, f1)), Vector3.up, EmVesi);
                }
            }
        }

        /// <summary>
        /// Ranta: vaalea kivikkokaista salmen rannassa sataman oikealta puolelta niemen kärjen kaarteeseen (pieninä paloina, ei
        /// ääriviivaa). Lähitasossa kivikon kivet.
        /// </summary>
        static void KbRannat(Rakentaja r, bool lahi)
        {
            float y = 0.0022f, lev = 0.01f;
            const int n = 12;
            for (int i = 0; i < n; i++)
            {
                float x0 = Mathf.Lerp(-0.28f, 0.5f, i / (float)n), x1 = Mathf.Lerp(-0.28f, 0.5f, (i + 1) / (float)n);
                float z0 = KbRantaZ(x0), z1 = KbRantaZ(x1);
                r.NelioUlos(new Vector3(x0, y, z0), new Vector3(x1, y, z1), new Vector3(x1, y, z1 + lev), new Vector3(x0, y, z0 + lev), Vector3.up, KbRanta);
            }
            if (!lahi) return;
            // Lähitaso: kivikko (matalat viisitahkoiset kivet rannan vesirajassa, koko ja paikka toistettavasta kohinasta) ja
            // väreily salmella (vaaleat viirut ulkokaistan ja sisäkaistan välissä).
            var sat = new System.Random(1629);
            for (int i = 0; i < 16; i++)
            {
                float x = Mathf.Lerp(-0.26f, 0.48f, (i + 0.5f) / 16f) + ((float)sat.NextDouble() - 0.5f) * 0.02f;
                float z = KbRantaZ(x) + 0.003f + (float)sat.NextDouble() * 0.005f, k = 0.0032f + (float)sat.NextDouble() * 0.0022f;
                // Matala viisitahkoinen kivi (puoliksi rannan kivikossa), sävy lähellä rantaa: pinta, ei piikkejä.
                r.Timantti(new Vector3(x, 0.0022f + k * 0.35f, z), k, k * 0.35f, Color.Lerp(KbRanta, EmKivi, 0.35f + 0.4f * (float)sat.NextDouble()), 5);
            }
            foreach (var (x, dz, l) in new[] { (-0.2f, -0.047f, 0.03f), (-0.06f, -0.058f, 0.024f), (0.08f, -0.05f, 0.028f), (0.21f, -0.061f, 0.022f),
                (-0.33f, -0.075f, 0.026f), (0.36f, -0.052f, 0.02f), (0.02f, -0.079f, 0.03f), (0.44f, -0.03f, 0.018f) })
            {
                float z = KbSalmiTaka + dz;
                r.NelioUlos(new Vector3(x - l * 0.5f, KbVesiY + 0.0003f, z - 0.0007f), new Vector3(x + l * 0.5f, KbVesiY + 0.0003f, z - 0.0007f),
                    new Vector3(x + l * 0.5f, KbVesiY + 0.0003f, z + 0.0007f), new Vector3(x - l * 0.5f, KbVesiY + 0.0003f, z + 0.0007f), Vector3.up, EmVaahto);
            }
        }

        // ---- Satama ----

        /// <summary>
        /// Satama vasemmalla edessä: kivilaituri rannassa, lautan laiturirakenne (kääntösilta) kaistaan ja matala
        /// terminaalirakennus. Yksi ääriviivaosa.
        /// </summary>
        static void KbSatama(Rakentaja r, bool lahi)
        {
            r.AloitaOsa();
            float zr = KbSalmiTaka, h = 0.006f;
            // Laituri: rannan suuntainen kivilaituri x −0,5…−0,31.
            r.Laatikko(new Vector3(-0.405f, 0f, zr + 0.012f), new Vector3(0.19f, h, 0.024f), EmKivi, EmKiviVaalea);
            // Kääntösilta lautan päätyyn: kapea laituri kaistaan.
            float xs = KbLaituriX - 0.052f;
            r.Laatikko(new Vector3(xs, 0f, (zr + KbLauttaZ) * 0.5f), new Vector3(0.016f, h + 0.001f, zr - KbLauttaZ + 0.004f), EmKivi, EmKiviVaalea);
            // Terminaali.
            r.Laatikko(new Vector3(-0.41f, h, zr + 0.016f), new Vector3(0.07f, 0.016f, 0.018f), KbLauttaVari, EmSeepia);
            r.LopetaOsa();
            if (!lahi) return;
            // Lähitaso: terminaalin ikkunanauha ja ovi, kääntösillan nostopukki (kaksi pylvästä ja palkki) ja pollarit laiturin reunassa.
            r.Laatta(new Vector3(-0.41f, h + 0.0095f, zr + 0.007f), Vector3.back, 0.062f, 0.004f, KbAukko);
            r.Laatta(new Vector3(-0.395f, h + 0.004f, zr + 0.007f), Vector3.back, 0.006f, 0.008f, KbAukko);
            float zs = (zr + KbLauttaZ) * 0.5f;
            foreach (float dz in new[] { -0.012f, 0.008f })
                r.Laatikko(new Vector3(xs, h, zs + dz), new Vector3(0.0035f, 0.018f, 0.0035f), EmSeepia, EmSeepia);
            r.Laatikko(new Vector3(xs, h + 0.018f, zs - 0.002f), new Vector3(0.005f, 0.003f, 0.026f), EmSeepia, EmMuste);
            for (int i = 0; i < 5; i++)
                r.Pylvas(new Vector3(-0.485f + i * 0.04f, h, zr + 0.002f), 0.0018f, 0.004f, 4, EmMuste);
        }

        // ---- Linna ----

        /// <summary>Lape räystäältä r0 → r1 harjalle (h1 on r1:n ja h0 r0:n puolella): alin kaista vartiokäytävän kiveä, loput kuparia.</summary>
        static void KbLape(Rakentaja r, Vector3 r0, Vector3 r1, Vector3 h1, Vector3 h0, Vector3 keski, float osuus = 0.2f)
        {
            Vector3 a = Vector3.Lerp(r0, h0, osuus), b = Vector3.Lerp(r1, h1, osuus);
            r.NelioKeskelta(r0, r1, b, a, keski, KbKattoRaystas);
            r.NelioKeskelta(a, b, h1, h0, keski, KbKatto);
        }

        /// <summary>Harjakatto kahden samansuuntaisen räystäslinjan (e0a → e0b ja e1a → e1b) välissä, harja keskellä h:n
        /// korkeudella räystäästä; päätykolmiot valinnaisina (seinän värillä).</summary>
        static void KbHarjakatto(Rakentaja r, Vector3 e0a, Vector3 e0b, Vector3 e1a, Vector3 e1b, float h, bool paatyA, bool paatyB)
        {
            Vector3 ha = (e0a + e1a) * 0.5f + Vector3.up * h, hb = (e0b + e1b) * 0.5f + Vector3.up * h;
            var keski = (e0a + e0b + e1a + e1b) * 0.25f + Vector3.up * (h * 0.3f);
            KbLape(r, e0a, e0b, hb, ha, keski);
            KbLape(r, e1a, e1b, hb, ha, keski);
            if (paatyA) r.KolmioKeskelta(e0a, e1a, ha, keski, KbKivi);
            if (paatyB) r.KolmioKeskelta(e0b, e1b, hb, keski, KbKivi);
        }

        /// <summary>Pystytahko pisteiden a ja b välillä korkeuksilla y0–y1, etupuoli suuntaan n.</summary>
        static void KbTahko(Rakentaja r, float ax, float az, float bx, float bz, float y0, float y1, Vector3 n, Color vari) =>
            r.NelioUlos(new Vector3(ax, y0, az), new Vector3(bx, y0, bz), new Vector3(bx, y1, bz), new Vector3(ax, y1, az), n, vari);

        /// <summary>
        /// Linnan runko: ulko- ja pihaseinät, sisäpihan kiveys ja jyrkät kuparikatot (etelä- ja pohjoissiipi koko leveydeltä,
        /// länsi- ja itäsiipi niiden välissä; itäsiipi kapeampi ja matalampi), eteläjulkisivun kolme isoa hiekkakivipäätyä ja
        /// ikkunarivit etelään ja itään. Yksi ääriviivaosa. Lähitasossa kaikkien julkisivujen ikkunarivit ja listat, itäsiiven kaksi
        /// isoa päätyä ja kattoikkunat.
        /// </summary>
        static void KbLinna(Rakentaja r, bool lahi)
        {
            float x0 = KbX0, x1 = KbX1, z0 = KbZ0, z1 = KbZ1;
            float xi0 = x0 + KbSiipiL, xi1 = x1 - KbSiipiI, zi0 = z0 + KbSiipiE, zi1 = z1 - KbSiipiP;
            float y0 = KbV, yr = KbRaystas, h = KbHarja - KbRaystas, hi = KbHarjaI - KbRaystas;
            r.AloitaOsa();
            // Ulkoseinät.
            KbTahko(r, x0, z0, x1, z0, y0, yr, Vector3.back, KbKivi);
            KbTahko(r, x1, z0, x1, z1, y0, yr, Vector3.right, KbKivi);
            KbTahko(r, x1, z1, x0, z1, y0, yr, Vector3.forward, KbKivi);
            KbTahko(r, x0, z1, x0, z0, y0, yr, Vector3.left, KbKivi);
            // Sisäpihan seinät ja kiveys.
            KbTahko(r, xi0, zi0, xi1, zi0, y0, yr, Vector3.forward, KbKivi);
            KbTahko(r, xi1, zi0, xi1, zi1, y0, yr, Vector3.left, KbKivi);
            KbTahko(r, xi1, zi1, xi0, zi1, y0, yr, Vector3.back, KbKivi);
            KbTahko(r, xi0, zi1, xi0, zi0, y0, yr, Vector3.right, KbKivi);
            r.NelioUlos(new Vector3(xi0, y0 + 0.0008f, zi0), new Vector3(xi1, y0 + 0.0008f, zi0), new Vector3(xi1, y0 + 0.0008f, zi1),
                new Vector3(xi0, y0 + 0.0008f, zi1), Vector3.up, KbPiha);
            // Katot: etelä- ja pohjoissiipi koko leveydeltä päätyineen (idässä kirkon ja pohjoissiiven päädyt), länsi- ja
            // itäsiipi harjalinjojen välissä (päädyt jäävät etelä- ja pohjoissiiven katon sisään).
            float zsH = (z0 + zi0) * 0.5f, znH = (z1 + zi1) * 0.5f;
            KbHarjakatto(r, new Vector3(x0, yr, z0), new Vector3(x1, yr, z0), new Vector3(x0, yr, zi0), new Vector3(x1, yr, zi0), h, false, true);
            KbHarjakatto(r, new Vector3(x0, yr, z1), new Vector3(x1, yr, z1), new Vector3(x0, yr, zi1), new Vector3(x1, yr, zi1), h, true, true);
            KbHarjakatto(r, new Vector3(x0, yr, zsH), new Vector3(x0, yr, znH), new Vector3(xi0, yr, zsH), new Vector3(xi0, yr, znH), h, false, false);
            KbHarjakatto(r, new Vector3(xi1, yr, zsH), new Vector3(xi1, yr, znH), new Vector3(x1, yr, zsH), new Vector3(x1, yr, znH), hi, false, false);
            // Eteläjulkisivun isot kaarevat hiekkakivipäädyt (Christian IV:n 21 päätyä; rungossa kameran puolen kolme).
            foreach (float fx in KbPaadytEtela) KbIsoPaaty(r, x0 + fx * 2f * KbP, z0, Vector3.back, KbHarja, KbSiipiE * 0.45f, lahi);
            if (lahi)
            {
                // Matalan itäsiiven kaksi isoa päätyä (näkyvät salmelta ja kaakon näkymästä) ja pienet kattoikkunat. Pohjois- ja
                // länsijulkisivun päädyt jätetään pois: etelän ja kaakon näkymissä niistä näkyisi vain takapuoli harjan yli, mikä
                // muuttaisi siluettia.
                foreach (float fz in new[] { 0.4f, 0.66f }) KbIsoPaaty(r, x1, z0 + fz * 2f * KbP, Vector3.right, KbHarjaI, KbSiipiI * 0.45f, true);
                KbLhKattoikkunat(r);
            }
            r.LopetaOsa();
            if (lahi) { KbLhJulkisivut(r); return; }
            // Ikkunarivi (tummat, toisen kerroksen korkeat ikkunat) etelä- ja itäjulkisivussa (yövalot samoissa kohdissa) ja
            // räystäslistan varjoviiva eteläjulkisivussa.
            for (int i = 0; i < KbIkkunoita; i++)
                r.Laatta(new Vector3(KbIkkunaX(i), KbIkkunaY, z0), Vector3.back, 0.012f, 0.021f, KbAukko);
            for (int i = 0; i < KbItaIkkunoita; i++)
                r.Laatta(new Vector3(x1, KbIkkunaY, KbItaIkkunaZ(i)), Vector3.right, 0.011f, 0.02f, KbAukko);
            r.Laatta(new Vector3((x0 + KbTelegrafL + x1) * 0.5f, yr - 0.004f, z0), Vector3.back, x1 - x0 - KbTelegrafL - 0.004f, 0.0035f, Color.Lerp(KbKivi, KbAukko, 0.45f));
        }

        /// <summary>Eteläjulkisivun ikkunarivi (toisen kerroksen korkeat ikkunat) Telegraftårnetin oikealta puolelta. Samat paikat
        /// rungossa, lähitasossa ja yövaloissa, joten hehku osuu ikkunoihin kummallakin tasolla.</summary>
        const int KbIkkunoita = 8;
        static float KbIkkunaX(int i) => KbX0 + KbTelegrafL + 0.03f + i * (KbX1 - KbX0 - KbTelegrafL - 0.052f) / (KbIkkunoita - 1);
        /// <summary>Pohjoissiiven pihajulkisivun ikkunat (näkyvät etelästä katon yli) ja itäjulkisivun ikkunat (salmen näkymä).</summary>
        const int KbPihaIkkunoita = 6, KbItaIkkunoita = 8;
        static float KbPihaIkkunaX(int i) => Mathf.Lerp(KbX0 + KbSiipiL + 0.02f, KbX1 - KbSiipiI - 0.02f, (i + 0.5f) / KbPihaIkkunoita);
        static float KbItaIkkunaZ(int i) => Mathf.Lerp(KbZ0 + 0.022f, KbZ1 - 0.022f, (i + 0.5f) / KbItaIkkunoita);
        /// <summary>Toisen kerroksen ikkunoiden korkeus (keskikohta) ja pohjakerroksen ikkunoiden korkeus.</summary>
        const float KbIkkunaY = KbV + 0.046f, KbAlaIkkunaY = KbV + 0.017f;

        /// <summary>Eteläjulkisivun isojen päätyjen paikat julkisivun leveyden osuutena (kuva Kronborg flygfoto 2, 2021).</summary>
        static readonly float[] KbPaadytEtela = { 0.37f, 0.58f, 0.79f };

        /// <summary>
        /// Iso kaareva hiekkakivipääty julkisivun tasossa: pääty nousee räystäältä siiven harjan korkeudelle (ya) porrastettuna
        /// viisikulmiona (kaarevat reunat tyyliteltyinä), ja sen takana kattolyhdyn harjakatto kulkee syvyyden verran pääkattoon.
        /// Pääty on julkisivun edessä (0,0012), joten se peittää räystäskaistan. (x, z) = päädyn alareunan keskikohta
        /// julkisivussa. Lähitasossa profiilissa on voluutat (sivuportaat), kehystetty ikkuna rungon ikkunan paikalla, pieni
        /// ikkuna portaalla, lista ja huippukoriste.
        /// </summary>
        static void KbIsoPaaty(Rakentaja r, float x, float z, Vector3 ulos, float ya, float syvyys, bool lahi)
        {
            float yr = KbRaystas, hh = ya - yr, w = 0.042f * Mathf.Min(1f, 0.55f + hh / 0.067f * 0.45f);
            float ys = yr + hh * 0.51f, yp = yr + hh * 0.76f;
            var n = ulos.normalized;
            var t = Vector3.Cross(Vector3.up, n);    // julkisivun suunta
            var o = new Vector3(x, 0f, z) + n * 0.0012f;
            Vector3 P(float s, float yy) => o + t * s + Vector3.up * yy;
            // Etulevy: suorakulmio ja porrastettu yläosa (lähitasossa voluuttaportaat sivuilla).
            r.NelioUlos(P(-w * 0.5f, yr - 0.004f), P(w * 0.5f, yr - 0.004f), P(w * 0.5f, ys), P(-w * 0.5f, ys), n, KbPaatyVari);
            if (!lahi)
            {
                r.KolmioUlos(P(-w * 0.5f, ys), P(w * 0.5f, ys), P(w * 0.25f, yp), n, KbPaatyVari);
                r.KolmioUlos(P(-w * 0.5f, ys), P(w * 0.25f, yp), P(-w * 0.25f, yp), n, KbPaatyVari);
                r.KolmioUlos(P(-w * 0.25f, yp), P(w * 0.25f, yp), P(0f, ya), n, KbPaatyVari);
            }
            else
            {
                // Voluutat: kummallakin sivulla neljännesympyrä olalta porrastasolle, keskellä kapeneva yläosa ja huippu.
                for (int s = -1; s <= 1; s += 2)
                {
                    Vector3 e = P(s * w * 0.5f, ys), v1 = P(s * w * 0.44f, ys + (yp - ys) * 0.55f), v2 = P(s * w * 0.3f, yp);
                    r.KolmioUlos(P(s * w * 0.3f, ys), e, v1, n, KbPaatyVari);
                    r.KolmioUlos(P(s * w * 0.3f, ys), v1, v2, n, KbPaatyVari);
                }
                r.NelioUlos(P(-w * 0.3f, ys), P(w * 0.3f, ys), P(w * 0.3f, yp), P(-w * 0.3f, yp), n, KbPaatyVari);
                r.KolmioUlos(P(-w * 0.3f, yp), P(w * 0.3f, yp), P(w * 0.12f, ya - hh * 0.06f), n, KbPaatyVari);
                r.KolmioUlos(P(-w * 0.3f, yp), P(w * 0.12f, ya - hh * 0.06f), P(-w * 0.12f, ya - hh * 0.06f), n, KbPaatyVari);
                r.KolmioUlos(P(-w * 0.12f, ya - hh * 0.06f), P(w * 0.12f, ya - hh * 0.06f), P(0f, ya), n, KbPaatyVari);
            }
            // Kattolyhdyn harjakatto päädyn takana (harja pääkaton harjan tasossa).
            var syv = -n * syvyys;
            var keski = P(0f, ys) + syv * 0.5f - Vector3.up * 0.01f;
            r.NelioKeskelta(P(-w * 0.5f, ys), P(0f, ya), P(0f, ya) + syv, P(-w * 0.5f, ys) + syv, keski, KbKatto);
            r.NelioKeskelta(P(w * 0.5f, ys), P(0f, ya), P(0f, ya) + syv, P(w * 0.5f, ys) + syv, keski, KbKatto);
            if (!lahi)
            {
                // Päädyn ikkuna (tumma).
                r.Laatta(P(0f, yr + 0.02f) + n * 0.0003f, n, 0.008f, 0.011f, KbAukko);
                return;
            }
            // Lähitaso: keskellä sama ikkuna kuin rungossa (yövalo osuu siihen) kehyksineen, pieni ikkuna portaan kohdalla,
            // vaakalista ja huippukoriste.
            r.Laatta(P(0f, yr + 0.02f) + n * 0.0001f, n, 0.0115f, 0.0145f, Color.Lerp(KbPaatyVari, EmSeepia, 0.25f));
            r.Laatta(P(0f, yr + 0.02f) + n * 0.0004f, n, 0.008f, 0.011f, KbAukko);
            r.Laatta(P(0f, ys + (yp - ys) * 0.5f) + n * 0.0003f, n, w * 0.16f, (yp - ys) * 0.55f, KbAukko);
            r.Laatta(P(0f, ys) + n * 0.0004f, n, w * 1.02f, 0.0018f, EmSeepia);
            r.Timantti(P(0f, ya + 0.003f) + n * 0.0003f, 0.0016f, 0.0032f, KbPaatyVari, 4);
        }

        /// <summary>
        /// Lähitason pienet kattoikkunat (Trap Danmark: 125 kpl; tyyliteltynä 17): pieni harjakattoinen kattoikkuna lappeella,
        /// etuseinä ja kaksi lapetta. Etelälape kahdessa rivissä isojen päätyjen välissä, pohjois-, länsi- ja itälappeella yksi rivi.
        /// </summary>
        static void KbLhKattoikkunat(Rakentaja r)
        {
            float x0 = KbX0, x1 = KbX1, z0 = KbZ0, z1 = KbZ1, yr = KbRaystas;
            float hS = KbHarja - yr;
            // Etelälape: räystäästä harjalle KbSiipiE/2 vaakamatkalla.
            foreach (float fx in new[] { 0.265f, 0.475f, 0.685f, 0.9f })
                foreach (float f in new[] { 0.28f, 0.62f })
                    KbLhKattoikkuna(r, new Vector3(x0 + fx * 2f * KbP, 0f, z0), Vector3.back, KbSiipiE * 0.5f, hS, f, 0.0068f);
            foreach (float fx in new[] { 0.14f, 0.375f, 0.625f, 0.86f })
                KbLhKattoikkuna(r, new Vector3(x0 + fx * 2f * KbP, 0f, z1), Vector3.forward, KbSiipiP * 0.5f, hS, 0.4f, 0.0065f);
            foreach (float fz in new[] { 0.45f, 0.67f })
                KbLhKattoikkuna(r, new Vector3(x0, 0f, z0 + fz * 2f * KbP), Vector3.left, KbSiipiL * 0.5f, hS, 0.4f, 0.0065f);
            foreach (float fz in new[] { 0.27f, 0.53f, 0.79f })
                KbLhKattoikkuna(r, new Vector3(x1, 0f, z0 + fz * 2f * KbP), Vector3.right, KbSiipiI * 0.5f, KbHarjaI - yr, 0.35f, 0.006f);
        }

        /// <summary>Kattoikkuna lappeella: räystään piste e (julkisivun tasossa), ulospäin n, lappeen vaakamatka m ja nousu h,
        /// osuus f räystäästä harjaa kohti ja leveys w. Etuseinä (5 kärkeä) ja kaksi lapetta.</summary>
        static void KbLhKattoikkuna(Rakentaja r, Vector3 e, Vector3 n, float m, float h, float f, float w)
        {
            var t = Vector3.Cross(Vector3.up, n);
            var p = e - n * (m * f) + Vector3.up * (KbRaystas + h * f);
            float sh = 0.006f, ph = 0.004f, syv = 0.012f;
            Vector3 a = p - t * (w * 0.5f), b = p + t * (w * 0.5f), c = b + Vector3.up * sh, d = a + Vector3.up * sh, k = p + Vector3.up * (sh + ph);
            r.NelioUlos(a, b, c, d, n, KbPaatyVari);
            r.KolmioUlos(d, c, k, n, KbPaatyVari);
            r.Laatta(p + Vector3.up * (sh * 0.5f) + n * 0.0002f, n, w * 0.45f, sh * 0.6f, KbAukko);
            var taa = -n * syv - Vector3.up * (h / m * syv * 0.2f);
            var keski = p + Vector3.up * (sh * 0.5f) - n * (syv * 0.5f);
            r.NelioKeskelta(d, k, k + taa, d + taa, keski, KbKatto);
            r.NelioKeskelta(c, k, k + taa, c + taa, keski, KbKatto);
        }

        /// <summary>
        /// Lähitason julkisivut (kaikki ääriviivaryhmän ulkopuolella, pieniä kärkivärejä): toisen kerroksen korkeat ikkunat
        /// hiekkakivikehyksin, pohjakerroksen ikkunat kolmiopäädyin (etelässä kappelin kolme suippokaari-ikkunaa), kerrosten
        /// välinen lista ja vartiokäytävän reunalista kaiteineen räystään alla, pihajulkisivujen ikkunat, Skanderborgin portaali
        /// pohjoissiiven pihapuolella ja sisäpihan kaivo.
        /// </summary>
        static void KbLhJulkisivut(Rakentaja r)
        {
            float x0 = KbX0, x1 = KbX1, z0 = KbZ0, z1 = KbZ1, y0 = KbV, yr = KbRaystas;
            float xi0 = x0 + KbSiipiL, xi1 = x1 - KbSiipiI, zi0 = z0 + KbSiipiE, zi1 = z1 - KbSiipiP;
            var kehys = Color.Lerp(KbKivi, EmPaperi, 0.6f);
            var lista = Color.Lerp(KbKivi, EmSeepia, 0.28f);
            // Julkisivu: pisteestä a pisteeseen b (maassa), ulospäin n, ikkunoita k; paikka(i) korvaa tasavälin (yövalojen kohdat).
            void Rivit(Vector3 a, Vector3 b, Vector3 n, int k, bool kehykset, int kappeli = 0, Func<int, Vector3> paikka = null)
            {
                for (int i = 0; i < k; i++)
                {
                    var p = paikka != null ? paikka(i) : Vector3.Lerp(a, b, (i + 0.5f) / k);
                    // Toinen kerros: korkea ikkuna (kehys ja ruutu).
                    if (kehykset) r.Laatta(p + Vector3.up * KbIkkunaY, n, 0.0155f, 0.025f, kehys);
                    r.Laatta(p + Vector3.up * KbIkkunaY + n * 0.0006f, n, 0.0112f, 0.021f, KbAukko);
                    // Pohjakerros: kappelin suippokaaret tai ikkuna kolmiopäätyineen.
                    if (i >= k - kappeli)
                    {
                        r.Holvi(p + Vector3.up * (y0 + 0.02f), n, 0.0105f, 0.024f, KbAukko);
                        continue;
                    }
                    r.Laatta(p + Vector3.up * KbAlaIkkunaY + n * 0.0006f, n, 0.009f, 0.013f, KbAukko);
                    if (kehykset)
                    {
                        var q = p + Vector3.up * (y0 + 0.0255f) + n * 0.0019f;
                        var t = Vector3.Cross(Vector3.up, n);
                        r.KolmioUlos(q - t * 0.0065f, q + t * 0.0065f, q + Vector3.up * 0.004f, n, kehys);
                    }
                }
                // Kerrosten välinen lista ja vartiokäytävän lista räystään alla (varjoviiva ja vaalea reunus).
                var m = (a + b) * 0.5f;
                float l = (b - a).magnitude;
                r.Laatta(m + Vector3.up * (y0 + 0.032f), n, l, 0.0022f, lista);
                r.Laatta(m + Vector3.up * (yr - 0.0035f), n, l, 0.007f, kehys);
                r.Laatta(m + Vector3.up * (yr - 0.0082f) + n * 0.0003f, n, l, 0.0016f, Color.Lerp(KbKivi, KbAukko, 0.5f));
            }
            // Ulkojulkisivut: etelä (Telegraftårnetin ja Kakkelborgin välissä, kappeli itäpäässä), pohjoinen, länsi ja itä.
            Rivit(new Vector3(x0 + KbTelegrafL, 0f, z0), new Vector3(x1 - 0.02f, 0f, z0), Vector3.back, KbIkkunoita, true, 3, i => new Vector3(KbIkkunaX(i), 0f, z0));
            Rivit(new Vector3(x0 + 0.022f, 0f, z1), new Vector3(x1 - 0.022f, 0f, z1), Vector3.forward, 9, false);
            Rivit(new Vector3(x0, 0f, z0 + KbTelegrafL - 0.01f), new Vector3(x0, 0f, z1 - 0.022f), Vector3.left, 7, false);
            Rivit(new Vector3(x1, 0f, z0 + 0.022f), new Vector3(x1, 0f, z1 - 0.022f), Vector3.right, KbItaIkkunoita, true, 0, i => new Vector3(x1, 0f, KbItaIkkunaZ(i)));
            // Pihajulkisivut: pohjoissiiven pihapuoli (näkyy etelästä katon yli) kehyksin, muut ruutuina.
            Rivit(new Vector3(xi0 + 0.02f, 0f, zi1), new Vector3(xi1 - 0.02f, 0f, zi1), Vector3.back, KbPihaIkkunoita, true, 0, i => new Vector3(KbPihaIkkunaX(i), 0f, zi1));
            for (int i = 0; i < 5; i++)
            {
                float fz = (i + 0.5f) / 5f;
                r.Laatta(new Vector3(xi0, KbIkkunaY, Mathf.Lerp(zi0 + 0.02f, zi1 - 0.02f, fz)), Vector3.right, 0.011f, 0.02f, KbAukko);
                r.Laatta(new Vector3(xi1, KbIkkunaY, Mathf.Lerp(zi0 + 0.02f, zi1 - 0.02f, fz)), Vector3.left, 0.011f, 0.02f, KbAukko);
            }
            for (int i = 0; i < 6; i++)
                r.Laatta(new Vector3(Mathf.Lerp(xi0 + 0.02f, xi1 - 0.02f, (i + 0.5f) / 6f), KbIkkunaY, zi0), Vector3.forward, 0.011f, 0.02f, KbAukko);
            // Skanderborgin portaali pohjoissiiven pihapuolella: vaalea kehys ja tumma ovi.
            r.Laatta(new Vector3(KbKx, y0 + 0.017f, zi1), Vector3.back, 0.02f, 0.034f, kehys);
            r.Holvi(new Vector3(KbKx, y0 + 0.014f, zi1 - 0.0008f), Vector3.back, 0.011f, 0.024f, KbAukko);
            // Sisäpihan kaivo keskellä (kahdeksankulmainen reunakivi).
            r.Pylvas(new Vector3((xi0 + xi1) * 0.5f, y0, (zi0 + zi1) * 0.5f), 0.0075f, 0.004f, 8, EmKiviVaalea);
            r.Kiekko(new Vector3((xi0 + xi1) * 0.5f, y0 + 0.0042f, (zi0 + zi1) * 0.5f), 0.005f, 0.005f, 8, KbAukko);
        }

        // ---- Tornit ----

        /// <summary>Monikulmainen vaippa (tahkot akseleiden suuntaan, kun sivuja 8): keskipohja p, korkeudet y0–y1, säteet.</summary>
        static void KbVaippa(Rakentaja r, Vector3 p, float r0, float r1, float y0, float y1, Color vari, int sivuja = 8) =>
            r.Vaippa(new Vector3(p.x, y0, p.z), r0, r1, y1 - y0, sivuja, vari, Mathf.PI / sivuja);

        /// <summary>Vaakasuora kansi (monikulmio samoissa kulmissa kuin KbVaippa).</summary>
        static void KbKansi(Rakentaja r, Vector3 p, float sade, float y, Color vari, int sivuja = 8)
        {
            var k = new Vector3(p.x, y, p.z);
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = Mathf.PI / sivuja + i * Mathf.PI * 2f / sivuja, a1 = a0 + Mathf.PI * 2f / sivuja;
                r.KolmioUlos(k, k + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * sade, k + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * sade, Vector3.up, vari);
            }
        }

        /// <summary>Parveke eli kaiteellinen galleria: matala leveä monikulmiolevy (vaippa ja kansi).</summary>
        static void KbGalleria(Rakentaja r, Vector3 p, float sade, float y, float h, Color vari, int sivuja = 8)
        {
            KbVaippa(r, p, sade, sade, y, y + h, vari, sivuja);
            KbKansi(r, p, sade, y + h, vari, sivuja);
        }

        /// <summary>Sipuli: pullistuu säteestä r0 säteeseen rMax (h1) ja kapenee säteeseen r1 (h2).</summary>
        static void KbSipuli(Rakentaja r, Vector3 p, float y, float r0, float rMax, float r1, float h1, float h2, Color vari, int sivuja = 8)
        {
            KbVaippa(r, p, r0, rMax, y, y + h1, vari, sivuja);
            KbVaippa(r, p, rMax, r1, y + h1, y + h1 + h2, vari, sivuja);
        }

        /// <summary>Lyhty: avoin kerros, jossa pylväät (kupari) ja aukot (muste) vuorottelevat tahkoittain.</summary>
        static void KbLyhty(Rakentaja r, Vector3 p, float sade, float y0, float y1, int sivuja = 8)
        {
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = Mathf.PI / sivuja + i * Mathf.PI * 2f / sivuja, a1 = a0 + Mathf.PI * 2f / sivuja;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * sade, d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * sade;
                var q = new Vector3(p.x, 0f, p.z);
                var n = (d0 + d1) * 0.5f;
                r.NelioUlos(q + d0 + Vector3.up * y0, q + d1 + Vector3.up * y0, q + d1 + Vector3.up * y1, q + d0 + Vector3.up * y1, n, i % 2 == 0 ? KbKupari : EmMuste);
            }
        }

        /// <summary>Tornien paikat: kulmatornit linnan kulmissa, Telegraftårnet lounaiskulman sisällä (työntyy 0,01 ulos),
        /// Trompetertårnet sisäpihalla eteläsiiven keskellä ja porrastornit sisäpihan pohjoiskulmissa.</summary>
        static Vector3 KbKongensP => new Vector3(KbX0, 0f, KbZ1);
        static Vector3 KbDronningensP => new Vector3(KbX1, 0f, KbZ1);
        static Vector3 KbKakkelborgP => new Vector3(KbX1, 0f, KbZ0);
        static Vector3 KbTelegrafP => new Vector3(KbX0 + 0.024f, 0f, KbZ0 + 0.024f);
        static Vector3 KbTrompeterP => new Vector3(KbKx, 0f, KbZ0 + KbSiipiE + 0.023f);
        /// <summary>Telegraftårnetin sivu ja korkeus (reunalista päällä).</summary>
        const float KbTelegrafL = 0.068f, KbTelegrafH = 0.168f;
        /// <summary>Trompetertårnetin alemman lyhdyn ja majakan lyhdyn korkeudet (yövalojen pivotit) sekä neulan kärki.</summary>
        const float KbTrLyhtyY0 = 0.261f, KbTrLyhtyY1 = 0.285f, KbMajakkaY0 = 0.137f, KbMajakkaY1 = 0.178f, KbTrKarki = 0.42f;
        /// <summary>Telegraftårnetin tasakatto (tumma kivi, erottuu vaaleista seinistä).</summary>
        static readonly Color KbTasakatto = Hex(0xa8977a);

        /// <summary>
        /// Tornit: Kongens tårn (luode, kahdeksankulmainen, parveke, korkea kerros ja kuparikypärä), Dronningens tårn (koillinen,
        /// parveke, majakkalyhty ja kuparikupoli tähtikruunuineen), Kakkelborg (kaakko, hoikka, parveke ja kivikupoli),
        /// Telegraftårnet (lounas, 15,8 m:n neliö ja tasakatto reunalistoineen), Trompetertårnet (sisäpihalla eteläsiiven
        /// keskellä: runko, parveke, helma, iso sipuli, avoin lyhty, pieni sipuli ja neula kultanuppeineen) ja kaksi
        /// porrastornia vihreine kupoleineen. Ohuet tornit jäävät ääriviivan kynnyksen alle.
        /// </summary>
        static void KbTornit(Rakentaja r, bool lahi)
        {
            int n = 8;
            // Kongens tårn (luode).
            var k = KbKongensP;
            r.AloitaOsa();
            KbVaippa(r, k, 0.022f, 0.022f, KbV, 0.132f, KbKivi, n);
            KbGalleria(r, k, 0.027f, 0.132f, 0.006f, KbKivi, n);
            KbVaippa(r, k, 0.017f, 0.017f, 0.138f, 0.188f, KbKivi, n);
            KbVaippa(r, k, 0.0195f, 0.013f, 0.188f, 0.2f, KbKupari, n);
            r.Kartio(new Vector3(k.x, 0.2f, k.z), 0.013f, 0.11f, n, KbKupari);
            r.LopetaOsa();
            // Dronningens tårn (koillinen): majakka (Kronborg Fyr) ja kupoli.
            var q = KbDronningensP;
            r.AloitaOsa();
            KbVaippa(r, q, 0.022f, 0.022f, KbV, 0.13f, KbKivi, n);
            KbGalleria(r, q, 0.027f, 0.13f, 0.006f, KbKivi, n);
            KbVaippa(r, q, 0.016f, 0.016f, KbMajakkaY0 - 0.001f, KbMajakkaY1, EmKiviVaalea, n);
            KbSipuli(r, q, KbMajakkaY1, 0.018f, 0.018f, 0.01f, 0.012f, 0.022f, KbKupari, n);
            r.Kartio(new Vector3(q.x, KbMajakkaY1 + 0.034f, q.z), 0.0055f, 0.04f, 6, KbKupari);
            r.LopetaOsa();
            // Majakan ikkunat kameran puolella (tummat; yöllä hehku niiden edessä).
            for (int i = 0; i < 3; i++)
            {
                float a = Mathf.PI * (1.25f + 0.25f * i);
                var dn = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                r.Laatta(new Vector3(q.x, (KbMajakkaY0 + KbMajakkaY1) * 0.5f, q.z) + dn * 0.0148f, dn, 0.01f, 0.024f, KbAukko);
            }
            // Kakkelborg (kaakko).
            var kb = KbKakkelborgP;
            r.AloitaOsa();
            KbVaippa(r, kb, 0.019f, 0.019f, KbV, 0.124f, KbKivi, n);
            KbGalleria(r, kb, 0.024f, 0.124f, 0.005f, KbKivi, n);
            KbVaippa(r, kb, 0.014f, 0.014f, 0.129f, 0.166f, KbKivi, n);
            KbSipuli(r, kb, 0.166f, 0.0155f, 0.0155f, 0.007f, 0.011f, 0.022f, EmKiviVaalea, n);
            r.Kartio(new Vector3(kb.x, 0.199f, kb.z), 0.005f, 0.022f, 6, EmKiviVaalea);
            r.LopetaOsa();
            // Telegraftårnet (lounas): massiivinen neliö, reunalista ja tasakatto.
            var tp = KbTelegrafP;
            r.AloitaOsa();
            r.Laatikko(new Vector3(tp.x, KbV, tp.z), new Vector3(KbTelegrafL, KbTelegrafH - KbV, KbTelegrafL), KbKivi, KbKivi);
            r.Laatikko(new Vector3(tp.x, KbTelegrafH, tp.z), new Vector3(KbTelegrafL + 0.006f, 0.007f, KbTelegrafL + 0.006f), EmKiviVaalea, KbTasakatto);
            r.LopetaOsa();
            r.Laatta(new Vector3(tp.x - 0.014f, 0.112f, tp.z - KbTelegrafL * 0.5f), Vector3.back, 0.006f, 0.014f, KbAukko);
            r.Laatta(new Vector3(tp.x + 0.012f, 0.078f, tp.z - KbTelegrafL * 0.5f), Vector3.back, 0.006f, 0.014f, KbAukko);
            // Trompetertårnet.
            var t = KbTrompeterP;
            r.AloitaOsa();
            KbVaippa(r, t, 0.023f, 0.023f, KbV, 0.205f, KbKivi, n);
            KbGalleria(r, t, 0.027f, 0.205f, 0.006f, KbKivi, n);
            KbVaippa(r, t, 0.025f, 0.018f, 0.211f, 0.222f, KbKupari, n);
            KbSipuli(r, t, 0.222f, 0.018f, 0.0205f, 0.0095f, 0.013f, KbTrLyhtyY0 - 0.235f, KbKupari, n);
            KbLyhty(r, t, 0.0095f, KbTrLyhtyY0, KbTrLyhtyY1, n);
            KbSipuli(r, t, KbTrLyhtyY1, 0.011f, 0.012f, 0.0055f, 0.006f, 0.012f, KbKupari, 6);
            r.Kartio(new Vector3(t.x, KbTrLyhtyY1 + 0.018f, t.z), 0.0052f, KbTrKarki - KbTrLyhtyY1 - 0.018f, 6, KbKupari);
            r.LopetaOsa();
            r.Timantti(new Vector3(t.x, KbTrKarki + 0.004f, t.z), 0.0035f, 0.0042f, EmKulta, 4);
            // Porrastornit sisäpihan pohjoiskulmissa (vihreät kupolit).
            foreach (float sx in new[] { -1f, 1f })
            {
                var p = new Vector3(sx < 0 ? KbX0 + KbSiipiL + 0.012f : KbX1 - KbSiipiI - 0.012f, 0f, KbZ1 - KbSiipiP - 0.012f);
                KbVaippa(r, p, 0.012f, 0.012f, KbV, 0.14f, KbKivi, 6);
                KbSipuli(r, p, 0.14f, 0.0135f, 0.0135f, 0.004f, 0.006f, 0.017f, KbKupari, 6);
                if (lahi)
                    foreach (float a in new[] { 1.5f, 1.1f })
                    {
                        var dn = new Vector3(Mathf.Cos(Mathf.PI * a), 0f, Mathf.Sin(Mathf.PI * a));
                        r.Laatta(p + dn * 0.0105f + Vector3.up * 0.09f, dn, 0.0045f, 0.01f, KbAukko);
                    }
            }
            if (lahi) KbLhTornit(r);
        }

        /// <summary>Ikkuna kahdeksankulmaisen tornin tahkossa: keskipiste p, suunta (rad), säde (tahkon etäisyys), korkeus y.</summary>
        static void KbLhTorniIkkuna(Rakentaja r, Vector3 p, float kulma, float sade, float y, float lev, float kork)
        {
            var dn = new Vector3(Mathf.Cos(kulma), 0f, Mathf.Sin(kulma));
            r.Laatta(new Vector3(p.x, y, p.z) + dn * (sade * Mathf.Cos(Mathf.PI / 8f)), dn, lev, kork, KbAukko);
        }

        /// <summary>Parvekkeen kaide: tummien aukkojen rivi gallerian yläpuolella (vuorotellen kiveä ja aukkoa, tahkoittain).</summary>
        static void KbLhKaide(Rakentaja r, Vector3 p, float sade, float y, float h)
        {
            for (int i = 0; i < 8; i++)
            {
                float a0 = Mathf.PI / 8f + i * Mathf.PI / 4f, a1 = a0 + Mathf.PI / 4f;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * sade, d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * sade;
                var q = new Vector3(p.x, 0f, p.z);
                r.NelioUlos(q + d0 + Vector3.up * y, q + d1 + Vector3.up * y, q + d1 + Vector3.up * (y + h), q + d0 + Vector3.up * (y + h), (d0 + d1) * 0.5f,
                    i % 2 == 0 ? EmKiviVaalea : Color.Lerp(KbKivi, KbAukko, 0.55f));
            }
        }

        /// <summary>
        /// Tornien lähitaso: ikkunat rungoissa ja yläkerroksissa, parvekkeiden kaiteet, Kongens tårnin kypärän kattoikkunat ja
        /// kuulat, majakan ikkunat ympäri ja tähtikruunu, Trompetertårnetin ikkunat, kellotaulu, kaide ja tuuliviiri sekä
        /// Telegraftårnetin ikkunaraot, rintamuuri ja konsolivyö.
        /// </summary>
        static void KbLhTornit(Rakentaja r)
        {
            float r8 = Mathf.PI / 4f;
            // Kongens tårn: ikkunat ulospäin (etelä-, länsi- ja pohjoistahko), kaide, yläkerroksen ikkunat, kypärän kattoikkunat ja kuulat.
            var k = KbKongensP;
            foreach (float a in new[] { Mathf.PI, Mathf.PI * 0.75f, Mathf.PI * 0.5f }) KbLhTorniIkkuna(r, k, a, 0.022f, 0.08f, 0.006f, 0.014f);
            KbLhKaide(r, k, 0.027f, 0.138f, 0.005f);
            for (int i = 0; i < 4; i++) KbLhTorniIkkuna(r, k, Mathf.PI * 0.5f + i * r8 * 2f, 0.017f, 0.163f, 0.0055f, 0.018f);
            for (int i = 0; i < 4; i++)
            {
                float a = Mathf.PI / 4f + i * Mathf.PI / 2f;
                var dn = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                var q = new Vector3(k.x, 0.202f, k.z) + dn * 0.0118f;
                r.KolmioUlos(q - Vector3.Cross(Vector3.up, dn) * 0.0025f, q + Vector3.Cross(Vector3.up, dn) * 0.0025f, q + Vector3.up * 0.007f + dn * 0.001f, dn, KbKupari);
            }
            r.Timantti(new Vector3(k.x, 0.245f, k.z), 0.0045f, 0.004f, KbKupari, 4);
            r.Timantti(new Vector3(k.x, 0.312f, k.z), 0.0022f, 0.0026f, EmKulta, 4);
            // Dronningens tårn: ikkunat, kaide, majakan ikkunat ympäri ja tähtikruunu (kahdeksan piikkiä kupolin juurella).
            var q2 = KbDronningensP;
            foreach (float a in new[] { 0f, Mathf.PI * 0.25f, Mathf.PI * 0.5f, Mathf.PI * 1.75f }) KbLhTorniIkkuna(r, q2, a, 0.022f, 0.08f, 0.006f, 0.014f);
            KbLhKaide(r, q2, 0.027f, 0.136f, 0.005f);
            foreach (float a in new[] { 0f, Mathf.PI * 0.25f, Mathf.PI * 0.5f, Mathf.PI * 0.75f, Mathf.PI })
                KbLhTorniIkkuna(r, q2, a, 0.016f, (KbMajakkaY0 + KbMajakkaY1) * 0.5f, 0.009f, 0.024f);
            for (int i = 0; i < 8; i++)
            {
                float a = i * r8;
                var dn = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                r.Kartio(new Vector3(q2.x, KbMajakkaY1 + 0.001f, q2.z) + dn * 0.0165f, 0.0018f, 0.007f, 3, KbKupari);
            }
            r.Timantti(new Vector3(q2.x, KbMajakkaY1 + 0.075f, q2.z), 0.002f, 0.0025f, EmKulta, 4);
            // Kakkelborg: ikkunat ja kaide.
            var kb = KbKakkelborgP;
            foreach (float a in new[] { Mathf.PI * 1.5f, Mathf.PI * 1.75f, 0f }) KbLhTorniIkkuna(r, kb, a, 0.019f, 0.075f, 0.0055f, 0.013f);
            KbLhKaide(r, kb, 0.024f, 0.129f, 0.0045f);
            foreach (float a in new[] { Mathf.PI * 1.5f, 0f }) KbLhTorniIkkuna(r, kb, a, 0.014f, 0.148f, 0.005f, 0.014f);
            // Trompetertårnet: ikkunat, kellotaulu etelään, kaide ja tuuliviiri (neulan kärjen alla, siluetin sisällä).
            var t = KbTrompeterP;
            foreach (float a in new[] { Mathf.PI * 1.25f, Mathf.PI * 1.75f }) KbLhTorniIkkuna(r, t, a, 0.023f, 0.19f, 0.005f, 0.014f);
            var kello = new Vector3(t.x, 0.19f, t.z - 0.0213f);
            r.Laatta(kello, Vector3.back, 0.011f, 0.011f, KbPaatyVari);
            r.Laatta(kello + Vector3.back * 0.0004f, Vector3.back, 0.007f, 0.007f, KbAukko);
            KbLhKaide(r, t, 0.027f, 0.211f, 0.005f);
            r.Kalvo(new Vector3(t.x, KbTrKarki - 0.001f, t.z), new Vector3(t.x + 0.01f, KbTrKarki - 0.001f, t.z), new Vector3(t.x + 0.01f, KbTrKarki + 0.0055f, t.z),
                new Vector3(t.x, KbTrKarki + 0.0055f, t.z), EmKulta);
            // Telegraftårnet: ikkunarakoja, konsolivyö reunalistan alla ja matala rintamuuri tasakaton reunalla.
            var tp = KbTelegrafP;
            float hl = KbTelegrafL * 0.5f;
            foreach (var (dx, y) in new[] { (-0.018f, 0.125f), (0.004f, 0.125f), (0.018f, 0.095f), (-0.006f, 0.058f) })
                r.Laatta(new Vector3(tp.x + dx, y, tp.z - hl), Vector3.back, 0.0045f, 0.012f, KbAukko);
            foreach (float dz in new[] { -0.012f, 0.014f })
                r.Laatta(new Vector3(tp.x - hl, 0.11f, tp.z + dz), Vector3.left, 0.0045f, 0.012f, KbAukko);
            foreach (var (n, u) in new[] { (Vector3.back, Vector3.right), (Vector3.left, Vector3.forward), (Vector3.right, Vector3.forward), (Vector3.forward, Vector3.right) })
            {
                r.Laatta(new Vector3(tp.x, KbTelegrafH - 0.004f, tp.z) + n * hl, n, KbTelegrafL, 0.0035f, Color.Lerp(KbKivi, KbAukko, 0.45f));
                var m = new Vector3(tp.x, KbTelegrafH + 0.007f, tp.z) + n * (hl + 0.0015f);
                r.Laatikko(m, new Vector3(Mathf.Abs(u.x) * (KbTelegrafL + 0.004f) + Mathf.Abs(n.x) * 0.003f, 0.005f, Mathf.Abs(u.z) * (KbTelegrafL + 0.004f) + Mathf.Abs(n.z) * 0.003f),
                    EmKiviVaalea, EmKiviVaalea);
            }
        }

        // ---- Tykit ja puut ----

        /// <summary>Kaakkoisbastionin tykit etupinnalla (tummat putket etelään) ja tullilaituri bastionin alla rannassa.</summary>
        static Vector3 KbTykkiP => KbL(0.228f, KbV, -0.27f);
        static Vector3 KbTykinSuu => KbTykkiP + new Vector3(0f, 0.006f, -0.012f);
        static Vector3 KbTulliLaituri => new Vector3(KbTulliX, 0f, KbRantaZ(KbTulliX));

        static void KbTykit(Rakentaja r, bool lahi)
        {
            foreach (float dx in new[] { -0.034f, 0f })
            {
                var p = KbTykkiP + new Vector3(dx, 0f, 0f);
                r.Laatikko(p + new Vector3(0f, 0f, 0.001f), new Vector3(0.007f, 0.004f, 0.009f), EmSeepia, EmSeepia);
                r.Laatikko(p + new Vector3(0f, 0.003f, -0.006f), new Vector3(0.0032f, 0.0032f, 0.014f), EmMuste, EmMuste);
            }
            // Tullilaituri: kapea lankkulaituri rannasta kaistaan.
            var l = KbTulliLaituri;
            r.NelioUlos(new Vector3(l.x - 0.004f, 0.004f, l.z + 0.006f), new Vector3(l.x + 0.004f, 0.004f, l.z + 0.006f), new Vector3(l.x + 0.004f, 0.004f, l.z - 0.02f),
                new Vector3(l.x - 0.004f, 0.004f, l.z - 0.02f), Vector3.up, EmSeepia);
            r.NelioUlos(new Vector3(l.x - 0.004f, 0f, l.z - 0.02f), new Vector3(l.x + 0.004f, 0f, l.z - 0.02f), new Vector3(l.x + 0.004f, 0.004f, l.z - 0.02f),
                new Vector3(l.x - 0.004f, 0.004f, l.z - 0.02f), Vector3.back, EmMuste);
            if (!lahi) return;
            // Lähitaso: laiturin paalut ja kolmas tykki kaakkoisbastionissa.
            foreach (float dz in new[] { -0.019f, -0.009f })
                foreach (float dx in new[] { -0.0045f, 0.0045f })
                    r.Pylvas(new Vector3(l.x + dx, 0f, l.z + dz), 0.0011f, 0.0062f, 4, EmMuste);
            var p3 = KbTykkiP + new Vector3(-0.068f, 0f, 0.004f);
            r.Laatikko(p3 + new Vector3(0f, 0f, 0.001f), new Vector3(0.007f, 0.004f, 0.009f), EmSeepia, EmSeepia);
            r.Laatikko(p3 + new Vector3(0f, 0.003f, -0.006f), new Vector3(0.0032f, 0.0032f, 0.014f), EmMuste, EmMuste);
        }

        /// <summary>Puut (tumma oliivi, ei ääriviivaa): vain lähitasossa.</summary>
        static void KbPuut(Rakentaja r, bool lahi)
        {
            if (!lahi) return;
            // Lähitaso: muutama puu Kruunuvarustuksen puolella vallihaudan länsipuolella (rungossa ei puita: 40 pt:ssä ne luettiin
            // nuolina) ja sataman terminaalin takana. Kuusitahkoinen latvus ja tumma runko.
            foreach (var (x, z, s) in new[] { (-0.325f, -0.06f, 1f), (-0.36f, 0.1f, 0.9f), (-0.31f, 0.25f, 1.1f), (-0.47f, -0.25f, 0.8f), (-0.345f, -0.25f, 0.85f) })
            {
                r.Pylvas(new Vector3(x, 0f, z), 0.0018f, 0.008f * s, 4, EmSeepia);
                r.Timantti(new Vector3(x, 0.016f * s, z), 0.0105f * s, 0.01f * s, EmPuu, 6);
            }
        }

        // ---- Liikkuvat osat ----

        /// <summary>Lautan lepopaikka laiturissa (pivot vesirajassa), laivan ja tulliveneen pivotit sekä tullin kohta.</summary>
        static Vector3 KbLauttaPivot => new Vector3(KbLaituriX, KbVesiY, KbLauttaZ);
        static Vector3 KbLaivaPivot => new Vector3(KbTulliX, KbVesiY, KbLaivaZ);
        static Vector3 KbTullivenePivot => new Vector3(KbTulliX + 0.021f, KbVesiY, KbRantaZ(KbTulliX) - 0.013f);
        static Vector3 KbRoiskePivot => new Vector3(KbTulliX - 0.09f, KbVesiY, KbLaivaZ);
        /// <summary>Haamun polun keskikohta eteläisen kurtiinin vallin ulkoreunalla (rintavarustuksen takana): 30°:n
        /// kallistuksessa haamu näkyy ruohoa vasten eikä vaaleaa julkisivua vasten.</summary>
        static Vector3 KbHaamuPivot => KbL(0f, KbV, -0.209f);

        /// <summary>
        /// Lautta (pivot vesirajassa keskellä, pituus X-akselilla): kaksisuuntainen kuten reitin lautat, joten keula ja perä ovat
        /// samanlaiset. Paperinvalkoinen runko, jonka alaosa on mustetta, kansi, pitkä kansirakennus tummine ikkunarivein ja
        /// keskellä komentosilta. Noin neljäsosa oikeasta 111 m:stä, jottei lautta peitä linnaa.
        /// </summary>
        static Mesh KronborgLautta()
        {
            var r = new Rakentaja();
            var reuna = new[] { new Vector3(0.046f, 0f, 0f), new Vector3(0.034f, 0f, 0.011f), new Vector3(-0.034f, 0f, 0.011f),
                new Vector3(-0.046f, 0f, 0f), new Vector3(-0.034f, 0f, -0.011f), new Vector3(0.034f, 0f, -0.011f) };
            const float ha = 0.0035f, hk = 0.0075f;
            var keski = new Vector3(0f, hk * 0.5f, 0f);
            for (int i = 0; i < reuna.Length; i++)
            {
                var a = reuna[i]; var b = reuna[(i + 1) % reuna.Length];
                r.NelioKeskelta(a, b, b + Vector3.up * ha, a + Vector3.up * ha, keski, EmMuste);
                r.NelioKeskelta(a + Vector3.up * ha, b + Vector3.up * ha, b + Vector3.up * hk, a + Vector3.up * hk, keski, KbLauttaVari);
            }
            var yk = Vector3.up * hk;
            r.KolmioUlos(reuna[0] + yk, reuna[1] + yk, reuna[5] + yk, Vector3.up, KbLauttaVari);
            r.NelioUlos(reuna[1] + yk, reuna[2] + yk, reuna[4] + yk, reuna[5] + yk, Vector3.up, KbLauttaVari);
            r.KolmioUlos(reuna[2] + yk, reuna[3] + yk, reuna[4] + yk, Vector3.up, KbLauttaVari);
            // Kansirakennus ja ikkunarivit.
            r.Laatikko(new Vector3(0f, hk, 0f), new Vector3(0.058f, 0.0085f, 0.017f), KbLauttaVari, KbLauttaVari);
            foreach (float s in new[] { -1f, 1f })
                r.Laatta(new Vector3(0f, hk + 0.0052f, s * 0.0085f), new Vector3(0f, 0f, s), 0.052f, 0.0022f, EmMuste);
            // Komentosilta keskellä.
            r.Laatikko(new Vector3(0f, hk + 0.0085f, 0f), new Vector3(0.016f, 0.0055f, 0.013f), KbLauttaVari, EmKiviVaalea);
            return r.Verkko("Kronborg-lautta");
        }

        /// <summary>Lautan vana (pivot lautan pivotissa): vaahto-V −X-pään takana, kaksi kapenevaa viirua (ilman ääriviivaa).</summary>
        static Mesh KronborgLauttaVana()
        {
            var r = new Rakentaja();
            foreach (float s in new[] { -1f, 1f })
            {
                Vector3 a = new Vector3(-0.042f, 0.0004f, s * 0.008f), m = new Vector3(-0.07f, 0.0004f, s * 0.017f), b = new Vector3(-0.1f, 0.0004f, s * 0.024f);
                var t = new Vector3(0f, 0f, 0.0028f);
                r.NelioUlos(a - t, m - t * 0.7f, m + t * 0.7f, a + t, Vector3.up, EmVaahto);
                r.NelioUlos(m - t * 0.7f, b - t * 0.25f, b + t * 0.25f, m + t * 0.7f, Vector3.up, EmVaahto);
            }
            return r.Verkko("Kronborg-lauttavana");
        }

        /// <summary>Lautan yövalot (pivot lautan pivotissa): lämmin ikkunarivi kummallakin kyljellä tummien ikkunoiden edessä ja
        /// komentosillan ikkunat.</summary>
        static Mesh KronborgLauttaValot()
        {
            var r = new Rakentaja();
            const float hk = 0.0075f;
            foreach (float s in new[] { -1f, 1f })
            {
                r.Laatta(new Vector3(0f, hk + 0.0052f, s * 0.0092f), new Vector3(0f, 0f, s), 0.05f, 0.0024f, EmIkkunavalo);
                r.Laatta(new Vector3(0f, hk + 0.011f, s * 0.0068f), new Vector3(0f, 0f, s), 0.013f, 0.002f, KbLyhtyValo);
            }
            return r.Verkko("Kronborg-lauttavalot");
        }

        /// <summary>
        /// Purjealus (pivot vesirajassa keskellä, keula +X): tumma seepiarunko, vaaleampi kansi, keulapuu ja kolme mastoa
        /// (kaksipuoliset ohuet levyt). Purjeet ovat oma osansa, jotta ne voivat lepattaa.
        /// </summary>
        static Mesh KronborgLaiva()
        {
            var r = new Rakentaja();
            float k = KbLaivaK;
            var reuna = new[] { new Vector3(0.035f, 0f, 0f) * k, new Vector3(0.018f, 0f, 0.0085f) * k, new Vector3(-0.026f, 0f, 0.0078f) * k,
                new Vector3(-0.031f, 0f, 0f) * k, new Vector3(-0.026f, 0f, -0.0078f) * k, new Vector3(0.018f, 0f, -0.0085f) * k };
            float hr = 0.0085f * k;
            var keski = new Vector3(0f, hr * 0.5f, 0f);
            for (int i = 0; i < reuna.Length; i++)
            {
                var a = reuna[i]; var b = reuna[(i + 1) % reuna.Length];
                r.NelioKeskelta(a * 0.8f, b * 0.8f, b + Vector3.up * hr, a + Vector3.up * hr, keski, KbLaivaRunko);
            }
            var yk = Vector3.up * hr;
            r.KolmioUlos(reuna[0] + yk, reuna[1] + yk, reuna[5] + yk, Vector3.up, EmSeepia);
            r.NelioUlos(reuna[1] + yk, reuna[2] + yk, reuna[4] + yk, reuna[5] + yk, Vector3.up, EmSeepia);
            r.KolmioUlos(reuna[2] + yk, reuna[3] + yk, reuna[4] + yk, Vector3.up, EmSeepia);
            // Keulapuu.
            r.Kalvo(new Vector3(0.033f * k, hr, -0.0009f), new Vector3(0.054f * k, hr + 0.006f * k, -0.0009f), new Vector3(0.054f * k, hr + 0.006f * k, 0.0009f),
                new Vector3(0.033f * k, hr, 0.0009f), EmMuste);
            // Mastot.
            foreach (var (mx, mh) in KbMastot)
                r.Kalvo(new Vector3(mx * k - 0.001f, hr, 0f), new Vector3(mx * k + 0.001f, hr, 0f), new Vector3(mx * k + 0.0008f, hr + mh * k, 0f),
                    new Vector3(mx * k - 0.0008f, hr + mh * k, 0f), EmMuste);
            return r.Verkko("Kronborg-laiva");
        }

        /// <summary>Purjealuksen mittakaava (0,066 × 1,25 ≈ 0,083 pitkä runko): purjeet luetaan vielä 40 pt:ssä.</summary>
        const float KbLaivaK = 1.25f;
        /// <summary>Mastojen paikat (x) ja korkeudet kannesta (ennen mittakaavaa).</summary>
        static readonly (float x, float h)[] KbMastot = { (0.017f, 0.05f), (-0.002f, 0.056f), (-0.02f, 0.044f) };

        /// <summary>
        /// Purjeet (pivot laivan pivotissa): kussakin mastossa kaksi raakapurjetta poikittain (kaksipuoliset levyt) ja
        /// keulapurje keulapuuhun. Paperin sävy; lepattaessa liikeydin keinuttaa koko purjeistoa.
        /// </summary>
        static Mesh KronborgPurjeet()
        {
            var r = new Rakentaja();
            float k = KbLaivaK, hr = 0.0085f * k;
            foreach (var (mx, mh0) in KbMastot)
            {
                float mh = mh0 * k;
                float w0 = 0.0135f * k * (mh0 / 0.05f), w1 = 0.011f * k * (mh0 / 0.05f);
                float y0 = hr + mh * 0.3f, y1 = hr + mh * 0.62f, y2 = hr + mh * 0.66f, y3 = hr + mh * 0.92f;
                float x = mx * k + 0.0015f;
                r.Kalvo(new Vector3(x, y0, -w0), new Vector3(x, y0, w0), new Vector3(x, y1, w0 * 0.92f), new Vector3(x, y1, -w0 * 0.92f), KbPurje);
                r.Kalvo(new Vector3(x, y2, -w1), new Vector3(x, y2, w1), new Vector3(x, y3, w1 * 0.8f), new Vector3(x, y3, -w1 * 0.8f), KbPurje);
            }
            r.KalvoKolmio(new Vector3(0.019f * k, hr + 0.045f * k, 0f), new Vector3(0.052f * k, hr + 0.007f * k, 0f), new Vector3(0.022f * k, hr + 0.012f * k, 0f), KbPurje);
            return r.Verkko("Kronborg-purjeet");
        }

        /// <summary>Laivan vana (pivot laivan pivotissa): kapea vaahto-V perän takana.</summary>
        static Mesh KronborgLaivaVana()
        {
            var r = new Rakentaja();
            foreach (float s in new[] { -1f, 1f })
            {
                Vector3 a = new Vector3(-0.037f, 0.0004f, s * 0.006f), b = new Vector3(-0.085f, 0.0004f, s * 0.019f);
                var t = new Vector3(0f, 0f, 0.0025f);
                r.NelioUlos(a - t, b - t * 0.3f, b + t * 0.3f, a + t, Vector3.up, EmVaahto);
            }
            return r.Verkko("Kronborg-laivavana");
        }

        /// <summary>Tullivene (pivot vesirajassa keskellä, keula +X, pituus 0,03): vaalea puurunko, paperinvaalea sisus, kaksi
        /// soutajaa (muste) ja airot.</summary>
        static Mesh KronborgTullivene()
        {
            var r = new Rakentaja();
            const float k = 1.3f;
            var reuna = new[] { new Vector3(0.012f, 0f, 0f) * k, new Vector3(0.002f, 0f, 0.0045f) * k, new Vector3(-0.011f, 0f, 0.0035f) * k,
                new Vector3(-0.011f, 0f, -0.0035f) * k, new Vector3(0.002f, 0f, -0.0045f) * k };
            const float hr = 0.004f * k;
            var keski = new Vector3(0f, hr * 0.5f, 0f);
            for (int i = 0; i < reuna.Length; i++)
            {
                var a = reuna[i]; var b = reuna[(i + 1) % reuna.Length];
                r.NelioKeskelta(a * 0.8f, b * 0.8f, b + Vector3.up * hr, a + Vector3.up * hr, keski, KbTulliveneVari);
            }
            var yk = Vector3.up * hr;
            r.KolmioUlos(reuna[0] + yk, reuna[1] + yk, reuna[4] + yk, Vector3.up, EmPaperi);
            r.NelioUlos(reuna[1] + yk, reuna[2] + yk, reuna[3] + yk, reuna[4] + yk, Vector3.up, EmPaperi);
            r.Kartio(new Vector3(0.003f * k, hr, 0f), 0.0026f * k, 0.008f * k, 3, EmMuste);
            r.Kartio(new Vector3(-0.005f * k, hr, 0f), 0.0026f * k, 0.008f * k, 3, EmMuste);
            foreach (float s in new[] { -1f, 1f })
                r.NelioUlos(new Vector3(0.0005f, hr + 0.0015f, s * 0.002f) * k, new Vector3(0.0025f, hr + 0.0015f, s * 0.002f) * k,
                    new Vector3(-0.0005f, 0.0008f, s * 0.013f) * k, new Vector3(-0.0025f, 0.0008f, s * 0.013f) * k, Vector3.up, EmMuste);
            return r.Verkko("Kronborg-tullivene");
        }

        /// <summary>Tulliveneen runko: vaalea puu, joka erottuu sekä vedestä että purjealuksen tummasta rungosta.</summary>
        static readonly Color KbTulliveneVari = Hex(0xc9aa7c);

        /// <summary>Tykinsavu (pivot tykin suulla): kolme möykkyä, yläpinta vaalea ja alapinta seepia (ei ääriviivaa, kukin
        /// kolmio oma pieni osansa). Noin kaksi tykkiä leveä, jotta laukaus näkyy 40 pt:ssä. 3 × 16 kolmiota.</summary>
        static Mesh KronborgSavu()
        {
            var r = new Rakentaja();
            foreach (var (p, s) in new[] { (new Vector3(0f, 0.008f, -0.006f), 0.02f), (new Vector3(-0.016f, 0.019f, 0.004f), 0.016f), (new Vector3(0.015f, 0.017f, 0.003f), 0.014f) })
                KbMoykky(r, p, s);
            return r.Verkko("Kronborg-savu");
        }

        /// <summary>Savumöykky: kahdeksankulmainen kaksoispyramidi, yläpuolisko vaalea ja alapuolisko seepia. 16 kolmiota.</summary>
        static void KbMoykky(Rakentaja r, Vector3 k, float sade)
        {
            Vector3 yla = k + Vector3.up * (sade * 0.9f), ala = k - Vector3.up * (sade * 0.6f);
            var alavari = Color.Lerp(KbSavu, EmSeepia, 0.5f);
            for (int i = 0; i < 8; i++)
            {
                float a0 = i * Mathf.PI / 4f, a1 = (i + 1) * Mathf.PI / 4f;
                Vector3 p0 = k + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * sade, p1 = k + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * sade;
                r.KolmioKeskelta(p0, p1, yla, k, KbSavu);
                r.KolmioKeskelta(p1, p0, ala, k, alavari);
            }
        }

        /// <summary>Roiske (pivot veden pinnassa): vaahtorengas ja viisi kaksipuolista vaahtokieltä, keskimmäinen korkein
        /// (ilman ääriviivaa).</summary>
        static Mesh KronborgRoiske()
        {
            var r = new Rakentaja();
            const int n = 5;
            for (int i = 0; i < n; i++)
            {
                float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n;
                Vector3 s0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)), s1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1));
                var y = Vector3.up * 0.0006f;
                r.NelioUlos(s0 * 0.007f + y, s1 * 0.007f + y, s1 * 0.019f + y, s0 * 0.019f + y, Vector3.up, EmVaahto);
                var m = (s0 + s1).normalized;
                r.KalvoKolmio(m * 0.003f + y, m * 0.015f + y, m * 0.007f + Vector3.up * (0.024f + 0.008f * (i % 2)), EmVaahto);
            }
            r.KalvoKolmio(new Vector3(-0.005f, 0.0006f, 0f), new Vector3(0.005f, 0.0006f, 0f), new Vector3(0f, 0.044f, 0f), EmVaahto);
            return r.Verkko("Kronborg-roiske");
        }

        /// <summary>
        /// Hamletin isän haamu (pivot jalkojen kohdalla vallin laella): paperinvalkoinen hahmo kuuden liuskan viittana (helma
        /// hieman maan yllä), pää, kypärän harja ja koholla oleva käsi eteen (haamu viittoo Hamletia seuraamaan). Korkeus
        /// 0,06 (noin kahdeksankertainen, suhteessa muuriin kuten Malborkin ritarit, jotta hahmo erottuu 40–60 pt:ssä).
        /// Lepoasennossa kasvot etelään (kameraan).
        /// </summary>
        static Mesh KronborgHaamu()
        {
            var r = new Rakentaja();
            const float k = 1.7f;
            r.Vaippa(Vector3.up * (0.002f * k), 0.0075f * k, 0.004f * k, 0.022f * k, 6, KbHaamuVari);
            r.Vaippa(Vector3.up * (0.024f * k), 0.004f * k, 0.0025f * k, 0.003f * k, 6, KbHaamuVari);
            r.Timantti(Vector3.up * (0.0305f * k), 0.0036f * k, 0.0042f * k, KbHaamuVari, 4);
            r.Kartio(Vector3.up * (0.033f * k), 0.002f * k, 0.0055f * k, 3, KbHaamuVari);
            // Koholla oleva käsi eteen (−Z): lepoasennossa haamu katsoo etelään, ja liikeydin kääntää sen kulkusuuntaan.
            r.KalvoKolmio(new Vector3(0.0025f, 0.021f, -0.002f) * k, new Vector3(0.0045f, 0.024f, -0.0025f) * k, new Vector3(0.004f, 0.031f, -0.011f) * k, KbHaamuVari);
            return r.Verkko("Kronborg-haamu");
        }

        // ---- Yövalot ----

        /// <summary>Eteläjulkisivun valojen pivot (julkisivun juuressa keskellä) ja pohjoissiiven pihajulkisivun pivot.</summary>
        static Vector3 KbValotPivot => new Vector3(KbKx, KbV, KbZ0);
        static Vector3 KbValot1Pivot => new Vector3(KbKx, KbV, KbZ1 - KbSiipiP);
        static Vector3 KbLyhty0Pivot => new Vector3(KbTrompeterP.x, (KbTrLyhtyY0 + KbTrLyhtyY1) * 0.5f, KbTrompeterP.z);
        static Vector3 KbLyhty1Pivot => new Vector3(KbDronningensP.x, (KbMajakkaY0 + KbMajakkaY1) * 0.5f, KbDronningensP.z);

        /// <summary>Yövalot eteläjulkisivulla (pivot julkisivun juuressa): lämmin hehku ikkunoiden edessä, päätyjen ikkunat ja
        /// Telegraftårnetin kaksi aukkoa (valaisematon, ei bloomia).</summary>
        static Mesh KronborgValot()
        {
            var r = new Rakentaja();
            var o = KbValotPivot;
            float x0 = KbX0, z0 = KbZ0;
            for (int i = 0; i < KbIkkunoita; i++)
                r.Laatta(new Vector3(KbIkkunaX(i), KbIkkunaY, z0 - 0.001f) - o, Vector3.back, 0.0145f, 0.025f, EmIkkunavalo);
            foreach (float fx in KbPaadytEtela)
                r.Laatta(new Vector3(x0 + fx * 2f * KbP, KbRaystas + 0.02f, z0 - 0.0023f) - o, Vector3.back, 0.0075f, 0.0105f, EmIkkunavalo);
            return r.Verkko("Kronborg-valot");
        }

        /// <summary>Yövalot pohjoissiiven pihajulkisivulla (näkyy etelästä katon yli): ikkunarivi.</summary>
        static Mesh KronborgValot1()
        {
            var r = new Rakentaja();
            var o = KbValot1Pivot;
            float z = KbZ1 - KbSiipiP;
            for (int i = 0; i < KbPihaIkkunoita; i++)
                r.Laatta(new Vector3(KbPihaIkkunaX(i), KbIkkunaY, z - 0.0015f) - o, Vector3.back, 0.013f, 0.022f, EmIkkunavalo);
            return r.Verkko("Kronborg-valot1");
        }

        /// <summary>Itäjulkisivun valojen pivot (julkisivun juuressa keskellä): linna salmen puolelta (lautan näkymä).</summary>
        static Vector3 KbValot2Pivot => new Vector3(KbX1, KbV, KbKz);

        /// <summary>Yövalot itäjulkisivulla (pivot julkisivun juuressa): lämmin hehku toisen kerroksen ikkunoiden edessä.</summary>
        static Mesh KronborgValot2()
        {
            var r = new Rakentaja();
            var o = KbValot2Pivot;
            for (int i = 0; i < KbItaIkkunoita; i++)
                r.Laatta(new Vector3(KbX1 + 0.001f, KbIkkunaY, KbItaIkkunaZ(i)) - o, Vector3.right, 0.013f, 0.022f, EmIkkunavalo);
            return r.Verkko("Kronborg-valot2");
        }

        /// <summary>Trompetertårnetin alemman lyhdyn hehku (pivot lyhdyn keskellä): lämmin rengas lyhdyn aukoissa.</summary>
        static Mesh KronborgLyhty0()
        {
            var r = new Rakentaja();
            float h = (KbTrLyhtyY1 - KbTrLyhtyY0) * 0.8f;
            r.Vaippa(new Vector3(0f, -h * 0.5f, 0f), 0.0112f, 0.0112f, h, 8, KbLyhtyValo, Mathf.PI / 8f);
            return r.Verkko("Kronborg-lyhty0");
        }

        /// <summary>Majakan hehku (Kronborg Fyr, pivot lyhdyn keskellä): lämmin rengas majakkakerroksen ikkunoissa.</summary>
        static Mesh KronborgLyhty1()
        {
            var r = new Rakentaja();
            // Tahkojen etäisyys 0,0185 · cos 22,5° = 0,0171 on majakan tummien ikkunoiden (0,0163) edessä.
            float h = (KbMajakkaY1 - KbMajakkaY0) * 0.85f;
            r.Vaippa(new Vector3(0f, -h * 0.5f, 0f), 0.0185f, 0.0185f, h, 8, KbLyhtyValo, Mathf.PI / 8f);
            return r.Verkko("Kronborg-lyhty1");
        }

        static LiikkuvaOsaMaaritys[] KronborgOsat()
        {
            var lp = KbLauttaPivot; var sp = KbLaivaPivot;
            return new[]
            {
                new LiikkuvaOsaMaaritys { Nimi = "lautta", Verkko = KronborgLautta, Pivot = lp, Liike = Liike.Liuku, Akseli = Vector3.right, Laajuus = 0.5f, KayS = 24f, TaukoS = 30f },
                new LiikkuvaOsaMaaritys { Nimi = "lauttavana", Verkko = KronborgLauttaVana, Pivot = lp, Liike = Liike.Liuku, Akseli = Vector3.right, Laajuus = 0.5f, KayS = 24f, TaukoS = 30f },
                new LiikkuvaOsaMaaritys { Nimi = "lauttavalot", Verkko = KronborgLauttaValot, Pivot = lp, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "laiva", Verkko = KronborgLaiva, Pivot = sp, Liike = Liike.Liuku, Akseli = Vector3.left, Laajuus = 0.55f, KayS = 26f, TaukoS = 60f },
                new LiikkuvaOsaMaaritys { Nimi = "purjeet", Verkko = KronborgPurjeet, Pivot = sp, Liike = Liike.Keinunta, Akseli = Vector3.right, Laajuus = 6f },
                new LiikkuvaOsaMaaritys { Nimi = "laivavana", Verkko = KronborgLaivaVana, Pivot = sp, Liike = Liike.Liuku, Akseli = Vector3.left, Laajuus = 0.55f },
                new LiikkuvaOsaMaaritys { Nimi = "tullivene", Verkko = KronborgTullivene, Pivot = KbTullivenePivot, Liike = Liike.Liuku, Akseli = Vector3.back, Laajuus = 0.06f },
                new LiikkuvaOsaMaaritys { Nimi = "savu", Verkko = KronborgSavu, Pivot = KbTykinSuu, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "roiske", Verkko = KronborgRoiske, Pivot = KbRoiskePivot, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "haamu", Verkko = KronborgHaamu, Pivot = KbHaamuPivot, Liike = Liike.Liuku, Akseli = Vector3.right, Laajuus = 0.13f },
                new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = KronborgValot, Pivot = KbValotPivot, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "valot1", Verkko = KronborgValot1, Pivot = KbValot1Pivot, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "valot2", Verkko = KronborgValot2, Pivot = KbValot2Pivot, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "lyhty0", Verkko = KronborgLyhty0, Pivot = KbLyhty0Pivot, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "lyhty1", Verkko = KronborgLyhty1, Pivot = KbLyhty1Pivot, Liike = Liike.Valahdys },
            };
        }

        static readonly bool kronborg = Rekisteroi("kronborg",
            new Erikoismalli { Runko = KronborgRunko, Osat = KronborgOsat, Lahi = KronborgLahi, Kolmiot0 = 1324, KokoKerroin = 1.5f });

        // ---- LÄHITASO ----

        /// <summary>LÄHITASO (Erikoismalli.Lahi, katto 3 000): sama siluetti, mittasuhteet, värit, ääriviivaosat ja pivotit kuin
        /// rungossa; lisäkolmiot lähikuvan yksityiskohtiin (täydennetään).</summary>
        static Mesh KronborgLahi()
        {
            var r = new Rakentaja();
            KbValli(r, true);
            KbVallihauta(r);
            KbSalmi(r);
            KbRannat(r, true);
            KbSatama(r, true);
            KbLinna(r, true);
            KbTornit(r, true);
            KbTykit(r, true);
            KbPuut(r, true);
            return r.Verkko("Kronborg-lahi");
        }
    }
}
