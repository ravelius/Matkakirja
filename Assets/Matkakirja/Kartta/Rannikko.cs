using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// RANTAVIIVA VEKTORINA (omistajan löydös 46, erä E1; Fable hyväksyi 3D-selvittäjän suosituksen 24.9.2026): web
    /// piirtää rannat vektorina jokaisessa zoomissa (js/pallovektorit.js), natiivi näytti vain Z8-rasteriin poltetun
    /// rannan, joka lähikuvassa on 5× suurennettu. Tämä kerros piirtää saman aineiston samoilla säännöillä:
    ///
    ///  - AINEISTO: webin GSHHS-sarja ämpärissä (<see cref="Juuri"/>: luettelo.json ja solut &lt;laji&gt;/l&lt;k&gt;/&lt;s_r&gt;.bin,
    ///    viisi tasoa, toleranssit 0,1…0°, tasot 0–1 koko maailma yhtenä tiedostona, 2–4 10°:n soluina). Haku
    ///    Laattapalvelimen kautta (offline-kansio → välimuisti → verkko), joten offline-alue (Alueet) toimii.
    ///  - TASO webin vektoritasolla: matalin taso, jonka toleranssi × tiheys ≤ 0,5 laitepikseliä (tiheys =
    ///    laitepikseliä leveysastetta kohti ruudun keskellä, sama kuin Maarajalla); solut näkyvästä alueesta (7 × 7
    ///    näytettä + horisontin puolitushaku kallistuksessa); ladattu solu harvennetaan webin harvennusportaalla.
    ///  - PIIRTO: Rajaviiva-varjostin, yksi verkko ja piirtokutsu solua kohti, verkot taustasäikeessä
    ///    (<see cref="Vektorisolut.TeeNauha"/>). Leveys Viivaleveys: rannikko 0,8–1,2 pt × Pistekerroin, muste #5a4330
    ///    peitolla 0,58 (web RANTA_MUSTE, RANTA_PEITTO; lineaarisessa sekoituksessa <see cref="PeittoNatiivi"/>), ei
    ///    päätyjatketta (web: läpinäkyvä muste ei saa kasautua).
    ///  - SYVYYS: ZTest LEqual ja syvyysnosto (<see cref="NostoM"/> + <see cref="NostoOsuus"/> × etäisyys) kuten
    ///    Napakansi: viiva on ellipsoidilla (korkeus 0 = ranta myös korkeuskertoimella, max(h, 0)·(k − 1) = 0), karkean
    ///    maastotason virhe ei peitä sitä, mutta vuori kallistetussa kuvassa peittää.
    ///  - JÄRJESTYS: <see cref="RantaJono"/> 2997 = rajojen (2996) ja pelaajan maan kehän (Maaraja 2995) päällä, kuten
    ///    webissä (korostus −0,55 rannikon −0,5 alla), ja reittien, pisteiden ja nimiöiden alla.
    ///  - LIIKE: uusi solu häivytetään sisään 260 ms (ease-out). Tason vaihtuessa vanha taso pysyy, kunnes uuden tason
    ///    näkyvät solut ovat valmiita (web piilottaa vanhan heti), enintään <see cref="VaihdonOdotusSek"/>.
    ///
    /// Runko (solut, lataus, verkot, näkyvyys) on yhteinen Rajojen kanssa: <see cref="Vektorikerros"/> (E2).
    /// Kun rannikko piirtyy, pelaajan maan kehä (Maaraja) väistyy (omistajan päätös 25.9.2026 klo 00.0x).
    ///
    /// NÄKYVYYS: karttatilassa päällä. Pois lennon satelliittipinnalla (KarttaKerrokset.SatelliittiLento) ja linssissä,
    /// jolla on oma pohja (KarttaKerrokset.LinssiPaalla), ellei linssi pyydä <see cref="LinssinPaalla"/>. Yleinen
    /// kytkin <see cref="Nakyvissa"/> (linssit, UI), kerros "rannikko" (KarttaKerrokset.Nakyvyys) ja komento
    /// "rannikko pois|paalle|taso &lt;n&gt;|taso auto|tila|syvyys pois|paalle|nosto &lt;m&gt; [osuus]|peitto &lt;a&gt;|oletus"
    /// (Komennot.cs).
    /// </summary>
    public class Rannikko : Vektorikerros
    {
        /// <summary>Web RANTA_MUSTE #5a4330 ja RANTA_PEITTO 0,58.</summary>
        public static readonly Color RantaMuste = new Color32(0x5a, 0x43, 0x30, 0xff);
        public const float Peitto = 0.58f;
        /// <summary>
        /// Peitto natiivin lineaarisessa sekoituksessa (Vektorisolut.LineaarinenPeitto): sama luminanssi kuin webin
        /// sRGB-sekoitus peitolla 0,58 maan ja meren pohjalla (noin 0,73).
        /// </summary>
        public static readonly float PeittoNatiivi = (float)Vektorisolut.LineaarinenPeitto(Vektorisolut.RantaMuste, Peitto);
        /// <summary>Piirtojärjestys: rajojen (2996) ja Maarajan (2995) päällä, reittien (3000), pisteiden ja nimiöiden alla.</summary>
        public const int RantaJono = 2997;

        /// <summary>Yleinen kytkin (linssit, UI). Oletus päällä.</summary>
        public static bool Nakyvissa = true;
        /// <summary>Linssi, jolla on oma pohja, haluaa rannikon päälleen (oletus: ei, rannikko väistyy).</summary>
        public static bool LinssinPaalla;
        /// <summary>Komento "rannikko pois|paalle" (mittaukseen).</summary>
        public static bool Sallittu = true;
        /// <summary>Pakotettu taso (komento "rannikko taso &lt;n&gt;"); &lt; 0 = webin sääntö.</summary>
        public static int PakotettuTaso = -1;
        /// <summary>Peiton ohitus (komento "rannikko peitto &lt;a&gt;|oletus"); NaN = <see cref="PeittoNatiivi"/>.</summary>
        public static float PeittoOhitus = float.NaN;
        /// <summary>
        /// Omistajan valinta 25.9.2026 (kortti, löydös 46: vaihtoehto 3 "himmeä"): rantaviiva natiivin peitolla 0,25,
        /// maiden rajat täydellä webin voimalla. Webin voima <see cref="PeittoNatiivi"/> komennolla "rannikko peitto web".
        /// </summary>
        public const float OmistajanPeitto = 0.25f;
        public static Rannikko Instanssi { get; private set; }

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

        protected override string Laji => "rannikko";
        protected override string Nimi => "Rannikko";
        protected override int Jono => RantaJono;
        protected override Color Muste => RantaMuste;
        public override float PeittoNyt => PeittoOhitus >= 0f && PeittoOhitus <= 1f ? PeittoOhitus : OmistajanPeitto;
        protected override double LeveysPt(double tiheys) => Viivaleveys.Pt(tiheys, Viivaleveys.RannikkoKaukana, Viivaleveys.RannikkoLahella);
        protected override int Pakotettu => PakotettuTaso;
        protected override bool LinssinPaallaOma => LinssinPaalla;
        protected override string OmaSyy() => !Sallittu ? "komento pois" : !Nakyvissa ? "Rannikko.Nakyvissa = false" : null;
    }
}
