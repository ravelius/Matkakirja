// UI-NÄKYMÄT: natiivin käyttöliittymän kokoaja (Natiivi-UI, erä 1).
//
// Rakentaa yläpalkin (tilarivi, ratas, hampurilainen), pudotuspaneelit,
// vahvistusdialogin, matkavalinnan, kaupunkikortin ja kysymysnäkymän
// UiKerroksen paneeleihin ja kytkee ne
// Pelikoodarin näkymätehtaaseen (PeliNakymat, BeforeSceneLoad), joten
// PeliOhjain käyttää näitä UGUI-varanäkymien sijaan. Näkymät ovat olemassa
// myös ilman pelisilmukkaa (peli pois -tila, 3D-mittaukset).
//
// Pelin teot vain PeliOhjaimen julkisen API:n kautta (RAJAPINTA.md):
// "uusi peli" → PeliOhjain.Instanssi.UusiPeli(null).
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class UiNakymat
    {
        static UiNakymat instanssi;

        /// <summary>Sisältöpaketin versio valikon alariville (PeliOhjain tai Sisalto voi asettaa).</summary>
        public static string SisaltoVersio;

        public readonly UiKerros Kerros;
        public readonly Ylapalkki Tilarivi;
        public readonly Matkavalinta Matkavalinta;
        public readonly Vahvistus Vahvistus;
        public readonly Paavalikko Valikko;
        public readonly Aanentasot Aanentasot;
        public readonly KaupunkiKortti Kaupunkikortti;
        public readonly KysymysNakyma Kysymys;
        public readonly Karttaselite Karttaselite;
        public readonly Kartuscha Kartuscha;
        public readonly Pulu Pulu;
        public readonly Tietoja Tietoja;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        static void KytkeTehdas()
        {
            PeliNakymat.Tilarivi = _ => Hae().Tilarivi;
            PeliNakymat.MatkaValinta = _ => Hae().Matkavalinta;
            PeliNakymat.KaupunkiKortti = _ => Hae().Kaupunkikortti;
            PeliNakymat.Kysymys = _ => Hae().Kysymys;
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista() => Hae();

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() => instanssi = null; // editorin Enter Play Mode ilman domain reloadia

        public static bool Olemassa => instanssi != null;

        public static UiNakymat Hae() => instanssi ??= new UiNakymat(UiKerros.Hae());

        UiNakymat(UiKerros kerros)
        {
            instanssi = this;
            Kerros = kerros;
            Tilarivi = new Ylapalkki(kerros);
            Matkavalinta = new Matkavalinta(kerros);
            Vahvistus = new Vahvistus(kerros);
            Valikko = new Paavalikko(kerros, () => Tilarivi.Alareuna, Vahvistus);
            Aanentasot = new Aanentasot(kerros, () => Tilarivi.Alareuna);
            Kaupunkikortti = new KaupunkiKortti(kerros);
            Kysymys = new KysymysNakyma(kerros);
            Kartuscha = new Kartuscha(kerros);
            Karttaselite = new Karttaselite(kerros);
            Pulu = Natiivi.Pulu.Hae();
            // Livia lennähtää paikalle, kun käyttöliittymä on valmis (webin ensisaapuminen: handoff).
            kerros.Juuri(UiKerros.Tilarivi).schedule.Execute(() => Pulu.Tilanne("arrival")).StartingIn(1500);
            Tietoja = new Tietoja(kerros);
            Valikko.TietojaPainettu += Tietoja.Avaa;
            UiSisalto.Lataa(null); // kaupunkidata valmiiksi ennen ensimmäistä napautusta

            Tilarivi.Valikko.clicked += () => { Aanentasot.Sulje(); Valikko.Vaihda(); };
            Tilarivi.Ratas.clicked += () => { Valikko.Sulje(); Aanentasot.Vaihda(); };
            Valikko.AukiMuuttui += auki => Tilarivi.Valikko.EnableInClassList("mk-valittu", auki);
            Aanentasot.AukiMuuttui += auki => Tilarivi.Ratas.EnableInClassList("mk-valittu", auki);
            Valikko.UusiPeli += () =>
            {
                var o = PeliOhjain.Instanssi;
                if (o != null) o.UusiPeli(null);
                else Tilarivi.Viesti("Peli ei ole vielä käynnissä");
            };

            // Pallo ei lue elettä, joka alkaa UI:n päältä (kaikki kerrokset, myös ei-modaaliset napit).
            SyoteLukko.LisaaPeitto(UiKerros.Peittaa);
            // Pelisilmukka pois (3D-mittaukset) = koko UI pois. PeliOhjain syntyy samassa
            // AfterSceneLoad-vaiheessa, joten kytkentä odottaa sen ilmestymistä.
            kerros.Juuri(UiKerros.Tilarivi).schedule.Execute(KytkeOhjain).Every(250).Until(() => ohjainKytketty);
        }

        bool ohjainKytketty;

        void KytkeOhjain()
        {
            var o = PeliOhjain.Instanssi;
            if (o == null || ohjainKytketty) return;
            ohjainKytketty = true;
            o.KaytossaMuuttui += paalla =>
            {
                if (!paalla) SuljeKaikki();
                Kerros.Nayta(paalla);
                KorvaaNimikortti(paalla);
                Pulu.Nayta(paalla);
            };
            if (!o.Kaytossa) Kerros.Nayta(false);
            KorvaaNimikortti(o.Kaytossa);
            // Pelin tilanteet puluun (webin ilmoitaLivianTilanne; Pelikoodarin tapahtuma).
            o.LivianTilanne += (laji, tunne, v) =>
            {
                if (laji == "tunne") Pulu.Tunne(tunne, v);
                else Pulu.Tilanne(laji, null, tunne, v);
            };
            // Lehti (WKWebView) aukeaa kaiken päälle: auki jääneet valikot kiinni.
            if (o.Lehti != null) o.Lehti.Avautui += _ => { Valikko.Sulje(); Aanentasot.Sulje(); Vahvistus.Sulje(); };
        }

        KaupunkiMerkit merkit;
        NimiKortti nimikortti3d;

        /// <summary>
        /// Pelin aikana kaupunkikortti korvaa 3D:n nimikortin (RAJAPINTA: KaupunkiMerkit.kortti = null);
        /// peli pois (3D-mittaukset) palauttaa sen.
        /// </summary>
        void KorvaaNimikortti(bool peliPaalla)
        {
            if (merkit == null) merkit = Object.FindAnyObjectByType<KaupunkiMerkit>();
            if (merkit == null) return;
            if (peliPaalla)
            {
                if (merkit.kortti != null) { nimikortti3d = merkit.kortti; nimikortti3d.Piilota(); }
                merkit.kortti = null;
            }
            else if (nimikortti3d != null) merkit.kortti = nimikortti3d;
        }

        public void SuljeKaikki()
        {
            Valikko.Sulje();
            Aanentasot.Sulje();
            Vahvistus.Sulje();
            Matkavalinta.Piilota();
            Matkavalinta.PiilotaHeitto();
            Kaupunkikortti.Piilota();
            Kysymys.Piilota();
            Karttaselite.Sulje();
            Kartuscha.Sulje();
            Tietoja.Sulje();
        }

        /// <summary>Testikomento 'ui matka': esimerkkivalinta ilman peliä.</summary>
        public void Esimerkkimatka()
        {
            Matkavalinta.Nayta("Lontoo", "300 £ · päivä 1 · aamu", new[]
            {
                ("Bussi", "50 £ · perillä heti, aika ei kulu"),
                ("Lento", "300 £ · perillä, vie vuoron"),
                ("Liftaus", "ilmainen · noppa · 4 askelta perille"),
                ("Laiva", "100 £ · noppa · 6 askelta perille"),
            }, i => { Matkavalinta.Piilota(); Tilarivi.Viesti("Valittu: " + i); }, () => Tilarivi.Viesti("Peruttu"));
        }

        /// <summary>Testikomento 'ui kysymys [laji]': esimerkkikysymys ilman peliä (KysymysEsimerkki).</summary>
        public string Esimerkkikysymys(string laji) => KysymysEsimerkki.Nayta(Kysymys, laji, s => Tilarivi.Viesti(s));
    }
}
