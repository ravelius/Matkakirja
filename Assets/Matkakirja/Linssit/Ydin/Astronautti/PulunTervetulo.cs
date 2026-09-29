// PULUN TERVETULO ASTRONAUTIN KAMERAAN (A–C) natiivissa (Linssiseppä 29.9.2026; web js/linssit/pulu-tervetulo.js ja
// js/linssit/pulu-iss.js, PR #3575 commit 761f0893a; speksi docs/raportit/pulu-tervetulo-natiivi-speksi-20260929.md):
// puhdas logiikka, kytkennät UI/Linssit/PulunTervetuloNakyma.cs.
//
// Päätoimittajan käsikirjoitus 28.9.2026 (omistaja klo 19.3x): Pulu toivottaa avaruuslinssiin tervetulleeksi ja kertoo, mikä
// juttu tämä on; suosittelee muutamaa paikkaa, pyöräyttää pallon valmiiksi ja kysyy "haluatko katsoa tuonne?", mutta
// räppäisee ennen vastausta väärän näkymän auki, pahoittelee, palaa aloitusnäkymään ja antaa pelaajan katsella itse.
//
//   A1, A2  tervetulo (ei kameraliikettä)
//   B1      kolme suosikkia
//   B2      kamera liukuu Venetsian ylle sanasta "Pyöräytän" (2,00 s) sanaan "noin" (4,60 s)
//   C1      [tap] "Hups." — nokka osuu väärään pisteeseen: Saharan silmän valokuva aukeaa 0,25 s:n kohdalla (napautusääni)
//   C2      kuva sulkeutuu sanasta "Viedään" (3,08 s), ja kamera liukuu aloitusnäkymään sanaan "Kas niin" (5,86 s) mennessä
//
// KERRAN PER LAITE: muisti kirjoitetaan, kun A1 on oikeasti sanottu. Jakso alkaa, kun musta verho on poissa (+900 ms; kysely
// 250 ms, katto 20 s). Jokainen repliikki on oma äänitteensä, ja repliikkien välissä on 400 ms:n hengähdys. KAMERAN TOIMET
// ajastetaan äänitteen alusta (webin 'playing' = ympäristön aaniAlkoi), ja jos soitto ei ala 1,5 s:ssa, varakellolla. Hetket
// on mitattu forced alignmentilla lopullisista äänitteistä: ne on päivitettävä, jos repliikit generoidaan uudelleen. Puhe
// päättyy äänitteen pituuden jälkeen (webin 'ended') tai varakellolla (kesto + 2 s).
// OHITUS: pelaajan napautus tai näppäin puheen aikana vaientaa Livian heti, sulkee väärän kuvan ja palauttaa aloitusnäkymän,
// jos kamera ehti liikkua (700 ms, vähennetyllä liikkeellä heti); ote on silloin pelaajan. Napautus ennen A1:tä on tavallista
// katselua. MYKISTYS (kertoja pois tai Pulun taso 0): jaksoa ei aloiteta eikä muistia kuluteta, ja mykistys kesken jakson
// ohittaa sen. VÄHENNÄ LIIKETTÄ: vain A1–A2 (B–C kertovat kameran liikkeistä). KUPLA EI NÄY (Pulu ei ruudulla):
// ensimmäisellä rivillä jakso jää pois ilman muistia, myöhemmällä seuraavaan riviin hengähdyksen jälkeen.
// D (ISS-kyydin repliikit) ei ole kytketty webissäkään (pulu-iss.js: "rajapinta, ei vielä kytketty"), joten natiivissa vain A–C.
// Ajastimet kulkevat Paivita()-kutsuilla ympäristön kellosta, joten logiikka testataan ilman Unityä
// (Linssit-testit/Testit/PulunTervetuloTestit.cs, webin tests/pulu-iss.test.mjs A–C; kultaiset/pulu-iss.json).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Astronautti
{
    public enum TervetulonVaihe { Odottaa, Puhuu, Valmis, Ohitettu, Purettu, Pois }

    public enum TervetulonToimi { Pyorayta, Rappaise, Palaa }

    /// <summary>Kameran toimi repliikin äänitteen alusta: hetki ja liu'un kesto (ms).</summary>
    public readonly struct TervetulonAskel
    {
        public readonly double Ms, KestoMs;
        public readonly TervetulonToimi Toimi;
        public TervetulonAskel(double ms, TervetulonToimi toimi, double kestoMs = 0) { Ms = ms; Toimi = toimi; KestoMs = kestoMs; }
    }

    /// <summary>Yksi ISS-repliikki (web pulunIssRepliikki): lähde iss-a…c, indeksi, avain, kaanoninen teksti, äänite ja kesto.</summary>
    public sealed class IssRepliikki
    {
        public string Lahde, Avain, Teksti, Aani;
        public int Indeksi;
        public double KestoMs;
    }

    public sealed class TervetulonRivi
    {
        public IssRepliikki Repliikki;
        public TervetulonAskel[] Toimet;
        public bool LiikettaVaativa;
    }

    /// <summary>Tervetulon ympäristö: kello, kamera, kuva, puhe, muisti ja mykistys (Unity: PulunTervetuloNakyma, testit: vale).</summary>
    public interface ITervetulonYmparisto
    {
        /// <summary>Kello millisekunteina.</summary>
        double Nyt { get; }
        /// <summary>Musta verho kokonaan poissa (AvauksenVaihe.Pois; web avaruus.paljastettu).</summary>
        bool Paljastettu();
        /// <summary>Aloitusnäkymä talteen (web aloitustila); null = ei kameraa.</summary>
        Nakyma? Aloitustila();
        bool KatsoKohteeseen(double lat, double lon, double kestoMs);
        void PalaaAloitukseen(Nakyma tila, double kestoMs, bool seuraa);
        /// <summary>C1: väärän kohteen valokuva samalla polulla kuin pisteen napautus; true = kuva auki.</summary>
        bool AvaaVaaraKohde();
        void SuljeKortti();
        /// <summary>
        /// Kupla ja ääni. false = kupla ei näkynyt (Pulu ei ruudulla), eikä mitään soiteta. aaniAlkoi kutsutaan kerran, kun
        /// soitto alkaa (äänitteen pituus ms) tai jää pois (null); sitä ei kutsuta, jos palautus on false.
        /// </summary>
        bool Sano(IssRepliikki repliikki, Action<double?> aaniAlkoi);
        bool Mykistetty();
        /// <summary>Kesken olevan puheen ja kuplien pysäytys.</summary>
        void Vaikene();
        bool Kuultu();
        void MerkitseKuulluksi();
    }

    /// <summary>Tervetulon repliikit, jakso ja vakiot (web pulu-tervetulo.js ja pulu-iss.js, kultaiset/pulu-iss.json).</summary>
    public static class PulunIss
    {
        /// <summary>Laitteen muistin avain: tervetulo on kuultu (web PULUN_TERVETULO_TALLE, sama nimi PlayerPrefsissä).</summary>
        public const string TalleAvain = "matkakirja-pulu-astro-tervetulo";
        public const double TervetulonViiveMs = 900, KyselyMs = 250, KattoMs = 20000;
        public const double ToimienVaraMs = 1500, OhituksenPaluuMs = 700, HengahdysMs = 400, VaraMs = 2000;
        /// <summary>Väärä kohde, johon nokka osuu (C1): Saharan silmä on kaikkea muuta kuin Venetsia.</summary>
        public const string VaaraKohde = "richat";
        /// <summary>Kohde, jonka ylle B2 pyöräyttää pallon.</summary>
        public const string Suosikki = "venetsia";
        public const double SuosikkiLat = 45.44, SuosikkiLon = 12.332;

        // Äänitteet (web LIVIAN_VERSIOIDUT_AANET): eleven_v4, erä pulu-16f2c04e9e19bef41d64; A2 uudelleenäänitetty erässä
        // pulu-ad4d6fcc55d7dd86e8ac. Kestot (LIVIAN_KESTOT) sisältävät mallin 1,0 s:n lopputauon.
        const string Era = "aanet/pulu/versiot/5d65b85250a9/pulu-16f2c04e9e19bef41d64/tasoitettu/";
        const string EraA2 = "aanet/pulu/versiot/ca095f4d3132/pulu-ad4d6fcc55d7dd86e8ac/tasoitettu/";

        static IssRepliikki R(char ryhma, int i, double kestoS, string teksti, string era = Era) => new IssRepliikki
        {
            Lahde = "iss-" + ryhma, Indeksi = i, Avain = $"iss-{ryhma}-{i + 1}", Teksti = teksti,
            KestoMs = Math.Round(kestoS * 1000), Aani = era + $"livia-iss-{ryhma}-{i + 1}.mp3",
        };

        /// <summary>Tekstit ovat kaanonia (web js/livia.js LIVIAN_ISS a–c, tagittomina).</summary>
        public static readonly IReadOnlyList<TervetulonRivi> Jakso = new[]
        {
            new TervetulonRivi { Toimet = new TervetulonAskel[0], Repliikki = R('a', 0, 14.32,
                "Kas, sinäkin täällä! Tervetuloa avaruuteen, tai no, sen reunalle. Tämä on Astronautin kamera: oikeita valokuvia, "
                + "jotka astronautit ovat ottaneet Kansainväliseltä avaruusasemalta.") },
            new TervetulonRivi { Toimet = new TervetulonAskel[0], Repliikki = R('a', 1, 12.16,
                "Ja kaikki tämä noin neljänsadan kilometrin korkeudelta. Minä en ole koskaan lentänyt niin korkealle. Setäni väittää "
                + "lentäneensä, mutta setä väittää paljon.", EraA2) },
            new TervetulonRivi { Toimet = new TervetulonAskel[0], LiikettaVaativa = true, Repliikki = R('b', 0, 8.32,
                "Katsotaanko ensin jotain? Minulla on kolme suosikkia: Venetsian laguuni, Alpit ja Santorinin tulivuoren kaldera.") },
            // "Pyöräytän" 2,00 s → "noin." 4,60 s.
            new TervetulonRivi { LiikettaVaativa = true, Toimet = new[] { new TervetulonAskel(2000, TervetulonToimi.Pyorayta, 2600) },
                Repliikki = R('b', 1, 6.96, "Venetsia! Pyöräytän pallon valmiiksi… noin. Haluatko katsoa tuonne?") },
            // [tap] on äänitteen ensimmäinen ääni; "Hups." alkaa 0,86 s.
            new TervetulonRivi { LiikettaVaativa = true, Toimet = new[] { new TervetulonAskel(250, TervetulonToimi.Rappaise) },
                Repliikki = R('c', 0, 10.32,
                    "Hups. Nokka osui väärään kohtaan. Tuo ei todellakaan ole Venetsia. Painottomuus ei sovi kyyhkyille.") },
            // "Viedään" 3,08 s → "Kas niin." 5,86 s.
            new TervetulonRivi { LiikettaVaativa = true, Toimet = new[] { new TervetulonAskel(3080, TervetulonToimi.Palaa, 2780) },
                Repliikki = R('c', 1, 11.12,
                    "Anteeksi, anteeksi! Viedään kaikki takaisin alkuun… Kas niin. Pyöritä sinä, minä en enää koske mihinkään. Lupaan.") },
        };

        /// <summary>Ne jakson rivit, jotka tässä tilassa sanotaan (web pulunTervetulonRepliikit).</summary>
        public static List<TervetulonRivi> Repliikit(bool vahennaLiiketta)
        {
            var r = new List<TervetulonRivi>();
            foreach (var x in Jakso) if (!vahennaLiiketta || !x.LiikettaVaativa) r.Add(x);
            return r;
        }

        public static string Nimi(TervetulonToimi t) => t switch
        {
            TervetulonToimi.Pyorayta => "pyorayta",
            TervetulonToimi.Rappaise => "rappaise",
            _ => "palaa",
        };
    }

    /// <summary>Tervetulon tilakone (web aloitaPulunTervetulo). Luo Aloita-kutsulla ja aja Paivita()-kutsuilla ruuduittain.</summary>
    public sealed class PulunTervetulo
    {
        readonly ITervetulonYmparisto y;
        readonly List<TervetulonRivi> rivit;
        readonly List<Ajastin> ajastimet = new List<Ajastin>();
        readonly List<string> sanotut = new List<string>(), toimitetut = new List<string>();
        readonly double alkoi;
        double nyt;
        long jarjestys;
        int versio;
        Nakyma? aloitustila;

        sealed class Ajastin
        {
            public double Aika;
            public long Jarjestys;
            public Action Toimi;
        }

        /// <summary>Yhden repliikin vuoro: soiton alku, toimet ja loppu kerran (webin kerran-kääreet).</summary>
        sealed class Vuoro
        {
            public int Indeksi, Versio;
            public TervetulonRivi Rivi;
            public bool Kirjattu, AaniTuli, Toimet, Loppui;
            public double? Pituus;
        }

        public TervetulonVaihe Vaihe { get; private set; } = TervetulonVaihe.Odottaa;
        /// <summary>Repliikki kesken (hengähdyksen aikana false; web tila().puhuu).</summary>
        public bool Puhuu { get; private set; }
        public bool KameraLiikkui { get; private set; }
        public bool KorttiAuki { get; private set; }
        public bool VahennaLiiketta { get; }
        public IReadOnlyList<string> Sanotut => sanotut;
        public IReadOnlyList<string> Toimitetut => toimitetut;
        /// <summary>Jakso käynnissä tai alkamassa: Pulun taulu odottaa sitä (web automaattiKierros).</summary>
        public bool Kesken => Vaihe == TervetulonVaihe.Odottaa || Vaihe == TervetulonVaihe.Puhuu;

        PulunTervetulo(ITervetulonYmparisto y, bool vahennaLiiketta)
        {
            this.y = y;
            VahennaLiiketta = vahennaLiiketta;
            rivit = PulunIss.Repliikit(vahennaLiiketta);
            nyt = alkoi = y.Nyt;
        }

        /// <summary>ALOITTAA TERVETULON, jos sen aika on. null = jo kuultu tai mykistetty (web palauttaa null).</summary>
        public static PulunTervetulo Aloita(ITervetulonYmparisto ymparisto, bool vahennaLiiketta)
        {
            if (ymparisto == null || ymparisto.Kuultu() || ymparisto.Mykistetty()) return null;
            var t = new PulunTervetulo(ymparisto, vahennaLiiketta);
            t.Odota();
            return t;
        }

        // --- kello ------------------------------------------------------------------------------------------------

        void Ajasta(Action toimi, double ms) =>
            ajastimet.Add(new Ajastin { Aika = nyt + Math.Max(0, ms), Jarjestys = jarjestys++, Toimi = toimi });

        /// <summary>Kello eteenpäin ympäristön aikaan: erääntyneet ajastimet aikajärjestyksessä (samat lisäysjärjestyksessä).</summary>
        public void Paivita()
        {
            double loppu = Math.Max(nyt, y.Nyt);
            for (;;)
            {
                Ajastin s = null;
                foreach (var a in ajastimet)
                    if (a.Aika <= loppu && (s == null || a.Aika < s.Aika || (a.Aika == s.Aika && a.Jarjestys < s.Jarjestys))) s = a;
                if (s == null) break;
                ajastimet.Remove(s);
                nyt = Math.Max(nyt, s.Aika);
                s.Toimi();
            }
            nyt = loppu;
        }

        void Tyhjenna()
        {
            ajastimet.Clear();
            versio++;
        }

        // --- alku: odota, että musta verho on poissa --------------------------------------------------------------

        void Odota()
        {
            if (Vaihe != TervetulonVaihe.Odottaa) return;
            bool valmisNakyma;
            try { valmisNakyma = y.Paljastettu(); } catch { valmisNakyma = true; }
            if (!valmisNakyma)
            {
                if (nyt - alkoi > PulunIss.KattoMs) { Vaihe = TervetulonVaihe.Pois; return; }
                Ajasta(Odota, PulunIss.KyselyMs);
                return;
            }
            Ajasta(() =>
            {
                if (Vaihe != TervetulonVaihe.Odottaa) return;
                if (y.Mykistetty()) { Vaihe = TervetulonVaihe.Pois; return; }
                try { aloitustila = y.Aloitustila(); } catch { aloitustila = null; }
                Vaihe = TervetulonVaihe.Puhuu;
                SanoRivi(0);
            }, PulunIss.TervetulonViiveMs);
        }

        // --- repliikki kerrallaan ---------------------------------------------------------------------------------

        void SanoRivi(int i)
        {
            if (Vaihe != TervetulonVaihe.Puhuu) return;
            if (i >= rivit.Count) { Valmis(); return; }
            if (y.Mykistetty()) { Ohita("mykistys"); return; }
            var v = new Vuoro { Indeksi = i, Rivi = rivit[i], Versio = ++versio };
            bool nakyi = y.Sano(v.Rivi.Repliikki, pituus => AaniAlkoi(v, pituus));
            if (v.Versio != versio || Vaihe != TervetulonVaihe.Puhuu) return;
            if (!nakyi)
            {
                // Kupla ei näkynyt: ensimmäisellä rivillä jakso jää kokonaan pois eikä muistia kuluteta.
                if (i == 0) { Vaihe = TervetulonVaihe.Pois; Tyhjenna(); return; }
                Ajasta(() => SanoRivi(i + 1), PulunIss.HengahdysMs);
                return;
            }
            if (i == 0) y.MerkitseKuulluksi();
            Puhuu = true;
            sanotut.Add(v.Rivi.Repliikki.Avain);
            v.Kirjattu = true;
            // TOIMET ÄÄNEN KELLOSTA: hetket on mitattu äänitteen alusta, joten ne ajastetaan vasta soiton alkaessa. Hidas lataus
            // ei vie pyöräytystä sanojen edelle; varakello käynnistää toimet joka tapauksessa.
            if (v.Rivi.Toimet.Length > 0) Ajasta(() => AloitaToimet(v), PulunIss.ToimienVaraMs);
            Ajasta(() => Loppu(v), v.Rivi.Repliikki.KestoMs + PulunIss.VaraMs);
            if (v.AaniTuli) KasitteleAani(v);
        }

        void AaniAlkoi(Vuoro v, double? pituus)
        {
            if (v.Versio != versio || v.AaniTuli) return;
            v.AaniTuli = true;
            v.Pituus = pituus;
            if (v.Kirjattu) KasitteleAani(v);
        }

        void KasitteleAani(Vuoro v)
        {
            if (v.Versio != versio || Vaihe != TervetulonVaihe.Puhuu) return;
            nyt = Math.Max(nyt, y.Nyt);
            AloitaToimet(v);
            if (v.Pituus.HasValue) Ajasta(() => Loppu(v), v.Pituus.Value);
        }

        void AloitaToimet(Vuoro v)
        {
            if (v.Toimet || v.Versio != versio) return;
            v.Toimet = true;
            foreach (var t in v.Rivi.Toimet) { var a = t; Ajasta(() => TeeToimi(a), a.Ms); }
        }

        void Loppu(Vuoro v)
        {
            if (v.Loppui || v.Versio != versio) return;
            v.Loppui = true;
            Puhuu = false;
            Ajasta(() => SanoRivi(v.Indeksi + 1), PulunIss.HengahdysMs);
        }

        void Valmis()
        {
            Vaihe = TervetulonVaihe.Valmis;
            Puhuu = false;
            Tyhjenna();
        }

        // --- kameran toimet ---------------------------------------------------------------------------------------

        void TeeToimi(TervetulonAskel a)
        {
            if (Vaihe != TervetulonVaihe.Puhuu) return;
            toimitetut.Add(PulunIss.Nimi(a.Toimi));
            if (VahennaLiiketta) return;
            try
            {
                switch (a.Toimi)
                {
                    case TervetulonToimi.Pyorayta:
                        KameraLiikkui = y.KatsoKohteeseen(PulunIss.SuosikkiLat, PulunIss.SuosikkiLon, a.KestoMs) || KameraLiikkui;
                        break;
                    case TervetulonToimi.Rappaise:
                        KorttiAuki = y.AvaaVaaraKohde() || KorttiAuki;
                        KameraLiikkui = true;
                        break;
                    case TervetulonToimi.Palaa:
                        if (KorttiAuki) { y.SuljeKortti(); KorttiAuki = false; }
                        if (aloitustila.HasValue) y.PalaaAloitukseen(aloitustila.Value, a.KestoMs, true);
                        KameraLiikkui = false;
                        break;
                }
            }
            catch { /* kamera ei ole jakson omaa: virhe ei saa kaataa puhetta */ }
        }

        // --- ohitus ja purku --------------------------------------------------------------------------------------

        /// <summary>Pelaajan napautus tai näppäin missä tahansa: ohittaa vain puheen aikana (web ohitaNapautuksesta).</summary>
        public bool Napautus() => Vaihe == TervetulonVaihe.Puhuu && Ohita("napautus");

        /// <summary>
        /// Ohitus: Livia vaikenee heti, väärä kuva sulkeutuu ja kamera palaa aloitukseen, jos se ehti liikkua; seurantaa ei
        /// kytketä takaisin (ote on pelaajan). false = jakso on jo ohi.
        /// </summary>
        public bool Ohita(string syy = "kutsu")
        {
            if (Vaihe != TervetulonVaihe.Odottaa && Vaihe != TervetulonVaihe.Puhuu) return false;
            bool kesken = Vaihe == TervetulonVaihe.Puhuu;
            Vaihe = TervetulonVaihe.Ohitettu;
            Tyhjenna();
            if (kesken) { try { y.Vaikene(); } catch { /* ei soitinta */ } }
            Puhuu = false;
            if (KorttiAuki) { try { y.SuljeKortti(); } catch { /* jo kiinni */ } KorttiAuki = false; }
            if (KameraLiikkui && aloitustila.HasValue)
            {
                try { y.PalaaAloitukseen(aloitustila.Value, VahennaLiiketta ? 0 : PulunIss.OhituksenPaluuMs, false); }
                catch { /* ei kameraa */ }
                KameraLiikkui = false;
            }
            toimitetut.Add("ohitus:" + syy);
            return true;
        }

        /// <summary>Linssi suljettiin: puhe ja ajastimet pois, kamera ja kuva jäävät linssin purulle.</summary>
        public void Pura()
        {
            if (Vaihe == TervetulonVaihe.Purettu) return;
            bool kesken = Vaihe == TervetulonVaihe.Puhuu;
            Vaihe = TervetulonVaihe.Purettu;
            Tyhjenna();
            if (kesken) { try { y.Vaikene(); } catch { /* ei soitinta */ } }
            Puhuu = false;
            KorttiAuki = false;
        }

        /// <summary>Mittari testikomennolle ja laiteajolle (web tila()).</summary>
        public override string ToString() =>
            $"tervetulo {Vaihe}{(Puhuu ? " puhuu" : "")}, sanotut [{string.Join(" ", sanotut)}], toimet [{string.Join(" ", toimitetut)}], "
            + $"kamera {(KameraLiikkui ? "liikkui" : "paikallaan")}, kuva {(KorttiAuki ? "auki" : "kiinni")}"
            + (VahennaLiiketta ? ", vähennetty liike" : "");
    }
}
