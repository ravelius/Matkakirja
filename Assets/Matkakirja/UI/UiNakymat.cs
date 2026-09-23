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
        public readonly Matkalaukku Matkalaukku;
        public readonly KaupunkiKortti Kaupunkikortti;
        public readonly KysymysNakyma Kysymys;
        public readonly Karttaselite Karttaselite;
        public readonly OfflineTilaUi OfflineTila;
        public readonly Kartuscha Kartuscha;
        public readonly Pulu Pulu;
        public readonly Matkakirjakortti Matkakirja;
        public readonly Saapumisesitys Saapuminen;
        public readonly PuluChat Chat;
        public readonly Saapumistraileri Traileri;
        public readonly Tietoja Tietoja;
        public readonly LinssiUi Linssit;
        public readonly Aloitusnakyma Aloitus;
        public readonly Huipennus Huipennus;
        public readonly Nostokortti Nostokortti;
        public readonly Lehtinakyma Lehti;
        public readonly Paljastus Paljastus;
        public readonly Julistegalleria Julistegalleria;
        public readonly Nahtavyysarkki Nahtavyydet;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        static void KytkeTehdas()
        {
            PeliNakymat.Tilarivi = _ => Hae().Tilarivi;
            PeliNakymat.MatkaValinta = _ => Hae().Matkavalinta;
            PeliNakymat.KaupunkiKortti = _ => Hae().Kaupunkikortti;
            PeliNakymat.Saapumistraileri = (kaupunki, url, valmis) => Hae().Traileri.NaytaPelista(kaupunki, url, valmis);
            PeliNakymat.Kysymys = _ => Hae().Kysymys;
            // Natiivilehti (B1): WKWebView-kuori jää käyttämättä.
            PeliNakymat.Lehti = _ => Hae().Lehti;
            // Aloitusnäkymä: silmukka odottaa tilassa Aloitus (Jatka / Uusi matka).
            PeliOhjain.AloitusNakyma = true;
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
            Matkalaukku = new Matkalaukku(kerros, () => Tilarivi.Alareuna, () => Tilarivi.Pilleri);
            Kaupunkikortti = new KaupunkiKortti(kerros);
            Kysymys = new KysymysNakyma(kerros);
            Kartuscha = new Kartuscha(kerros);
            Karttaselite = new Karttaselite(kerros);
            OfflineTila = new OfflineTilaUi(kerros, Tilarivi, () => { Valikko.Sulje(); Aanentasot.Avaa(); });
            Matkakirja = new Matkakirjakortti(kerros);
            Pulu = Natiivi.Pulu.Hae();
            Saapuminen = new Saapumisesitys(Matkakirja, Pulu);
            Chat = new PuluChat(kerros, Pulu);
            Traileri = new Saapumistraileri(kerros);
            Pulu.Napautus += Chat.Vaihda;
            // Livia lennähtää paikalle, kun käyttöliittymä on valmis (webin ensisaapuminen: handoff).
            kerros.Juuri(UiKerros.Tilarivi).schedule.Execute(() => Pulu.Tilanne("arrival")).StartingIn(1500);
            Tietoja = new Tietoja(kerros);
            Aloitus = new Aloitusnakyma(kerros);
            Huipennus = new Huipennus(kerros);
            Nostokortti = new Nostokortti(kerros);
            Lehti = new Lehtinakyma(kerros);
            Nahtavyydet = new Nahtavyysarkki(kerros); // lehden päälle (sama kerros, myöhemmin)
            // Lehti aukeaa kaiken päälle: auki jääneet valikot ja popupit kiinni.
            Lehti.Avautui += _ => { Valikko.Sulje(); Aanentasot.Sulje(); Matkalaukku.Sulje(); Vahvistus.Sulje(); Julistegalleria.Sulje(); Minipopup.SuljeAuki(); };
            Paljastus = new Paljastus(kerros);
            Julistegalleria = new Julistegalleria(kerros); // laukun päälle (sama kerros, myöhemmin)
            // Karttavalon napautus (Natiiviseppä: AiheValot → KarttaValotSilta) → nostokortti;
            // linssin aikana ei (web linssiEstaa).
            UiPalvelut.ValoNapautettu += id => UiKerros.PaaSaikeessa(() =>
            {
                if (LinssiUi.Rekisteri?.Auki != null || Aloitus.Auki) return;
                Nostokortti.Avaa(id);
            });
            // Linssit (valitsin, peite, selite, astronautti, vertailu, aikajanat): kartuschan ja selitteen jälkeen.
            Linssit = new LinssiUi(kerros, this);
            Valikko.TietojaPainettu += Tietoja.Avaa;
            Tilarivi.LogoPainettu += () => { Valikko.Sulje(); Aanentasot.Sulje(); Matkalaukku.Sulje(); Tietoja.Avaa(); };
            UiSisalto.Lataa(null); // kaupunkidata valmiiksi ennen ensimmäistä napautusta

            Tilarivi.Valikko.clicked += () => { Aanentasot.Sulje(); Matkalaukku.Sulje(); Valikko.Vaihda(); };
            Tilarivi.Ratas.clicked += () => { Valikko.Sulje(); Matkalaukku.Sulje(); Aanentasot.Vaihda(); };
            Tilarivi.PilleriPainettu += () => { Valikko.Sulje(); Aanentasot.Sulje(); Matkalaukku.Vaihda(); };
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
            Saapuminen.Kytke(o);
            // Pelin tilanteet puluun (webin ilmoitaLivianTilanne; Pelikoodarin tapahtuma).
            o.LivianTilanne += (laji, tunne, v) =>
            {
                if (laji == "tunne") Pulu.Tunne(tunne, v);
                else Pulu.Tilanne(laji, null, tunne, v);
            };
            // Aloitus ja matkan huipennus (Pelikoodarin tapahtumat); tila voi olla jo Aloitus.
            o.AloitusTarjolla += () => UiKerros.PaaSaikeessa(() => NaytaAloitus(o));
            if (o.Tila == SilmukanTila.Aloitus) NaytaAloitus(o);
            o.KaikkiAarteetLoytyi += yv => UiKerros.PaaSaikeessa(() => Huipennus.Nayta(yv, () => UusiMatka(o)));
            // Lehti (WKWebView) aukeaa kaiken päälle: auki jääneet valikot kiinni.
            if (o.Lehti != null) o.Lehti.Avautui += _ => { Valikko.Sulje(); Aanentasot.Sulje(); Matkalaukku.Sulje(); Vahvistus.Sulje(); };
        }

        void NaytaAloitus(PeliOhjain o)
        {
            if (Aloitus.Auki) return;
            SuljeKaikki();
            Aloitus.Nayta(id => Aloita(o, id), o.Lahtokaupungit(), o.TallennusOn ? () => { var v = o.Jatka(); if (v != null) Tilarivi.Viesti(v); } : (System.Action)null);
        }

        void UusiMatka(PeliOhjain o)
        {
            SuljeKaikki();
            Aloitus.NaytaAvaus(id => Aloita(o, id), o.Lahtokaupungit());
        }

        void Aloita(PeliOhjain o, string id)
        {
            var virhe = o.UusiMatka(id);
            if (virhe != null) { Debug.LogWarning("MATKAKIRJA ui aloitus: " + virhe); Tilarivi.Viesti(virhe); }
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
            Matkalaukku.Sulje();
            Huipennus.Sulje();
            // Aloitus (kerros 45) jäi muuten kaiken päälle: ui sulje ja pelin tilanvaihdot sulkevat sen.
            Aloitus.Piilota();
            Nostokortti.Sulje();
            Nahtavyydet.SuljeKokonaan();
            Lehti.Sulje();
            Paljastus.Sulje();
            Julistegalleria.Sulje();
            Minipopup.SuljeAuki();
            Pikkuseloste.Sulje();
            Vahvistus.Sulje();
            Matkavalinta.Piilota();
            Matkavalinta.PiilotaHeitto();
            Kaupunkikortti.Piilota();
            Kysymys.Piilota();
            Karttaselite.Sulje();
            Karttaselite.Maakunnat.SuljeKortti();
            Kartuscha.Sulje();
            Tietoja.Sulje();
            Linssit.SuljeValikot();
            Chat.Sulje();
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
