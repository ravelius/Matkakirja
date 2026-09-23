// LIVIAN KOKOPULU PRIMITIIVEIKSI (Natiivi-UI, 23.9.2026).
//
// Siirto js/livia-svg.js:stä (livianSvgMalli, lvBird, lvWing, lvKatseluSiipi,
// lvFeet, lvProps, lvChatDashFx, lvChatDustFx, livianSvgKuva) ja
// js/livia-uudet-versiot.js:stä (uudenEleenKuva: siipi, kirja, vartalo;
// livianUusiPelikuva: kumpi piirto valitaan). Koordinaatit ovat webin
// viewBoxin (0 0 152+right 304) yksiköitä; LiviaKuva skaalaa ne elementtiin.
//
// Kuvaaja kokoaa yhden ruudun Kokoajaan. Astronautin kypärä on webissä
// <image> pään ryhmässä ennen lähempää siipeä: KyparaIndeksi kertoo, mihin
// kohtaan primitiivilistaa kypärä kuuluu, ja KyparaMatriisi sen paikan.
//
// Poikkeamat (tarkoituksella):
//  - SVG-maskit (pullan puraisut) tehdään geometrisesti (Kokoaja.Puraisu,
//    ks. LiviaPiirros.cs).
//  - Tekstit (fx: "…", "?", "z Z") piirretään viivapiirroksina Georgia-kirjasimen
//    mittasuhteilla, koska Painter2D ei piirrä tekstiä.
using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>livianSvgMalli: linnun sijainti, mittakaava, kallistus ja siipien laji.</summary>
    internal sealed class LiviaMalli
    {
        public string Id, Face, Wing;
        public float P, Strength, Gate, Lean, HeadScale, BodyLean, X, Y, HeadX, HeadY, HeadAngle, Scale, Angle, Squash, WingAmount, Step;
        public bool Visible, Flight, Walking, Mirror, Hover;
        public float HoverHeight, HoverPhase, GroundY;
        public LiviaRata Rata;
    }

    internal sealed class LiviaKuvaaja
    {
        public readonly Kokoaja K = new Kokoaja();
        readonly LiviaAsento s = new LiviaAsento();
        readonly LiviaRata rata = new LiviaRata();
        readonly LiviaMalli m = new LiviaMalli();

        /// <summary>Kypärän kohta primitiivilistassa (−1 = ei kypärää).</summary>
        public int KyparaIndeksi = -1;
        /// <summary>Kypärän kuvan (x −7, y −10, 126 × 126) koordinaatisto viewBoxissa.</summary>
        public Affiini KyparaMatriisi;
        /// <summary>Kiireinen ensiliito saa piirtyä viewBoxin ulkopuolelle (webin overflow visible).</summary>
        public bool Ylivuoto;
        public float Leveys = 152;

        const float PI = Mathf.PI;
        static float Rajaa(float n) => LiviaAsennot.Rajaa(n);
        static float Ease(float n) => LiviaAsennot.Ease(n);
        static Color V(string hex, float a = 1) => Kokoaja.Vari(hex, a);

        // --- värit -----------------------------------------------------------------

        static readonly Color VarjoVari = V("#635b4e");
        static readonly Color Vartalo1 = V("#546b7a"), Vartalo2 = V("#97a5ac"), Vartalo3 = V("#b1bcc0"), Vartalo4 = V("#738895");
        static readonly Color SiipiLahi = V("#8499a3"), SiipiKauko = V("#788e99"), SiipiViiva = V("#506b7a"), SiipiTaitettu = V("#84959f"), SiipiTaitettu2 = V("#4d6472");
        static readonly Color JalkaVari = V("#ac7b74"), Pulla1 = V("#d59a50"), Pulla2 = V("#e7bd76"), Pulla3 = V("#b8783e"), Muru = V("#c18b48");
        static readonly Color Leipa2 = V("#e0b875"), Leipa3 = V("#ab743f"), Kosketus = V("#aa9272"), Pff = V("#9b9c91");
        static readonly Color Kirja1 = V("#daceaf"), Kirja2 = V("#9a8c73"), Kirja3 = V("#b8aa8e"), Sydan = V("#a97078"), Tahti = V("#bca362");
        static readonly Color TekstiVari = V("#657780"), Viha = V("#967368"), Tuuli = V("#a5b1b5"), Aurinko = V("#c2a35a"), Aurinko2 = V("#e2c877");
        static readonly Color Pilvi = V("#a4b0b6"), Sade = V("#7a9aa9"), Lumi = V("#cad5d8"), PilviPoly = V("#dedbcf", .72f), PilviReuna = V("#a5a79f"), Vauhti = V("#929b9b");
        static readonly Color Poly = V("#c8c1b0"), PolyHiukkanen = V("#a9a18e"), Pollo = V("#73654f"), PolloVaalea = V("#e8ddc4"), Viiva = V("#988d79");
        static readonly Color SivuReuna = V("#e9dfc5"), SivuViiva = V("#b6a88d"), Sivu = V("#f3ead5"), Kansi1 = V("#829080"), Kansi1V = V("#52685e");
        static readonly Color Kansi2 = V("#60766b"), Kansi2V = V("#415d51"), Selka = V("#b1b6a0"), KansiKuvio = V("#b0b29b"), KansiMerkki = V("#b6b58c");

        // --- kiinteät polut ------------------------------------------------------------

        const string VartaloD1 = "M122 156L139 171L131 172L137 175L122 174L113 163Z";
        const string VartaloD2 = "M87 137Q97 127 115 133Q131 137 132 152Q134 170 117 175Q100 178 89 165Q82 154 87 137Z";
        const string VartaloD3 = "M89 141Q98 134 105 137Q96 147 96 158Q97 170 109 175Q96 171 89 162Q84 152 89 141Z";
        const string VartaloD4 = "M117 135Q132 140 132 154Q134 171 117 175L110 172Q119 161 117 135Z";
        const string SiipiD = "M-3 4Q-11-7-4-20L4-38Q7-44 10-37L10-29Q16-42 20-37L17-24Q23-35 26-30L22-17Q29-23 29-17Q23-5 12 3Q4 8-3 4Z";
        const string SiipiSulatD = "M0-13L8-27M5-7L16-23M10-1L21-15";
        const string TaitettuD1 = "M112 136Q128 137 133 150Q135 161 128 171Q116 166 112 151Z";
        const string TaitettuD2 = "M119 145Q126 148 130 153L129 157Q123 151 118 150Z M120 155Q126 158 130 163L128 167Q124 162 120 160Z";
        const string HieroD1 = "M117 140Q132 131 122 112L113 100Q115 93 109 92L105 88Q101 87 102 93L97 91Q93 93 99 97L96 98Q94 101 102 103L109 106Q107 122 112 135Z";
        const string HieroD2 = "M102 95l8 5m-8 0l8 4m3 5q-2 12 5 19";
        const string PullaD = "M-16 2Q-13-12 0-10Q14-13 17 2Q13 13 0 12Q-14 13-16 2Z";
        const string PullaViivaD = "M-10-2Q-7-9 0-6Q7-10 11-2M-8 5Q0 9 9 4";
        const string PienPullaD = "M-13 2Q-11-9 0-8Q10-9 13 2Q9 10 0 10Q-11 10-13 2Z";
        const string PienPullaViivaD = "M-8-2Q-4-7 1-5Q6-7 9-1M-6 5Q0 7 7 4";
        const string MuruD = "M0 0l3 1-1 3-3-1Z";
        const string MuruYD = "M0 0l4 1-2 4-3-1Z";
        const string LeipaD1 = "M0 9C-3-4 4-14 18-14C32-16 41-7 40 7Q38 21 20 20Q2 22 0 9Z";
        const string LeipaD3 = "M11 4C9-9 34-8 32 5C30 15 15 15 15 5C15 0 25-1 25 5";
        const string PffD = "M0 0q-16-10-22-4m20 8q-15 2-23 12";
        const string KirjaD1 = "M0 0L18 2L33-2L35 21L18 24L1 20Z";
        const string KirjaD2 = "M18 2v22m-13-17l9 1m-9 4l9 1m8-6l7-2m-7 8l8-2";
        const string SydanD = "M0 10C-20-2-9-17 0-7C9-17 20-2 0 10Z";
        const string TahtiD = "M0 0l3 5 6 1-5 4 1 6-5-3-5 3 1-6-5-4 6-1Z";
        const string VihaD = "M0 0q8 0 8-8m5 8q0-8 8-8m-21 13q8 0 8 8m5-8q0 8 8 8";
        const string TuuliD = "M0 0q40-15 65 0m-77 14q24-5 45 0m-24 15q24-5 42 0";
        const string SadeD = "M0 0l-3 7";
        const string LumiD = "M-3 0h6m-3-3v6";
        const string AurinkoSateetD = "M0 0v-5m0 34v5m-17-17h-5m34 0h5";
        const string PilviD = "M0 0q-5-14 9-15q10-17 22-2q20-5 21 17Z";
        const string PilviPolyD = "M-21-31q-18-6-21 6q-16 1-13 13q-12 7 1 15q10 8 23 1q13 7 23-1q10-8-1-15q3-12-12-13q-2-6-10-7";
        const string VauhtiD = "M-62-20h27M-72-7h35M-59 7h25";
        const string PolloD = "M0 3L4-3L11 2L20-3L23 3V23Q12 35 0 23Z";
        const string PolloNokkaD = "M9 15h6l-3 5Z";
        const string ViivaD = "M94 303H152";
        const string SivunReunatD = "M1-3Q12-5 22 1Q33-5 42-4L43 2Q32 1 22 7Q11 2 1 2Z";
        const string Kansi1D = "M0 0Q12 0 22 6L23 30Q12 24 2 23Z";
        const string Kansi2D = "M22 6Q33 0 44-2L46 22Q33 23 23 30Z";
        const string SelkaD = "M22 6L23 30";
        const string KansiKuvioD = "M4 5Q11 5 18 9L19 24Q11 20 5 20Z M27 9Q34 5 40 4L42 18Q34 19 28 23Z";
        const string KansiMerkkiD = "M34 10l3 3-2 4-3-3Z";
        // Tekstien (Georgia) viivakorvikkeet.
        const string KysymysD = "M1.6-11.4q0-4.1 4-4.1q4 0 4 3.6q0 2.4-2.8 3.8q-1.4.8-1.4 3.4";
        const string PieniZetaD = "M.6-7.4h6.2l-6.2 7.4h6.4";
        const string IsoZetaD = "M.3-10.4h7.8l-7.8 10.4h8.1";

        // --- julkinen koonti ---------------------------------------------------------

        /// <summary>Kokoaa ruudun primitiivit tilasta (livianUusiPelitila + livianUusiPelikuva).</summary>
        public void Kokoa(LiviaTila t, float aikaMs)
        {
            K.Tyhjenna();
            KyparaIndeksi = -1;
            Ylivuoto = false;
            float right = Mathf.Max(0, float.IsNaN(t.Oikealle) ? 0 : t.Oikealle);
            Leveys = 152 + right;
            string id = LiviaEleet.Olemassa(t.Ele) ? t.Ele : "blink";
            float voima = t.Voimakkuus >= 0 ? t.Voimakkuus : LiviaAsennot.Voima(id);
            float p = LiviaEleet.Olemassa(t.Ele) ? t.P : 0;
            LiviaAsennot.UusiPelitila(s, rata, id, p, voima, t.CueKestoMs, t.Toistonopeus);

            // Kuuntelu (gazeUp) ja lehden lasit kuten livia-eleet.js piirraNyt/piirra.
            if (t.KatseYlos && !s.Lentaa && !s.Kavelee) { s.GazeUp = true; s.Glasses = 0; }
            if (t.Lasit >= 0) s.Glasses = Mathf.Clamp01(t.Lasit);
            // Nokan puherytmi: sama suojaehto kuin webissä (ei lennossa, kävellessä, sivussa tai ilmeissä, joissa nokka on jo auki).
            bool sisalto = id == "cityExplain";
            if (t.Puhe >= 0 && !s.Lentaa && (!s.Kavelee || sisalto) && (s.X == 0 || sisalto) && s.Y < 5
                && s.Frame != "shock" && s.Frame != "puff" && s.Frame != "cover" && s.Frame != "preen"
                && s.Frame != "chew" && s.Frame != "chewManic" && s.Frame != "yawn")
                s.Mouth = LiviaAsennot.PuheSuu(t.Puhe);
            s.PropsRight = t.RekvisiittaOikealla;
            s.CompactExplain = t.Kapea;
            s.Astronautti = t.Astronautti;
            float leiju = Rajaa(t.Leiju);
            if (leiju > 0)
            {
                s.HoverHeight = leiju;
                s.HoverPhase = float.IsNaN(t.LeijuVaihe) ? aikaMs / 180f : t.LeijuVaihe;
            }
            if (s.UusiPiirto != null && !s.Astronautti && !(s.HoverHeight > 0))
            {
                s.UusiPiirto = rata;
                KokoaKasin(rata, t.Hengitys);
            }
            else
            {
                // Varapiirto (astronautti, leijunta): livianSvgKuva ilman uutta rataa.
                if (s.UusiPiirto != null) s.UusiPiirto = null;
                KokoaSvg(right, t.Hengitys);
            }
        }

        // --- livianSvgMalli -----------------------------------------------------------

        static bool Liikkuva(string id) => id == "arrive" || id == "crash" || id == "emerge" || id == "leaveDown" || id == "handoff" || id == "peek"
            || id == "owl" || id == "flyAway" || id == "flyBack" || id == "clumsyLand" || id == "glassCrash" || id == "walkRight" || id == "walkBack" || id == "leaveRight";

        void Malli(float right)
        {
            string id = s.Ele ?? "";
            float p = Rajaa(s.P), strength = Rajaa(s.Voimakkuus);
            float gate = LiviaAsennot.Gate(p);
            bool moving = s.Lentaa || s.Kavelee || Liikkuva(id);
            float lean = !moving && LiviaAsennot.OnTunne(id) ? strength * gate : 0;
            m.Id = id; m.P = p; m.Strength = strength; m.Gate = gate; m.Lean = lean;
            m.HeadScale = 1 / (1 - .48f * lean); m.BodyLean = -9 * lean;
            m.X = 128 + s.X * 4; m.Y = 302 + (moving ? s.Y * 4 : 0); m.HeadX = 0; m.HeadY = moving ? 0 : s.Y * 2;
            m.HeadAngle = s.Tilt * (3 + 5 * strength); m.Scale = .56f; m.Angle = 0; m.Squash = 1; m.Visible = true;
            m.Flight = s.Lentaa; m.Walking = s.Kavelee; m.Mirror = s.WalkDir == 1; m.Face = s.Frame ?? "rest"; m.Wing = "fold"; m.WingAmount = 0;
            m.Step = float.NaN; m.Hover = false; m.HoverHeight = m.HoverPhase = m.GroundY = 0; m.Rata = s.KatseluRata;

            if (id == "bunFeast" && s.FeastPhase != null && s.FeastHop != 0) { m.Y -= 7 * Mathf.Abs(s.FeastHop); m.Angle = 2.5f * Mathf.Sin(p / .2f * PI * 2); }
            if (id == "mapPeck" && s.OnMapPeck)
            {
                // Nokkaisu syntyy kaulan ja pään liikkeestä; jalat ja ankkuri pysyvät.
                float amount = Rajaa(s.MapPeckAmount);
                m.HeadY = 16.1f * amount; m.HeadAngle = -65 * amount; m.BodyLean = 4 * amount;
            }
            if (id == "cityExplain" && s.OnCity)
            {
                float amount = Rajaa(s.CityAmount), reach = s.CompactExplain ? 28 : 52;
                if (amount > 0)
                {
                    float stride = p < .5f ? p / .20f : (1 - p) / .20f;
                    m.X = 128 - reach * amount;
                    m.Walking = p < .20f || p > .80f;
                    m.Step = Mathf.Sin(Rajaa(stride) * PI * 2) * Mathf.Min(1, amount * 2);
                    float gesture = Rajaa(s.CityGesture);
                    m.HeadAngle = 2 * Mathf.Sin(p * PI * 2) * gesture;
                    m.BodyLean = -1.5f * gesture;
                }
            }
            if (s.Kavelee)
            {
                float t = s.WalkDir == 1 ? s.WalkT : 1 - s.WalkT;
                m.X = 128 + (right + 96) * t; m.Y = 302 - 2 * Mathf.Sin(p * PI * 14);
                if (t >= 1) m.Visible = false;
            }
            if ((id == "arrive" || id == "crash" || id == "owl" || id == "leaveRight") && !s.Lentaa && !s.Kavelee)
            {
                float edge = id == "arrive" ? 1 - Ease((p - .08f) / .46f) : id == "crash" ? 1 - Ease((p - .05f) / .24f) : Rajaa(s.X / 24);
                m.X = 128 + (right + 100) * edge;
            }
            if (id == "leaveRight" && p >= 1) m.Visible = false;
            if (id == "flyAway" && p > 0) m.Mirror = true;
            if (s.Lentaa)
            {
                string kind = s.FlightKind;
                float t = Rajaa(s.FlightT);
                m.Face = "rest"; m.Wing = "flap"; m.WingAmount = Mathf.Sin(p * PI * 22);
                if (kind == "away" || kind == "back")
                {
                    float near = kind == "away" ? 1 - t : s.FlightNear ? .45f + .55f * t : t;
                    m.X = (152 + right - 8) * (1 - near) + 128 * near; m.Y = 25 * (1 - near) + 284 * near;
                    m.Scale = .56f * Mathf.Max(.018f, near); m.Angle = (1 - near) * -20;
                    if ((kind == "away" && t >= 1) || (kind == "back" && t <= 0)) m.Visible = false;
                }
                else if (kind == "trailerAway")
                {
                    float near = 1 - t;
                    m.X = 128 - 72 * t; m.Y = 284 - 205 * t - 32 * Mathf.Sin(PI * t); m.Scale = .56f * Mathf.Max(.06f, near); m.Angle = -18 * t; m.Face = "shock";
                    if (t >= 1) m.Visible = false;
                }
                else if (kind == "trailerBack")
                {
                    m.X = 56 + 72 * t; m.Y = 79 + 223 * t - 22 * Mathf.Sin(PI * t); m.Scale = .034f + .526f * t; m.Angle = -18 * (1 - t); m.Face = t < .72f ? "glance" : "smug";
                }
                else if (kind == "chatDashOut" || kind == "chatDashBack")
                {
                    float d = right + 96; bool back = kind == "chatDashBack";
                    m.X = 128 + d * (back ? 1 - t : t); m.Y = 302; m.Scale = .56f; m.Angle = t == 1 && back ? 0 : (back ? 1 - t : t) * -8; m.Mirror = !back;
                    if ((kind == "chatDashOut" && t >= 1) || (kind == "chatDashBack" && t <= 0)) m.Visible = false;
                    if (kind == "chatDashBack" && t >= 1) { m.Wing = "fold"; m.WingAmount = 0; }
                }
                else if (kind == "glass")
                {
                    m.X = 128; m.Y = 25 + 230 * t; m.Scale = .015f + .55f * t + .16f * Ease((t - .68f) / .32f); m.Face = t > .8f ? "shock" : "front";
                }
                else if (kind == "splat")
                {
                    m.X = 123; m.Y = 271 + 140 * Ease((t - .3f) / .7f); m.Scale = .70f; m.Squash = .57f; m.Face = "fluster"; m.Wing = "spread"; m.WingAmount = 1;
                }
                else if (kind == "opening")
                {
                    // Kiireinen mutta luettava perspektiivikaari; lopussa kahden askeleen haparointi.
                    float u = Rajaa(t / .78f);
                    m.X = 26 + (128 - 26) * u; m.Y = 38 + (302 - 38) * u - 48 * Mathf.Sin(PI * u);
                    m.Scale = .07f + .49f * u; m.Angle = -20 * (1 - u) + 8 * Mathf.Sin(PI * u);
                    if (t > .78f)
                    {
                        float land = (t - .78f) / .22f, wobble = Mathf.Sin(land * PI * 2) * (1 - land);
                        m.X = 128 + 4 * Mathf.Sin(land * PI * 4) * (1 - land); m.Y = 302 - 3 * Mathf.Abs(Mathf.Sin(land * PI * 2)) * (1 - land);
                        m.Angle = 8 * wobble; m.Squash = 1 - .08f * Mathf.Max(0, Mathf.Sin(land * PI));
                        m.Face = land < .62f ? "fluster" : "smug"; m.Wing = land < .48f ? "spread" : "fold"; m.WingAmount = land < .48f ? .35f * (1 - land) : 0;
                        m.Walking = true; m.Step = Mathf.Sin(land * PI * 4) * (1 - land);
                    }
                }
            }
            if (!s.Lentaa)
            {
                string f = s.Frame;
                if (f == "wing") m.Wing = "shade";
                else if (f == "cover") m.Wing = "cover";
                else if (f == "preen") m.Wing = "preen";
                else if ((id == "expert" || id == "present" || id == "welcome") && gate > .01f) m.Wing = id == "welcome" ? "shrug" : "point";
                else if (id == "scratch" && gate > .01f) m.Wing = "scratch";
                else if (id == "eyeRub" && gate > .01f) m.Wing = p > .30f && p < .68f ? "rubEyes" : "liftGlasses";
                else if (id == "glasses" && (p < .34f || p > .76f) && gate > .01f) m.Wing = "shy";
                else if (id == "angry" && gate > .01f) m.Wing = "spread";
                else if ((id == "disbelief" || id == "confused") && gate > .01f) m.Wing = "shrug";
                else if ((id == "embarrassed" || id == "facepalm") && gate > .01f) m.Wing = "shy";
                else if ((id == "bread" || id == "manic") && s.SideKind != null) m.Wing = s.PropsRight ? "reachRight" : "reach";
                else if (id == "bunFeast" && s.FeastPhase != null) m.Wing = s.FeastPhase == "squeal" ? "spread" : s.FeastPhase == "bite" ? "reach" : "fold";
                else if (f == "shock") m.Wing = "spread";
                m.WingAmount = gate * (.25f + .75f * strength);
                if (m.Wing == "shade" || m.Wing == "cover" || m.Wing == "preen") m.WingAmount = 1;
            }
            if (id == "cityExplain" && s.OnCity && (s.CityPoint > 0 || s.CityOpen > 0))
            {
                float point = Rajaa(s.CityPoint), open = Rajaa(s.CityOpen);
                m.Wing = point > 0 ? "point" : "shrug";
                m.WingAmount = Mathf.Max(point, open) * (.45f + .35f * strength);
            }
            if (id == "chatDustOff" && p > 0 && p < 1)
            {
                float dustGate = Ease(p / .12f) * (1 - Ease((p - .82f) / .18f));
                m.Wing = "spread"; m.WingAmount = dustGate * (.58f + .16f * Mathf.Sin(p * PI * 14));
                m.Angle = dustGate * Mathf.Sin(p * PI * 18) * 2.4f;
            }
            float hoverHeight = Rajaa(s.HoverHeight);
            if (hoverHeight > 0)
            {
                m.Hover = true; m.HoverHeight = hoverHeight; m.HoverPhase = s.HoverPhase; m.GroundY = m.Y;
                m.Y -= hoverHeight * (12 + 2 * Mathf.Sin(s.HoverPhase));
                m.Wing = "flap"; m.WingAmount = .5f + .5f * Mathf.Sin(s.HoverPhase);
            }
            if (id == "wind") m.BodyLean += 8 * gate;
            // Uusi liikerata: pää johtaa, vartalo ja siivet perässä.
            if (m.Rata != null)
            {
                m.HeadX = m.Rata.PaaX; m.HeadY += m.Rata.PaaY;
                m.HeadAngle += m.Rata.PaaKulma; m.BodyLean += m.Rata.Rinta;
            }
        }

        // --- livianSvgKuva -------------------------------------------------------------

        void KokoaSvg(float right, float lisaHengitys)
        {
            Malli(right);
            Ylivuoto = s.FlightKind == "opening";
            float groundY = m.Hover ? m.GroundY : m.Y;
            float contact = m.Visible && !s.Lentaa && !s.Line && groundY <= 304 ? Rajaa((groundY - 290) / 12) : 0;
            if (m.Visible)
            {
                if (contact > 0)
                {
                    float h = m.HoverHeight;
                    K.Varjo(m.X, 301, 19 * (1 - .45f * h), 2.8f, VarjoVari, contact * (1 - .65f * h));
                }
                Lintu(lisaHengitys);
                Rekvisiitta();
            }
            ChatVauhti();
            ChatPolyt();
            if (!float.IsNaN(s.OwlX))
            {
                float ox = 128 + (right + 80) * s.OwlX / 24;
                K.Ryhma(Affiini.Yksikko.Siirra(ox - 14, 267));
                K.Tayta(PolloD, Pollo);
                K.TaytaEllipsi(7, 10, 5, 5, PolloVaalea); K.TaytaEllipsi(17, 10, 5, 5, PolloVaalea);
                K.TaytaEllipsi(7, 10, 2, 2, Pollo); K.TaytaEllipsi(17, 10, 2, 2, Pollo);
                K.Tayta(PolloNokkaD, PolloVaalea);
                K.Loppu();
            }
            if (s.Line) K.Viiva(ViivaD, Viiva, 1.3f);
        }

        void Lintu(float lisaHengitys)
        {
            var r = m.Rata;
            string paaFrame = m.Mirror ? "left" : m.Face;
            float down = s.Frame == "sleep" ? 10 : s.Frame == "preen" ? 8 : 0;
            float hengitys = (r != null ? r.Hengitys : 0) + lisaHengitys;
            K.Ryhma(Affiini.Yksikko.Siirra(m.X, m.Y).Kierra(m.Angle).Skaalaa(m.Scale * (m.Mirror ? -1 : 1), m.Scale * m.Squash).Siirra(-108, -188));
            Jalat();
            Siipi(false);
            // Vartalo: jalkojen ankkuri pysyy, rinta kallistuu.
            K.Ryhma(hengitys != 0
                ? Affiini.Yksikko.Siirra(109, 177).Kierra(m.BodyLean).Skaalaa(1 - hengitys * .025f, 1 + hengitys * .055f).Siirra(-109, -177)
                : Affiini.Yksikko.Kierra(m.BodyLean, 109, 177));
            Vartalo();
            K.Loppu();
            float headX = -8 * m.Lean + (r != null ? m.HeadX : 0);
            float headY = 8 * m.Lean + down + m.HeadY;
            K.Ryhma(Affiini.Yksikko.Siirra(headX, headY).Kierra(m.HeadAngle, 105, 146).Siirra(105, 146).Skaalaa(m.HeadScale).Siirra(-105, -146));
            K.Ryhma(Affiini.Yksikko.Siirra(44, 61).Skaalaa(1, .87f));
            LiviaPaa.Piirra(K, paaFrame, s.Mouth, s.Phase, s.GazeUp, s.Glasses, s.GlassesLift, m.Lean, m.Strength);
            if (s.Astronautti) { KyparaIndeksi = K.Osat.Count; KyparaMatriisi = K.Nyt; }
            K.Loppu();
            K.Loppu();
            Siipi(true);
            K.Loppu();
        }

        void Vartalo()
        {
            K.Tayta(VartaloD1, Vartalo1);
            K.Tayta(VartaloD2, Vartalo2);
            K.Tayta(VartaloD3, Vartalo3);
            K.Tayta(VartaloD4, Vartalo4);
        }

        void Jalat()
        {
            float step = m.Walking ? (float.IsNaN(m.Step) ? Mathf.Sin(m.P * PI * 14) : m.Step) : 0;
            float tuck = m.Hover ? m.HoverHeight : 0, leg = 8 - 5 * tuck, toes = 1 - .72f * tuck;
            void Jalka(float x, float dy)
            {
                K.Alku();
                K.M(x, 177 + dy - 3 * tuck); K.Lr(-1, leg);
                K.Mr(0, 0); K.Lr(-7 * toes, 2 * toes);
                K.Mr(7 * toes, -2 * toes); K.Lr(5 * toes, 3 * toes);
                K.Mr(-5 * toes, -3 * toes); K.Lr(toes, 3 * toes);
                K.ViivaDyn(JalkaVari, 2.1f);
            }
            Jalka(99, step * 5);
            Jalka(118, -step * 5);
        }

        static Affiini SiipiMuunnos(float anchor, float shift, float flip, float angle) =>
            Affiini.Yksikko.Siirra(anchor, 143 + shift).Skaalaa(flip, 1).Kierra(angle);

        /// <summary>lvBird: wing(side) — leijunnan ristihäive ja uuden radan jälkiliike.</summary>
        void Siipi(bool lahi)
        {
            float anchor = lahi ? 121 : 88;
            var r = m.Rata;
            float maara = r == null || m.Flight ? 0 : Rajaa(lahi ? r.Siipi : r.Takasiipi);
            if (maara < .001f) { Perus(lahi); return; }
            float sulka = Rajaa(r.Sulat), ero = lahi ? maara - sulka : 0;
            // Tarkat käsieleet (peitto, kurotus, sääsuoja, osoitus) saavat vain pienen jälkiliikkeen.
            if (m.Wing != "fold")
            {
                K.Ryhma(Affiini.Yksikko.Kierra(ero * 9, anchor, 143));
                Perus(lahi);
                K.Loppu();
                return;
            }
            float vaihto = Rajaa(maara / .14f);
            K.Ryhma(1 - vaihto); Perus(lahi); K.Loppu();
            K.Ryhma(vaihto); KatseluSiipi(lahi, maara, maara - ero); K.Loppu();
        }

        void Perus(bool lahi)
        {
            if (m.Hover)
            {
                K.Ryhma(1 - m.HoverHeight); Siipi("fold", lahi, 0, 0); K.Loppu();
                K.Ryhma(m.HoverHeight); Siipi(m.Wing, lahi, m.WingAmount, m.P * 12); K.Loppu();
            }
            else Siipi(m.Wing, lahi, m.WingAmount, m.P * 12);
        }

        /// <summary>lvWing.</summary>
        void Siipi(string kind, bool lahi, float amount, float phase)
        {
            if ((kind == "rubEyes" || kind == "liftGlasses") && lahi)
            {
                float dx = kind == "rubEyes" ? Mathf.Sin(phase * 3) * 2 : 0, dy = kind == "rubEyes" ? Mathf.Cos(phase * 3) * 1.2f : -12;
                K.Ryhma(Affiini.Yksikko.Siirra(dx, dy));
                K.Tayta(HieroD1, SiipiLahi);
                K.Viiva(HieroD2, SiipiViiva, 2.2f);
                K.Loppu();
                return;
            }
            float anchor = lahi ? 121 : 88, flip = lahi ? 1 : -1, angle = 0;
            bool raised = false;
            if (kind == "flap") { angle = 25 + amount * 65; raised = true; }
            if (kind == "spread") { angle = 38 + amount * 35 + Mathf.Sin(phase * 6) * amount * 8; raised = true; }
            if (kind == "shrug") { angle = 34 + amount * 20; raised = true; }
            if (kind == "point" && lahi) { angle = -12; raised = true; }
            if (kind == "scratch" && lahi) { angle = -76 + Mathf.Sin(phase * 4) * 9; raised = true; }
            if (lahi && (kind == "shade" || kind == "cover" || kind == "shy" || kind == "preen" || kind == "reach" || kind == "reachRight"))
            {
                angle = kind == "shade" ? -67 : kind == "reachRight" ? 80 : kind == "reach" ? -110 : kind == "preen" ? -115 : -78;
                raised = true;
            }
            if (!raised)
            {
                if (lahi) Taitettu();
                return;
            }
            float shift = kind == "scratch" ? -44 : kind == "shade" ? -55 : kind == "cover" ? -38 : kind == "shy" ? -16 : 0;
            K.Ryhma(SiipiMuunnos(anchor, shift, flip, angle));
            SiipiMuoto(lahi);
            K.Loppu();
        }

        void Taitettu()
        {
            K.Tayta(TaitettuD1, SiipiTaitettu);
            K.Tayta(TaitettuD2, SiipiTaitettu2);
        }

        void SiipiMuoto(bool lahi)
        {
            K.Tayta(SiipiD, lahi ? SiipiLahi : SiipiKauko);
            K.Viiva(SiipiSulatD, SiipiViiva, 3.7f);
        }

        /// <summary>lvKatseluSiipi: taitetusta avautuva siipi uuden radan määrällä.</summary>
        void KatseluSiipi(bool lahi, float maara, float sulka)
        {
            float kulma = 165 - 119 * maara + (maara - sulka) * 12;
            K.Ryhma(SiipiMuunnos(lahi ? 121 : 88, 0, lahi ? 1 : -1, kulma).Skaalaa(.55f + .45f * maara, .35f + .65f * maara));
            SiipiMuoto(lahi);
            K.Loppu();
        }

        // --- lvProps ---------------------------------------------------------------------

        void Rekvisiitta()
        {
            float x = m.X, y = m.Y;
            var r = m.Rata;
            bool pulla = r != null && !float.IsNaN(r.Pulla);
            if (m.Id == "bunFeast" && s.FeastPhase == "bite" && !pulla)
            {
                float grab = Rajaa(s.FeastGrab);
                int bites = Mathf.Clamp(s.FeastBites, 0, 3);
                float bx = 76 + 23 * grab, by = 286 - 35 * grab, scale = 1 - bites * .105f;
                // Jokainen puraisu etenee sisäänpäin, ei jo syödyn reunan ulkopuolelle.
                K.Ryhma(Affiini.Yksikko.Siirra(bx, by).Skaalaa(scale));
                K.MaskiAlkaa();
                if (bites > 0) K.Puraisu(16, -6, 7);
                if (bites > 1) K.Puraisu(12, 5, 7);
                if (bites > 2) K.Puraisu(5, -4, 7);
                K.TaytaEllipsi(0, 0, 19, 13, Pulla1);
                K.Tayta(PullaD, Pulla2);
                K.Viiva(PullaViivaD, Pulla3, 2);
                K.MaskiLoppu();
                K.Loppu();
                if (bites > 0)
                {
                    float huippu = bites == 1 ? .34f : bites == 2 ? .48f : .62f;
                    float burst = Rajaa(1 - Mathf.Abs((s.P - huippu) / .035f));
                    K.Ryhma(burst);
                    for (int i = 0; i < 3; i++) K.TaytaKohtaan(MuruD, 91 + i * 7, 250 + Mathf.Sin(i * 2.1f) * 4 + burst * 8, Muru);
                    K.Loppu();
                }
            }
            if (s.SideKind == "bread" && !pulla)
            {
                float bx = s.PropsRight ? x + 12 : x - 80 + s.SideX * 2, by = y - 50 + s.SideY * 1.5f;
                K.Ryhma(Affiini.Yksikko.Siirra(bx, by).Skaalaa(s.PropsRight ? .62f : 1));
                K.MaskiAlkaa();
                if (s.SideBite) { K.Puraisu(35, -11, 7); K.Puraisu(41, 0, 7); }
                K.Tayta(LeipaD1, Muru);
                K.TaytaEllipsi(20, 1, 18, 13, Leipa2);
                K.Viiva(LeipaD3, Leipa3, 2.5f);
                K.MaskiLoppu();
                K.Loppu();
            }
            if (pulla)
            {
                float p = Rajaa(r.Pulla);
                float lift = Ease((p - .12f) / .18f) * (1 - Ease((p - .79f) / .13f));
                float bx = 79 + 2 * lift, by = 290 - 32 * lift;
                float show = Ease(p / .055f) * (1 - Ease((p - .88f) / .09f));
                int bites = m.Id == "bunFeast" ? Mathf.Clamp(s.FeastBites, 0, 3) : (p > .36f ? 2 : p > .27f ? 1 : 0);
                float scale = 1 - bites * .095f;
                // Siipi tavoittaa pullan ennen nostoa ja kannattelee sitä nokan alla.
                float wing = Rajaa((p - .075f) / .14f) * (1 - Ease((p - .83f) / .13f));
                K.Ryhma(wing);
                K.Alku();
                K.M(x - 1, y - 30); K.Q(x - 16, y - 36, bx + 10, by + 7); K.Q(bx + 3, by + 12, bx + 4, by + 5); K.Q(x - 16, y - 26, x - 1, y - 30); K.Z();
                K.TaytaJaViivaDyn(SiipiLahi, SiipiViiva, 1.2f);
                K.Loppu();
                K.Ryhma(Affiini.Yksikko.Siirra(bx, by).Skaalaa(scale), show);
                K.MaskiAlkaa();
                if (bites > 0) K.Puraisu(15, -5, 6);
                if (bites > 1) K.Puraisu(12, 4, 6);
                if (bites > 2) K.Puraisu(4, -4, 6);
                K.TaytaEllipsi(0, 0, 15, 11, Pulla1);
                K.Tayta(PienPullaD, Pulla2);
                K.Viiva(PienPullaViivaD, Pulla3, 1.5f);
                K.MaskiLoppu();
                K.Loppu();
            }
            if (r != null && r.MapContact > 0)
            {
                float cx = x - 34 + (r.MapPeckNumber == 2 ? 3 : 0);
                K.Ryhma(Rajaa(r.MapContact));
                K.Alku();
                K.M(cx - 8, 301); K.Qr(-3, -2, -4, -4); K.Mr(cx + 16, 4); K.Qr(3, -2, 4, -4);
                K.ViivaDyn(Kosketus, 1.1f);
                K.Alku(); K.Ellipsi(cx, 302, 8, 1.3f); K.ViivaDyn(Kosketus, 1.1f);
                K.Loppu();
            }
            if (!float.IsNaN(s.CrumbY)) K.TaytaKohtaan(MuruYD, x - 34, y - 36 + (s.CrumbY - 35) * 4, Muru);
            if (s.SideKind == "pfft") K.ViivaKohtaan(PffD, x - 47, y - 46, Pff, 1.6f);
            float fy = y - 108; int phase = s.Phase;
            if ((m.Id == "reading" && m.Gate > .1f) || m.Id == "bookStudy")
            {
                K.Ryhma(Affiini.Yksikko.Siirra(x - 66, y - 33).Kierra(-12 + s.PageTurn * 3));
                K.Tayta(KirjaD1, Kirja1);
                K.Viiva(KirjaD2, Kirja2, 1, false);
                if (s.PageTurn != 0)
                {
                    K.Alku(); K.M(18, 2); K.Qr(9 * s.PageTurn, 9, 0, 22); K.ViivaDyn(Kirja3, 1, false);
                }
                K.Loppu();
            }
            if (s.Fx == "hearts")
                for (int i = 0; i < 2; i++)
                {
                    K.Ryhma(Affiini.Yksikko.Siirra(x - 42 + i * 38, fy - (phase + i) % 3 * 5).Skaalaa(.7f));
                    K.Tayta(SydanD, Sydan);
                    K.Loppu();
                }
            if (s.Fx == "stars" || s.FlightKind == "splat")
                for (int i = 0; i < 3; i++) K.TaytaKohtaan(TahtiD, x - 36 + i * 29, fy - 5 + i % 2 * 9, Tahti);
            if (s.Fx == "dots" || s.Fx == "question" || s.Fx == "z") Teksti(x - 20, fy - 4, s.Fx, phase);
            if (s.Fx == "anger") K.ViivaKohtaan(VihaD, x - 31, fy - 11, Viha, 2.5f);
            if (s.Fx == "wind") K.ViivaKohtaan(TuuliD, x - 105, y - 86, Tuuli, 1.5f, false);
            if (s.Fx == "sun")
            {
                K.Alku(); K.Ellipsi(x - 57, fy - 7, 10, 10); K.TaytaJaViivaDyn(Aurinko2, Aurinko, 1.5f);
                K.ViivaKohtaan(AurinkoSateetD, x - 57, fy - 24, Aurinko, 1.5f, false);
            }
            if (s.Fx == "rain" || s.Fx == "snow")
            {
                K.TaytaKohtaan(PilviD, x - 68, fy - 22, Pilvi);
                for (int i = 0; i < 6; i++)
                {
                    float px = x - 68 + i * 9, py = fy - 9 + ((phase * 5 + i * 17) % 47);
                    if (s.Fx == "rain") K.ViivaKohtaan(SadeD, px, py, Sade, 1.5f, false);
                    else K.ViivaKohtaan(LumiD, px, py, Lumi, 1.5f, false);
                }
            }
        }

        /// <summary>SVG-tekstin (Georgia) viivakorvike: "." … "...", "?" tai "z Z" perusviivalle (x, y).</summary>
        void Teksti(float x, float y, string fx, int phase)
        {
            if (fx == "dots")
            {
                // 22 px: piste ≈ 3,2 px, askel ≈ 6 px.
                for (int i = 0; i < phase % 3 + 1; i++) K.TaytaEllipsi(x + 1.6f + i * 6f, y - 1.6f, 1.6f, 1.6f, TekstiVari);
            }
            else if (fx == "question")
            {
                K.ViivaKohtaan(KysymysD, x, y, TekstiVari, 1.9f);
                K.TaytaEllipsi(x + 5.2f, y - 1.3f, 1.4f, 1.4f, TekstiVari);
            }
            else
            {
                // 16 px: "z" x-korkeus ≈ 7,5, väli ≈ 4, "Z" ≈ 11.
                K.ViivaKohtaan(PieniZetaD, x, y, TekstiVari, 1.4f, false);
                K.ViivaKohtaan(IsoZetaD, x + 11.2f, y, TekstiVari, 1.5f, false);
            }
        }

        void ChatVauhti()
        {
            if (s.FlightKind != "chatDashOut" || s.P <= .1f || s.P >= 1) return;
            float opacity = Rajaa((s.P - .1f) / .15f) * (1 - Ease((s.P - .72f) / .28f));
            if (opacity <= 0) return;
            K.Ryhma(Affiini.Yksikko.Siirra(128, 302), opacity);
            K.TaytaJaViiva(PilviPolyD, PilviPoly, PilviReuna, 1.4f, true);
            K.Viiva(VauhtiD, Vauhti, 2);
            K.Loppu();
        }

        void ChatPolyt()
        {
            if (s.Ele != "chatDustOff" || s.P <= .08f || s.P >= .92f) return;
            float opacity = Ease((s.P - .08f) / .14f) * (1 - Ease((s.P - .72f) / .20f));
            float spread = 8 + 24 * Ease((s.P - .08f) / .70f);
            K.Ryhma(Affiini.Yksikko.Siirra(128, 302), opacity);
            K.TaytaEllipsi(-28 - spread, -34, 3.2f, 3.2f, Poly);
            K.TaytaEllipsi(25 + spread, -45, 2.4f, 2.4f, Poly);
            K.TaytaEllipsi(-18 - spread * .6f, -68, 1.8f, 1.8f, Poly);
            K.Alku(); K.M(31 + spread * .7f, -67); K.Lr(3, -2); K.Mr(-(65 + spread * 1.4f), 12); K.Lr(-3, -2);
            K.ViivaDyn(PolyHiukkanen, 1.5f);
            K.Loppu();
        }

        // --- uudenEleenKuva (käsin piirretyt versiot) -----------------------------------------

        void KokoaKasin(LiviaRata r, float lisaHengitys)
        {
            K.Varjo(128, 301, 19, 2.8f, VarjoVari, 1);
            K.Ryhma(Affiini.Yksikko.Siirra(128, 302).Skaalaa(.56f).Siirra(-108, -188));
            K.Viiva(JalkaKasinD99, JalkaVari, 2.1f);
            K.Viiva(JalkaKasinD118, JalkaVari, 2.1f);
            KasinSiipi(r, true);
            float h = r.Hengitys + lisaHengitys;
            K.Ryhma(h != 0
                ? Affiini.Yksikko.Siirra(109, 177).Kierra(r.Rinta).Skaalaa(1 - h * .07f, 1 + h * .16f).Siirra(-109, -177)
                : Affiini.Yksikko.Kierra(r.Rinta, 109, 177));
            Vartalo();
            K.Loppu();
            K.Ryhma(Affiini.Yksikko.Siirra(r.PaaX, r.PaaY).Kierra(r.PaaKulma, 105, 146));
            K.Ryhma(Affiini.Yksikko.Siirra(44, 61).Skaalaa(1, .87f));
            string ilme = r.BaseId == "chuckle" || r.BaseId == "grin" ? "grin" : r.BaseId == "yawn" ? "yawn" : r.BaseId == "disbelief" ? "disbelief"
                : r.BaseId == "doubleTake" ? "shock" : r.BaseId == "welcome" ? "smile" : r.BaseId == "bookStudy" ? "down" : "rest";
            LiviaPaa.PiirraKasin(K, ilme, r.Ilme, r.Katse, r.Rapaytys, r.BaseId == "bookStudy");
            K.Loppu();
            K.Loppu();
            KasinSiipi(r, false);
            if (r.BaseId == "bookStudy") Kirja(r);
            K.Loppu();
        }

        const string JalkaKasinD99 = "M99 177l-1 8m0 0l-7 2m7-2l5 3m-5-3l1 3";
        const string JalkaKasinD118 = "M118 177l-1 8m0 0l-7 2m7-2l5 3m-5-3l1 3";

        /// <summary>siipi(s, taka): käsin piirretyn version siipi.</summary>
        void KasinSiipi(LiviaRata r, bool taka)
        {
            float t = taka ? r.Takasiipi : r.Siipi, auki = Rajaa(t / .22f);
            bool kirja = r.BaseId == "bookStudy";
            if (t == 0) { if (!taka) Taitettu(); return; }
            // Kirjaan kurotetaan alhaalta rinnan ohi, ei kasvojen poikki.
            bool moikkaus = r.BaseId == "welcome" && !taka;
            float perus = 165 + (kirja ? 75 : moikkaus ? -153 : -112) * t + (r.Sulat - t) * 14;
            float suulle = taka ? 0 : r.Suusiipi, kulma = perus + (-73 - perus) * suulle;
            // Naurun pää nyökkää alas: siipikin laskee suupieleen, ei silmän päälle.
            float suupieli = r.BaseId == "chuckle" ? 10 * suulle : 0;
            if (!taka) { K.Ryhma(1 - auki); Taitettu(); K.Loppu(); }
            K.Ryhma(Affiini.Yksikko.Siirra((taka ? 88 : 121) - (kirja ? 8 : 0) * t, 143 + (kirja ? 2 : 0) * t - (moikkaus ? 14 : 0) * t + suupieli)
                .Skaalaa(taka ? -1 : 1, 1).Kierra(kulma)
                .Skaalaa((.65f + .35f * t) * (1 - .2f * suulle), .5f + (kirja ? .65f : moikkaus ? 1.05f : .5f) * t + .4f * suulle), auki);
            K.Tayta(SiipiD, taka ? SiipiKauko : SiipiLahi);
            K.Viiva(SiipiSulatD, SiipiViiva, 3.7f);
            K.Loppu();
        }

        /// <summary>kirja(s): sivut Pulua kohti, kannet katsojaan päin; siipi kääntää sivun.</summary>
        void Kirja(LiviaRata r)
        {
            float t = r.Sivu, karki = 22 + 21 * Mathf.Cos(t * PI), kaari = -18 * Mathf.Sin(t * PI) - r.Paperi * 2;
            K.Ryhma(Affiini.Yksikko.Siirra(48, 148).Kierra(-10 + r.Paperi * 1.7f));
            K.TaytaJaViiva(SivunReunatD, SivuReuna, SivuViiva, .8f);
            if (t > 0 && t < 1)
            {
                K.Alku();
                K.M(22, 3); K.Q((22 + karki) / 2, kaari, karki, -3); K.L(karki + 1, 20); K.Q((22 + karki) / 2, 19 + kaari * .2f, 22, 27); K.Z();
                K.TaytaJaViivaDyn(Sivu, SivuViiva, .8f);
            }
            K.TaytaJaViiva(Kansi1D, Kansi1, Kansi1V, 1);
            K.TaytaJaViiva(Kansi2D, Kansi2, Kansi2V, 1);
            K.Viiva(SelkaD, Selka, 1.8f, false);
            K.Viiva(KansiKuvioD, KansiKuvio, .65f, false);
            K.Tayta(KansiMerkkiD, KansiMerkki);
            K.Loppu();
        }
    }
}
