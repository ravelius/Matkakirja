// VERTAILULINSSI JA MAIDEN TIEDOT (web js/linssit/vertailu.js ja maatiedot.js
// LINSSI + js/vertailu.js tahdistaVertailu, valitseVertailuMaa,
// rakennaVertailuPalkki, tahdistaMaatiedot, piirraMaatiedotMaat).
//
// Kumpikaan ei piirrä omaa kerrosta: ne ottavat pallon MAATILAAN (Natiivisepän
// KarttaKerrokset.MaaTila, IMaaKartta-sovittimen takana). Kaupungit, nappula
// ja nostot väistyvät (web body.vertailu-tila .cities/.tokens/.targets/.pawns),
// maiden rajat tulevat näkyviin ja napautus osuu maahan.
//
//   vertailu   KERÄÄ maita listalle: enintään VertailuMax (3 + Suomi valmiina),
//              valitut punaisella, täyden listan muut himmenevät; UI:n alapalkki
//              näyttää laput ja Vertaa-napin (Natiivi-UI: vertailukäyrät).
//   maatiedot  AVAA yhden maan: ensimmäinen napautus valitsee (rajat korostuvat,
//              maakyltti kertoo nimen ja lipun), kyltin napautus avaa maalehden.
//              Kaksi vaihetta, koska pallolla osuu helposti väärään maahan.
//
// Linssit kertovat UI:lle tapahtumilla; ne eivät tunne UI:ta. Ääni ('paper')
// kulkee AaniKasittelijan kautta Pelikoodarin äänille.
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Linssit.Maat
{
    /// <summary>
    /// Pallon maatila (RAJAPINTA.md luku 4, Natiiviseppä; sovittu 23.9.2026).
    /// Tunnukset ISO3.
    /// </summary>
    public interface IMaaKartta
    {
        /// <summary>Kaupungit ja nimiöt piiloon, maiden rajat näkyviin; napautus osuu maahan.</summary>
        void MaaTila(bool paalla);
        /// <summary>ISO3 napautetusta maasta.</summary>
        event Action<string> MaaNapautettu;
        /// <summary>Kaikkien korostamattomien maiden täyttö ja raja.</summary>
        void MaaPerussavy(Savy savy);
        void Korosta(string iso3, Savy savy);
        /// <summary>Korostus pois yhdeltä maalta; null = kaikilta.</summary>
        void KorostusPois(string iso3);
    }

    /// <summary>Maiden nimet pallolle (vertailu). Toteutus Linssit/Unity/; valinnainen.</summary>
    public interface IMaidenNimet
    {
        void Nimet(IReadOnlyList<Maa> maat);
        void Pois();
    }

    /// <summary>Yhteinen runko: maatila päälle ja pois, korostusten ero edelliseen.</summary>
    public abstract class MaatilaLinssi : ILinssi
    {
        protected readonly MaatAineisto aineisto;
        readonly IMaaKartta kartta;
        ILinssiYmparisto ymparisto;
        readonly Dictionary<string, Savy> korostetut = new Dictionary<string, Savy>(StringComparer.Ordinal);
        Savy? perus;

        /// <summary>Äänitehoste ("paper" valinnassa, web sfx.play). Pelikoodari kytkee.</summary>
        public Action<string> AaniKasittelija;

        public abstract LinssiTiedot Tiedot { get; }
        public bool Auki { get; private set; }

        protected MaatilaLinssi(MaatAineisto aineisto, IMaaKartta kartta)
        {
            this.aineisto = aineisto ?? throw new ArgumentNullException(nameof(aineisto));
            this.kartta = kartta;
        }

        /// <summary>Nykyiset korostukset (testit ja mittarit).</summary>
        public IReadOnlyDictionary<string, Savy> Korostetut => korostetut;

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            if (Auki) return;
            Auki = true;
            this.ymparisto = ymparisto;
            ymparisto?.Pelikerrokset(false);
            if (kartta != null)
            {
                kartta.MaaTila(true);
                kartta.MaaNapautettu += Napautettu;
            }
            Avattu();
            Piirra();
        }

        public void Paivita() { }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            if (kartta != null)
            {
                kartta.MaaNapautettu -= Napautettu;
                kartta.KorostusPois(null);
                kartta.MaaTila(false);
            }
            korostetut.Clear();
            perus = null;
            Suljettu();
            ymparisto?.Pelikerrokset(true);
            ymparisto = null;
        }

        void Napautettu(string iso3)
        {
            if (Auki && aineisto.Hae(iso3) != null) Napautus(iso3);
        }

        protected abstract void Avattu();
        protected abstract void Suljettu();
        protected abstract void Napautus(string iso3);
        /// <summary>Korostamattomien sävy ja korostetut maat nyt.</summary>
        protected abstract (Savy Perus, IEnumerable<(string Iso, Savy Savy)> Korostus) Savyt();

        /// <summary>Vie sävyt kartalle: vain muuttuneet kutsut (web asettaa koko listan uudestaan).</summary>
        protected void Piirra()
        {
            if (!Auki) return;
            var (p, lista) = Savyt();
            var uudet = lista.ToDictionary(k => k.Iso, k => k.Savy, StringComparer.Ordinal);
            if (!perus.HasValue || !perus.Value.Equals(p))
            {
                perus = p;
                kartta?.MaaPerussavy(p);
            }
            foreach (var vanha in korostetut.Keys.Where(k => !uudet.ContainsKey(k)).ToList())
            {
                korostetut.Remove(vanha);
                kartta?.KorostusPois(vanha);
            }
            foreach (var (iso, s) in uudet)
            {
                if (korostetut.TryGetValue(iso, out var ennen) && ennen.Equals(s)) continue;
                korostetut[iso] = s;
                kartta?.Korosta(iso, s);
            }
        }

        protected void Aani(string nimi) => AaniKasittelija?.Invoke(nimi);
    }

    /// <summary>Vertailulinssi (web js/linssit/vertailu.js + js/vertailu.js vertailutila).</summary>
    public sealed class VertailuLinssi : MaatilaLinssi
    {
        /// <summary>Enimmäismäärä: kolme maata + Suomi valmiina (web VERTAILU_MAX).</summary>
        public const int VertailuMax = 4;
        /// <summary>Suomi valmiina vaihtoehtona, jos maa on aineistossa.</summary>
        public const string Suomi = "FIN";

        // Web VERTAILUN_SAVYT.
        public static readonly Savy SavyValittu = new Savy("rgba(176, 58, 43, 0.3)", "#b03a2b");
        public static readonly Savy SavyValittavissa = new Savy("rgba(120, 96, 62, 0.06)", "rgba(70, 51, 31, 0.55)");
        public static readonly Savy SavyHimmea = new Savy("rgba(120, 96, 62, 0.03)", "rgba(70, 51, 31, 0.25)");

        /// <summary>
        /// Lapun ja käyrän väri valintajärjestyksessä (web VERTAILUVARIT →
        /// css .maakayra-viiva/-toinen/-kolmas/-neljas stroke).
        /// </summary>
        public static readonly IReadOnlyList<Rgba> Varit = new[]
        {
            Rgba.Lue("#a4691c"), Rgba.Lue("#b03a2b"), Rgba.Lue("#4a6b3a"), Rgba.Lue("#35577f"),
        };

        // UI:n tekstit sanatarkasti webistä (rakennaVertailuPalkki, valitseVertailuMaa).
        public const string Ohje = "Napauta kartalta maat, joita haluat verrata.";
        public const string LappuOhje = "Poista vertailusta";
        public const string VertaaNappi = "Vertaa";
        public const string VertaaOhje = "Avaa vertailu";
        public const string VertaaEiOhje = "Valitse vähintään kaksi maata";
        public static readonly string TaynnaOtsikko = $"Vertailuun mahtuu {VertailuMax} maata";
        public const string TaynnaAlarivi = "Poista ensin jokin lappu alapalkista.";

        public enum Tulos { Lisatty, Poistettu, Taynna, Tuntematon }

        /// <summary>Yksi lappu alapalkissa.</summary>
        public readonly struct Lappu
        {
            public readonly Maa Maa;
            public readonly Rgba Vari;
            public Lappu(Maa maa, Rgba vari) { Maa = maa; Vari = vari; }
        }

        readonly IMaidenNimet nimet;
        readonly List<string> valinnat = new List<string>();

        /// <summary>Valinnat muuttuivat tai tila aukesi/sulkeutui: UI rakentaa palkin uudestaan.</summary>
        public event Action Muuttui;
        /// <summary>Lista on täynnä (web toast TaynnaOtsikko + TaynnaAlarivi).</summary>
        public event Action Tayttui;
        /// <summary>Vertaa-nappi: UI avaa vertailunäkymän näillä maillä (järjestys = värit).</summary>
        public event Action<IReadOnlyList<Maa>> VertailuPyydetty;

        public override LinssiTiedot Tiedot => aineisto.Vertailu;

        public VertailuLinssi(MaatAineisto aineisto, IMaaKartta kartta, IMaidenNimet nimet = null) : base(aineisto, kartta)
        {
            this.nimet = nimet;
        }

        /// <summary>Valitut ISO3:t valintajärjestyksessä. Säilyy linssin sulkemisen yli (web ui.vertailuValinnat).</summary>
        public IReadOnlyList<string> Valinnat => valinnat;
        public bool Taynna => valinnat.Count >= VertailuMax;
        public bool VoiVerrata => valinnat.Count >= 2;

        public IReadOnlyList<Lappu> Laput =>
            valinnat.Select((iso, i) => new Lappu(aineisto.Hae(iso), Varit[Math.Min(i, Varit.Count - 1)])).ToList();

        protected override void Avattu()
        {
            // Suomi valmiina vain tyhjään listaan ja vain, jos se on aineistossa.
            if (valinnat.Count == 0 && aineisto.Hae(Suomi) != null) valinnat.Add(Suomi);
            nimet?.Nimet(aineisto.Maat.Values.Where(m => m.NimiPallolle)
                .OrderBy(m => m.Id, StringComparer.Ordinal).ToList());
            Muuttui?.Invoke();
        }

        protected override void Suljettu()
        {
            nimet?.Pois();
            Muuttui?.Invoke();
        }

        protected override void Napautus(string iso3) => Valitse(iso3);

        /// <summary>Maa valintaan tai pois (kartan napautus ja lapun napautus). Täysi lista ei ota enempää.</summary>
        public Tulos Valitse(string iso3)
        {
            if (aineisto.Hae(iso3) == null) return Tulos.Tuntematon;
            Tulos t;
            if (valinnat.Remove(iso3)) t = Tulos.Poistettu;
            else if (Taynna) { Tayttui?.Invoke(); return Tulos.Taynna; }
            else { valinnat.Add(iso3); t = Tulos.Lisatty; }
            Aani("paper");
            Piirra();
            Muuttui?.Invoke();
            return t;
        }

        /// <summary>Vertaa-nappi. Palauttaa, pyydettiinkö näkymä.</summary>
        public bool Vertaa()
        {
            if (!Auki || !VoiVerrata) return false;
            VertailuPyydetty?.Invoke(valinnat.Select(aineisto.Hae).ToList());
            return true;
        }

        protected override (Savy, IEnumerable<(string, Savy)>) Savyt() =>
            (Taynna ? SavyHimmea : SavyValittavissa, valinnat.Select(iso => (iso, SavyValittu)));
    }

    /// <summary>Maiden tiedot (web js/linssit/maatiedot.js + js/vertailu.js maatiedot-tila).</summary>
    public sealed class MaatiedotLinssi : MaatilaLinssi
    {
        // Web MAATIETOJEN_SAVYT.
        public static readonly Savy SavyValittu = new Savy("rgba(176, 34, 34, 0.16)", "rgba(140, 30, 30, 0.9)");
        public static readonly Savy SavyValittavissa = new Savy("rgba(140, 110, 70, 0.05)", "rgba(70, 51, 31, 0.55)");

        /// <summary>Valittu maa vaihtui (null = ei valintaa): UI näyttää tai piilottaa maakyltin.</summary>
        public event Action<Maa> ValittuMuuttui;
        /// <summary>Maakyltin napautus: UI avaa maan lehden (Maa.Maalehti).</summary>
        public event Action<Maa> LehtiPyydetty;

        public override LinssiTiedot Tiedot => aineisto.Maatiedot;

        public MaatiedotLinssi(MaatAineisto aineisto, IMaaKartta kartta) : base(aineisto, kartta) { }

        public Maa Valittu { get; private set; }
        /// <summary>Valitun maan ISO3 tai null.</summary>
        public string Valittuna => Valittu?.Id;

        protected override void Avattu() => Valittu = null;

        protected override void Suljettu()
        {
            if (Valittu == null) return;
            Valittu = null;
            ValittuMuuttui?.Invoke(null);
        }

        /// <summary>Napautus valitsee maan; saman maan uusi napautus poistaa valinnan.</summary>
        protected override void Napautus(string iso3)
        {
            Valittu = Valittu?.Id == iso3 ? null : aineisto.Hae(iso3);
            Aani("paper");
            Piirra();
            ValittuMuuttui?.Invoke(Valittu);
        }

        /// <summary>Maakyltin napautus. Palauttaa, pyydettiinkö lehti.</summary>
        public bool AvaaLehti()
        {
            if (!Auki || Valittu == null) return false;
            LehtiPyydetty?.Invoke(Valittu);
            return true;
        }

        protected override (Savy, IEnumerable<(string, Savy)>) Savyt() =>
            (SavyValittavissa, Valittu == null ? Enumerable.Empty<(string, Savy)>() : new[] { (Valittu.Id, SavyValittu) });
    }
}
