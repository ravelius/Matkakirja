// LIIKU-NAPIN KULKUTAVAT: web js/ui.js renderTravelChoice (vaihe A, ~11334), piirraToimintorivi
// (monitoiminappi "Liiku", ~11988) ja estosyyt maaEste, bussiEste, laivaEste, lentoEste.
// Puhdas laskenta: mitä liu'ussa näkyy, mikä on estetty ja miksi. Teot tekee PeliOhjain
// (Scripts/Peli/PeliOhjain.Liiku.cs). Kultainen jälki Kultaiset/kulkutapajalki.json
// (tee-kulkutapajalki.mjs lukee estosyyt suoraan webin ui.js:stä).
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Peli
{
    /// <summary>Yksi Liiku-liu'un nappi (web iconButton + estaNappi).</summary>
    public sealed class KulkutapaNappi
    {
        /// <summary>Maa (liftaus), Bussi, Meri (laiva) tai Lento.</summary>
        public Kulkutapa Laji;
        /// <summary>Web napin nimi: "Liftaus", "Bussilla", "Laivalla", "Lentäen".</summary>
        public string Teksti;
        /// <summary>Hinta puntina: liftaus 0, bussi 50, laiva 100, lento 300 (web BUS_FARE, SEA_FARE, FLIGHT_PRICE).</summary>
        public int Hinta;
        /// <summary>Harmaa nappi (web disabled).</summary>
        public bool Estetty;
        /// <summary>Estetyn napin syy webin sanoin (web title "Nimi — syy"); null, kun nappi on käytössä.</summary>
        public string Syy;
        /// <summary>Web 'primary': liftaus korostuu, kun kaupungissa ei ole tehtävää (land && !stay).</summary>
        public bool Korostettu;
    }

    public static class Liikkuminen
    {
        /// <summary>Monitoiminapin nimi (web iconButton('kompassi', 'Liiku')).</summary>
        public const string LiikuTeksti = "Liiku";

        /// <summary>
        /// Web renderTravelChoice vaihe A, järjestys liftaus, bussi, laiva, lento. Vain vaiheessa
        /// Toiminta (web: rivi piirretään tavoista vain vaiheessa 'action'; vaiheessa 'roll' liu'ussa
        /// ovat noppa ja Vaihda, muissa vaiheissa riviä ei ole). Muulloin tyhjä lista.
        /// <paramref name="mannerlennot"/> = Kaupat.MannerLennot() (null: lasketaan tässä).
        /// </summary>
        public static List<KulkutapaNappi> Napit(Matka m, IReadOnlyCollection<MannerlentoKohde> mannerlennot = null)
        {
            var napit = new List<KulkutapaNappi>();
            if (m == null || m.Tila.Vaihe != Vaihe.Toiminta) return napit;
            var tavat = m.Kulkutavat();
            int manner = (mannerlennot ?? new Kaupat(m).MannerLennot()).Count;
            bool maa = tavat.Contains(Kulkutapa.Maa);
            bool lento = m.LentoKohteet().Count > 0 || manner > 0;
            napit.Add(Nappi(Kulkutapa.Maa, "Liftaus", 0, maa, MaaEste(m), maa && !tavat.Contains(Kulkutapa.Pysy)));
            napit.Add(Nappi(Kulkutapa.Bussi, "Bussilla", Vakiot.BussiHinta, tavat.Contains(Kulkutapa.Bussi), BussiEste(m), false));
            napit.Add(Nappi(Kulkutapa.Meri, "Laivalla", Vakiot.MeriHinta, tavat.Contains(Kulkutapa.Meri), LaivaEste(m), false));
            napit.Add(Nappi(Kulkutapa.Lento, "Lentäen", Vakiot.LentoHinta, lento, LentoEste(m), false));
            return napit;
        }

        static KulkutapaNappi Nappi(Kulkutapa laji, string teksti, int hinta, bool kaytossa, string este, bool korostettu) =>
            new KulkutapaNappi { Laji = laji, Teksti = teksti, Hinta = hinta, Estetty = !kaytossa, Syy = kaytossa ? null : este, Korostettu = korostettu };

        /// <summary>Web monitoimi.disabled: liu'ussa ei ole yhtään käytössä olevaa nappia (myös tyhjä liuku).</summary>
        public static bool LiikuEstetty(IReadOnlyCollection<KulkutapaNappi> napit) => napit == null || napit.All(n => n.Estetty);

        // --- estosyyt (web ui.js keskenReittia, maaEste, bussiEste, laivaEste, lentoEste) ---------------

        const string Kesken = "matka jatkuu samaa reittiä";

        static bool KeskenReittia(Matka m) => !m.Tila.Pelaaja.Sijainti.Kaupungissa;

        static IEnumerable<Reitti> Naapurit(Matka m, string kaupunki) =>
            m.Verkko.Naapurireitit(kaupunki).Where(m.Verkko.Reitit.ContainsKey).Select(id => m.Verkko.Reitit[id]);

        /// <summary>Kaupunki, jossa pelaaja on, jos se on laudalla (web cityOf); muuten null.</summary>
        static string Kaupunki(Matka m)
        {
            var s = m.Tila.Pelaaja.Sijainti;
            return s.Kaupungissa && m.Verkko.Kaupungit.ContainsKey(s.Kaupunki) ? s.Kaupunki : null;
        }

        public static string MaaEste(Matka m) => KeskenReittia(m) ? Kesken : "täältä ei lähde maareittiä";

        public static string BussiEste(Matka m)
        {
            if (KeskenReittia(m)) return Kesken;
            var k = Kaupunki(m);
            if (k == null) return "bussi lähtee vain kaupungista";
            if (!Naapurit(m, k).Any(r => r.Laji == ReitinLaji.Maa)) return "täältä ei lähde maareittiä";
            if (m.Tila.Pelaaja.Raha < Vakiot.BussiHinta) return $"bussilippu maksaa {Vakiot.BussiHinta} puntaa";
            return "täältä ei lähde bussia";
        }

        public static string LaivaEste(Matka m)
        {
            if (KeskenReittia(m)) return Kesken;
            var k = Kaupunki(m);
            if (k == null) return "laiva lähtee vain satamasta";
            if (!Naapurit(m, k).Any(r => r.Laji == ReitinLaji.Meri)) return "täältä ei lähde laivareittiä";
            return $"laivalippu maksaa {Vakiot.MeriHinta} puntaa";
        }

        public static string LentoEste(Matka m)
        {
            if (KeskenReittia(m)) return Kesken;
            var k = Kaupunki(m);
            if (k == null) return "lento lähtee vain kaupungista";
            if (!m.Verkko.Kaupungit[k].Lentokentta) return "täällä ei ole lentokenttää";
            if (m.Tila.Pelaaja.Raha < Vakiot.LentoHinta) return $"lentolippu maksaa {Vakiot.LentoHinta} puntaa";
            return "täältä ei lähde lentoja";
        }
    }
}
