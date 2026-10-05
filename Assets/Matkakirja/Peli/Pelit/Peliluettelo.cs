// PELILUETTELO JA KOHTAAMINEN (Siirtoseppä 1.10.2026; Päätoimittajan linjaus: pelit pelataan matkan varrella ja kerätään
// matkakirjaan; omistaja 1.10. klo 21.0x "YKSI PELI, YKSI KOTI": kukin peli tarjotaan kohtaamisena vain kotikaupungissaan,
// Mylly Berliinissä, Tavli Ateenassa 5.10.). Ensimmäinen kerta: kotikaupungissa kaupunkikortin NYKYINEN tehtävänappi tarjoaa
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
            // osiot 1 (historia) ja 4 (alkuperä), lopullinen cf8fbfdb4 (osio 8: museon ajoitus, "Luostari 1200-l.").
            Laudat = new[]
            {
                new PeliLauta { Id = "majatalo", Nimi = "Majatalo 1873", Esine = "Majatalon myllylauta (voitit isännältä)",
                    Historia = "Mylly oli 1800-luvun Euroopassa tuttu peli majataloissa ja kodeissa, ja saksaksi sitä kutsutaan nimellä Mühle. Pelilauta on yksinkertainen: kolme sisäkkäistä neliötä, joita yhdistävät viivat.",
                    Alkupera = "Lauta perustuu yleiseen 1800-luvun saksalaiseen Mühle-lautaan: kolme sisäkkäistä neliötä, joita yhdistävät viivat. Se ei kopioi yhtä tiettyä esinettä, vaan tyypillistä kotien ja majatalojen pelilautaa." },
                new PeliLauta { Id = "luostari", Nimi = "Luostari 1200-l.", Esine = "Luostarin myllylauta", Avautuu = Vastustaja.BottiNormaali,
                    Historia = "Belgian Koksijden Duinenabdij-luostarin tiileen on 1200-luvulla piirretty myllylauta märkään saveen ennen polttoa. Laudassa on kolme sisäkkäistä neliötä ja neljä viivaa, jotka muodostavat 24 pistettä.",
                    Alkupera = "Esikuvana on tiili Belgian Koksijden Duinenabdij-luostarista, ajoitettu 1200-luvulle. Myllylauta on tehty tiileen märkään saveen ennen polttoa, ja siinä on kolme neliötä ja neljä viivaa, jotka muodostavat 24 pistettä. Tiili on luostarin museon (Abdijmuseum Ten Duinen) kokoelmassa, inventaarionumero 033880, mutta sen tarkkaa löytöpaikkaa luostarialueella ei tunneta." },
                new PeliLauta { Id = "viikinkilaiva", Nimi = "Viikinkilaiva n. 900", Esine = "Viikinkilaivan myllylauta", Avautuu = Vastustaja.BottiVaikea,
                    Historia = "Norjan Gokstadin laivahaudasta löytyi pelilauta, jonka toisella puolella on hnefatafl-peli ja toisella mylly. Laiva on rakennettu noin vuonna 890 kaadetuista puista, ja se on nykyään esillä Oslon Viikinkilaivamuseossa.",
                    Alkupera = "Esikuvana on Gokstadin laivahaudasta Norjasta löytynyt puinen pelilauta ja yksi sarvesta tehty pelinappula. Laudan toisella puolella on 13×13 ruutua (hnefatafl) ja toisella mylly; haudan laiva on rakennettu noin vuonna 890 kaadetuista puista, ja kaivaukset tehtiin vuonna 1880. Lauta on Oslon yliopiston Kulttuurihistoriallisen museon kokoelmissa; laudasta on säilynyt vain osa, eikä siinä ole merkintöjä, jotka tunnistaisivat sen peliksi epäilyksettä, joten tulkinta perustuu sen kokoon ja muotoon." },
            },
        };

        // TAVLI (Siirtoseppä 5.10.2026; omistajan korttivalinta 4.–5.10., suunnitelma docs/raportit/tavli-suunnitelma-20261005.md,
        // Päätoimittaja hyväksyi 5.10. 01.1x): pelikatalogin GRC-1, yksi koti Ateena (kafeneio). Laudat: Kafeneio heti, Bysantin
        // tabula normaalin ja Ottomaanien tavla vaikean botin voitosta.
        // Tekstit: docs/raportit/tavli-historiatekstit-20261005.md (haara siirtoseppa-luovutus; Sonnet-tutkija + Siirtoseppä 5.10.),
        // osiot 1 (historia) ja 4 (alkuperä); ottomaanisen laudan ajoitus V&A:n rajapinnasta (861-1907: 1600–1700, Istanbul).
        public static readonly PeliKuvaus Tavli = new PeliKuvaus
        {
            Id = "tavli", Nimi = "Tavli", Nappi = "Pelaa tavlia", KatalogiId = "GRC-1", Koti = "ateena",
            Maat = new[] { new PeliMaa { Maa = "GRC", MaanNimi = "Kreikka", PaikallinenNimi = "Τάβλι" } },
            Laudat = new[]
            {
                new PeliLauta { Id = "kafeneio", Nimi = "Kafeneio 1873", Esine = "Kafeneion tavlilauta (voitit kahvilan vakiopelaajalta)",
                    Historia = "Ateenassa kahvilat, kafeneiot, ovat kuuluneet kaupunkielämään 1830-luvulta asti, ja niissä pelataan korttia ja tavlia. Tavli on kolmen pelin sarja (Portes, Plakoto ja Fevga), ja tämä peli noudattaa Portesin sääntöjä.",
                    Alkupera = "Lauta noudattaa tavlilaudan tavallista rakennetta: kaksi puoliskoa ja yhteensä 24 pistettä, kummallakin puolella 12. Se ei kopioi yhtä tiettyä esinettä, vaan tyypillistä kahvilan pelilautaa." },
                new PeliLauta { Id = "tabula", Nimi = "Bysantin tabula n. 480", Esine = "Bysantin tabula-lauta", Avautuu = Vastustaja.BottiNormaali,
                    Historia = "Bysantin keisari Zenon pelasi tabulaa 400-luvun lopulla, ja runoilija Agathias kuvasi 500-luvulla hänen epäonnisen heittonsa: nopat näyttivät 2, 6 ja 5. Tabulassa oli 24 pistettä, 15 nappulaa kummallakin ja kolme noppaa, joten se on tavlin esi-isä mutta ei sama peli.",
                    Alkupera = "Lauta on piirretty Agathiaan runon (Anthologia Graeca IX.482) ja sen pohjalta tehtyjen rekonstruktioiden mukaan: 24 pistettä, 12 kummallakin puolella. Zenonin ajalta ei ole säilynyt lautaa eikä nappulasarjaa, joten ulkoasu on piirretty kuvauksen mukaan. Peli käyttää tavlin (Portes) sääntöjä, ei tabulan: tabulassa heitettiin kolmea noppaa." },
                new PeliLauta { Id = "tavla", Nimi = "Ottomaanien tavla", Esine = "Ottomaanien upotekoristeinen tavla-lauta", Avautuu = Vastustaja.BottiVaikea,
                    Historia = "Ottomaanien Istanbulissa tehtiin 1600- ja 1700-luvuilla ylellisiä pelilautoja, joihin upotettiin kilpikonnankilpeä, helmiäistä, luuta ja norsunluuta. Turkissa peliä pelataan yhä, ja siellä sen nimi on tavla.",
                    Alkupera = "Esikuvana on Lontoon Victoria and Albert Museumin kaksipuolinen taittolauta (museotunnus 861-1907), joka on tehty luultavasti Istanbulissa 1600- tai 1700-luvulla. Puuhun on viilutettu kilpikonnankilpeä, helmiäistä, luuta, norsunluuta ja useita puulajeja, ja tavlipuolella on helmiäisestä tehtyjä kypressikuvioita. Toisella puolella on shakkilauta." },
            },
        };

        public static readonly PeliKuvaus[] Kaikki = { Mylly, Tavli };

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
