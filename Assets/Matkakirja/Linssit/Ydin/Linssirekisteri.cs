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
        /// Tietäjäpisteraja, jolla linssi aukeaa (web js/linssit/omistus.js
        /// LINSSIKYNNYKSET [400, 800, 1400, 2200] rekisterijärjestyksessä).
        /// Natiivissa radio jää pois, ja sen 1400 tp:n kynnys on topografian
        /// (Fablen päätös 23.9.2026). Linssi, jota taulussa ei ole, aukeaa vain
        /// kehittäjätilassa. Omistuksen tallennus on Pelikoodarin (Saatavilla).
        /// </summary>
        public static readonly IReadOnlyDictionary<string, int> Avauskynnykset = new Dictionary<string, int>
        {
            ["ihmisen-matka"] = 400,
            ["keksinnot"] = 800,
            ["topografia"] = 1400,
            ["satelliitti"] = 2200,
        };

        /// <summary>Linssit, jotka annetulla pistemäärällä ovat auenneet, kynnysjärjestyksessä.</summary>
        public static IReadOnlyList<string> Auenneet(int tietajapisteet) =>
            Avauskynnykset.Where(k => tietajapisteet >= k.Value).OrderBy(k => k.Value).Select(k => k.Key).ToList();

        readonly List<ILinssi> linssit = new List<ILinssi>();
        readonly ILinssiYmparisto ymparisto;

        /// <summary>
        /// Onko linssi pelaajalla (omistus, web js/linssit/omistus.js). Oletus: kaikki.
        /// Pelikoodarin omistuslogiikka kytketään tähän.
        /// </summary>
        public Func<string, bool> Saatavilla = _ => true;

        /// <summary>Auki oleva linssi tai null.</summary>
        public ILinssi Auki { get; private set; }

        /// <summary>Uusi auki oleva linssi (null = kaikki kiinni).</summary>
        public event Action<ILinssi> Vaihtui;

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
