// SIMULOITU AIKA (web js/linssit/iss-rata.js SIMUKELLO, commit 891958e17; omistaja 28.9.2026 klo 12.1x): YKSI KELLO radalle,
// auringolle, ilmakehän kaarelle, yökuorelle ja taivaalle (kaikki lukevat IssNyt.Kelloa). LIVE = todellinen hetki ja
// kerroin 1. Nopeutus 10×, 100× tai 1000× (logaritminen porras) juoksuttaa kelloa todellista nopeammin; "Palaa LIVE" kelaa
// pehmeästi takaisin todelliseen hetkeen (ei hyppyä), ja ylilennon lento kelaa ennalta laskettuun hetkeen kiihtyen noin
// 1000×:iin ja hidastuen lopussa 1×:iin (smootherstep, huippunopeus 1,875 × keskinopeus).
//
// Natiivin lisä: testikellon siirto (`astro kyyti kello …`) siirtää LIVE-hetkeä, joten nopeutus ja Palaa LIVE toimivat
// testikellon hetkestä. Kelauksen valmistuminen luetaan ValmisId:stä (webissä valmis-takaisinkutsu kesken nyt()-kutsun):
// kello luetaan monesta kerroksesta kehyksen aikana, eikä linssin koodi saa ajautua niiden keskellä.
// Puhdas C#: reaalikello annetaan (testit; Unityssä Kehyskello, joka lukee seinäkellon kerran kehyksessä).
using System;
using Matkakirja.Linssit.Kamera;

namespace Matkakirja.Linssit.Iss
{
    public sealed class Simukello
    {
        /// <summary>Nopeuden porras (×), 1 = LIVE (web NOPEUDET).</summary>
        public static readonly int[] Nopeudet = { 1, 10, 100, 1000 };
        /// <summary>
        /// Ylilennon kelauksen tavoitehuippu (×) ja kelauksen kesto (s) rajoineen. SIIRTYMÄ ENINTÄÄN 5 S (omistaja 28.9.2026:
        /// "siirtymä paikkojen välillä ei saa kestää yli 5sek"): kelaus 1,5…3,6 s + perillä kääntyminen kohteeseen
        /// (IssKyyti.KohteeseenS 1,2 s) ≤ 4,8 s etäisyydestä riippumatta; pitkällä kelauksella huippu nousee yli 1000×:n
        /// (48 h ≈ 90 000×). Ennen 2…25 s huipulla 1000×.
        /// </summary>
        public const double KelauksenHuippu = 1000, KelausMinS = 1.5, KelausMaxS = 3.6;
        /// <summary>Koko siirtymän katto (s): kelaus + kääntyminen, testit ja laitemittaus vertaavat tähän.</summary>
        public const double SiirtymaMaxS = 5;
        /// <summary>Palaa LIVE: kesto 0,6 s + 1 s poikkeaman tuntia kohden, enintään 3 s.</summary>
        public const double PaluuMinS = 0.6, PaluuMaxS = 3;

        sealed class Kelaus
        {
            public DateTime AlkuR, AlkuS, Tavoite;
            public double KestoS;
            /// <summary>Tavoite liikkuu reaalikellon mukana (Palaa LIVE); perillä LIVE.</summary>
            public bool LiveTavoite;
            public int Id;
        }

        readonly Func<DateTime> reaali;
        TimeSpan siirto;
        DateTime ankkuriR, ankkuriS;
        double kerroin = 1;
        bool live = true;
        Kelaus kelaus;
        int kelauksia;

        public Simukello(Func<DateTime> reaali)
        {
            this.reaali = reaali ?? (() => DateTime.UtcNow);
            ankkuriR = this.reaali();
            ankkuriS = ankkuriR;
        }

        /// <summary>LIVE (ei kelausta): simuloitu aika = todellinen hetki + testikellon siirto.</summary>
        public bool Live => live && kelaus == null;
        /// <summary>Kelaus käynnissä (Palaa LIVE tai ylilento).</summary>
        public bool Kelaa => kelaus != null;
        /// <summary>Portaan kerroin (1 myös kelauksen jälkeen perillä).</summary>
        public double Kerroin => kerroin;
        /// <summary>Käynnissä olevan kelauksen tunniste (0 = ei kelausta); keskeytys näkyy siitä, että tunniste vaihtuu.</summary>
        public int KelausId => kelaus?.Id ?? 0;
        /// <summary>Viimeisimmän perille asti ajetun kelauksen tunniste (korvattu tai keskeytetty kelaus ei päivitä).</summary>
        public int ValmisId { get; private set; }
        /// <summary>Testikellon siirto: LIVE-hetki = todellinen hetki + siirto.</summary>
        public TimeSpan Siirto => siirto;

        DateTime LiveHetki(DateTime r) => r + siirto;
        DateTime Tavoite(Kelaus k, DateTime r) => k.LiveTavoite ? LiveHetki(r) : k.Tavoite;

        static TimeSpan Kerro(TimeSpan t, double k) => TimeSpan.FromTicks((long)Math.Round(t.Ticks * k));

        /// <summary>Simuloitu hetki (UTC). Kelauksen loppu kirjataan tässä (ValmisId).</summary>
        public DateTime Nyt()
        {
            var r = reaali();
            if (kelaus != null)
            {
                double u = kelaus.KestoS > 0 ? (r - kelaus.AlkuR).TotalSeconds / kelaus.KestoS : 1;
                var tavoite = Tavoite(kelaus, r);
                if (u >= 1)
                {
                    ValmisId = kelaus.Id;
                    live = kelaus.LiveTavoite;
                    kelaus = null;
                    ankkuriR = r;
                    ankkuriS = tavoite;
                    kerroin = 1;
                    return tavoite;
                }
                return kelaus.AlkuS + Kerro(tavoite - kelaus.AlkuS, Kamerakayrat.Pehmea(u));
            }
            return live ? LiveHetki(r) : ankkuriS + Kerro(r - ankkuriR, kerroin);
        }

        /// <summary>Todellinen nopeus nyt (×): kelauksessa smootherstepin derivaatta, muuten kerroin (LIVE 1).</summary>
        public double Nopeus()
        {
            if (kelaus != null) Nyt();
            if (kelaus == null) return live ? 1 : kerroin;
            var r = reaali();
            double kesto = kelaus.KestoS > 0 ? kelaus.KestoS : 1;
            double u = Math.Max(0, Math.Min(1, (r - kelaus.AlkuR).TotalSeconds / kesto));
            double d = 30 * u * u * (1 - u) * (1 - u);
            return Math.Abs((Tavoite(kelaus, r) - kelaus.AlkuS).TotalSeconds * d / kesto);
        }

        /// <summary>Kelauksen edistyminen 0…1 (null, kun ei kelata).</summary>
        public double? KelausOsuus()
        {
            if (kelaus == null) return null;
            double kesto = kelaus.KestoS > 0 ? kelaus.KestoS : 1;
            return Math.Max(0, Math.Min(1, (reaali() - kelaus.AlkuR).TotalSeconds / kesto));
        }

        /// <summary>Porras: 1 = Palaa LIVE (pehmeä kelaus), muuten nopeutus tästä hetkestä ilman hyppyä.</summary>
        public void AsetaNopeus(double k, bool vahennetty = false)
        {
            if (k <= 1) { PalaaLive(null, vahennetty); return; }
            var s = Nyt();
            kelaus = null;
            live = false;
            ankkuriR = reaali();
            ankkuriS = s;
            kerroin = k;
        }

        /// <summary>
        /// Kerroin suoraan (myös 1× ilman paluuta LIVE:ksi, toisin kuin AsetaNopeus): simuloitu aika jatkuu tästä hetkestä
        /// kertoimella <paramref name="k"/> ilman hyppyä. Avaruuskävely: aurinko nousee Pulun repliikin aikana nopeutettuna.
        /// </summary>
        public void AsetaKerroin(double k)
        {
            var s = Nyt();
            kelaus = null;
            live = false;
            ankkuriR = reaali();
            ankkuriS = s;
            kerroin = Math.Max(0, k);
        }

        /// <summary>
        /// "Palaa LIVE": kelaus todelliseen hetkeen pehmeästi (tavoite liikkuu todellisen kellon mukana), kesto
        /// 0,6 s + 1 s poikkeaman tuntia kohden, enintään 3 s (tai <paramref name="kestoS"/>); vähennetty liike = heti.
        /// Palauttaa kelauksen tunnisteen (0 = oli jo LIVE).
        /// </summary>
        public int PalaaLive(double? kestoS = null, bool vahennetty = false)
        {
            var s = Nyt();
            if (live && kelaus == null) return 0;
            double ero = Math.Abs((s - LiveHetki(reaali())).TotalSeconds);
            double kesto = vahennetty ? 0 : kestoS ?? Math.Min(PaluuMaxS, PaluuMinS + ero / 3600);
            return Aloita(default, true, kesto);
        }

        /// <summary>
        /// Kelaa simuloidun hetken <paramref name="hetki"/>:ään: huippunopeus noin <paramref name="huippu"/>× (pehmeä kiihdytys
        /// ja hidastus), kesto KelausMinS…KelausMaxS. Perillä kerroin 1 (ei LIVE). Palauttaa kelauksen tunnisteen.
        /// </summary>
        public int KelaaHetkeen(DateTime hetki, double huippu = KelauksenHuippu, bool vahennetty = false)
        {
            double ero = Math.Abs((hetki - Nyt()).TotalSeconds);
            double kesto = vahennetty ? 0 : Math.Max(KelausMinS, Math.Min(KelausMaxS, 1.875 * ero / Math.Max(1, huippu)));
            return Aloita(hetki, false, kesto);
        }

        int Aloita(DateTime tavoite, bool liveTavoite, double kestoS)
        {
            var s = Nyt();
            kelaus = new Kelaus { AlkuR = reaali(), AlkuS = s, Tavoite = tavoite, LiveTavoite = liveTavoite, KestoS = Math.Max(0, kestoS), Id = ++kelauksia };
            live = false;
            int id = kelaus.Id;
            if (kelaus.KestoS == 0) Nyt();
            return id;
        }

        /// <summary>
        /// Testikello (`astro kyyti kello …`): LIVE-hetki = todellinen hetki + <paramref name="uusi"/>. Kello hyppää heti
        /// uuteen LIVE-hetkeen (kelaus ja nopeutus pois), jotta testikuva otetaan juuri haetulta hetkeltä; nopeutus toimii
        /// siitä eteenpäin ja Palaa LIVE palaa siihen.
        /// </summary>
        public void AsetaSiirto(TimeSpan uusi)
        {
            siirto = uusi;
            kelaus = null;
            live = true;
            kerroin = 1;
            ankkuriR = reaali();
            ankkuriS = LiveHetki(ankkuriR);
        }

        public override string ToString()
        {
            var s = Nyt();
            string tila = Live ? "LIVE" : Kelaa ? $"kelaa {KelausOsuus():P0}" : $"{kerroin:0.##}×";
            return $"{tila}, nopeus {Nopeus():0.#}×, {s:yyyy-MM-dd HH:mm:ss} UTC (LIVE:stä {(s - LiveHetki(reaali())).TotalHours:+0.00;-0.00} h" +
                   (siirto != TimeSpan.Zero ? $", testikello {siirto.TotalHours:+0.00;-0.00} h)" : ")");
        }
    }
}
