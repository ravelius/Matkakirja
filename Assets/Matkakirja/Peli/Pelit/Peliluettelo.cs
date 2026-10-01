// PELILUETTELO JA KOHTAAMINEN (Siirtoseppä 1.10.2026; Päätoimittajan linjaus: pelit pelataan matkan varrella ja kerätään
// matkakirjaan). Ensimmäinen kerta: pelin maan eurooppalaisessa kaupungissa kaupunkikortin NYKYINEN tehtävänappi tarjoaa
// pelin kohtaamisena (KORTTI "Saksa · kohtaaminen — Pelataanko myllyä?"), kun kaupungin muut tehtävät (tarinakaari, pulma,
// aarrelaatta, tutkiminen) on tehty: pelistä kieltäytyminen ei siis estä aarteita. Uusinta: Aarteet-näkymän otsikko "Pelit".
// Ei uusia nappeja. Maat pelikatalogista (docs/pelikatalogi.md, kortti "4. Mylly": DEU-2 Mühle, SRB Mlin, MDA Moara;
// Päätoimittajan lisäys 1.10.: GBR-2 Nine Men's Morris). Vain Eurooppa (Kaupunki.Manner == "europe").
using System;
using System.Collections.Generic;

namespace Matkakirja.Peli.Pelit
{
    /// <summary>Pelin maa: ISO3, maan nimi kapiteeliin ja paikallinen nimi apuriville.</summary>
    public sealed class PeliMaa
    {
        public string Maa, MaanNimi, PaikallinenNimi;
    }

    public sealed class PeliKuvaus
    {
        /// <summary>Tallennuksen tunnus (Pelaaja.Pelit) ja nimi pelaajalle; Nappi = tehtävänapin teksti kohtaamisessa.</summary>
        public string Id, Nimi, Nappi, KatalogiId;
        public PeliMaa[] Maat;

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
            Id = "mylly", Nimi = "Mylly", Nappi = "Pelaa myllyä", KatalogiId = "DEU-2",
            Maat = new[]
            {
                new PeliMaa { Maa = "DEU", MaanNimi = "Saksa", PaikallinenNimi = "Mühle" },
                new PeliMaa { Maa = "GBR", MaanNimi = "Iso-Britannia", PaikallinenNimi = "Nine Men's Morris" },
                new PeliMaa { Maa = "SRB", MaanNimi = "Serbia", PaikallinenNimi = "Mlin" },
                new PeliMaa { Maa = "MDA", MaanNimi = "Moldova", PaikallinenNimi = "Moara" },
            },
        };

        public static readonly PeliKuvaus[] Kaikki = { Mylly };

        public static PeliKuvaus Hae(string id)
        {
            foreach (var p in Kaikki) if (p.Id == id) return p;
            return null;
        }

        /// <summary>Kaupungin peli ja maa (vain Eurooppa), tai null.</summary>
        public static (PeliKuvaus Peli, PeliMaa Maa)? Kaupungille(Kaupunki k)
        {
            if (k == null || k.Manner != "europe") return null;
            foreach (var p in Kaikki) if (p.Maassa(k.Maa) is PeliMaa m) return (p, m);
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

        /// <summary>Pelikerran kirjaus pelaajalle (Aarteet "Pelit", tallennusversio 9): pelattu-laskuri ja botin voitot.</summary>
        public static PelattuPeli Kirjaa(Pelaaja p, string id, bool bottivoitto)
        {
            var r = p.Pelit.Find(x => x.Id == id);
            if (r == null) { r = new PelattuPeli { Id = id }; p.Pelit.Add(r); }
            r.Pelattu++;
            if (bottivoitto) r.Voitot++;
            return r;
        }
    }
}
