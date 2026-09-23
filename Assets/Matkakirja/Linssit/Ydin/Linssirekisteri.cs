// Linssirekisteri (web js/linssit/rekisteri.js + js/ui.js sytytaLinssi):
// linssit valitsimen järjestyksessä, yksi auki kerrallaan.
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Linssit
{
    public sealed class Linssirekisteri
    {
        /// <summary>
        /// Tietäjäpisteraja, jolla linssi aukeaa (web js/linssit/omistus.js LINSSIKYNNYKSET
        /// [400, 800, 1400, 2200]: kukin kynnys antaa seuraavan omistamattoman manner: null
        /// -linssin rekisterijärjestyksessä = ihmisen matka, keksinnöt, radio, astronautti).
        /// Natiivi omistajan päätöksellä 23.9.2026 (natiivi-ajantasaisuus A7/A8/C9): radio saa
        /// 1400 tp:n kynnyksensä takaisin, ja topografia aukeaa samalla kynnyksellä. Linssi,
        /// jota taulussa ei ole (vertailu, maatiedot, vesistöt), aukeaa vain kehittäjätilassa
        /// tai myöhemmin kaupasta (Pelikoodari, B8).
        /// </summary>
        public static readonly IReadOnlyDictionary<string, int> Avauskynnykset = new Dictionary<string, int>
        {
            ["ihmisen-matka"] = 400,
            ["keksinnot"] = 800,
            ["radio"] = 1400,
            ["topografia"] = 1400,
            ["satelliitti"] = 2200,
        };

        /// <summary>Kynnysten löytöjärjestys (web: seuraava omistamaton manner: null -linssi).</summary>
        public static readonly IReadOnlyList<string> Kynnyslinssit = new[] { "ihmisen-matka", "keksinnot", "radio", "satelliitti" };
        /// <summary>Kynnyksen 1400 lisälinssi (topografia pysyy radion kynnyksellä).</summary>
        public const string KynnyksenLisa = "topografia";
        public static readonly IReadOnlyList<int> Kynnykset = new[] { 400, 800, 1400, 2200 };

        /// <summary>Linssit, jotka annetulla pistemäärällä ovat auenneet, kynnysjärjestyksessä.</summary>
        public static IReadOnlyList<string> Auenneet(int tietajapisteet) =>
            Avauskynnykset.Where(k => tietajapisteet >= k.Value).OrderBy(k => k.Value).Select(k => k.Key).ToList();

        /// <summary>
        /// Kynnysten ylitys (web tarkistaKynnys): pisteet ennen → jälkeen. Kukin ylitetty
        /// kynnys antaa seuraavan omistamattoman kynnyslinssin; 1400 lisäksi topografian.
        /// Kynnys ylittyy vain kerran (vertailu ennen/jälkeen), ja yksi kutsu voi ylittää
        /// useita. Palauttaa uudet tunnukset; tallennus ja ilmoitus ovat Pelikoodarin.
        /// </summary>
        public static IReadOnlyList<string> Kynnys(IEnumerable<string> omistetut, int ennen, int jalkeen)
        {
            var omat = new HashSet<string>(omistetut ?? Array.Empty<string>(), StringComparer.Ordinal);
            var uudet = new List<string>();
            if (jalkeen <= ennen) return uudet;
            foreach (var raja in Kynnykset)
            {
                if (ennen >= raja || jalkeen < raja) continue;
                var tunnus = Kynnyslinssit.FirstOrDefault(t => !omat.Contains(t));
                if (tunnus != null) { omat.Add(tunnus); uudet.Add(tunnus); }
                if (raja == 1400 && omat.Add(KynnyksenLisa)) uudet.Add(KynnyksenLisa);
            }
            return uudet;
        }

        /// <summary>
        /// Kehittäjätila: kaikki linssit auki (web: kehittäjätila antaa toimivat linssit).
        /// Seitsemän peninkulman linssi (B9) avaa kaikki samalla tavalla. Oletus pois;
        /// LinssiOhjain lukee arvon PlayerPrefsistä.
        /// </summary>
        public static bool Kehittajatila;

        readonly List<ILinssi> linssit = new List<ILinssi>();
        readonly ILinssiYmparisto ymparisto;

        /// <summary>
        /// Onko linssi pelaajalla (omistus, web js/linssit/omistus.js). Oletus: vain
        /// kehittäjätilassa. Pelikoodarin omistuslogiikka (passi, tallennus, kauppa,
        /// kynnykset) kytketään tähän; kehittäjätila ohittaa sen aina.
        /// </summary>
        public Func<string, bool> Omistaa = _ => false;

        /// <summary>Valitsimessa näkyvä ja avattava: kehittäjätila tai omistus.</summary>
        public bool Saatavilla(string id) => Kehittajatila || Omistaa(id);

        /// <summary>Auki oleva linssi tai null.</summary>
        public ILinssi Auki { get; private set; }

        /// <summary>Uusi auki oleva linssi (null = kaikki kiinni).</summary>
        public event Action<ILinssi> Vaihtui;

        /// <summary>
        /// LINSSIN PORTTI (web js/ui.js linssikarttaEstaa + js/ui-apurit.js linssiEstaa, omistaja 4.9.2026:
        /// "pitää kaikki muu blokata varmuuden vuoksi kun linssi alkaa"): näiden linssien ajan Liiku ja
        /// Matkusta ovat harmaana, kaupungin napautus ei liikuta eikä avaa lehteä. Webissä luokan
        /// body.aikajana-paalla asettavat aikajana (ihmisen matka, keksinnöt), topografia ja satelliitti;
        /// radio, vertailu, maatiedot, vesistöt ja isoisä eivät.
        /// </summary>
        public static readonly IReadOnlyCollection<string> PorttiLinssit =
            new HashSet<string>(StringComparer.Ordinal) { "ihmisen-matka", "keksinnot", "topografia", "satelliitti" };

        /// <summary>Estääkö auki oleva linssi pelin kartan (Liiku, siirrot, lehdet).</summary>
        public bool EstaaKartan => Auki != null && PorttiLinssit.Contains(Auki.Tiedot.Id);

        public Linssirekisteri(ILinssiYmparisto ymparisto)
        {
            this.ymparisto = ymparisto ?? throw new ArgumentNullException(nameof(ymparisto));
        }

        public void Lisaa(ILinssi linssi)
        {
            if (linssi?.Tiedot?.Id == null) throw new ArgumentException("linssillä ei ole tunnusta");
            if (linssit.Any(l => l.Tiedot.Id == linssi.Tiedot.Id))
                throw new ArgumentException("linssi on jo rekisterissä: " + linssi.Tiedot.Id);
            linssit.Add(linssi);
        }

        /// <summary>Kaikki linssit valitsimen järjestyksessä (Jarjestys, sitten tunnus).</summary>
        public IReadOnlyList<ILinssi> Kaikki =>
            linssit.OrderBy(l => l.Tiedot.Jarjestys).ThenBy(l => l.Tiedot.Id, StringComparer.Ordinal).ToList();

        /// <summary>Valitsimessa näkyvät: rekisterissä ja pelaajalla.</summary>
        public IReadOnlyList<ILinssi> Valittavat => Kaikki.Where(l => Saatavilla(l.Tiedot.Id)).ToList();

        public ILinssi Hae(string id) => linssit.FirstOrDefault(l => l.Tiedot.Id == id);

        /// <summary>
        /// Avaa linssin; edellinen suljetaan ensin. Saman linssin uusi valinta
        /// sulkee sen (web: valitsimen nappi on vaihtokytkin). Palauttaa, onko
        /// jokin linssi nyt auki.
        /// </summary>
        public bool Valitse(string id)
        {
            var linssi = Hae(id) ?? throw new ArgumentException("tuntematon linssi: " + id);
            if (Auki == linssi) { Sulje(); return false; }
            if (!Saatavilla(id)) return Auki != null;
            SuljeHiljaa();
            Auki = linssi;
            linssi.Avaa(ymparisto);
            Vaihtui?.Invoke(linssi);
            return true;
        }

        public void Sulje()
        {
            if (Auki == null) return;
            SuljeHiljaa();
            Vaihtui?.Invoke(null);
        }

        /// <summary>Kutsutaan joka kehys.</summary>
        public void Paivita() => Auki?.Paivita();

        void SuljeHiljaa()
        {
            var vanha = Auki;
            Auki = null;
            vanha?.Sulje();
        }
    }
}
