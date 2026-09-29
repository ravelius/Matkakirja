// PULUN TERVETULO ASTRONAUTIN KAMERAAN (A1–A2) natiivissa (Linssiseppä 29.9.2026; web js/linssit/pulu-tervetulo.js ja
// js/linssit/pulu-iss.js, PR #3575; speksi docs/raportit/pulu-tervetulo-natiivi-speksi-20260929.md): puhdas logiikka,
// kytkennät UI/Linssit/PulunTervetuloNakyma.cs.
//
// OMISTAJA 29.9.2026: selitys oli liian pitkä. Suositukset, pallon pyöräytys ja väärä kuva (B- ja C-ryhmät) jäivät pois, eikä
// Pulu puhu kuplin: linssin aktivoinnissa Pulun taulu aukeaa heti näkyviin, ja Pulu puhuu tervetulonsa sen aikana ilman kuplaa.
// Tervetulo ei liikuta kameraa.
//
// KERRAN PER LAITE: muisti kirjoitetaan, kun A1 on oikeasti alkanut. Jakso alkaa, kun musta verho on poissa (+900 ms; kysely
// 250 ms, katto 20 s). Jokainen repliikki on oma äänitteensä, ja repliikkien välissä on 400 ms:n hengähdys. Puhe päättyy
// äänitteen pituuden jälkeen (webin 'ended') tai varakellolla (kesto + 2 s).
// OHITUS: pelaajan napautus tai näppäin puheen aikana vaientaa Livian heti; napautus menee silti perille (taulun rivi, pallo).
// Napautus ennen A1:tä on tavallista katselua. MYKISTYS (kertoja pois tai Pulun taso 0): jaksoa ei aloiteta eikä muistia
// kuluteta, ja mykistys kesken jakson ohittaa sen. PULU EI VOI PUHUA (ei ruudulla): ensimmäisellä rivillä jakso jää pois ilman
// muistia, myöhemmällä seuraavaan riviin hengähdyksen jälkeen.
// D (ISS-kyydin repliikit) ei ole kytketty webissäkään (pulu-iss.js: "rajapinta, ei vielä kytketty"), joten natiivissa vain A.
// Ajastimet kulkevat Paivita()-kutsuilla ympäristön kellosta, joten logiikka testataan ilman Unityä
// (Linssit-testit/Testit/PulunTervetuloTestit.cs, webin tests/pulu-iss.test.mjs; kultaiset/pulu-iss.json).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Astronautti
{
    public enum TervetulonVaihe { Odottaa, Puhuu, Valmis, Ohitettu, Purettu, Pois }

    /// <summary>Yksi ISS-repliikki (web pulunIssRepliikki): lähde iss-a, indeksi, avain, kaanoninen teksti, äänite ja kesto.</summary>
    public sealed class IssRepliikki
    {
        public string Lahde, Avain, Teksti, Aani;
        public int Indeksi;
        public double KestoMs;
    }

    /// <summary>Tervetulon ympäristö: kello, verho, puhe, muisti ja mykistys (Unity: PulunTervetuloNakyma, testit: vale).</summary>
    public interface ITervetulonYmparisto
    {
        /// <summary>Kello millisekunteina.</summary>
        double Nyt { get; }
        /// <summary>Musta verho kokonaan poissa (AvauksenVaihe.Pois; web avaruus.paljastettu).</summary>
        bool Paljastettu();
        /// <summary>
        /// Puhe ilman kuplaa (web sanoPulunIssRepliikkiIlmanKuplaa). false = Pulu ei voi puhua, eikä mitään soiteta. aaniAlkoi
        /// kutsutaan kerran, kun soitto alkaa (äänitteen pituus ms) tai jää pois (null); sitä ei kutsuta, jos palautus on false.
        /// </summary>
        bool Sano(IssRepliikki repliikki, Action<double?> aaniAlkoi);
        bool Mykistetty();
        /// <summary>Kesken olevan puheen pysäytys.</summary>
        void Vaikene();
        bool Kuultu();
        void MerkitseKuulluksi();
    }

    /// <summary>Tervetulon repliikit, jakso ja vakiot (web pulu-tervetulo.js ja pulu-iss.js, kultaiset/pulu-iss.json).</summary>
    public static class PulunIss
    {
        /// <summary>Laitteen muistin avain: tervetulo on kuultu (web PULUN_TERVETULO_TALLE, sama nimi PlayerPrefsissä).</summary>
        public const string TalleAvain = "matkakirja-pulu-astro-tervetulo";
        public const double TervetulonViiveMs = 900, KyselyMs = 250, KattoMs = 20000, HengahdysMs = 400, VaraMs = 2000;

        // Äänitteet (web LIVIAN_VERSIOIDUT_AANET): eleven_v4, erä pulu-16f2c04e9e19bef41d64; A2 uudelleenäänitetty erässä
        // pulu-ad4d6fcc55d7dd86e8ac. Kestot (LIVIAN_KESTOT) sisältävät mallin 1,0 s:n lopputauon.
        const string Era = "aanet/pulu/versiot/5d65b85250a9/pulu-16f2c04e9e19bef41d64/tasoitettu/";
        const string EraA2 = "aanet/pulu/versiot/ca095f4d3132/pulu-ad4d6fcc55d7dd86e8ac/tasoitettu/";

        static IssRepliikki R(char ryhma, int i, double kestoS, string teksti, string era = Era) => new IssRepliikki
        {
            Lahde = "iss-" + ryhma, Indeksi = i, Avain = $"iss-{ryhma}-{i + 1}", Teksti = teksti,
            KestoMs = Math.Round(kestoS * 1000), Aani = era + $"livia-iss-{ryhma}-{i + 1}.mp3",
        };

        /// <summary>Tekstit ovat kaanonia (web js/livia.js LIVIAN_ISS.a, tagittomina).</summary>
        public static readonly IReadOnlyList<IssRepliikki> Jakso = new[]
        {
            R('a', 0, 14.32,
                "Kas, sinäkin täällä! Tervetuloa avaruuteen, tai no, sen reunalle. Tämä on Astronautin kamera: oikeita valokuvia, "
                + "jotka astronautit ovat ottaneet Kansainväliseltä avaruusasemalta."),
            R('a', 1, 12.16,
                "Ja kaikki tämä noin neljänsadan kilometrin korkeudelta. Minä en ole koskaan lentänyt niin korkealle. Setäni väittää "
                + "lentäneensä, mutta setä väittää paljon.", EraA2),
        };
    }

    /// <summary>Tervetulon tilakone (web aloitaPulunTervetulo). Luo Aloita-kutsulla ja aja Paivita()-kutsuilla ruuduittain.</summary>
    public sealed class PulunTervetulo
    {
        readonly ITervetulonYmparisto y;
        readonly List<Ajastin> ajastimet = new List<Ajastin>();
        readonly List<string> sanotut = new List<string>(), tapahtumat = new List<string>();
        readonly double alkoi;
        double nyt;
        long jarjestys;
        int versio;

        sealed class Ajastin
        {
            public double Aika;
            public long Jarjestys;
            public Action Toimi;
        }

        /// <summary>Yhden repliikin vuoro: soiton alku ja loppu kerran (webin kerran-kääreet).</summary>
        sealed class Vuoro
        {
            public int Indeksi, Versio;
            public IssRepliikki Repliikki;
            public bool Kirjattu, AaniTuli, Loppui;
            public double? Pituus;
        }

        public TervetulonVaihe Vaihe { get; private set; } = TervetulonVaihe.Odottaa;
        /// <summary>Repliikki kesken (hengähdyksen aikana false; web tila().puhuu).</summary>
        public bool Puhuu { get; private set; }
        public IReadOnlyList<string> Sanotut => sanotut;
        /// <summary>Ohitukset syineen (web tila().tapahtumat).</summary>
        public IReadOnlyList<string> Tapahtumat => tapahtumat;
        /// <summary>Jakso käynnissä tai alkamassa (web tervetuloKesken: 'odottaa' tai 'puhuu').</summary>
        public bool Kesken => Vaihe == TervetulonVaihe.Odottaa || Vaihe == TervetulonVaihe.Puhuu;

        PulunTervetulo(ITervetulonYmparisto y)
        {
            this.y = y;
            nyt = alkoi = y.Nyt;
        }

        /// <summary>ALOITTAA TERVETULON, jos sen aika on. null = jo kuultu tai mykistetty (web palauttaa null).</summary>
        public static PulunTervetulo Aloita(ITervetulonYmparisto ymparisto)
        {
            if (ymparisto == null || ymparisto.Kuultu() || ymparisto.Mykistetty()) return null;
            var t = new PulunTervetulo(ymparisto);
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
                Vaihe = TervetulonVaihe.Puhuu;
                SanoRivi(0);
            }, PulunIss.TervetulonViiveMs);
        }

        // --- repliikki kerrallaan ---------------------------------------------------------------------------------

        void SanoRivi(int i)
        {
            if (Vaihe != TervetulonVaihe.Puhuu) return;
            if (i >= PulunIss.Jakso.Count) { Valmis(); return; }
            if (y.Mykistetty()) { Ohita("mykistys"); return; }
            var v = new Vuoro { Indeksi = i, Repliikki = PulunIss.Jakso[i], Versio = ++versio };
            bool puhuu = y.Sano(v.Repliikki, pituus => AaniAlkoi(v, pituus));
            if (v.Versio != versio || Vaihe != TervetulonVaihe.Puhuu) return;
            if (!puhuu)
            {
                // Pulu ei voi puhua: ensimmäisellä rivillä jakso jää kokonaan pois eikä muistia kuluteta.
                if (i == 0) { Vaihe = TervetulonVaihe.Pois; Tyhjenna(); return; }
                Ajasta(() => SanoRivi(i + 1), PulunIss.HengahdysMs);
                return;
            }
            if (i == 0) y.MerkitseKuulluksi();
            Puhuu = true;
            sanotut.Add(v.Repliikki.Avain);
            v.Kirjattu = true;
            Ajasta(() => Loppu(v), v.Repliikki.KestoMs + PulunIss.VaraMs);
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
            if (v.Pituus.HasValue) Ajasta(() => Loppu(v), v.Pituus.Value);
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

        // --- ohitus ja purku --------------------------------------------------------------------------------------

        /// <summary>Pelaajan napautus tai näppäin missä tahansa: ohittaa vain puheen aikana (web ohitaNapautuksesta).</summary>
        public bool Napautus() => Vaihe == TervetulonVaihe.Puhuu && Ohita("napautus");

        /// <summary>Ohitus: Livia vaikenee heti; ote on pelaajan. false = jakso on jo ohi.</summary>
        public bool Ohita(string syy = "kutsu")
        {
            if (Vaihe != TervetulonVaihe.Odottaa && Vaihe != TervetulonVaihe.Puhuu) return false;
            bool kesken = Vaihe == TervetulonVaihe.Puhuu;
            Vaihe = TervetulonVaihe.Ohitettu;
            Tyhjenna();
            if (kesken) { try { y.Vaikene(); } catch { /* ei soitinta */ } }
            Puhuu = false;
            tapahtumat.Add("ohitus:" + syy);
            return true;
        }

        /// <summary>Linssi suljettiin: puhe ja ajastimet pois.</summary>
        public void Pura()
        {
            if (Vaihe == TervetulonVaihe.Purettu) return;
            bool kesken = Vaihe == TervetulonVaihe.Puhuu;
            Vaihe = TervetulonVaihe.Purettu;
            Tyhjenna();
            if (kesken) { try { y.Vaikene(); } catch { /* ei soitinta */ } }
            Puhuu = false;
        }

        /// <summary>Mittari testikomennolle ja laiteajolle (web tila()).</summary>
        public override string ToString() =>
            $"tervetulo {Vaihe}{(Puhuu ? " puhuu" : "")}, sanotut [{string.Join(" ", sanotut)}]"
            + (tapahtumat.Count > 0 ? $", tapahtumat [{string.Join(" ", tapahtumat)}]" : "");
    }
}
