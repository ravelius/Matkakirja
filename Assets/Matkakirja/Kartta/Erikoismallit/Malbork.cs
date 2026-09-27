using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI MALBORK (Saksalaisen ritarikunnan tiililinna Nogatin rannalla; speksi docs/raportit/erikoismallit/malbork.md,
    /// omistaja valitsi elämänidean A 27.9. klo 18.4x). Nosto kohde:malbork, Puola, 54,0398 N 19,028 E, taso 1.
    /// Tunnistus sekunnissa: pitkä punatiilinen linnarivi leveän joen takana; vasemmalla Keskilinnan U ja Suurmestarin palatsi
    /// (korkea tornimainen massa, jyrkkä lonkkakatto ja kulmatornit), keskellä Siltaportin kaksi pyöreää tornia kartiokattoineen
    /// ja niiden takana Korkean linnan neliö sisäpihoineen, porraspäätyineen ja korkeine neliömäisine päätorneineen (mallin
    /// korkein kohta, huipussa valkopunainen lippu); oikealla Gdanisko kaarikäytävineen. Edessä Nogat, rantaniityllä
    /// turnausaita ja kaksi telttaa, jossa punaloiminen ja vaalea ritari laukkaavat toisiaan kohti (mallin suurin liike).
    /// Mitat: 1,0 ≈ 380 m (Keskilinna 129 × 112 m → 0,32 × 0,27, Korkea linna 60 × 51,6 m → 0,16 × 0,135), pystyliioittelu
    /// noin 1,6: muurit 0,04, Keskilinnan harja 0,12, Korkean linnan räystäs 0,11 ja harja 0,17, palatsi 0,185, Siltaportin
    /// tornit 0,088 (kartiot 0,164) ja päätorni 0,25 (lippu 0,284). Nogat on kavennettu 0,064:ään (v2, Fablen korjaus 27.9.
    /// ilta: 0,16-levyinen joki luki pelikoossa laattana) ja rantaniitty muureineen 0,09:ään. Jalanjälki x −0,5…0,5 ja
    /// z −0,243…0,273 (juuri 0,015 jalanjäljen keskeltä etelään). Ritarit on liioiteltu noin 11-kertaisiksi (ratsu ja ratsastaja 0,065 × 0,05, kopja 0,085).
    /// SUUNTA TYYLITELTY kuten Brandenburgin portissa: Nogat virtaa linnan ohi pohjoiskoilliseen ja jokijulkisivu katsoo
    /// länsiluoteeseen, mutta kallistettu kamera katsoo etelästä. Malli on käännetty noin 110° vastapäivään: joki ja
    /// jokijulkisivu ovat edessä (−Z), Keskilinna ja Alalinna (todellisuudessa koillisessa) vasemmalla (−X), Korkea linna ja
    /// Gdanisko (lounaassa) oikealla (+X), ja joki virtaa oikealta vasemmalle. Korkean linnan siivet käännöksen jälkeen:
    /// pohjoissiipi (kirkko) vasemmalla, länsisiipi edessä, eteläsiipi oikealla ja itäsiipi (dormitorio) takana; päätorni on
    /// koillisnurkassa eli vasemmalla takana, ja kirkon kuori jatkuu siitä taaksepäin (Madonnan syvennys takaseinällä).
    /// Turnauskenttä on tyylitellysti rantaniityllä kameran puolella (todellisuudessa turnaukset pidetään vallihaudoissa).
    /// Liikkuvat osat:
    ///   ritari0     punaloiminen ritari (etukaista, joen puoli): laukka aidan suuntaisesti, käännökset kentän päissä
    ///   ritari1     vaalea ritari (takakaista, muurin puoli)
    ///   kopja0–1    kopjat (pivot ratsastajan kädessä): pystyssä ravissa, laskeutuvat vaakaan ennen kohtaamista
    ///   lippu       legendan punainen petturin lippu palatsin ikkunassa (harvinainen ja napautus)
    ///   savu        tykin savu vastarannalla (legenda)
    ///   kuula       kivikuula lentää joen yli palatsin seinään ja jää siihen tummaksi pisteeksi (legenda)
    ///   valot       yöllä rantamuurin, Siltaportin tornien, Gdaniskon ja Alalinnan tornin hehku (pivot muurilinjalla portin kohdalla)
    ///   valot1      yöllä Keskilinnan ja Korkean linnan jokijulkisivut (pivot julkisivujen linjalla)
    ///   valot2      yöllä palatsin julkisivu ja Kesärefektorin korkeat ikkunat (pivot julkisivun juuressa)
    ///   valot3      yöllä päätornin yläosa (pivot tornin juuressa, hehku nousee katon takaa)
    /// </summary>
    public sealed partial class Symbolimallit
    {
        // ---- Mitat (mallin yksiköissä) ----

        /// <summary>Vesi, niitty ja maa: veden pinta hieman niityn alapuolella (kaikki y ≥ 0).</summary>
        const float MbVesiY = 0.0015f, MbMaaY = 0.003f;
        /// <summary>Nogatin reunat: linnan puoli (niityn etureuna ja rantalaituri) ja kameran puoleinen ranta (keskiarvo, vaihtelee).
        /// v2 (Fablen korjaus 27.9. ilta): joki kavennettu 0,16:sta 0,064:ään, jottei se näytä pelikoossa laatalta.</summary>
        const float MbJokiTaka = -0.137f, MbJokiEtu = -0.201f;
        /// <summary>Veden palat X-suunnassa: kukin pala on alle ääriviivan kynnyksen (puolileveys 0,033 &lt; 0,035), joten vedelle
        /// ei tule ääriviivaa eikä kehystä.</summary>
        const int MbJokiPaloja = 15;
        /// <summary>Rantamuuri: keskilinja, paksuus ja korkeus (katettu muurikäytävä, katto kattovärillä).</summary>
        const float MbMuuriZ = -0.045f, MbMuuriP = 0.012f, MbMuuriH = 0.04f;
        /// <summary>Turnauskenttä: keskikohta X, aidan linja Z, kaistojen etäisyys aidasta, aidan puolipituus, ritarien
        /// odotuspaikka (kentän pää, keskikohdasta) ja harjoituskierroksen käännöskohta. Samat vakiot liikeytimessä
        /// (MalborkLiike): muuta molemmat.</summary>
        const float MbKenttaX = -0.03f, MbAitaZ = -0.10f, MbKaista = 0.017f, MbAitaPuoli = 0.18f, MbPaa = 0.28f;
        /// <summary>Siltaportti: keskikohta X, tornien etäisyys keskeltä, säde, vaipan korkeus ja kartion korkeus.</summary>
        const float MbPorttiX = 0.03f, MbPorttiDx = 0.033f, MbPorttiR = 0.021f, MbPorttiH = 0.088f, MbPorttiKartio = 0.076f;
        /// <summary>Porttirakennuksen etupinta (porttiaukko) ja syvyys: ritari mahtuu sisään kokonaan (liikeytimen PorttiZ).</summary>
        const float MbPorttiZ0 = -0.063f, MbPorttiSyv = 0.077f;
        /// <summary>Korkea linna: ulkoreunat, siiven syvyys, räystäs ja harja.</summary>
        const float MbKlX0 = -0.02f, MbKlX1 = 0.14f, MbKlZ0 = -0.005f, MbKlZ1 = 0.13f, MbKlS = 0.042f, MbKlR = 0.11f, MbKlH = 0.17f;
        /// <summary>Päätorni Korkean linnan vasemmassa takanurkassa (todellinen koillisnurkka): keskipiste, sivu ja runko.</summary>
        const float MbPtX = MbKlX0 + 0.018f, MbPtZ = MbKlZ1 - 0.018f, MbPtL = 0.036f, MbPtH = 0.232f;
        /// <summary>Keskilinna (U avautuu oikealle Korkeaa linnaa kohti): ulkoreunat, siiven syvyys, räystäs ja harja.</summary>
        const float MbKeX0 = -0.40f, MbKeX1 = -0.08f, MbKeZ0 = 0.0f, MbKeZ1 = 0.27f, MbKeS = 0.06f, MbKeR = 0.075f, MbKeH = 0.12f;
        /// <summary>Suurmestarin palatsi Keskilinnan etusiiven oikeassa päässä, työntyy joelle päin.</summary>
        const float MbPaX0 = -0.19f, MbPaX1 = -0.10f, MbPaZ0 = -0.028f, MbPaZ1 = 0.06f, MbPaH = 0.128f, MbPaKatto = 0.057f;
        /// <summary>Gdanisko: tornin keskipiste, leveys, syvyys ja korkeus; käytävä Korkean linnan oikealta sivulta torniin.</summary>
        const float MbGdX = 0.395f, MbGdZ = -0.03f, MbGdL = 0.05f, MbGdS = 0.05f, MbGdH = 0.1f;

        // ---- Paletti (Em-seepiaramppi; yksi aksentti = punainen) ----

        static readonly Color MbTiili = Hex(0x926b4e), MbTiiliVarjo = Hex(0x6f5540), MbKatto = Hex(0x634532), MbKattoRaystas = Hex(0x8c6748),
            MbKivi = Hex(0xefe4cc), MbNiitty = Hex(0xbdb48c), MbAukko = Hex(0x4a3b2c), MbHautaVari = Hex(0xcdb98b), MbRuoko = Hex(0x8e9566);
        /// <summary>Aksentti: loimi, viiri, legendan lippu ja päätornin lipun alapuolisko (yhteensä alle 3 % alasta).</summary>
        static readonly Color MbPunainen = Hex(0x9a3b2c);
        /// <summary>Ritarien teräs (kuten Hohensalzburgin kyyhkyt), tykin savu ja palatsin ikkunahehku.</summary>
        static readonly Color MbTeras = Hex(0x938d84), MbSavu = Hex(0xfbf8f0), MbPalatsiValo = Hex(0xf4d898);
        /// <summary>Lähitason vaalea tiili (ikkunalaudat ja listavyöt) ja palatsin graniittipylväät (vaalea, ei paperinvalkoinen).</summary>
        static readonly Color MbTiiliVaalea = Hex(0xae8a69), MbGraniitti = Hex(0xc9b08e);

        // ---- Runko ----

        static Mesh MalborkRunko()
        {
            var r = new Rakentaja();
            MbJoki(r);
            MbRantamuuri(r, false);
            MbSiltaportti(r, false);
            MbKorkeaLinna(r, false);
            MbGdanisko(r, false);
            MbKeskilinna(r, false);
            MbPalatsi(r, false);
            MbAlalinna(r, false);
            MbHauta(r);
            MbTurnaus(r);
            MbTykki(r);
            MbPuut(r, false);
            return r.Verkko("Malbork");
        }

        /// <summary>
        /// Nogat kapeana vesikaistana linnan edessä (v2): vesi on pienistä paloista, joten sille ei tule ääriviivaa eikä
        /// reunakaistaa; kameran puoleinen ranta ja päät rajautuvat suoraan karttaan (epäsäännöllinen etureuna ja kaislat
        /// pehmentävät), joten joki ei kehystä mallia eikä kilpaile kartan omien vesien kanssa. Linnan puolella kivinen
        /// rantalaituri niityn kohdalla. Niitty ja laituri ovat yksi ääriviivaosa:
        /// sen viiva jää veden (edessä) ja muurin (takana) alle ja näkyy vain niityn pyöristetyissä päissä. Kaislatupsut ja
        /// vesibussien laituri ovat pieniä osia ilman ääriviivaa.
        /// </summary>
        static void MbJoki(Rakentaja r)
        {
            // Vesi: 15 palaa (kukin oma pieni osa ilman ääriviivaa), yksi väri. Värihäivytystä karttaan ei käytetä: sinisen ja
            // kartan beigen välisävyt ovat harmaita (varjostin lämmittää vaaleat siniset), joten häivytys näkyi harmaina laattoina.
            for (int i = 0; i < MbJokiPaloja; i++)
            {
                float x0 = -0.5f + i / (float)MbJokiPaloja, x1 = -0.5f + (i + 1) / (float)MbJokiPaloja;
                r.NelioUlos(new Vector3(x0, MbVesiY, MbJokiEtuX(x0)), new Vector3(x1, MbVesiY, MbJokiEtuX(x1)), new Vector3(x1, MbVesiY, MbJokiTaka),
                    new Vector3(x0, MbVesiY, MbJokiTaka), Vector3.up, EmVesi);
            }
            // Rantaniitty muurin juurelle turnauskentän kohdalle (neljä lohkoa ja pyöristetyt päät) ja rantalaituri sen edessä.
            float zt = MbMuuriZ - MbMuuriP * 0.5f + 0.002f;
            const float nx0 = -0.4f, nx1 = 0.32f;
            r.AloitaOsa();
            for (int i = 0; i < 4; i++)
            {
                float x0 = Mathf.Lerp(nx0, nx1, i / 4f), x1 = Mathf.Lerp(nx0, nx1, (i + 1) / 4f);
                r.NelioUlos(new Vector3(x0, MbMaaY, MbJokiTaka), new Vector3(x1, MbMaaY, MbJokiTaka), new Vector3(x1, MbMaaY, zt),
                    new Vector3(x0, MbMaaY, zt), Vector3.up, MbNiitty);
            }
            foreach (float s in new[] { -1f, 1f })
            {
                float xr = s < 0 ? nx0 : nx1, syv = zt - MbJokiTaka;
                var keski = new Vector3(xr, MbMaaY, (zt + MbJokiTaka) * 0.5f);
                var edellinen = new Vector3(xr, MbMaaY, MbJokiTaka);
                for (int k = 1; k <= 5; k++)
                {
                    // Puoliellipsi rannasta muurin juurelle (rannan puolella leveämpi).
                    float a = Mathf.PI * k / 5f, lev = k < 3 ? 0.048f : 0.036f;
                    var p = new Vector3(xr + s * Mathf.Sin(a) * lev, MbMaaY, MbJokiTaka + (1f - Mathf.Cos(a)) * 0.5f * syv);
                    r.KolmioUlos(keski, edellinen, p, Vector3.up, MbNiitty);
                    edellinen = p;
                }
            }
            // Rantalaituri: vaalea kivireuna niityn etureunassa (yläpinta ja kapea etupinta veteen).
            const float ly = MbMaaY + 0.0012f, ld = 0.005f;
            r.NelioUlos(new Vector3(nx0, ly, MbJokiTaka), new Vector3(nx1, ly, MbJokiTaka), new Vector3(nx1, ly, MbJokiTaka + ld), new Vector3(nx0, ly, MbJokiTaka + ld),
                Vector3.up, EmKiviVaalea);
            r.NelioUlos(new Vector3(nx0, MbVesiY, MbJokiTaka), new Vector3(nx1, MbVesiY, MbJokiTaka), new Vector3(nx1, ly, MbJokiTaka), new Vector3(nx0, ly, MbJokiTaka),
                Vector3.back, EmKivi);
            r.LopetaOsa();
            // Kaislatupsut kameran puoleisella rannalla (pehmentävät veden reunaa) ja linnan puolella niityn ulkopuolella.
            foreach (var (x, dz) in new[] { (-0.41f, -0.004f), (-0.275f, -0.006f), (-0.06f, -0.003f), (0.13f, -0.006f), (0.31f, -0.004f), (0.455f, -0.005f) })
                r.Kartio(new Vector3(x, 0f, MbJokiEtuX(x) + dz), 0.009f, 0.018f, 3, MbRuoko);
            r.Kartio(new Vector3(0.44f, 0f, MbJokiTaka + 0.004f), 0.008f, 0.015f, 3, MbRuoko);
            // Vesibussien laituri Alalinnan edessä: lankkulaituri veteen.
            var lp = new Vector3(-0.44f, 0f, MbJokiTaka - 0.014f);
            r.AloitaOsa();
            r.NelioUlos(lp + new Vector3(-0.018f, 0.005f, -0.014f), lp + new Vector3(0.018f, 0.005f, -0.014f), lp + new Vector3(0.018f, 0.005f, 0.014f),
                lp + new Vector3(-0.018f, 0.005f, 0.014f), Vector3.up, EmKiviVaalea);
            r.NelioUlos(lp + new Vector3(-0.018f, 0f, -0.014f), lp + new Vector3(0.018f, 0f, -0.014f), lp + new Vector3(0.018f, 0.005f, -0.014f),
                lp + new Vector3(-0.018f, 0.005f, -0.014f), Vector3.back, EmSeepia);
            foreach (float s in new[] { -1f, 1f })
                r.NelioUlos(lp + new Vector3(s * 0.018f, 0f, -0.014f), lp + new Vector3(s * 0.018f, 0f, 0.014f), lp + new Vector3(s * 0.018f, 0.005f, 0.014f),
                    lp + new Vector3(s * 0.018f, 0.005f, -0.014f), new Vector3(s, 0f, 0f), EmSeepia);
            r.LopetaOsa();
        }

        /// <summary>Kameran puoleisen rannan z kohdassa x: loiva, epäsäännöllinen mutka (±0,0055).</summary>
        static float MbJokiEtuX(float x) => MbJokiEtu + 0.0035f * Mathf.Sin(x * 7.3f + 0.6f) + 0.002f * Mathf.Sin(x * 17.1f);

        /// <summary>
        /// Rantamuuri Nogatin puolella: katettu muurikäytävä (yläpinta kattovärillä) Alalinnan tornista Gdaniskoon ja siitä
        /// oikeaan reunaan, viisi matalaa neliötornia pyramidikattoineen ja muurikäytävän ampuma-aukot kärkiväreinä. Yksi
        /// ääriviivaosa. Siltaportti ja Gdanisko katkaisevat muurin. Lähitasossa (lahi) muurikäytävän harjakatto, aukkorivit,
        /// listavyö ja tornien ikkunat.
        /// </summary>
        static void MbRantamuuri(Rakentaja r, bool lahi)
        {
            float z = MbMuuriZ;
            // Muurin katkaisukohdat: Alalinnan torni, tornit, Siltaportti ja Gdanisko.
            float[] tornit = { -0.335f, -0.215f, -0.075f, 0.165f, 0.275f };
            float gd0 = MbGdX - MbGdL * 0.5f, gd1 = MbGdX + MbGdL * 0.5f;
            (float a, float b)[] osat =
            {
                (-0.4525f, tornit[0]), (tornit[0], tornit[1]), (tornit[1], tornit[2]), (tornit[2], MbPorttiX - MbPorttiDx),
                (MbPorttiX + MbPorttiDx, tornit[3]), (tornit[3], tornit[4]), (tornit[4], gd0), (gd1, 0.5f),
            };
            r.AloitaOsa();
            foreach (var (a, b) in osat)
                MbMuuri(r, new Vector3(a, 0f, z), new Vector3(b, 0f, z), MbMuuriH, MbMuuriP, MbTiili, MbKatto, lahi ? 0.006f : 0f);
            foreach (float x in tornit)
            {
                r.Laatikko(new Vector3(x, 0f, z - 0.002f), new Vector3(0.026f, 0.058f, 0.026f), MbTiili, MbTiili);
                if (lahi) r.PyramidiRaystas(new Vector3(x, 0.058f, z - 0.002f), 0.032f, 0.032f, 0.024f, MbKatto, MbKattoRaystas, 0.22f);
                else r.Pyramidi(new Vector3(x, 0.058f, z - 0.002f), 0.032f, 0.032f, 0.024f, MbKatto);
            }
            r.LopetaOsa();
            float ze = z - MbMuuriP * 0.5f;
            if (!lahi)
            {
                // Muurikäytävän ampuma-aukot (kärkivärit) muurin etupinnassa räystään alla.
                foreach (var (a, b) in osat)
                {
                    int kpl = Mathf.Max(1, (int)((b - a) / 0.05f));
                    for (int k = 0; k < kpl; k++)
                        r.Laatta(new Vector3(Mathf.Lerp(a, b, (k + 0.5f) / kpl), MbMuuriH - 0.009f, ze), Vector3.back, 0.009f, 0.007f, MbAukko);
                }
                return;
            }
            // Lähitaso: katetun muurikäytävän aukkorivi räystään alla, alhaalla kapeat ampumaraot ja tiililista niiden välissä;
            // torneissa suippokaari-ikkuna ja kivilista (kaikki hehkun edessä, joten aukot ovat yöllä tummia).
            foreach (var (a, b) in osat)
            {
                int kpl = Mathf.Max(1, (int)((b - a) / 0.026f));
                for (int k = 0; k < kpl; k++)
                    r.Laatta(new Vector3(Mathf.Lerp(a, b, (k + 0.5f) / kpl), MbMuuriH - 0.0075f, ze), Vector3.back, 0.0075f, 0.0065f, MbAukko);
                int rakoja = Mathf.Max(1, (int)((b - a) / 0.05f));
                for (int k = 0; k < rakoja; k++)
                    r.Laatta(new Vector3(Mathf.Lerp(a, b, (k + 0.5f) / rakoja), 0.016f, ze), Vector3.back, 0.0022f, 0.011f, MbAukko);
                MbLhLista(r, new Vector3(a, 0.026f, ze), new Vector3(b, 0.026f, ze), Vector3.back, 0.0022f, MbTiiliVarjo);
            }
            foreach (float x in tornit)
            {
                float zt = z - 0.002f - 0.013f;
                MbLhIkkuna(r, new Vector3(x, 0.041f, zt), Vector3.back, 0.0065f, 0.014f);
                MbLhLista(r, new Vector3(x - 0.013f, 0.029f, zt), new Vector3(x + 0.013f, 0.029f, zt), Vector3.back, 0.0025f, MbTiiliVaalea);
                r.Laatta(new Vector3(x, 0.016f, zt), Vector3.back, 0.0022f, 0.011f, MbAukko);
            }
        }

        /// <summary>
        /// Linnan siipi räystäskaistalla (kuten Symbolimallit.Rakentaja.Talo, mutta lappeiden alareunassa vaalea kaista ja
        /// pieni räystäsulkonema, jotta katon muoto ja harjan suunta erottuvat ylhäältä): pohjan keskipiste p, harjan suunta
        /// (rad itäakselista vastapäivään), pituus harjan suunnassa, syvyys, seinän ja harjan korkeus. 18 kolmiota.
        /// </summary>
        static void MbSiipi(Rakentaja r, Vector3 p, float suunta, float leveys, float syvyys, float h, float harja, Color seina, Color katto)
        {
            r.AloitaOsa();
            var ux = new Vector3(Mathf.Cos(suunta), 0f, Mathf.Sin(suunta));
            var uz = new Vector3(-Mathf.Sin(suunta), 0f, Mathf.Cos(suunta));
            Vector3 ex = ux * (leveys * 0.5f), ez = uz * (syvyys * 0.5f), up = Vector3.up * h, yli = uz * 0.0025f;
            Vector3 A = p - ex - ez, B = p + ex - ez, C = p + ex + ez, D = p - ex + ez;
            var keski = p + up * 0.5f;
            r.NelioKeskelta(A, B, B + up, A + up, keski, seina);
            r.NelioKeskelta(B, C, C + up, B + up, keski, seina);
            r.NelioKeskelta(C, D, D + up, C + up, keski, seina);
            r.NelioKeskelta(D, A, A + up, D + up, keski, seina);
            Vector3 H1 = p - ex + up + Vector3.up * harja, H2 = p + ex + up + Vector3.up * harja;
            var kk = p + up + Vector3.up * (harja * 0.3f);
            var alas = Vector3.up * (harja * 0.0025f / (syvyys * 0.5f));
            MbLape(r, A + up - yli - alas, B + up - yli - alas, H2, H1, kk, katto);
            MbLape(r, D + up + yli - alas, C + up + yli - alas, H2, H1, kk, katto);
            r.KolmioKeskelta(A + up, D + up, H1, kk, seina);
            r.KolmioKeskelta(B + up, C + up, H2, kk, seina);
            r.LopetaOsa();
        }

        /// <summary>Lape räystäältä r0 → r1 harjalle (h1 on r1:n ja h0 r0:n puolella): räystäskaista vaaleammalla kattovärillä.</summary>
        static void MbLape(Rakentaja r, Vector3 r0, Vector3 r1, Vector3 h1, Vector3 h0, Vector3 keski, Color katto)
        {
            const float osuus = 0.2f;
            Vector3 a = Vector3.Lerp(r0, h0, osuus), b = Vector3.Lerp(r1, h1, osuus);
            r.NelioKeskelta(r0, r1, b, a, keski, MbKattoRaystas);
            r.NelioKeskelta(a, b, h1, h0, keski, katto);
        }

        /// <summary>Muuriosuus a → b (vain etu- ja takapinta sekä harja; päädyt jäävät tornien ja porttien sisään). 6 kolmiota;
        /// lähitasossa (katto > 0) muurikäytävän harjakatto räystäskaistoineen (10 kolmiota).</summary>
        static void MbMuuri(Rakentaja r, Vector3 a, Vector3 b, float h, float paksuus, Color sivu, Color harja, float katto = 0f)
        {
            var t = b - a; t.y = 0f;
            var n = Vector3.Cross(Vector3.up, t).normalized * (paksuus * 0.5f);
            var up = Vector3.up * h;
            Vector3 A = a - n, B = b - n, C = b + n, D = a + n;
            var keski = (a + b) * 0.5f + up * 0.5f;
            r.NelioKeskelta(A, B, B + up, A + up, keski, sivu);
            r.NelioKeskelta(D, C, C + up, D + up, keski, sivu);
            if (katto <= 0f) { r.NelioUlos(A + up, B + up, C + up, D + up, Vector3.up, harja); return; }
            // Harjakatto hieman muurin yli (räystäs 0,0015), harja keskellä.
            var yli = n.normalized * 0.0015f;
            Vector3 H0 = a + up + Vector3.up * katto, H1 = b + up + Vector3.up * katto;
            var kk = (a + b) * 0.5f + up + Vector3.up * (katto * 0.3f);
            MbLape(r, A + up - yli, B + up - yli, H1, H0, kk, harja);
            MbLape(r, D + up + yli, C + up + yli, H1, H0, kk, harja);
        }

        /// <summary>
        /// Siltaportti (Brama Mostowa, 1335–1341): kaksi massiivista pyöreää tornia korkeine kartiokattoineen ja niiden välissä
        /// porttirakennus, jonka suippokaaresta ritarit ratsastavat kentälle. Yksi ääriviivaosa.
        /// </summary>
        static void MbSiltaportti(Rakentaja r, bool lahi)
        {
            float z = MbMuuriZ - 0.004f;
            r.AloitaOsa();
            foreach (float s in new[] { -1f, 1f })
            {
                var p = new Vector3(MbPorttiX + s * MbPorttiDx, 0f, z);
                r.Vaippa(p, MbPorttiR, MbPorttiR * 0.97f, MbPorttiH, 8, MbTiili, Mathf.PI / 8f);
                r.KartioRaystas(p + Vector3.up * MbPorttiH, MbPorttiR * 1.14f, MbPorttiKartio, 8, MbKatto, MbKattoRaystas, 0.16f);
            }
            // Porttirakennus: syvä porttikäytävä (ritarit odottavat sen sisällä piilossa).
            r.Laatikko(new Vector3(MbPorttiX, 0f, MbPorttiZ0 + MbPorttiSyv * 0.5f), new Vector3(0.046f, 0.066f, MbPorttiSyv), MbTiili, MbKatto);
            r.LopetaOsa();
            // Porttiaukko (suippokaari) kentälle päin.
            MbSuippokaari(r, new Vector3(MbPorttiX, 0.029f, MbPorttiZ0), Vector3.back, 0.022f, 0.058f, MbAukko);
            if (!lahi) return;
            // Lähitaso: kaksi porttikaarta (ulompi kaarikehys tummemmasta tiilestä ja sisempi aukko nostoristikkoineen),
            // porttirakennuksen etureunan sakarat, tornien ampumaraot kolmella kameran puoleisella tahkolla kahdessa kerroksessa,
            // listavyö ja kartioiden huippukoristeet.
            MbSuippokaari(r, new Vector3(MbPorttiX, 0.0315f, MbPorttiZ0 + 0.0006f), Vector3.back, 0.03f, 0.064f, MbTiiliVarjo);
            foreach (float f in new[] { -0.32f, 0f, 0.32f })
                r.Laatta(new Vector3(MbPorttiX + f * 0.02f, 0.03f, MbPorttiZ0 - 0.0008f), Vector3.back, 0.0012f, 0.034f, MbTiiliVarjo);
            r.Laatta(new Vector3(MbPorttiX, 0.034f, MbPorttiZ0 - 0.0008f), Vector3.back, 0.02f, 0.0012f, MbTiiliVarjo);
            MbLhSakarat(r, new Vector3(MbPorttiX - 0.02f, 0.066f, MbPorttiZ0 + 0.0035f), new Vector3(MbPorttiX + 0.02f, 0.066f, MbPorttiZ0 + 0.0035f),
                Vector3.back, 4, 0.0065f, 0.008f, 0.005f, MbTiili);
            float apot = MbPorttiR * Mathf.Cos(Mathf.PI / 8f);
            foreach (float s in new[] { -1f, 1f })
            {
                var c = new Vector3(MbPorttiX + s * MbPorttiDx, 0f, z);
                foreach (float aste in new[] { 225f, 270f, 315f })
                {
                    float a = aste * Mathf.PI / 180f;
                    var n = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                    foreach (float y in new[] { 0.028f, 0.058f })
                        r.Laatta(c + n * apot + Vector3.up * y, n, 0.0024f, 0.012f, MbAukko);
                    // Listavyö tornin ympäri kameran puolella (tahkon mittainen, pinnan edessä).
                    var tt = Vector3.Cross(Vector3.up, n);
                    float w = MbPorttiR * Mathf.Sin(Mathf.PI / 8f);
                    MbLhLista(r, c + n * apot - tt * w + Vector3.up * 0.043f, c + n * apot + tt * w + Vector3.up * 0.043f, n, 0.0025f, MbTiiliVarjo);
                }
                r.Timantti(c + Vector3.up * (MbPorttiH + MbPorttiKartio + 0.004f), 0.003f, 0.006f, MbKatto, 4);
            }
        }

        /// <summary>Suippokaaren muotoinen aukko seinän pintaan: suorakulmio ja kaksi kaarta kärkeen (p = aukon keskipiste,
        /// korkeus sisältää kärjen). 4 kolmiota.</summary>
        static void MbSuippokaari(Rakentaja r, Vector3 p, Vector3 ulos, float leveys, float korkeus, Color vari)
        {
            var n = new Vector3(ulos.x, 0f, ulos.z).normalized;
            var t = Vector3.Cross(Vector3.up, n);
            float w = leveys * 0.5f, suora = korkeus - leveys * 0.8f;
            var q = p + n * 0.0015f - Vector3.up * (korkeus * 0.5f);
            Vector3 a0 = q - t * w, a1 = q + t * w, b1 = a1 + Vector3.up * suora, b0 = a0 + Vector3.up * suora;
            r.NelioUlos(a0, a1, b1, b0, n, vari);
            var karki = q + Vector3.up * korkeus;
            var hartia0 = b0 + t * (w * 0.18f) + Vector3.up * (leveys * 0.42f);
            var hartia1 = b1 - t * (w * 0.18f) + Vector3.up * (leveys * 0.42f);
            r.NelioUlos(b0, b1, hartia1, hartia0, n, vari);
            r.KolmioUlos(hartia0, hartia1, karki, n, vari);
        }

        /// <summary>
        /// Korkea linna (Hochschloss): neljä siipeä neliön sisäpihan ympärillä (sivusiipien harjat edestä taakse, etu- ja
        /// takasiiven harjat niiden välissä), sivusiipien eteen porraspäädyt, etukulmissa hoikat kulmatornit, vasemmassa
        /// takanurkassa päätorni (oma ääriviivaosa) lippuineen ja kirkon kuori takana. Linna ja siivet ovat yksi ääriviivaosa.
        /// </summary>
        static void MbKorkeaLinna(Rakentaja r, bool lahi)
        {
            float s = MbKlS, h = MbKlR, hr = MbKlH - MbKlR;
            float zc = (MbKlZ0 + MbKlZ1) * 0.5f, pz = MbKlZ1 - MbKlZ0;
            r.AloitaOsa();
            // Sivusiivet (vasen = pohjoissiipi ja kirkko, oikea = eteläsiipi): harja edestä taakse.
            foreach (float x in new[] { MbKlX0 + s * 0.5f, MbKlX1 - s * 0.5f })
                MbSiipi(r, new Vector3(x, 0f, zc), Mathf.PI * 0.5f, pz, s, h, hr, MbTiili, MbKatto);
            // Etu- ja takasiipi sivusiipien välissä (päät sivusiipien katon alla).
            float xa = MbKlX0 + s * 0.5f, xb = MbKlX1 - s * 0.5f;
            foreach (float z in new[] { MbKlZ0 + s * 0.5f, MbKlZ1 - s * 0.5f })
                MbSiipi(r, new Vector3((xa + xb) * 0.5f, 0f, z), 0f, xb - xa, s, h, hr, MbTiili, MbKatto);
            // Porraspäädyt sivusiipien etupäissä (kohti jokea).
            foreach (float x in new[] { MbKlX0 + s * 0.5f, MbKlX1 - s * 0.5f })
                MbPorrasPaaty(r, new Vector3(x, h, MbKlZ0 - 0.0035f), s + 0.004f, hr + 0.022f, 3, 0.007f, MbTiili, lahi);
            // Kirkon kuori jatkuu vasemmasta siivestä taaksepäin (itään), päässä kolmitahkoinen apsis.
            MbKuori(r, lahi);
            r.LopetaOsa();
            if (lahi)
            {
                // Etusiiven jokijulkisivu sivusiipien välissä: kaksi ikkunariviä (ylempi Konventin refektori, korkeat ikkunat) ja
                // listavyö; sivusiipien etupäissä porraspäätyjen alla kaksi ikkunaa kerroksittain.
                float zf = MbKlZ0 - 0.001f;
                float x0 = MbKlX0 + s, x1 = MbKlX1 - s;
                for (int k = 0; k < 4; k++)
                {
                    float x = Mathf.Lerp(x0, x1, (k + 0.5f) / 4f);
                    MbLhIkkuna(r, new Vector3(x, 0.03f, zf), Vector3.back, 0.0065f, 0.018f);
                    MbLhIkkuna(r, new Vector3(x, 0.07f, zf), Vector3.back, 0.0075f, 0.03f);
                }
                MbLhLista(r, new Vector3(x0, 0.047f, zf), new Vector3(x1, 0.047f, zf), Vector3.back, 0.0025f, MbTiiliVarjo);
                foreach (float xs in new[] { MbKlX0 + s * 0.5f, MbKlX1 - s * 0.5f })
                    foreach (float dx in new[] { -0.009f, 0.009f })
                    {
                        MbLhIkkuna(r, new Vector3(xs + dx, 0.032f, zf), Vector3.back, 0.0055f, 0.016f, false);
                        MbLhIkkuna(r, new Vector3(xs + dx, 0.07f, zf), Vector3.back, 0.0065f, 0.028f);
                    }
                // Kattolyhdyt etusiiven eteläisellä lappeella (harjan alapuolella).
                float kk = hr / (s * 0.5f);
                for (int k = 0; k < 3; k++)
                {
                    float x = Mathf.Lerp(x0 + 0.01f, x1 - 0.01f, (k + 0.5f) / 3f);
                    MbLhLyhty(r, new Vector3(x, h + hr * 0.32f, MbKlZ0 + s * 0.5f - s * 0.5f * 0.68f), Vector3.back, kk, 0.011f, 0.009f, 0.006f);
                }
            }
            else
            {
                // Rungossa etusiiven ikkunarivi kärkivärinä (tummat pystyviivat jokijulkisivussa).
                float zf = MbKlZ0 - 0.001f;
                for (int k = 0; k < 4; k++)
                    r.Laatta(new Vector3(Mathf.Lerp(MbKlX0 + s, MbKlX1 - s, (k + 0.5f) / 4f), 0.07f, zf), Vector3.back, 0.0065f, 0.026f, MbAukko);
            }
            // Kulmatornit etukulmissa: hoikka kuusikulmio seinästä ulos ja terävä kypärä (lähitasossa kuusitahkoinen kypärä
            // räystäskaistoineen, konsoli tornin alla ja ikkunat).
            foreach (float x in new[] { MbKlX0 + 0.004f, MbKlX1 - 0.004f })
            {
                var p = new Vector3(x, 0.07f, MbKlZ0 + 0.004f);
                r.AloitaOsa();
                r.Vaippa(p, 0.011f, 0.011f, 0.1f, 6, MbTiili, Mathf.PI / 6f);
                if (lahi) r.KartioRaystas(p + Vector3.up * 0.1f, 0.0125f, 0.042f, 6, MbKatto, MbKattoRaystas, 0.18f);
                else r.Kartio(p + Vector3.up * 0.1f, 0.0125f, 0.042f, 4, MbKatto);
                r.LopetaOsa();
                if (lahi)
                {
                    MbLhKonsoli(r, p, 0.011f, 0.014f, 6, MbTiili);
                    float ap = 0.011f * Mathf.Cos(Mathf.PI / 6f);
                    foreach (float aste in new[] { 270f })
                    {
                        float a = aste * Mathf.PI / 180f;
                        var n = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                        MbLhIkkuna(r, p + n * ap + Vector3.up * 0.045f, n, 0.0042f, 0.011f, false);
                        MbLhIkkuna(r, p + n * ap + Vector3.up * 0.075f, n, 0.0042f, 0.011f, false);
                    }
                }
            }
            MbPaatorni(r, lahi);
        }

        /// <summary>
        /// Porraspääty (Brick Gothicin tunnus): pystysuora tiililaatta siiven päädyn edessä, jonka yläreuna nousee portain
        /// katon lappeiden yli; p = päädyn alareunan keskikohta (räystäslinjalla), leveys, korkeus räystäästä huippuun, askelmia
        /// kummallakin puolella ja paksuus. Etupinta, askelmien yläpinnat ja takapinnan yläosa (katon yllä). Kärkivärit
        /// (sokeakaaret) lähitasossa.
        /// </summary>
        static void MbPorrasPaaty(Rakentaja r, Vector3 p, float leveys, float korkeus, int askelmia, float paksuus, Color vari, bool lahi)
        {
            float w = leveys * 0.5f;
            var up = Vector3.up;
            var eteen = Vector3.back;
            // Portaat: taso k (0 = alin) ulottuu x-väliin ±w · (1 − k / (askelmia + 0,6)), korkeus k:n mukaan.
            float yk = korkeus / (askelmia + 1);
            for (int k = 0; k <= askelmia; k++)
            {
                float lev = w * (1f - k / (askelmia + 0.7f));
                float y0 = k == 0 ? 0f : k * yk, y1 = (k + 1) * yk;
                Vector3 a = p + new Vector3(-lev, y0, 0f), b = p + new Vector3(lev, y0, 0f);
                Vector3 c = p + new Vector3(lev, y1, 0f), d = p + new Vector3(-lev, y1, 0f);
                r.NelioUlos(a, b, c, d, eteen, vari);
                // Askelman yläpinta (näkyy ylhäältä ja kallistuksesta).
                var syv = Vector3.forward * paksuus;
                r.NelioUlos(d, c, c + syv, d + syv, up, MbTiiliVarjo);
                if (lahi && k < askelmia)
                {
                    // Sokeakaaret: kaksi kapeaa suippokaaren muotoista syvennystä askelmalla ja pinaakkelit askelman kulmissa.
                    foreach (float f in new[] { -0.45f, 0.45f })
                        MbSuippokaari(r, p + new Vector3(lev * f * 0.9f, (y0 + y1) * 0.5f, 0f), eteen, lev * 0.28f, (y1 - y0) * 0.78f, MbTiiliVarjo);
                    foreach (float sx in new[] { -1f, 1f })
                        r.Kartio(p + new Vector3(sx * (lev - 0.0022f), y1, paksuus * 0.5f), 0.0024f, 0.009f, 4, vari);
                }
                if (lahi && k == askelmia)
                    r.Kartio(p + new Vector3(0f, y1, paksuus * 0.5f), 0.003f, 0.013f, 4, vari);
            }
        }

        /// <summary>Kirkon kuori (Pyhän Marian kirkon itäpää) vasemman siiven takapäässä: kapea kivijalka, harjakatto ja
        /// kolmitahkoinen apsis, jonka katto on puolilonkka. Takaseinällä lähitasossa Madonnan syvennys.</summary>
        static void MbKuori(Rakentaja r, bool lahi)
        {
            float x = MbKlX0 + MbKlS * 0.5f, z0 = MbKlZ1 - 0.01f, z1 = MbKlZ1 + 0.045f, w = MbKlS * 0.46f;
            float h = MbKlR, hr = MbKlH - MbKlR - 0.01f;
            var keski = new Vector3(x, h * 0.5f, (z0 + z1) * 0.5f);
            // Seinät: sivut ja apsiksen kolme tahkoa.
            Vector3 L0 = new Vector3(x - w, 0f, z0), R0 = new Vector3(x + w, 0f, z0), L1 = new Vector3(x - w, 0f, z1), R1 = new Vector3(x + w, 0f, z1);
            var A = new Vector3(x, 0f, z1 + w * 0.8f);
            var up = Vector3.up * h;
            r.NelioKeskelta(L0, L1, L1 + up, L0 + up, keski, MbTiili);
            r.NelioKeskelta(R0, R1, R1 + up, R0 + up, keski, MbTiili);
            var La = new Vector3(x - w * 0.55f, 0f, z1 + w * 0.62f); var Ra = new Vector3(x + w * 0.55f, 0f, z1 + w * 0.62f);
            r.NelioKeskelta(L1, La, La + up, L1 + up, keski, MbTiili);
            r.NelioKeskelta(La, Ra, Ra + up, La + up, keski, MbTiili);
            r.NelioKeskelta(Ra, R1, R1 + up, Ra + up, keski, MbTiili);
            // Katto: harja edestä taakse, apsiksen päällä kolme lappeenkolmiota harjan päähän.
            var H0 = new Vector3(x, h + hr, z0); var H1 = new Vector3(x, h + hr, z1);
            var kk = new Vector3(x, h + hr * 0.3f, (z0 + z1) * 0.5f);
            r.NelioKeskelta(L0 + up, L1 + up, H1, H0, kk, MbKatto);
            r.NelioKeskelta(R0 + up, R1 + up, H1, H0, kk, MbKatto);
            r.KolmioKeskelta(L1 + up, La + up, H1, kk, MbKatto);
            r.KolmioKeskelta(La + up, Ra + up, H1, kk, MbKatto);
            r.KolmioKeskelta(Ra + up, R1 + up, H1, kk, MbKatto);
            if (lahi)
            {
                // Madonnan syvennys apsiksen takatahkossa (8 m:n patsas, kultainen hahmo tummassa kaaressa) ja kuorin ikkunat.
                var n = new Vector3(0f, 0f, 1f);
                var c = (La + Ra) * 0.5f + Vector3.up * 0.055f;
                MbSuippokaari(r, c, n, w * 0.8f, 0.05f, MbAukko);
                r.Timantti(c + n * 0.003f + Vector3.up * 0.002f, 0.0045f, 0.016f, EmKulta, 4);
                foreach (var (p0, p1) in new[] { (L0, L1), (R0, R1) })
                {
                    var nn = (p0.x < x ? Vector3.left : Vector3.right);
                    for (int k = 0; k < 2; k++)
                        MbSuippokaari(r, Vector3.Lerp(p0, p1, 0.3f + 0.4f * k) + Vector3.up * 0.058f, nn, 0.008f, 0.045f, MbAukko);
                }
            }
        }

        /// <summary>
        /// Päätorni (Korkean linnan koillisnurkassa, 66 m vallihaudan pohjalta): neliörunko, ulkoneva sakaraharja (rungossa
        /// sakarat kärkivärinä, lähitasossa oikeina sakaroina), lipputanko ja Puolan valkopunainen lippu (alapuolisko
        /// aksenttia). Oma ääriviivaosa; lipputanko ja lippu omina pieninä osinaan.
        /// </summary>
        static void MbPaatorni(Rakentaja r, bool lahi)
        {
            var p = new Vector3(MbPtX, 0f, MbPtZ);
            float l = MbPtL, yh = MbPtH, harja = 0.018f, lh = l + 0.006f;
            r.AloitaOsa();
            r.Laatikko(p, new Vector3(l, yh, l), MbTiili, MbTiili);
            r.Laatikko(p + Vector3.up * yh, new Vector3(lh, harja, lh), MbTiili, MbTiiliVarjo);
            r.LopetaOsa();
            float yt = yh + harja;
            if (!lahi)
            {
                // Sakaraharjan välit (kärkivärit) kameran puoleisilla sivuilla.
                foreach (var (n, t) in new[] { (Vector3.back, Vector3.right), (Vector3.left, Vector3.forward) })
                    foreach (float f in new[] { -0.2f, 0.2f })
                        r.Laatta(p + n * (lh * 0.5f) + t * (lh * f) + Vector3.up * (yt - 0.005f), n, 0.007f, 0.01f, MbAukko);
            }
            else
            {
                // Sakarat harjan reunalla: kolme kummallakin sivulla (kulmat yhteiset), välit tummina.
                float m = 0.0095f, mh = 0.011f;
                for (int i = 0; i < 4; i++)
                    for (int j = 0; j < 4; j++)
                    {
                        if (i != 0 && i != 3 && j != 0 && j != 3) continue;
                        float fx = -0.5f + i / 3f, fz = -0.5f + j / 3f;
                        var c = p + new Vector3(fx * (lh - m), yt, fz * (lh - m));
                        r.Laatikko(c, new Vector3(m, mh, m), MbTiili, MbTiiliVarjo);
                    }
                // Kulmien konsolit ja harjan alapuolinen listavyö.
                r.Laatikko(p + Vector3.up * (yh - 0.012f), new Vector3(l + 0.003f, 0.004f, l + 0.003f), MbTiiliVaalea, MbTiiliVaalea);
                // Ikkunarivit kameran puoleisilla sivuilla (kapeat suippokaaret).
                foreach (var (n, t) in new[] { (Vector3.back, Vector3.right), (Vector3.left, Vector3.forward) })
                    foreach (float y in new[] { 0.185f, 0.205f })
                        foreach (float f in new[] { -0.2f, 0.2f })
                            MbSuippokaari(r, p + n * (l * 0.5f) + t * (l * f) + Vector3.up * y, n, 0.0055f, 0.013f, MbAukko);
            }
            // Lipputanko ja lippu (valkoinen yläpuolisko, punainen alapuolisko) kohti kameraa oikealle liehuen.
            var tanko = p + Vector3.up * yt;
            r.Laatikko(tanko, new Vector3(0.0022f, 0.034f, 0.0022f), EmMuste, EmMuste);
            var ly = tanko + Vector3.up * 0.034f;
            var ux = new Vector3(0.95f, 0f, -0.3f).normalized * 0.03f;
            r.Kalvo(ly, ly + ux, ly + ux - Vector3.up * 0.008f, ly - Vector3.up * 0.008f, MbKivi);
            r.Kalvo(ly - Vector3.up * 0.008f, ly + ux - Vector3.up * 0.008f, ly + ux - Vector3.up * 0.016f, ly - Vector3.up * 0.016f, MbPunainen);
        }

        /// <summary>
        /// Gdanisko (Herrendansk): erillinen neliötorni rantamuurin linjassa kaariaukkojen päällä ja lonkkakatto, ja
        /// Korkean linnan oikealta sivulta torniin johtava pitkä katettu käytävä neljän kaaren päällä. Yksi ääriviivaosa.
        /// </summary>
        static void MbGdanisko(Rakentaja r, bool lahi)
        {
            var p = new Vector3(MbGdX, 0f, MbGdZ);
            // Käytävä: Korkean linnan oikean siiven kyljestä tornin takaosaan.
            var k0 = new Vector3(MbKlX1 - 0.01f, 0f, 0.035f);
            var k1 = new Vector3(MbGdX - MbGdL * 0.3f, 0f, MbGdZ + 0.012f);
            var d = k1 - k0;
            float pituus = d.magnitude, suunta = (float)Math.Atan2(d.z, d.x);
            var kc = (k0 + k1) * 0.5f;
            const float kLev = 0.022f, kH = 0.062f, kHarja = 0.016f;
            r.AloitaOsa();
            r.Laatikko(p, new Vector3(MbGdL, MbGdH, MbGdS), MbTiili, MbTiili);
            MbLonkka(r, p + Vector3.up * MbGdH, new Vector3(MbGdL + 0.008f, 0.048f, MbGdS + 0.008f), MbKatto);
            MbSiipi(r, kc, suunta, pituus, kLev, kH, kHarja, MbTiili, MbKatto);
            r.LopetaOsa();
            // Tornin kaariaukot (kantava kaaririvi) ja käytävän neljä kaarta kameran puolella.
            foreach (float f in new[] { -0.25f, 0.25f })
                MbSuippokaari(r, p + new Vector3(f * MbGdL, 0.026f, -MbGdS * 0.5f), Vector3.back, 0.017f, 0.05f, MbAukko);
            var ex = new Vector3(Mathf.Cos(suunta), 0f, Mathf.Sin(suunta));
            var etu = new Vector3(Mathf.Sin(suunta), 0f, -Mathf.Cos(suunta));   // käytävän kameran puoleinen normaali
            int kaaria = lahi ? 6 : 4;
            for (int i = 0; i < kaaria; i++)
            {
                float f = -0.5f + (i + 0.5f) / kaaria;
                MbSuippokaari(r, kc + ex * (pituus * f * 0.9f) + etu * (kLev * 0.5f) + Vector3.up * 0.024f, etu, pituus * 0.9f / kaaria * 0.62f, 0.042f, MbAukko);
            }
            if (lahi)
            {
                // Tornin yläosan sokeakaaret ja kivilista.
                foreach (float f in new[] { -0.3f, 0f, 0.3f })
                    MbSuippokaari(r, p + new Vector3(f * MbGdL, 0.091f, -MbGdS * 0.5f - 0.0006f), Vector3.back, 0.011f, 0.012f, MbTiiliVarjo);
                MbLhLista(r, new Vector3(MbGdX - MbGdL * 0.5f, 0.058f, MbGdZ - MbGdS * 0.5f - 0.001f), new Vector3(MbGdX + MbGdL * 0.5f, 0.058f, MbGdZ - MbGdS * 0.5f - 0.001f),
                    Vector3.back, 0.003f, MbTiiliVaalea);
                // Tornin ylemmät aukot (kapeat) ja käytävän ylimmän kerroksen ikkunarivi.
                foreach (float f in new[] { -0.3f, 0f, 0.3f })
                    MbSuippokaari(r, p + new Vector3(f * MbGdL, 0.075f, -MbGdS * 0.5f), Vector3.back, 0.006f, 0.016f, MbAukko);
                for (int i = 0; i < 8; i++)
                {
                    float f = -0.45f + 0.9f * (i + 0.5f) / 8f;
                    r.Laatta(kc + ex * (pituus * f) + etu * (kLev * 0.5f) + Vector3.up * 0.053f, etu, 0.005f, 0.008f, MbAukko);
                }
            }
        }

        /// <summary>Lonkkakatto: räystään keskikohta p, koko (pituus x, korkeus y, syvyys z); harja X-suunnassa (tai piste, jos
        /// neliö). 6 kolmiota.</summary>
        static void MbLonkka(Rakentaja r, Vector3 p, Vector3 koko, Color katto)
        {
            float x = koko.x * 0.5f, z = koko.z * 0.5f, hx = Mathf.Max(0f, x - z);
            Vector3 A = p + new Vector3(-x, 0f, -z), B = p + new Vector3(x, 0f, -z), C = p + new Vector3(x, 0f, z), D = p + new Vector3(-x, 0f, z);
            Vector3 H1 = p + new Vector3(-hx, koko.y, 0f), H2 = p + new Vector3(hx, koko.y, 0f), k = p + Vector3.up * (koko.y * 0.3f);
            r.NelioKeskelta(A, B, H2, H1, k, katto);
            r.NelioKeskelta(C, D, H1, H2, k, katto);
            r.KolmioKeskelta(D, A, H1, k, katto);
            r.KolmioKeskelta(B, C, H2, k, katto);
        }

        /// <summary>
        /// Keskilinna (Mittelschloss): U avautuu oikealle Korkeaa linnaa kohti. Vasen siipi (pohjoissiipi, harja edestä
        /// taakse) porraspäätyineen joelle päin, etusiipi (Suuri refektori, harja pituussuunnassa) palatsiin asti ja takasiipi
        /// (Suurkomturia); pihan avoin sivu suljettu matalalla muurilla. Yksi ääriviivaosa.
        /// </summary>
        static void MbKeskilinna(Rakentaja r, bool lahi)
        {
            float s = MbKeS, h = MbKeR, hr = MbKeH - MbKeR;
            r.AloitaOsa();
            // Vasen siipi koko syvyydeltä.
            MbSiipi(r, new Vector3(MbKeX0 + s * 0.5f, 0f, (MbKeZ0 + MbKeZ1) * 0.5f), Mathf.PI * 0.5f, MbKeZ1 - MbKeZ0, s, h, hr, MbTiili, MbKatto);
            MbPorrasPaaty(r, new Vector3(MbKeX0 + s * 0.5f, h, MbKeZ0 - 0.0035f), s + 0.004f, hr + 0.02f, 3, 0.007f, MbTiili, lahi);
            // Etusiipi vasemmasta siivestä palatsiin (pää palatsin sisällä).
            float xa = MbKeX0 + s * 0.5f, xb = MbPaX0 + 0.02f;
            MbSiipi(r, new Vector3((xa + xb) * 0.5f, 0f, MbKeZ0 + s * 0.5f), 0f, xb - xa, s, h, hr, MbTiili, MbKatto);
            // Takasiipi (päätykolmio pihan avoimella sivulla katsoo Korkeaa linnaa kohti).
            float xc = MbKeX1;
            MbSiipi(r, new Vector3((xa + xc) * 0.5f, 0f, MbKeZ1 - s * 0.5f), 0f, xc - xa, s, h, hr, MbTiili, MbKatto);
            // Pihan avoin sivu: matala muuri palatsin takaa takasiipeen.
            MbMuuri(r, new Vector3(MbKeX1 - 0.004f, 0f, MbPaZ1 - 0.004f), new Vector3(MbKeX1 - 0.004f, 0f, MbKeZ1 - s), 0.036f, 0.01f, MbTiili, MbKatto);
            r.LopetaOsa();
            float zf = MbKeZ0 - 0.001f, xf0 = MbKeX0 + s, xf1 = MbPaX0;
            if (!lahi)
            {
                // Rungossa Suuren refektorin korkeat ikkunat kärkivärinä.
                for (int k = 0; k < 5; k++)
                    r.Laatta(new Vector3(Mathf.Lerp(xf0, xf1, (k + 0.5f) / 5f), 0.036f, zf), Vector3.back, 0.0075f, 0.03f, MbAukko);
                return;
            }
            // Lähitaso: etusiiven jokijulkisivussa Suuren refektorin viisi korkeaa ikkunaa ja ylempi pienten ikkunoiden rivi,
            // listavyö; vasemman siiven porraspäädyn alla kaksi ikkunaa; takasiiven pihajulkisivussa kaksi ikkunariviä;
            // kattolyhdyt etu- ja takasiiven eteläisillä lappeilla.
            for (int k = 0; k < 5; k++)
                MbLhIkkuna(r, new Vector3(Mathf.Lerp(xf0, xf1, (k + 0.5f) / 5f), 0.036f, zf), Vector3.back, 0.0085f, 0.034f);
            for (int k = 0; k < 7; k++)
                r.Laatta(new Vector3(Mathf.Lerp(xf0, xf1, (k + 0.5f) / 7f), 0.063f, zf), Vector3.back, 0.0055f, 0.007f, MbAukko);
            MbLhLista(r, new Vector3(xf0, 0.056f, zf), new Vector3(xf1, 0.056f, zf), Vector3.back, 0.0025f, MbTiiliVarjo);
            foreach (float dx in new[] { -0.011f, 0.011f })
                MbLhIkkuna(r, new Vector3(MbKeX0 + s * 0.5f + dx, 0.036f, zf), Vector3.back, 0.0065f, 0.024f);
            float zb = MbKeZ1 - s - 0.001f;
            for (int k = 0; k < 7; k++)
            {
                float x = Mathf.Lerp(xf0, MbKeX1 - 0.01f, (k + 0.5f) / 7f);
                MbLhIkkuna(r, new Vector3(x, 0.025f, zb), Vector3.back, 0.006f, 0.016f, false);
                MbLhIkkuna(r, new Vector3(x, 0.055f, zb), Vector3.back, 0.006f, 0.016f, false);
            }
            float kk = hr / (s * 0.5f);
            for (int k = 0; k < 3; k++)
            {
                MbLhLyhty(r, new Vector3(Mathf.Lerp(xf0, xf1, (k + 0.5f) / 3f), h + hr * 0.3f, MbKeZ0 + s * 0.5f * 0.3f), Vector3.back, kk, 0.012f, 0.01f, 0.007f);
                MbLhLyhty(r, new Vector3(Mathf.Lerp(xf0, MbKeX1 - 0.02f, (k + 0.5f) / 3f), h + hr * 0.3f, MbKeZ1 - s + s * 0.5f * 0.3f), Vector3.back, kk, 0.012f, 0.01f, 0.007f);
            }
        }

        /// <summary>
        /// Suurmestarin palatsi: korkea tornimainen tiilimassa joelle päin, jyrkkä lonkkakatto, sakaraharjan neljä hoikkaa
        /// kulmatornia ja jokijulkisivun korkeat ikkunat (Kesärefektori; lähitasossa 12 ikkunaa ja graniittipylväät vaaleina).
        /// Oma ääriviivaosa.
        /// </summary>
        static void MbPalatsi(Rakentaja r, bool lahi)
        {
            var c = new Vector3((MbPaX0 + MbPaX1) * 0.5f, 0f, (MbPaZ0 + MbPaZ1) * 0.5f);
            float lx = MbPaX1 - MbPaX0, lz = MbPaZ1 - MbPaZ0;
            r.AloitaOsa();
            r.Laatikko(c, new Vector3(lx, MbPaH, lz), MbTiili, MbTiili);
            MbLonkka(r, c + Vector3.up * MbPaH, new Vector3(lx - 0.012f, MbPaKatto, lz - 0.012f), MbKatto);
            foreach (float sx in new[] { -1f, 1f })
                foreach (float sz in new[] { -1f, 1f })
                {
                    var p = c + new Vector3(sx * (lx * 0.5f - 0.002f), MbPaH - 0.03f, sz * (lz * 0.5f - 0.002f));
                    if (lahi)
                    {
                        r.Vaippa(p, 0.0078f, 0.0078f, 0.046f, 8, MbTiili, Mathf.PI / 8f);
                        r.KartioRaystas(p + Vector3.up * 0.046f, 0.0092f, 0.024f, 8, MbKatto, MbKattoRaystas, 0.2f);
                    }
                    else
                    {
                        r.Vaippa(p, 0.0075f, 0.0075f, 0.046f, 4, MbTiili, Mathf.PI / 4f);
                        r.Pyramidi(p + Vector3.up * 0.046f, 0.0125f, 0.0125f, 0.022f, MbKatto);
                    }
                }
            r.LopetaOsa();
            if (lahi)
            {
                // Sakaraharja jokijulkisivun ja vasemman sivun yläreunassa kulmatornien välissä ja konsolivyö sen alla.
                MbLhSakarat(r, new Vector3(MbPaX0 + 0.011f, MbPaH, MbPaZ0 + 0.0025f), new Vector3(MbPaX1 - 0.011f, MbPaH, MbPaZ0 + 0.0025f),
                    Vector3.back, 5, 0.0075f, 0.008f, 0.005f, MbTiili);
                MbLhSakarat(r, new Vector3(MbPaX0 + 0.0025f, MbPaH, MbPaZ0 + 0.011f), new Vector3(MbPaX0 + 0.0025f, MbPaH, MbPaZ1 - 0.011f),
                    Vector3.left, 4, 0.0075f, 0.008f, 0.005f, MbTiili);
                MbLhLista(r, new Vector3(MbPaX0, MbPaH - 0.012f, MbPaZ0 - 0.001f), new Vector3(MbPaX1, MbPaH - 0.012f, MbPaZ0 - 0.001f), Vector3.back, 0.003f, MbTiiliVaalea);
            }
            float zf = MbPaZ0;
            if (!lahi)
            {
                // Kesärefektorin korkeat ikkunat (4) ja ylemmän kerroksen ikkunanauha.
                for (int k = 0; k < 4; k++)
                    r.Laatta(new Vector3(MbPaX0 + lx * (0.2f + 0.2f * k), 0.064f, zf), Vector3.back, 0.009f, 0.046f, MbAukko);
                r.Laatta(new Vector3(c.x, 0.108f, zf), Vector3.back, lx * 0.7f, 0.006f, MbAukko);
            }
            else
            {
                // Kesärefektorin 12 korkeaa ikkunaa kolmessa ryhmässä, välissä vaaleat graniittipylväät; alla kivijalka ja
                // ylempänä pienempien ikkunoiden rivi sekä sakaraharjan kärkiväriset välit.
                for (int k = 0; k < 12; k++)
                {
                    float f = 0.12f + 0.76f * k / 11f;
                    r.Laatta(new Vector3(MbPaX0 + lx * f, 0.064f, zf), Vector3.back, 0.0045f, 0.05f, MbAukko);
                }
                for (int k = 0; k < 13; k++)
                {
                    float f = 0.12f + 0.76f * (k - 0.5f) / 11f;
                    r.Laatta(new Vector3(MbPaX0 + lx * f, 0.064f, zf - 0.0015f), Vector3.back, 0.0013f, 0.05f, MbGraniitti);
                }
                r.Laatta(new Vector3(c.x, 0.0375f, zf - 0.0004f), Vector3.back, lx * 0.84f, 0.003f, MbTiiliVaalea);
                for (int k = 0; k < 7; k++)
                    MbSuippokaari(r, new Vector3(MbPaX0 + lx * (0.16f + 0.68f * k / 6f), 0.105f, zf), Vector3.back, 0.005f, 0.013f, MbAukko);
                for (int k = 0; k < 6; k++)
                    r.Laatta(new Vector3(MbPaX0 + lx * (0.2f + 0.6f * k / 5f), MbPaH - 0.004f, zf), Vector3.back, 0.006f, 0.008f, MbAukko);
                // Sivujulkisivun (vasen) ikkunat.
                for (int k = 0; k < 3; k++)
                    MbSuippokaari(r, new Vector3(MbPaX0, 0.08f, MbPaZ0 + lz * (0.25f + 0.25f * k)), Vector3.left, 0.006f, 0.03f, MbAukko);
            }
        }

        /// <summary>Alalinnan vihje vasemmassa reunassa: rantamuurin päätorni ja takana toinen torni pyramidikattoineen sekä
        /// muurinpätkä niiden välissä. Yksi ääriviivaosa.</summary>
        static void MbAlalinna(Rakentaja r, bool lahi)
        {
            var a = new Vector3(-0.47f, 0f, MbMuuriZ - 0.002f);
            var b = new Vector3(-0.45f, 0f, 0.075f);
            r.AloitaOsa();
            r.Laatikko(a, new Vector3(0.036f, 0.072f, 0.036f), MbTiili, MbTiili);
            r.Laatikko(b, new Vector3(0.032f, 0.064f, 0.032f), MbTiili, MbTiili);
            if (lahi)
            {
                r.PyramidiRaystas(a + Vector3.up * 0.072f, 0.044f, 0.044f, 0.034f, MbKatto, MbKattoRaystas, 0.2f);
                r.PyramidiRaystas(b + Vector3.up * 0.064f, 0.04f, 0.04f, 0.03f, MbKatto, MbKattoRaystas, 0.2f);
            }
            else
            {
                r.Pyramidi(a + Vector3.up * 0.072f, 0.044f, 0.044f, 0.034f, MbKatto);
                r.Pyramidi(b + Vector3.up * 0.064f, 0.04f, 0.04f, 0.03f, MbKatto);
            }
            MbMuuri(r, a + new Vector3(0.004f, 0f, 0.016f), b + new Vector3(0.002f, 0f, -0.014f), 0.036f, 0.011f, MbTiili, MbKatto);
            if (lahi)
            {
                // Alalinnan rakennukset tornien takana (matalat, siluetin sisällä): Pyhän Laurentiuksen kappeli kattoratsastajineen
                // ja pitkä Karwan (ritarikunnan tallit ja vaunuvaja).
                MbSiipi(r, new Vector3(-0.425f, 0f, 0.135f), Mathf.PI * 0.5f, 0.05f, 0.026f, 0.036f, 0.022f, MbTiili, MbKatto);
                r.Kartio(new Vector3(-0.425f, 0.058f, 0.123f), 0.004f, 0.02f, 4, MbKatto);
                MbSiipi(r, new Vector3(-0.44f, 0f, 0.232f), Mathf.PI * 0.5f, 0.07f, 0.024f, 0.03f, 0.018f, MbTiili, MbKatto);
            }
            r.LopetaOsa();
            if (lahi)
            {
                // Tornien ikkunat ja ampumaraot kameran puolella.
                foreach (float y in new[] { 0.022f, 0.048f })
                    MbSuippokaari(r, a + new Vector3(0f, y, -0.018f), Vector3.back, 0.007f, 0.016f, MbAukko);
                MbSuippokaari(r, b + new Vector3(0f, 0.045f, -0.016f), Vector3.back, 0.007f, 0.016f, MbAukko);
                MbLhIkkuna(r, new Vector3(-0.425f, 0.018f, 0.11f - 0.0015f), Vector3.back, 0.007f, 0.016f);
            }
        }

        /// <summary>Kuivahauta Keskilinnan ja Korkean linnan välissä ja Korkean linnan takana: tumma maakaista (ei ääriviivaa,
        /// kapea). 8 kolmiota.</summary>
        static void MbHauta(Rakentaja r)
        {
            float y = 0.001f;
            foreach (var (x0, x1, z0, z1) in new[] { (-0.07f, -0.03f, -0.025f, 0.075f), (-0.07f, -0.03f, 0.075f, 0.175f),
                (0.035f, 0.1f, MbKlZ1 + 0.012f, MbKlZ1 + 0.045f), (0.1f, 0.155f, MbKlZ1 + 0.012f, MbKlZ1 + 0.045f) })
                r.NelioUlos(new Vector3(x0, y, z0), new Vector3(x1, y, z0), new Vector3(x1, y, z1), new Vector3(x0, y, z1), Vector3.up, MbHautaVari);
        }

        /// <summary>Turnausaita (tilt) ja kaksi paviljonkitelttaa kentän päissä viireineen. Aita on lyhyistä lohkoista, jotta
        /// sille ei tule ääriviivaa (speksi kohta 8).</summary>
        static void MbTurnaus(Rakentaja r)
        {
            const int lohkoja = 6;
            float x0 = MbKenttaX - MbAitaPuoli, pituus = MbAitaPuoli * 2f;
            for (int i = 0; i < lohkoja; i++)
            {
                float a = x0 + pituus * i / lohkoja, b = x0 + pituus * (i + 1) / lohkoja;
                // Etupinta ja yläpinta (takapinta ei käänny etelästä katsovaan kameraan; päädyt ovat seuraavan lohkon kyljessä).
                Vector3 A = new Vector3(a, MbMaaY, MbAitaZ - 0.0018f), B = new Vector3(b, MbMaaY, MbAitaZ - 0.0018f);
                Vector3 C = new Vector3(b, MbMaaY, MbAitaZ + 0.0018f), D = new Vector3(a, MbMaaY, MbAitaZ + 0.0018f);
                var up = Vector3.up * 0.011f;
                r.NelioUlos(A, B, B + up, A + up, Vector3.back, EmPaperi);
                r.NelioUlos(A + up, B + up, C + up, D + up, Vector3.up, EmPaperi);
            }
            foreach (float s in new[] { -1f, 1f })
            {
                var p = new Vector3(MbKenttaX + s * (MbPaa + 0.065f), MbMaaY, MbAitaZ + 0.004f);
                r.Kartio(p, 0.015f, 0.03f, 6, EmPaperi);
                // Viiri kärjessä (punainen, aksenttia).
                r.KalvoKolmio(p + Vector3.up * 0.038f, p + Vector3.up * 0.028f, p + new Vector3(s * 0.012f, 0.034f, 0f), MbPunainen);
            }
        }

        /// <summary>Kameran puoleisen rannan tykki (nykyajan piiritysnäytöksen kanuuna): matala lavetti ja joen yli palatsia
        /// kohti nouseva putki. Pieni osa ilman ääriviivaa.</summary>
        static void MbTykki(Rakentaja r)
        {
            var p = MbTykkiP;
            var d = MbTykinSuunta;
            var s = Vector3.Cross(Vector3.up, d);
            // Lavetti: kiila (etu matalampi).
            Vector3 a0 = p - d * 0.012f - s * 0.005f, a1 = p - d * 0.012f + s * 0.005f, b0 = p + d * 0.006f - s * 0.005f, b1 = p + d * 0.006f + s * 0.005f;
            var yt = Vector3.up * 0.006f;
            var keski = p + Vector3.up * 0.003f;
            r.NelioKeskelta(a0 + yt, a1 + yt, b1 + yt * 0.8f, b0 + yt * 0.8f, keski, EmSeepia);
            r.NelioKeskelta(a0, b0, b0 + yt * 0.8f, a0 + yt, keski, EmSeepia);
            r.NelioKeskelta(a1, b1, b1 + yt * 0.8f, a1 + yt, keski, EmSeepia);
            // Putki: nelitahkoinen, nousee 18° (suu = MbTykinSuu).
            var u = MbTykinPutki;
            var v = Vector3.Cross(u, s).normalized;
            var p0 = p - d * 0.006f + Vector3.up * 0.0085f;
            var p1 = MbTykinSuu;
            float rr = 0.0024f;
            Vector3 K(Vector3 c, int i) => c + (i == 0 ? s : i == 1 ? v : i == 2 ? -s : -v) * rr;
            var kp = (p0 + p1) * 0.5f;
            for (int i = 0; i < 4; i++)
                r.NelioKeskelta(K(p0, i), K(p0, (i + 1) % 4), K(p1, (i + 1) % 4), K(p1, i), kp, EmMuste);
        }

        /// <summary>Tykin paikka kameran puoleisella rannalla ja kuulan osumakohta palatsin jokijulkisivussa (legendan kuula
        /// lentää näiden välillä; lippu on osumakohdan vasemmalla puolella).</summary>
        static Vector3 MbTykkiP => new Vector3(-0.115f, 0f, MbJokiEtu - 0.03f);
        static Vector3 MbKuulaOsuma => new Vector3(MbPaX0 + (MbPaX1 - MbPaX0) * 0.62f, 0.086f, MbPaZ0 - 0.0012f);
        /// <summary>Tykin vaakasuunta palatsia kohti ja putken suunta (nousee 18°).</summary>
        static Vector3 MbTykinSuunta => new Vector3(MbKuulaOsuma.x - MbTykkiP.x, 0f, MbKuulaOsuma.z - MbTykkiP.z).normalized;
        static Vector3 MbTykinPutki => (MbTykinSuunta * Mathf.Cos(0.31f) + Vector3.up * Mathf.Sin(0.31f)).normalized;
        static Vector3 MbTykinSuu => MbTykkiP - MbTykinSuunta * 0.006f + Vector3.up * 0.0085f + MbTykinPutki * 0.022f;
        /// <summary>Legendan ikkuna: lipun ripustuskohta palatsin jokijulkisivun ikkunan yläreunassa.</summary>
        static Vector3 MbLippuP => new Vector3(MbPaX0 + (MbPaX1 - MbPaX0) * 0.3f, 0.103f, MbPaZ0 - 0.0025f);

        /// <summary>Puut (tumma oliivi, ei ääriviivaa): Parchamissa palatsin ja Siltaportin välissä, Gdaniskon ympärillä ja
        /// linnojen takana ja Keskilinnan pihalla. Lähitasossa yhdeksän pienempää puuta lisää.</summary>
        static void MbPuut(Rakentaja r, bool lahi)
        {
            (float x, float z, float k)[] puut =
            {
                (-0.052f, -0.02f, 1.05f), (0.205f, 0.09f, 1.0f), (0.3f, 0.075f, 0.95f), (0.455f, 0.035f, 1.0f),
                (0.46f, 0.13f, 0.9f), (0.1f, 0.215f, 0.95f), (-0.47f, 0.175f, 0.9f), (-0.055f, 0.245f, 0.95f),
            };
            foreach (var (x, z, k) in puut) r.Kartio(new Vector3(x, 0f, z), 0.023f * k, 0.046f * k, 6, EmPuu);
            // Keskilinnan pihan puut (piha on nurmea; puut rikkovat ylhäältä ison vaalean aukon).
            foreach (var (x, z, k) in new[] { (-0.25f, 0.13f, 0.9f), (-0.175f, 0.17f, 0.8f) })
                r.Kartio(new Vector3(x, 0f, z), 0.023f * k, 0.046f * k, 6, EmPuu);
            if (!lahi) return;
            (float x, float z, float k)[] lisa =
            {
                (-0.035f, 0.008f, 0.75f), (0.17f, 0.045f, 0.7f), (0.33f, 0.115f, 0.75f), (0.42f, 0.185f, 0.75f), (0.14f, 0.25f, 0.75f),
                (0.03f, 0.235f, 0.75f), (-0.47f, 0.25f, 0.8f), (0.35f, 0.225f, 0.7f), (-0.3f, 0.2f, 0.75f),
            };
            foreach (var (x, z, k) in lisa) r.Kartio(new Vector3(x, 0f, z), 0.023f * k, 0.046f * k, 6, EmPuu);
        }

        // ---- Lähitason apurit (pienet osat ilman ääriviivaa; kaikki pinnan edessä yövalon hehkun edessä) ----

        /// <summary>Suippokaari-ikkuna: tumma aukko ja vaalea kivinen ikkunalauta (etu- ja yläpinta). p = aukon keskipiste
        /// seinän pinnassa. 8 kolmiota.</summary>
        static void MbLhIkkuna(Rakentaja r, Vector3 p, Vector3 ulos, float lev, float kork, bool lauta = true)
        {
            var n = new Vector3(ulos.x, 0f, ulos.z).normalized;
            var t = Vector3.Cross(Vector3.up, n);
            MbSuippokaari(r, p, n, lev, kork, MbAukko);
            if (!lauta) return;
            var ala = p - Vector3.up * (kork * 0.5f) + n * 0.0015f;
            float w = lev * 0.5f + 0.0012f, sy = 0.0022f;
            r.NelioUlos(ala - t * w, ala + t * w, ala + t * w + n * sy, ala - t * w + n * sy, Vector3.up, MbTiiliVaalea);
            r.NelioUlos(ala - t * w + n * sy - Vector3.up * 0.0016f, ala + t * w + n * sy - Vector3.up * 0.0016f, ala + t * w + n * sy, ala - t * w + n * sy, n, MbTiiliVaalea);
        }

        /// <summary>Listavyö seinän pinnassa pisteestä a pisteeseen b (korkeus a.y): etu- ja yläpinta, ulkonema 0,0015. 4 kolmiota.</summary>
        static void MbLhLista(Rakentaja r, Vector3 a, Vector3 b, Vector3 ulos, float kork, Color vari)
        {
            var n = new Vector3(ulos.x, 0f, ulos.z).normalized * 0.0015f;
            var y = Vector3.up * (kork * 0.5f);
            r.NelioUlos(a + n - y, b + n - y, b + n + y, a + n + y, n, vari);
            r.NelioUlos(a + y, b + y, b + n + y, a + n + y, Vector3.up, vari);
        }

        /// <summary>Sakarat reunalla a → b (ulkopinnan suunta ulos): kpl sakaraa, leveys, korkeus ja paksuus; ulko-, sisä- ja
        /// yläpinta sekä päädyt. 10 kolmiota sakaralta.</summary>
        static void MbLhSakarat(Rakentaja r, Vector3 a, Vector3 b, Vector3 ulos, int kpl, float lev, float kork, float paksuus, Color vari)
        {
            var n = new Vector3(ulos.x, 0f, ulos.z).normalized;
            var t = b - a;
            for (int k = 0; k < kpl; k++)
            {
                var c = Vector3.Lerp(a, b, (k + 0.5f) / kpl) - n * (paksuus * 0.5f);
                var tt = t.normalized;
                var koko = new Vector3(Mathf.Abs(tt.x) * lev + Mathf.Abs(n.x) * paksuus, kork, Mathf.Abs(tt.z) * lev + Mathf.Abs(n.z) * paksuus);
                r.Laatikko(c, koko, vari, MbTiiliVarjo);
            }
        }

        /// <summary>Konsoli tornin alla: ylösalainen kartio tornin pohjasta alas kärkeen. 6 kolmiota (sivuja).</summary>
        static void MbLhKonsoli(Rakentaja r, Vector3 p, float sade, float kork, int sivuja, Color vari)
        {
            var karki = p - Vector3.up * kork;
            var keski = p - Vector3.up * (kork * 0.3f);
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = Mathf.PI / sivuja + i * Mathf.PI * 2f / sivuja, a1 = a0 + Mathf.PI * 2f / sivuja;
                r.KolmioKeskelta(p + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * sade, p + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * sade,
                    karki, keski, vari);
            }
        }

        /// <summary>
        /// Kattolyhty lappeella: p = etuseinän alareunan keskikohta lappeen pinnassa, n = etuseinän suunta (lappeen alamäki), k =
        /// lappeen nousu vaakamatkaa kohden, leveys, seinän ja päädyn korkeus. Etuseinä ja päätykolmio, kyljet, harjakatto ja
        /// tumma ikkuna. 12 kolmiota.
        /// </summary>
        static void MbLhLyhty(Rakentaja r, Vector3 p, Vector3 n, float k, float lev, float hs, float hp)
        {
            n = new Vector3(n.x, 0f, n.z).normalized;
            var t = Vector3.Cross(Vector3.up, n);
            var d = -n;
            float w = lev * 0.5f, ze = hs / k, zh = (hs + hp) / k;
            Vector3 A = p - t * w, B = p + t * w, A1 = A + Vector3.up * hs, B1 = B + Vector3.up * hs, H = p + Vector3.up * (hs + hp);
            var keski = p + Vector3.up * (hs * 0.5f) + d * (ze * 0.5f);
            r.NelioUlos(A, B, B1, A1, n, MbTiili);
            r.KolmioUlos(A1, B1, H, n, MbTiili);
            r.KolmioKeskelta(A, A1, A1 + d * ze, keski, MbTiili);
            r.KolmioKeskelta(B, B1, B1 + d * ze, keski, MbTiili);
            var o = n * 0.002f;
            r.NelioKeskelta(A1 + o - t * 0.0012f, H + o, H + d * zh, A1 + d * ze - t * 0.0012f, keski, MbKatto);
            r.NelioKeskelta(B1 + o + t * 0.0012f, H + o, H + d * zh, B1 + d * ze + t * 0.0012f, keski, MbKatto);
            var q = p + n * 0.0006f;
            r.NelioUlos(q - t * (w * 0.5f) + Vector3.up * (hs * 0.2f), q + t * (w * 0.5f) + Vector3.up * (hs * 0.2f), q + t * (w * 0.5f) + Vector3.up * (hs * 0.85f),
                q - t * (w * 0.5f) + Vector3.up * (hs * 0.85f), n, MbAukko);
        }

        /// <summary>
        /// Lähitason maan yksityiskohdat: kaislatupsut kummallakin rannalla, väreily avovedellä (vaaleat viirut), laiturin paalut,
        /// turnausaidan pylväät, telttojen reunakappa ja ovi sekä tykin pyörät. Pieniä osia ilman ääriviivaa.
        /// </summary>
        static void MbLhMaa(Rakentaja r)
        {
            foreach (var (x, dz, k) in new[] { (-0.46f, -0.006f, 0.8f), (-0.35f, -0.003f, 0.9f), (-0.2f, -0.005f, 0.8f), (-0.02f, -0.006f, 0.85f),
                (0.05f, -0.003f, 0.75f), (0.2f, -0.005f, 0.9f), (0.38f, -0.004f, 0.8f), (0.48f, -0.006f, 0.75f) })
                r.Kartio(new Vector3(x, 0f, MbJokiEtuX(x) + dz), 0.008f * k, 0.017f * k, 3, MbRuoko);
            foreach (float x in new[] { -0.48f, 0.39f, 0.47f })
                r.Kartio(new Vector3(x, 0f, MbJokiTaka + 0.005f), 0.007f, 0.014f, 3, MbRuoko);
            // Väreily: kapeita vaaleita viiruja virran suuntaan (joki virtaa oikealta vasemmalle).
            foreach (var (x, z, l) in new[] { (-0.33f, -0.16f, 0.05f), (-0.12f, -0.176f, 0.055f), (0.06f, -0.152f, 0.045f), (0.27f, -0.172f, 0.05f),
                (0.38f, -0.155f, 0.04f), (-0.36f, -0.184f, 0.035f), (0.16f, -0.186f, 0.04f), (-0.22f, -0.147f, 0.04f) })
                r.NelioUlos(new Vector3(x - l * 0.5f, MbVesiY + 0.0004f, z - 0.0011f), new Vector3(x + l * 0.5f, MbVesiY + 0.0004f, z - 0.0011f),
                    new Vector3(x + l * 0.5f, MbVesiY + 0.0004f, z + 0.0011f), new Vector3(x - l * 0.5f, MbVesiY + 0.0004f, z + 0.0011f), Vector3.up, EmVaahto);
            // Laiturin paalut veden puolella.
            var lp = new Vector3(-0.44f, 0f, MbJokiTaka - 0.014f);
            foreach (float dx in new[] { -0.015f, 0.015f })
                r.Laatikko(lp + new Vector3(dx, 0f, -0.0155f), new Vector3(0.003f, 0.009f, 0.003f), EmSeepia, EmSeepia);
            // Turnausaidan pylväät (kameran puoli ja kansi) ja aidan päiden tolpat.
            for (int i = 0; i <= 6; i++)
            {
                float x = MbKenttaX - MbAitaPuoli + i * MbAitaPuoli * 2f / 6f;
                r.Laatikko(new Vector3(x, MbMaaY, MbAitaZ), new Vector3(0.0032f, i == 0 || i == 6 ? 0.016f : 0.0135f, 0.0048f), EmSeepia, EmPaperi);
            }
            // Teltat: reunakappa (vaalea nauha kartion juuressa) ja tumma oviaukko kentälle päin.
            foreach (float s in new[] { -1f, 1f })
            {
                var p = new Vector3(MbKenttaX + s * (MbPaa + 0.065f), MbMaaY, MbAitaZ + 0.004f);
                for (int i = 0; i < 6; i++)
                {
                    float a0 = i * Mathf.PI / 3f, a1 = (i + 1) * Mathf.PI / 3f;
                    Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)), d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1));
                    var ulos = (d0 + d1) * 0.5f;
                    r.NelioUlos(p + d0 * 0.0152f + Vector3.up * 0.004f, p + d1 * 0.0152f + Vector3.up * 0.004f, p + d1 * 0.0118f + Vector3.up * 0.0072f,
                        p + d0 * 0.0118f + Vector3.up * 0.0072f, ulos + Vector3.up * 0.4f, i % 2 == 0 ? MbPunainen : EmKiviVaalea);
                }
                var ovi = p + new Vector3(-s * 0.0105f, 0.007f, 0f);
                r.Laatta(ovi, new Vector3(-s, 0f, -0.3f), 0.006f, 0.012f, MbAukko);
            }
            // Tykin pyörät lavetin sivuilla.
            var tp = MbTykkiP; var td = MbTykinSuunta; var ts = Vector3.Cross(Vector3.up, td);
            foreach (float sg in new[] { -1f, 1f })
            {
                var m = tp + ts * (sg * 0.0062f) + Vector3.up * 0.005f - td * 0.002f;
                for (int i = 0; i < 6; i++)
                {
                    float a0 = i * Mathf.PI / 3f, a1 = (i + 1) * Mathf.PI / 3f;
                    r.KolmioUlos(m, m + (td * Mathf.Cos(a0) + Vector3.up * Mathf.Sin(a0)) * 0.005f, m + (td * Mathf.Cos(a1) + Vector3.up * Mathf.Sin(a1)) * 0.005f,
                        ts * sg, EmMuste);
                }
            }
        }

        // ---- Liikkuvat osat ----

        /// <summary>Ritarin odotuspaikka: punainen etukaistalla kentän vasemmassa päässä, vaalea takakaistalla oikeassa päässä
        /// (lepoasento; liikeydin laskee siirrot näistä).</summary>
        static Vector3 MbRitariPivot(int k) => k == 0
            ? new Vector3(MbKenttaX - MbPaa, MbMaaY, MbAitaZ - MbKaista)
            : new Vector3(MbKenttaX + MbPaa, MbMaaY, MbAitaZ + MbKaista);

        /// <summary>Kopjan ote ratsastajan kädessä ritarin omassa koordinaatistossa (katse +X).</summary>
        static readonly Vector3 MbOte = new Vector3(0.006f, 0.034f, -0.004f);

        /// <summary>
        /// Ritari (pivot maassa ratsun alla, katse +X; vaalea ritari rakennetaan katse −X, koska sen lepopaikka on kentän
        /// oikeassa päässä): loimen peittämä ratsu (runko, kaula ja pää, häntä ja jalat loimen alla), teräksenharmaa ratsastaja
        /// ja kilpi vasemmalla kyljellä. Noin 11-kertaiseksi liioiteltu, jotta laukka näkyy 40 pt:ssä.
        /// </summary>
        static Mesh MbRitari(bool punainen)
        {
            var r = new Rakentaja();
            var loimi = punainen ? MbPunainen : EmPaperi;
            // Vaalea ritari katsoo lepoasennossa −X (kentän oikeasta päästä keskelle): kärjet kierretään 180° pystyakselin ympäri.
            float s = punainen ? 1f : -1f;
            Vector3 P(float x, float y, float z) => new Vector3(s * x, y, s * z);
            // Jalat: kaksi paria (etujalat eteen, takajalat taakse laukan asennossa), ohuet kalvot loimen alla.
            foreach (var (xa, xb) in new[] { (0.012f, 0.02f), (-0.02f, -0.028f) })
                r.KalvoKolmio(P(xa - 0.004f, 0.012f, 0f), P(xa + 0.004f, 0.012f, 0f), P(xb, 0f, 0f), EmMuste);
            // Runko loimen alla (laatikko ilman pohjaa), loimi ulottuu lähes maahan.
            r.Laatikko(P(-0.003f, 0.009f, 0f), new Vector3(0.045f, 0.02f, 0.015f), loimi, loimi);
            // Kaula ja pää: kalteva särmiö rungon etuosasta ylös ja eteen (loimi peittää myös pään).
            Vector3 k0 = P(0.016f, 0.02f, 0f), k1 = P(0.034f, 0.04f, 0f), w = P(0f, 0f, 0.0048f), w1 = P(0f, 0f, 0.0036f), ylos = P(-0.006f, 0.006f, 0f);
            var kk = (k0 + k1) * 0.5f;
            r.NelioKeskelta(k0 - w + ylos, k1 - w1 + ylos * 0.5f, k1 + w1 + ylos * 0.5f, k0 + w + ylos, kk, loimi);        // niska
            r.NelioKeskelta(k0 - w, k1 - w1, k1 - w1 + ylos * 0.5f, k0 - w + ylos, kk, loimi);                              // oikea kylki
            r.NelioKeskelta(k0 + w, k1 + w1, k1 + w1 + ylos * 0.5f, k0 + w + ylos, kk, loimi);                              // vasen kylki
            var turpa = k1 + P(0.006f, -0.008f, 0f);
            r.KolmioKeskelta(k1 - w1, k1 + w1, turpa, kk, loimi);
            r.KolmioKeskelta(k1 - w1 + ylos * 0.5f, k1 + w1 + ylos * 0.5f, turpa, kk, loimi);
            // Häntä.
            r.KalvoKolmio(P(-0.025f, 0.025f, 0f), P(-0.025f, 0.019f, 0f), P(-0.034f, 0.012f, 0f), punainen ? EmMuste : EmSeepia);
            // Ratsastaja: teräksenharmaa kaksoispyramidi satulassa (vartalo ja kypärä).
            r.Timantti(P(-0.003f, 0.041f, 0f), 0.0062f, 0.0125f, MbTeras, 4);
            // Kilpi vasemmalla kyljellä (+Z omassa koordinaatistossa, aidan puoli ensimmäisessä laukassa).
            r.Kalvo(P(-0.009f, 0.028f, 0.0068f), P(0.002f, 0.028f, 0.0068f), P(0.002f, 0.04f, 0.0068f), P(-0.009f, 0.04f, 0.0068f),
                punainen ? EmPaperi : EmSeepia);
            return r.Verkko(punainen ? "Malbork-ritari0" : "Malbork-ritari1");
        }

        static Mesh MalborkRitari0() => MbRitari(true);
        static Mesh MalborkRitari1() => MbRitari(false);

        /// <summary>Kopja (pivot otteessa, pystyssä): ohut kolmitahkoinen varsi, kärki ylhäällä ja viiri kärjen alla (punaisen
        /// ritarin viiri punainen, vaalean paperia).</summary>
        static Mesh MbKopja(bool punainen)
        {
            var r = new Rakentaja();
            r.Vaippa(new Vector3(0f, -0.012f, 0f), 0.0016f, 0.0011f, 0.086f, 3, EmPaperi);
            r.KalvoKolmio(new Vector3(0f, 0.068f, 0f), new Vector3(0f, 0.058f, 0f), new Vector3(-0.012f, 0.064f, 0f), punainen ? MbPunainen : EmKiviVaalea);
            return r.Verkko(punainen ? "Malbork-kopja0" : "Malbork-kopja1");
        }

        static Mesh MalborkKopja0() => MbKopja(true);
        static Mesh MalborkKopja1() => MbKopja(false);

        /// <summary>Legendan lippu (pivot ikkunan yläreunassa): punainen kangas riippuu ikkunan edessä, kaksipuolinen.</summary>
        static Mesh MalborkLippu()
        {
            var r = new Rakentaja();
            r.Kalvo(new Vector3(-0.0075f, 0f, 0f), new Vector3(0.0075f, 0f, 0f), new Vector3(0.0075f, -0.024f, 0f), new Vector3(-0.0075f, -0.024f, 0f), MbPunainen);
            return r.Verkko("Malbork-lippu");
        }

        /// <summary>Tykin savu (pivot tykin suulla): kolme möykkyä, yläpinta vaalea savu ja alapinta seepia. 3 × 16 kolmiota.</summary>
        static Mesh MalborkSavu()
        {
            var r = new Rakentaja();
            foreach (var (p, s) in new[] { (new Vector3(0f, 0.004f, 0.006f), 0.013f), (new Vector3(-0.011f, 0.012f, -0.002f), 0.011f), (new Vector3(0.01f, 0.01f, -0.006f), 0.0095f) })
                MbMoykky(r, p, s);
            return r.Verkko("Malbork-savu");
        }

        /// <summary>Savumöykky: kahdeksankulmainen kaksoispyramidi, yläpuolisko vaalea ja alapuolisko seepia. 16 kolmiota.</summary>
        static void MbMoykky(Rakentaja r, Vector3 k, float sade)
        {
            Vector3 yla = k + Vector3.up * (sade * 0.9f), ala = k - Vector3.up * (sade * 0.6f);
            for (int i = 0; i < 8; i++)
            {
                float a0 = i * Mathf.PI / 4f, a1 = (i + 1) * Mathf.PI / 4f;
                Vector3 p0 = k + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * sade, p1 = k + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * sade;
                r.KolmioKeskelta(p0, p1, yla, k, MbSavu);
                r.KolmioKeskelta(p1, p0, ala, k, Color.Lerp(MbSavu, EmSeepia, 0.55f));
            }
        }

        /// <summary>Kivikuula (pivot osumakohdassa palatsin seinässä): mustekärkinen kaksoispyramidi, puoliksi seinässä.</summary>
        static Mesh MalborkKuula()
        {
            var r = new Rakentaja();
            r.Timantti(Vector3.zero, 0.0085f, 0.0085f, EmMuste, 4);
            return r.Verkko("Malbork-kuula");
        }

        /// <summary>Yövalojen pivotit (Valot(): skaala 0 → 1 pehmeästi 1,5 s:ssa): jokainen hehkuryhmä on pintojensa tasossa, joten
        /// hehku kasvaa tasossaan eikä välähdä tai leijaile. Muurilinjan valot kasvavat Siltaportilta molempiin suuntiin,
        /// linnojen ja palatsin julkisivut juurestaan ja päätornin hehku tornin juuresta ylös (nousee siiven katon takaa).</summary>
        static readonly Vector3 MbValotPivot = new Vector3(MbPorttiX, 0f, MbMuuriZ - MbMuuriP * 0.5f);
        static readonly Vector3 MbValot1Pivot = new Vector3(-0.1f, 0f, -0.004f);
        static readonly Vector3 MbValot2Pivot = new Vector3((MbPaX0 + MbPaX1) * 0.5f, 0f, MbPaZ0);
        static readonly Vector3 MbValot3Pivot = new Vector3(MbPtX, 0f, MbPtZ - MbPtL * 0.5f);

        /// <summary>
        /// Yövalot muurilinjalla (pivot muurin juuressa Siltaportin kohdalla): rantamuurin etupinnan valonauha (muurikäytävän
        /// aukot jäävät sen eteen), Siltaportin tornien kolme kameran puoleista tahkoa, Gdaniskon etupinta ja Alalinnan tornin
        /// etupinta.
        /// </summary>
        static Mesh MalborkValot()
        {
            var r = new Rakentaja();
            var o = MbValotPivot;
            float ze = MbMuuriZ - MbMuuriP * 0.5f;
            // Muurin valonauha kolmena pätkänä (portti ja Gdanisko katkaisevat).
            foreach (var (a, b) in new[] { (-0.45f, MbPorttiX - MbPorttiDx - 0.02f), (MbPorttiX + MbPorttiDx + 0.02f, MbGdX - MbGdL * 0.5f), (MbGdX + MbGdL * 0.5f, 0.5f) })
                r.Laatta(new Vector3((a + b) * 0.5f, MbMuuriH * 0.46f, ze + 0.0009f) - o, Vector3.back, b - a, MbMuuriH * 0.72f, EmIkkunavalo);
            // Siltaportin tornit: kolme kameran puoleista tahkoa kummassakin (lounas, etelä, kaakko; vaipan tahkot osoittavat
            // 45°:n välein, koska kärjet ovat 22,5°:n kohdalla).
            float apot = MbPorttiR * Mathf.Cos(Mathf.PI / 8f);
            foreach (float s in new[] { -1f, 1f })
            {
                var c = new Vector3(MbPorttiX + s * MbPorttiDx, 0f, MbMuuriZ - 0.004f);
                foreach (float aste in new[] { 225f, 270f, 315f })
                {
                    float a = aste * Mathf.PI / 180f;
                    var n = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                    r.Laatta(c + n * (apot - 0.0008f) + Vector3.up * (MbPorttiH * 0.5f) - o, n, 2f * MbPorttiR * Mathf.Sin(Mathf.PI / 8f) * 0.92f, MbPorttiH * 0.8f, EmIkkunavalo);
                }
            }
            // Gdaniskon etupinta ja Alalinnan tornin etupinta.
            r.Laatta(new Vector3(MbGdX, MbGdH * 0.62f, MbGdZ - MbGdS * 0.5f + 0.0005f) - o, Vector3.back, MbGdL * 0.86f, MbGdH * 0.56f, EmIkkunavalo);
            r.Laatta(new Vector3(-0.47f, 0.042f, MbMuuriZ - 0.002f - 0.018f + 0.0005f) - o, Vector3.back, 0.03f, 0.05f, EmIkkunavalo);
            return r.Verkko("Malbork-valot");
        }

        /// <summary>Yövalot linnojen jokijulkisivuilla (pivot julkisivujen juuressa): Keskilinnan etusiipi ja Korkean linnan
        /// etusiipi (ikkunat jäävät hehkun eteen).</summary>
        static Mesh MalborkValot1()
        {
            var r = new Rakentaja();
            var o = MbValot1Pivot;
            r.Laatta(new Vector3((MbKeX0 + MbPaX0) * 0.5f + 0.01f, MbKeR * 0.52f, MbKeZ0 + 0.0005f) - o, Vector3.back, MbPaX0 - MbKeX0 - 0.02f, MbKeR * 0.8f, EmIkkunavalo);
            r.Laatta(new Vector3((MbKlX0 + MbKlX1) * 0.5f, MbKlR * 0.55f, MbKlZ0 + 0.0005f) - o, Vector3.back, MbKlX1 - MbKlX0 - 0.03f, MbKlR * 0.75f, EmIkkunavalo);
            return r.Verkko("Malbork-valot1");
        }

        /// <summary>Yövalot palatsin jokijulkisivulla (pivot julkisivun juuressa): kivijalka ja yläosa lämpiminä ja Kesärefektorin
        /// korkeat ikkunat vaaleampina (hehku ikkunoiden edessä).</summary>
        static Mesh MalborkValot2()
        {
            var r = new Rakentaja();
            var o = MbValot2Pivot;
            float lx = MbPaX1 - MbPaX0;
            r.Laatta(new Vector3((MbPaX0 + MbPaX1) * 0.5f, 0.024f, MbPaZ0 + 0.0005f) - o, Vector3.back, lx * 0.92f, 0.034f, EmIkkunavalo);
            r.Laatta(new Vector3((MbPaX0 + MbPaX1) * 0.5f, 0.106f, MbPaZ0 + 0.0005f) - o, Vector3.back, lx * 0.92f, 0.03f, EmIkkunavalo);
            // Kesärefektorin ikkunavyöhyke yhtenä vaaleampana hehkuna tummien ikkunoiden (0,0015) edessä ja lähitason
            // graniittipylväiden (0,003) takana.
            r.Laatta(new Vector3((MbPaX0 + MbPaX1) * 0.5f, 0.064f, MbPaZ0 - 0.0007f) - o, Vector3.back, lx * 0.8f, 0.05f, MbPalatsiValo);
            return r.Verkko("Malbork-valot2");
        }

        /// <summary>Päätornin valaistu yläosa (pivot tornin etupinnan juuressa): hehku nousee siiven katon takaa tornin yläosaan.</summary>
        static Mesh MalborkValot3()
        {
            var r = new Rakentaja();
            var o = MbValot3Pivot;
            r.Laatta(new Vector3(MbPtX, MbPtH * 0.8f, MbPtZ - MbPtL * 0.5f + 0.0005f) - o, Vector3.back, MbPtL * 0.8f, MbPtH * 0.28f, EmIkkunavalo);
            return r.Verkko("Malbork-valot3");
        }

        static LiikkuvaOsaMaaritys[] MalborkOsat()
        {
            var ote0 = MbRitariPivot(0) + MbOte;
            var ote1 = MbRitariPivot(1) + new Vector3(-MbOte.x, MbOte.y, -MbOte.z);
            return new[]
            {
                new LiikkuvaOsaMaaritys { Nimi = "ritari0", Verkko = MalborkRitari0, Pivot = MbRitariPivot(0), Liike = Liike.Liuku, Akseli = Vector3.right,
                    Laajuus = MbPaa, KayS = 3.2f, TaukoS = 30f },
                new LiikkuvaOsaMaaritys { Nimi = "ritari1", Verkko = MalborkRitari1, Pivot = MbRitariPivot(1), Liike = Liike.Liuku, Akseli = Vector3.left,
                    Laajuus = MbPaa, KayS = 3.2f, TaukoS = 30f },
                new LiikkuvaOsaMaaritys { Nimi = "kopja0", Verkko = MalborkKopja0, Pivot = ote0, Liike = Liike.Keinunta, Akseli = Vector3.forward, Laajuus = 90f },
                new LiikkuvaOsaMaaritys { Nimi = "kopja1", Verkko = MalborkKopja1, Pivot = ote1, Liike = Liike.Keinunta, Akseli = Vector3.back, Laajuus = 90f },
                new LiikkuvaOsaMaaritys { Nimi = "lippu", Verkko = MalborkLippu, Pivot = MbLippuP, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "savu", Verkko = MalborkSavu, Pivot = MbTykinSuu, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "kuula", Verkko = MalborkKuula, Pivot = MbKuulaOsuma, Liike = Liike.Liuku, Akseli = (MbTykinSuu - MbKuulaOsuma).normalized,
                    Laajuus = (MbTykinSuu - MbKuulaOsuma).magnitude },
                new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = MalborkValot, Pivot = MbValotPivot, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "valot1", Verkko = MalborkValot1, Pivot = MbValot1Pivot, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "valot2", Verkko = MalborkValot2, Pivot = MbValot2Pivot, Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "valot3", Verkko = MalborkValot3, Pivot = MbValot3Pivot, Liike = Liike.Valahdys },
            };
        }

        static readonly bool malbork = Rekisteroi("malbork",
            new Erikoismalli { Runko = MalborkRunko, Osat = MalborkOsat, Lahi = MalborkLahi, Kolmiot0 = 1087, KokoKerroin = 1.5f });

        // ---- LÄHITASO (omistaja 27.9. klo 09.0x Fablen kautta: kolmas taso lähizoomiin, rajapinta Natiivisepältä 1.0.29) ----

        /// <summary>
        /// LÄHITASO (Natiivisepän Erikoismalli.Lahi, katto 3 000 kolmiota): sama siluetti, mittasuhteet, värit, ääriviivaosat (joki
        /// ja niitty, rantamuuri, Siltaportti, Korkea linna, päätorni, kulmatornit, Gdanisko käytävineen, Keskilinna, palatsi ja
        /// Alalinna) ja osien pivotit kuin rungossa, noin 3,1 × kolmiot (2 727) lähikuvan yksityiskohtiin seepiakaiverruksen tapaan.
        /// Korvaa rungon vain lähellä; ritarit, kopjat, legenda ja valot pysyvät ennallaan (kaikki aukot ovat yövalon hehkun edessä,
        /// joten ne ovat yölläkin tummia, ja turnauskenttä, palatsin ikkuna ja tykki ovat samoilla paikoilla).
        ///   rantamuuri  muurikäytävän harjakatto räystäskaistoineen, aukkorivi räystään alla, ampumaraot ja listavyö; tornien
        ///               räystäskaistaiset kypärät, suippokaari-ikkunat ja kivilistat
        ///   Siltaportti kaksi porttikaarta (kaarikehys ja aukko nostoristikkoineen), porttirakennuksen sakarat, tornien
        ///               ampumaraot kahdessa kerroksessa, listavyö ja kartioiden huippukoristeet
        ///   Korkea l.   jokijulkisivun kaksi ikkunariviä ja listavyö, sivusiipien ikkunat porraspäätyjen alla, porraspäätyjen
        ///               sokeakaaret ja pinaakkelit, kolme kattolyhtyä, kulmatornien kuusitahkoiset kypärät, konsolit ja ikkunat,
        ///               päätornin 12 sakaraa, listavyö ja ikkunarivit, kirkon kuorin ikkunat ja Madonnan syvennys takaseinällä
        ///   Keskilinna  Suuren refektorin viisi korkeaa ikkunaa ja ylempi ikkunarivi, porraspäädyn ikkunat, takasiiven
        ///               pihajulkisivun ikkunarivit ja kuusi kattolyhtyä
        ///   palatsi     Kesärefektorin 12 korkeaa ikkunaa graniittipylväineen, kivijalan lista, ylempi suippokaaririvi,
        ///               sakaraharja ja konsolivyö, kahdeksankulmaiset kulmatornit kartioineen ja sivujulkisivun ikkunat
        ///   Gdanisko    käytävän kuusi kaarta ja ikkunarivi, tornin sokeakaaret, kivilista ja ylemmät aukot
        ///   Alalinna    räystäskaistaiset kypärät, ikkunat, Pyhän Laurentiuksen kappeli kattoratsastajineen ja Karwan
        ///   maa         kaislatupsut, väreily, laiturin paalut, turnausaidan pylväät, telttojen reunakappa ja ovi, tykin pyörät
        ///               ja yhdeksän puuta lisää
        /// </summary>
        static Mesh MalborkLahi()
        {
            var r = new Rakentaja();
            MbJoki(r);
            MbRantamuuri(r, true);
            MbSiltaportti(r, true);
            MbKorkeaLinna(r, true);
            MbGdanisko(r, true);
            MbKeskilinna(r, true);
            MbPalatsi(r, true);
            MbAlalinna(r, true);
            MbHauta(r);
            MbTurnaus(r);
            MbTykki(r);
            MbLhMaa(r);
            MbPuut(r, true);
            return r.Verkko("Malbork-lahi");
        }
    }
}
