using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// VALTIOIDEN RAJAT VEKTORINA (omistajan löydös 46, erä E2; omistaja valitsi 25.9. klo 00.0x peruskartaksi D2 +
    /// reliefi + vektorirannat): webin pallovektorien "rajat"-laji (js/pallovektorit.js) samasta GSHHS-sarjasta ja samalla
    /// solu- ja tasologiikalla kuin Rannikko (<see cref="Vektorikerros"/>). Webin tyyli:
    ///  - muste RAJA_MUSTE #6b5539, peitto RAJA_PEITTO 0,34 (lineaarisessa sekoituksessa <see cref="PeittoNatiivi"/>);
    ///  - leveys VEKTORIT_RAJA_LEVEYS_CSS 0,65–0,95 pt × Pistekerroin (Viivaleveys);
    ///  - katkoviiva RAJA_KATKO_YKS [0,011; 0,022] pallon yksikköä = 700,8 m mustetta, 1 401,6 m väliä (Rajaviiva _Katko);
    ///  - vasta maanäkymästä sisäänpäin: tiheys ≥ VEKTORIT_RAJAT_PX_ASTE 30 px/° (kaukaa pistekuvio sulaisi läiskiksi);
    ///    Euroopan loitonnuksessa 15 px/° kevyemmällä peitolla (EurooppaLoitonnus, omistaja 11.10.2026).
    /// Järjestys: <see cref="RajaJono"/> 2996, pelaajan maan kehän (2995) päällä ja rannikon (2997) alla (web: rajat ja ranta
    /// samassa renderOrderissa −0,5, korostus −0,55).
    ///
    /// KORKEUS: Karttasepän rajakorkeussarja (Vektorikerros.KorkeusVersio, oletus 25.9.): luettelossa "korkeus": true,
    /// solu (dlon, dlat, h int16), h = maastoverkon yläraja janan matkalta (tools/maasto/vie-rajakorkeudet.mjs). Viiva on
    /// korkeudella h ja Rajaviiva nostaa sen korkeuskertoimella kuten tilesetin; ajonaikainen harvennus siirtää poistettujen
    /// pisteiden suurimman h:n säilyviin (Vektorisolut.Harvenna). Syvyysnosto (Vektorikerros.NostoM + NostoOsuus ×
    /// etäisyys) hoitaa kaukana näkyvän karkeamman maaston. Webin sarjalla (komento "vektorit versio web") h = 0.
    ///
    /// NÄKYVYYS kuten rannikolla; oma kytkin <see cref="Nakyvissa"/>, <see cref="LinssinPaalla"/>, kerros "rajat" ja
    /// komento "rajat pois|paalle|taso &lt;n&gt;|auto|tila|peitto &lt;a&gt;|oletus" (Komennot.cs).
    /// </summary>
    public class Rajat : Vektorikerros
    {
        public static readonly Color RajaMuste = new Color32(0x6b, 0x55, 0x39, 0xff);
        public const float Peitto = 0.34f;
        /// <summary>Webin 0,34 lineaarisessa sekoituksessa (maan ja meren pohjan keskiarvo).</summary>
        public static readonly float PeittoNatiivi = (float)Vektorisolut.LineaarinenPeitto(Vektorisolut.RajaMuste, Peitto);
        public const int RajaJono = 2996;

        public static bool Nakyvissa = true;
        public static bool LinssinPaalla;
        /// <summary>Komento "rajat pois|paalle".</summary>
        public static bool Sallittu = true;
        public static int PakotettuTaso = -1;
        public static float PeittoOhitus = float.NaN;
        public static Rajat Instanssi { get; private set; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            Nakyvissa = true; LinssinPaalla = false; Sallittu = true; PakotettuTaso = -1; PeittoOhitus = float.NaN; Instanssi = null;
        }

        protected override void Awake() => Instanssi = this;

        protected override void OnDestroy()
        {
            base.OnDestroy();
            if (Instanssi == this) Instanssi = null;
        }

        protected override string Laji => "rajat";
        protected override string Nimi => "Rajat";
        protected override int Jono => RajaJono;
        protected override Color Muste => RajaMuste;
        /// <summary>
        /// Peitto: komennon ohitus, muuten webin 0,34 lineaarisena; Euroopan loitonnuksessa (omistaja 11.10.2026, juna 182)
        /// kevyempi kaukana: 0,55 × kynnyksellä 15 px/° → täysi 30 px/°:sta (EurooppaLoitonnus.RajojenPeitto).
        /// </summary>
        public override float PeittoNyt => PeittoOhitus >= 0f && PeittoOhitus <= 1f ? PeittoOhitus
            : EurooppaVoimassa ? EurooppaLoitonnus.RajojenPeitto(PeittoNatiivi, NykyTiheys) : PeittoNatiivi;
        protected override double LeveysPt(double tiheys) => Viivaleveys.Pt(tiheys, Viivaleveys.RajaKaukana, Viivaleveys.RajaLahella);
        protected override int Pakotettu => PakotettuTaso;
        protected override bool LinssinPaallaOma => LinssinPaalla;
        protected override float KatkoM => (float)Vektorisolut.RajaKatkoM;
        protected override float ValiM => (float)Vektorisolut.RajaValiM;
        /// <summary>
        /// Piirtokynnys: webin 30 px/°; Euroopan maassa pelaajan rajojen ollessa voimassa 15 px/°, jotta rajat näkyvät kevyesti
        /// koko Euroopan näkymässä (iPhone pysty ~25 px/°, iPad ~35–45 px/°). Kehittäjän maailmatila ennallaan.
        /// </summary>
        protected override double MinTiheys => EurooppaLoitonnus.RajojenMinTiheys(EurooppaVoimassa, Vektorisolut.RajatTiheys);
        bool EurooppaVoimassa => kierto != null && kierto.EurooppaVoimassa;

        /// <summary>Euroopan loitonnuksen kirjaus: tiheys, kynnys, peitto ja piirtyykö kerros.</summary>
        public string EurooppaTila() =>
            $"tiheys {NykyTiheys:0.0} px/° (kynnys {MinTiheys:0} px/°, Euroopan säännöllä {(EurooppaVoimassa ? "kyllä" : "ei")}), " +
            $"peitto {PeittoNyt:0.000} lineaarisena (lähellä {PeittoNatiivi:0.000}), piirtyy {(Piirtyy && NykyTiheys >= MinTiheys ? "kyllä" : "ei")}";
        protected override string OmaSyy() => !Sallittu ? "komento pois" : !Nakyvissa ? "Rajat.Nakyvissa = false" : null;
    }
}
