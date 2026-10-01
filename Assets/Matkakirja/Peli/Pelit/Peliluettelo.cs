// PELILUETTELO JA KOHTAAMINEN (Siirtoseppä 1.10.2026; Päätoimittajan linjaus: pelit pelataan matkan varrella ja kerätään
// matkakirjaan; omistaja 1.10. klo 21.0x "YKSI PELI, YKSI KOTI": kukin peli tarjotaan kohtaamisena vain kotikaupungissaan,
// Mylly Berliinissä). Ensimmäinen kerta: kotikaupungissa kaupunkikortin NYKYINEN tehtävänappi tarjoaa
// pelin kohtaamisena (KORTTI "Saksa · kohtaaminen — Pelataanko myllyä?"), kun kaupungin muut tehtävät (tarinakaari, pulma,
// aarrelaatta, tutkiminen) on tehty: pelistä kieltäytyminen ei siis estä aarteita. Uusinta: Aarteet-näkymän otsikko "Pelit".
// Ei uusia nappeja. Koti pelikatalogista (docs/pelikatalogi.md, kortti "4. Mylly": DEU-2 Mühle); vain Eurooppa.
using System;
using System.Collections.Generic;

namespace Matkakirja.Peli.Pelit
{
    /// <summary>Pelin maa: ISO3, maan nimi kapiteeliin ja paikallinen nimi apuriville.</summary>
    public sealed class PeliMaa
    {
        public string Maa, MaanNimi, PaikallinenNimi;
    }

    /// <summary>Pelin lauta (omistaja 1.10. klo 21.1x): aidon historiallisen esikuvan mukaan, ansaitaan voitoilla bottia
    /// vastaan. Avautuu null = käytössä heti (tallentuu Aarteisiin esineeksi ensimmäisestä voitosta); muuten ensimmäinen
    /// voitto vähintään tämän tasoista bottia vastaan. Kaveripeli ei avaa lautoja. Historia (valintakortin apuri) ja
    /// Alkupera (Aarteet: missä aito esikuva on nyt ja miltä ajalta) Sisältökirjurilta.</summary>
    public sealed class PeliLauta
    {
        public string Id, Nimi, Esine, Historia, Alkupera;
        public Vastustaja? Avautuu;
        public string Ehto => Avautuu == null ? "Käytössä heti." : $"Avautuu, kun voitat {(Avautuu == Vastustaja.BottiVaikea ? "vaikean" : "normaalin")} botin.";
    }

    public sealed class PeliKuvaus
    {
        /// <summary>Tallennuksen tunnus (Pelaaja.Pelit) ja nimi pelaajalle; Nappi = tehtävänapin teksti kohtaamisessa;
        /// Koti = kotikaupungin tunnus (yksi peli, yksi koti).</summary>
        public string Id, Nimi, Nappi, KatalogiId, Koti;
        public PeliMaa[] Maat;
        public PeliLauta[] Laudat = new PeliLauta[0];

        public PeliMaa Maassa(string iso3)
        {
            if (iso3 == null) return null;
            foreach (var m in Maat) if (m.Maa == iso3) return m;
            return null;
        }
    }

    public static class Peliluettelo
    {
        public static readonly PeliKuvaus Mylly = new PeliKuvaus
        {
            Id = "mylly", Nimi = "Mylly", Nappi = "Pelaa myllyä", KatalogiId = "DEU-2", Koti = "berliini",
            Maat = new[] { new PeliMaa { Maa = "DEU", MaanNimi = "Saksa", PaikallinenNimi = "Mühle" } },
            // Tekstit: Sisältökirjuri, docs/raportit/sisaltokirjuri-mylly-historiatekstit-20261001.md (haara sisalto-pelikatalogi-20260927),
            // osiot 1 (historia), 4 (alkuperä) ja 6 (keskiaika: Ten Duinen -luostarin tiili, Päätoimittaja 1.10.: "Luostari n. 1300").
            Laudat = new[]
            {
                new PeliLauta { Id = "majatalo", Nimi = "Majatalo 1873", Esine = "Majatalon myllylauta (voitit isännältä)",
                    Historia = "Mylly oli 1800-luvun Euroopassa tuttu peli majataloissa ja kodeissa, ja saksaksi sitä kutsutaan nimellä Mühle. Pelilauta on yksinkertainen: kolme sisäkkäistä neliötä, joita yhdistävät viivat.",
                    Alkupera = "Lauta perustuu yleiseen 1800-luvun saksalaiseen Mühle-lautaan: kolme sisäkkäistä neliötä, joita yhdistävät viivat. Se ei kopioi yhtä tiettyä esinettä, vaan tyypillistä kotien ja majatalojen pelilautaa." },
                new PeliLauta { Id = "luostari", Nimi = "Luostari n. 1300", Esine = "Luostarin myllylauta", Avautuu = Vastustaja.BottiNormaali,
                    Historia = "Keskiajan rakentajat jättivät myllylautoja rakennusmateriaaleihin: Belgian Koksijden Duinenabdij-luostarin tiileen lauta on piirretty märkään saveen ennen polttoa, ja Newcastlen linnassa se on kaiverrettu kivilohkoon. Molemmissa on myllyn tuttu kuvio, kolme sisäkkäistä neliötä ja 24 pistettä.",
                    Alkupera = "Esikuvana on tiili Koksijden Duinenabdij-luostarista Belgiasta, ajoitettu 1200–1300-luvuille. Myllylauta, jossa on 24 pistettä, on piirretty tiileen sen ollessa vielä märkää savea, ennen polttoa. Tiili on luostarin museon (Abbey Museum of the Dunes) kokoelmissa, inventaarionumero 33880." },
                new PeliLauta { Id = "viikinkilaiva", Nimi = "Viikinkilaiva n. 900", Esine = "Viikinkilaivan myllylauta", Avautuu = Vastustaja.BottiVaikea,
                    Historia = "Norjan Gokstadin laivahaudasta löytyi pelilauta, jonka toisella puolella on hnefatafl-peli ja toisella mylly. Laiva on rakennettu noin vuonna 890 kaadetuista puista, ja se on nykyään esillä Oslon Viikinkilaivamuseossa.",
                    Alkupera = "Esikuvana on Gokstadin laivahaudasta Norjasta löytynyt puinen pelilauta ja yksi sarvesta tehty pelinappula. Laudan toisella puolella on 13×13 ruutua (hnefatafl) ja toisella mylly; haudan laiva on rakennettu noin vuonna 890 kaadetuista puista, ja kaivaukset tehtiin vuonna 1880. Lauta on Oslon yliopiston Kulttuurihistoriallisen museon kokoelmissa; laudasta on säilynyt vain osa, eikä siinä ole merkintöjä, jotka tunnistaisivat sen peliksi epäilyksettä, joten tulkinta perustuu sen kokoon ja muotoon." },
            },
        };

        public static readonly PeliKuvaus[] Kaikki = { Mylly };

        public static PeliKuvaus Hae(string id)
        {
            foreach (var p in Kaikki) if (p.Id == id) return p;
            return null;
        }

        /// <summary>Kaupungin peli (kotikaupunki, vain Eurooppa) ja maa, tai null.</summary>
        public static (PeliKuvaus Peli, PeliMaa Maa)? Kaupungille(Kaupunki k)
        {
            if (k == null || k.Manner != "europe") return null;
            foreach (var p in Kaikki) if (p.Koti == k.Id && p.Maassa(k.Maa) is PeliMaa m) return (p, m);
            return null;
        }

        public static bool Pelattu(Pelaaja p, string id) => p.Pelit.Exists(x => x.Id == id);

        /// <summary>Odottava kohtaaminen pelaajan kaupungissa: peli, jota ei ole vielä pelattu, tai null.</summary>
        public static (PeliKuvaus Peli, PeliMaa Maa, Kaupunki Kaupunki)? Odottaa(Matka m, Pelaaja p)
        {
            if (p == null || !p.Sijainti.Kaupungissa || !m.Verkko.Kaupungit.TryGetValue(p.Sijainti.Kaupunki, out var k)) return null;
            if (!(Kaupungille(k) is (PeliKuvaus peli, PeliMaa maa)) || Pelattu(p, peli.Id)) return null;
            return (peli, maa, k);
        }

        /// <summary>Kytkee kohtaamisen kyselyyn (kuten Pulmat.Kytke): tehtävänapin teksti ja avaus. avaa = UI (PeliOhjain).</summary>
        public static void Kytke(Kysely ky, Action<PeliKuvaus, PeliMaa, Kaupunki> avaa)
        {
            ky.PeliOdottaa = p => Odottaa(ky.Matka, p)?.Peli.Nappi;
            ky.AvaaPeli = () =>
            {
                var o = Odottaa(ky.Matka, ky.Matka.Tila.Pelaaja);
                if (o == null) return TekoTulos.Epaonnistui("Täällä ei ole peliä");
                avaa?.Invoke(o.Value.Peli, o.Value.Maa, o.Value.Kaupunki);
                return TekoTulos.Onnistui();
            };
        }

        /// <summary>Pelikerran kirjaus pelaajalle (Aarteet "Pelit", tallennusversio 9): pelattu-laskuri, botin voitot ja
        /// ansaitut laudat. Palauttaa tällä kerralla ansaitut laudat (tuloskorttiin).</summary>
        public static List<PeliLauta> Kirjaa(Pelaaja p, string id, Vastustaja vastustaja, bool voitti)
        {
            var r = p.Pelit.Find(x => x.Id == id);
            if (r == null) { r = new PelattuPeli { Id = id }; p.Pelit.Add(r); }
            r.Pelattu++;
            var uudet = new List<PeliLauta>();
            if (!voitti || vastustaja == Vastustaja.Kaveri) return uudet;
            r.Voitot++;
            if (Hae(id) is PeliKuvaus peli)
                foreach (var l in peli.Laudat)
                    if (!r.Laudat.Contains(l.Id) && (l.Avautuu == null || (int)vastustaja >= (int)l.Avautuu.Value))
                    { r.Laudat.Add(l.Id); uudet.Add(l); }
            return uudet;
        }

        /// <summary>Saako laudan valita: heti käytössä oleva tai ansaittu.</summary>
        public static bool Kaytossa(Pelaaja p, PeliKuvaus peli, PeliLauta l) =>
            l.Avautuu == null || (p != null && p.Pelit.Find(x => x.Id == peli.Id) is PelattuPeli r && r.Laudat.Contains(l.Id));
    }
}
