// ELÄVÄ KARTTA — "ISOISÄN MUSTE", PELILOGIIKKA (omistajan päätös 26.9.2026; docs/raportit/elava-kartta-suunnitelma-20260926.md
// kohdat 2–3; Pelikoodari). Vain natiivi (web ennallaan). Puhdas data ja säännöt ilman UnityEngineä (Peli-testit/KarttaMusteTestit):
//   - Nostojen kolme kokoluokkaa: pääkohde (iso merkki + hehku), kohde, pieni merkintä. Luokka tulee datasta
//     (karttavalot.kokoluokka, skeema 1.45, Sisältökirjurin luokitus); puuttuessa tasosta (1 pääkohde, 2 kohde, 3 pieni).
//   - "Unohdettu" tila POISTETTU (omistaja 27.9.2026 klo 08.2x): kohdemaan kaikki nostot näkyvät heti täydellä
//     ulkoasulla ja nimellä (NostonMuste.Taysi) — ei himmeää jälkeä, ei nimetöntä merkkiä. Löydöt tallennetaan yhä
//     (Pelitila.LoydetytNostot, kenttä "nostotLoydetty") laskuria, kartussia ja salaisuutta varten (NostonMuste.Loydetty).
//   - Maakunnat heräävät: maakunta on tasaista paperia, kunnes sen ensimmäinen nosto löytyy (MaakuntaHeraa); laskuri
//     löydetyt/kaikki; kun kaikki löytyvät, "maakunnan salaisuus" -nosto ilmestyy (MaakuntaValmis, salaisuus näkyviin).
// Piirto (Natiiviseppä) kysyy Tila(id); kartussi ja merkit (Natiivi-UI) kuuntelevat PeliOhjaimen tapahtumia.
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Peli
{
    public enum Kokoluokka { Paakohde, Kohde, Pieni }

    /// <summary>
    /// Noston tila piirrolle: luokka, löydetty (kortti avattu: laskuri ja kartussi), näkyykö lainkaan (salaisuus vasta
    /// lopuksi) ja <see cref="Taysi"/>: piirretäänkö täysi merkki nimineen. Piirto lukee ulkoasun Taysi-kentästä,
    /// EI Loydetty-kentästä (omistaja 27.9.2026: kaikki nostot täytenä heti).
    /// </summary>
    public readonly struct NostonMuste
    {
        public readonly Kokoluokka Luokka;
        public readonly bool Loydetty, Nakyy, Salaisuus;
        public NostonMuste(Kokoluokka luokka, bool loydetty, bool nakyy, bool salaisuus)
        { Luokka = luokka; Loydetty = loydetty; Nakyy = nakyy; Salaisuus = salaisuus; }
        /// <summary>Täysi merkki ja nimi: jokainen näkyvä nosto (ei enää "unohdettua" himmeää tilaa).</summary>
        public bool Taysi => Nakyy;
    }

    /// <summary>Löydön seuraukset: uusi löytö, maakunta heräsi (ensimmäinen), maakunta valmis (salaisuus ilmestyy).</summary>
    public sealed class MusteLoyto
    {
        public string Id, Maakunta, Salaisuus;
        public bool Uusi, MaakuntaHeraa, MaakuntaValmis;
        public int Loydetyt, Kaikki;
    }

    public sealed class KarttaMuste
    {
        sealed class Rivi { public string Maakunta; public Kokoluokka Luokka; public bool Salaisuus; }

        readonly Dictionary<string, Rivi> nostot = new Dictionary<string, Rivi>(StringComparer.Ordinal);
        readonly Dictionary<string, string> salaisuudet = new Dictionary<string, string>(StringComparer.Ordinal);

        public int Nostoja => nostot.Count;

        /// <summary>Datan kokoluokka ("paakohde" | "kohde" | "pieni"); tuntematon tai puuttuva → tasosta.</summary>
        public static Kokoluokka Luokka(string kokoluokka, int? taso)
        {
            switch (kokoluokka)
            {
                case "paakohde": return Kokoluokka.Paakohde;
                case "kohde": return Kokoluokka.Kohde;
                case "pieni": return Kokoluokka.Pieni;
            }
            return taso == 1 ? Kokoluokka.Paakohde : taso >= 3 ? Kokoluokka.Pieni : Kokoluokka.Kohde;
        }

        /// <summary>Karttavalo (maakunta "ISO:tunnus" tai null = ei maakuntaa, ei laskuriin).</summary>
        public void LisaaNosto(string id, string maakunta, Kokoluokka luokka)
        {
            if (string.IsNullOrEmpty(id)) return;
            nostot[id] = new Rivi { Maakunta = string.IsNullOrEmpty(maakunta) ? null : maakunta, Luokka = luokka };
        }

        /// <summary>Maakunnan salaisuus-nosto (maakuntarajat.alkiot[].salaisuus): aina pääkohde, näkyy vasta maakunnan valmistuttua.</summary>
        public void LisaaSalaisuus(string maakunta, string id)
        {
            if (string.IsNullOrEmpty(maakunta) || string.IsNullOrEmpty(id)) return;
            salaisuudet[maakunta] = id;
            nostot[id] = new Rivi { Maakunta = maakunta, Luokka = Kokoluokka.Paakohde, Salaisuus = true };
        }

        public NostonMuste Tila(ICollection<string> loydetyt, string id)
        {
            if (id == null || !nostot.TryGetValue(id, out var r)) return new NostonMuste(Kokoluokka.Kohde, true, true, false);
            bool loydetty = loydetyt != null && loydetyt.Contains(id);
            bool nakyy = !r.Salaisuus || loydetty || Valmis(loydetyt, r.Maakunta);
            return new NostonMuste(r.Luokka, loydetty, nakyy, r.Salaisuus);
        }

        /// <summary>Maakunnan laskuri (salaisuus ei kuulu kaikkiin).</summary>
        public (int Loydetyt, int Kaikki) Laskuri(ICollection<string> loydetyt, string maakunta)
        {
            int kaikki = 0, loyd = 0;
            if (maakunta == null) return (0, 0);
            foreach (var kv in nostot)
            {
                if (kv.Value.Salaisuus || kv.Value.Maakunta != maakunta) continue;
                kaikki++;
                if (loydetyt != null && loydetyt.Contains(kv.Key)) loyd++;
            }
            return (loyd, kaikki);
        }

        public bool Heranneet(ICollection<string> loydetyt, string maakunta) => Laskuri(loydetyt, maakunta).Loydetyt > 0;

        bool Valmis(ICollection<string> loydetyt, string maakunta)
        {
            var (l, k) = Laskuri(loydetyt, maakunta);
            return k > 0 && l >= k;
        }

        /// <summary>Maan maakunnat ("ISO:" -alkuiset) laskureineen, esim. kartussin tutkimuspalkkiin.</summary>
        public IEnumerable<(string Maakunta, int Loydetyt, int Kaikki)> Maakunnat(ICollection<string> loydetyt, string iso)
        {
            string etu = (iso ?? "").ToUpperInvariant() + ":";
            foreach (var m in nostot.Values.Select(r => r.Maakunta).Where(m => m != null && m.StartsWith(etu, StringComparison.Ordinal))
                         .Distinct().OrderBy(m => m, StringComparer.Ordinal))
            {
                var (l, k) = Laskuri(loydetyt, m);
                yield return (m, l, k);
            }
        }

        /// <summary>
        /// Kirjaa löydön (kortti avattu) ja kertoo seuraukset. Tuntematon id kirjataan silti (löytöjoukkoon), mutta sillä ei
        /// ole maakuntaa. Toinen avaus: Uusi = false eikä tapahtumia.
        /// </summary>
        public MusteLoyto Kirjaa(ISet<string> loydetyt, string id)
        {
            var t = new MusteLoyto { Id = id };
            if (string.IsNullOrEmpty(id) || loydetyt == null) return t;
            nostot.TryGetValue(id, out var r);
            t.Maakunta = r?.Maakunta;
            bool olivalmis = r != null && !r.Salaisuus && Valmis(loydetyt, r.Maakunta);
            t.Uusi = loydetyt.Add(id);
            if (!t.Uusi || r == null || r.Maakunta == null) return t;
            var (l, k) = Laskuri(loydetyt, r.Maakunta);
            t.Loydetyt = l;
            t.Kaikki = k;
            if (r.Salaisuus) return t;
            t.MaakuntaHeraa = l == 1;
            t.MaakuntaValmis = !olivalmis && k > 0 && l >= k;
            if (t.MaakuntaValmis) salaisuudet.TryGetValue(r.Maakunta, out t.Salaisuus);
            return t;
        }
    }
}
