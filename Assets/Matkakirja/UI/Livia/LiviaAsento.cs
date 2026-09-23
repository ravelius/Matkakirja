// LIVIAN ASENTO: eleen tila yhdessä ruudussa (Natiivi-UI, 23.9.2026).
//
// Suora siirto verkkopelin asentologiikasta, jonka pikseli- ja SVG-piirto
// jakavat:
//   livianPikseliAsento  (js/livia-pikselit.js)  ilme, siirtymät, rekvisiitta
//   livianSvgAsento      (js/livia-svg.js)       SVG:n lisäeleet (pulla, nokkaisu, selitys …)
//   uudenEleenAsento     (js/livia-uudet-versiot.js) uusi liikerata (pää johtaa,
//                        rinta ja siivet seuraavat viiveellä) ja käsin piirretyt radat
//   livianUusiPelitila   pelin yhdistelmä: kahdeksalla eleellä käsin piirretty
//                        versio (UusiPiirto), muilla vanha asento + KatseluRata.
// Webin olioiden valinnaiset kentät ovat tässä litteinä kenttinä (NaN tai null
// = puuttuu). Tila-oliot kierrätetään ruudusta toiseen: ei varauksia per ruutu.
using System.Collections.Generic;
using System.Globalization;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>Webin asento-olio (livianSvgAsento + pelin lisäkentät).</summary>
    internal sealed class LiviaAsento
    {
        // livianPikseliAsento
        public string Frame, Fx, SideKind, FlightKind;
        public float X, Y, CrumbY, Tilt, OwlX, SideX, SideY, FlightT, WalkT;
        public bool Line, EyesAhead, SideBite, FlightNear;
        public int Phase, WalkDir;
        // livianSvgAsento
        public string Ele, Mouth, FeastPhase;
        public float P, Voimakkuus, FeastHop, FeastGrab;
        public int FeastBites, MapPeckN;
        public bool OnMapPeck, GazeDown, GazeUp, OnCity, CityPitka;
        public float MapPeckAmount, CityAmount, CityPoint, CityOpen, CityGesture, Glasses, GlassesLift, PageTurn;
        // pelin kentät (livia-eleet.js piirra)
        public bool PropsRight, CompactExplain, Astronautti;
        public float HoverHeight, HoverPhase;
        public LiviaRata KatseluRata, UusiPiirto;

        public bool Lentaa => FlightKind != null;
        public bool Kavelee => WalkDir != 0;

        public void Nollaa()
        {
            Frame = "rest"; Fx = null; SideKind = null; FlightKind = null;
            X = Y = Tilt = SideX = SideY = FlightT = WalkT = 0;
            CrumbY = OwlX = float.NaN;
            Line = EyesAhead = SideBite = FlightNear = false;
            Phase = 0; WalkDir = 0;
            Ele = ""; Mouth = null; FeastPhase = null;
            P = Voimakkuus = FeastHop = FeastGrab = 0;
            FeastBites = MapPeckN = 0;
            OnMapPeck = GazeDown = GazeUp = OnCity = CityPitka = false;
            MapPeckAmount = CityAmount = CityPoint = CityOpen = CityGesture = Glasses = GlassesLift = PageTurn = 0;
            PropsRight = CompactExplain = Astronautti = false;
            HoverHeight = HoverPhase = 0;
            KatseluRata = UusiPiirto = null;
        }
    }

    /// <summary>uudenEleenAsento-tulos: uusi liikerata (käsin piirretty tai liikeperheestä).</summary>
    internal sealed class LiviaRata
    {
        public string BaseId;
        /// <summary>Käsin piirretty versio (RADAT): piirretään uudenEleenKuva-tyylillä.</summary>
        public bool Kasin;
        public float P, ToimintaP;
        public float PaaKulma, PaaX, PaaY, Rinta, Siipi, Takasiipi, Sulat, Hengitys;
        public float Katse, Ilme, Rapaytys, Sivu, Paperi, Suusiipi;
        /// <summary>Pullan kannattelu (bread, bunFeast): NaN = ei.</summary>
        public float Pulla;
        public float MapContact;
        public int MapPeckNumber;

        public void Nollaa()
        {
            BaseId = ""; Kasin = false; P = ToimintaP = 0;
            PaaKulma = PaaX = PaaY = Rinta = Siipi = Takasiipi = Sulat = Hengitys = 0;
            Katse = Ilme = Rapaytys = Sivu = Paperi = Suusiipi = 0;
            Pulla = float.NaN; MapContact = 0; MapPeckNumber = 0;
        }
    }

    internal static class LiviaAsennot
    {
        // --- apufunktiot (lvClamp, lvEase, lvGate, lpRamp, lpPulse, lpStep) ------

        public static float Rajaa(float n) => float.IsNaN(n) || float.IsInfinity(n) ? 0f : Mathf.Clamp01(n);
        public static float Ease(float n) { n = Rajaa(n); return n * n * (3 - 2 * n); }
        public static float Gate(float p) => Ease((p - .06f) / .18f) * (1 - Ease((p - .79f) / .18f));
        /// <summary>JS:n Math.round (puolikas ylöspäin).</summary>
        static float Pyorista(float v) => Mathf.Floor(v + .5f);
        static float Ramp(float p, float a, float b, float from, float to) => Pyorista(from + (to - from) * Mathf.Clamp01((p - a) / (b - a)));
        static int Pulse(float p, int n = 8) => (int)Mathf.Floor(p * n) % 2;
        const float PI = Mathf.PI;

        // Porrastaulukot jäsennetään kerran ("aika arvo aika arvo …").
        static readonly Dictionary<string, (float[] Ajat, string[] Arvot)> portaat = new Dictionary<string, (float[], string[])>();

        static (float[] Ajat, string[] Arvot) Portaat(string spec)
        {
            if (portaat.TryGetValue(spec, out var t)) return t;
            var osat = spec.Split(new[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries);
            var ajat = new float[osat.Length / 2];
            var arvot = new string[osat.Length / 2];
            for (int i = 0; i < ajat.Length; i++)
            {
                ajat[i] = float.Parse(osat[2 * i], CultureInfo.InvariantCulture);
                arvot[i] = string.Intern(osat[2 * i + 1]);
            }
            t = (ajat, arvot);
            portaat[spec] = t;
            return t;
        }

        /// <summary>lpStep: viimeinen arvo, jonka aika ≤ p.</summary>
        static string Step(float p, string spec)
        {
            var (ajat, arvot) = Portaat(spec);
            string tulos = arvot[0];
            for (int i = 0; i < ajat.Length; i++) { if (p < ajat[i]) break; tulos = arvot[i]; }
            return tulos;
        }

        static float StepLuku(float p, string spec) => float.Parse(Step(p, spec), CultureInfo.InvariantCulture);

        // --- livianEleenVoima ----------------------------------------------------

        static readonly Dictionary<string, float> tunne = new Dictionary<string, float>
        {
            ["shock"] = 1, ["embarrassed"] = .6f, ["angry"] = .9f, ["bored"] = .3f, ["puff"] = .72f, ["manic"] = 1, ["expert"] = .65f,
            ["disbelief"] = .8f, ["confused"] = .55f, ["happy"] = .65f, ["smile"] = .35f, ["grin"] = .6f, ["chuckle"] = .6f, ["wink"] = .3f,
            ["welcome"] = .35f, ["present"] = .5f, ["glasses"] = .38f, ["love"] = .65f, ["facepalm"] = .6f, ["doubleTake"] = .75f, ["bread"] = .85f,
        };

        /// <summary>Onko ele webin lvEmotion-taulussa (kallistaa päätä kameraa kohti).</summary>
        public static bool OnTunne(string id) => tunne.ContainsKey(id);

        /// <summary>livianEleenVoima(id) ilman tekstiä.</summary>
        public static float Voima(string id) => tunne.TryGetValue(id ?? "", out var v) ? v : .35f;

        // --- livianPikseliAsento -------------------------------------------------

        static bool Tulo(string id) => id == "arrive" || id == "crash" || id == "emerge" || id == "handoff" || id == "flyBack" || id == "clumsyLand" || id == "glassCrash" || id == "walkBack";
        static bool Poistuminen(string id) => id == "leaveRight" || id == "leaveDown" || id == "flyAway" || id == "walkRight";

        // seq(): [[0,'rest'], ...stops, [.94,'rest']]
        static void Seq(LiviaAsento s, float p, string spec) => s.Frame = Step(p, spec);

        public static void PikseliAsento(LiviaAsento s, string id, float p)
        {
            p = Mathf.Clamp01(p);
            s.Nollaa();
            s.Phase = p == 1 ? 0 : (int)Mathf.Floor(p * 12);
            if ((p == 0 && !Tulo(id)) || (p == 1 && !Poistuminen(id))) return;
            switch (id)
            {
                case "blink": Seq(s, p, "0 rest .28 blink .36 rest .52 blink .59 rest .94 rest"); break;
                case "glance": Seq(s, p, "0 rest .15 glance .67 blink .74 rest .94 rest"); break;
                case "turn": Seq(s, p, "0 rest .12 front .25 left .51 front .67 right .81 front .94 rest"); break;
                case "lookRight": Seq(s, p, "0 rest .13 front .26 right .70 front .94 rest"); break;
                case "lookUp":
                case "lookDown":
                    Seq(s, p, id == "lookUp" ? "0 rest .18 up .78 blink .94 rest" : "0 rest .18 down .78 blink .94 rest");
                    s.Y = p > .18f && p < .78f ? (id == "lookUp" ? -2 : 1) : 0;
                    break;
                case "tilt": Seq(s, p, "0 rest .15 confused .76 blink .94 rest"); s.Tilt = p > .24f && p < .65f ? 1 : 0; break;
                case "nod": Seq(s, p, "0 rest .1 front .86 rest .94 rest"); if (p > .18f && p < .76f) s.Y = Pulse(p, 12) != 0 ? 2 : 0; break;
                case "shake": Seq(s, p, "0 rest .13 front .23 left .35 right .47 left .59 right .72 front .94 rest"); break;
                case "doubleTake": Seq(s, p, "0 rest .1 right .27 rest .34 front .42 shock .67 disbelief .94 rest"); break;
                case "shock": Seq(s, p, "0 rest .12 blink .23 shock .66 fluster .84 rest .94 rest"); if (p >= .23f && p < .38f) s.Y = -1; break;
                case "embarrassed": Seq(s, p, "0 rest .12 embarrassed .50 down .62 embarrassed .94 rest"); if (p > .2f && p < .8f) s.Y = 1; break;
                case "angry":
                    Seq(s, p, "0 rest .1 angry .77 blink .85 angry .94 rest");
                    if (p > .25f && p < .60f) { s.Y = -Pulse(p, 15); s.Fx = "anger"; }
                    break;
                case "bored": Seq(s, p, "0 rest .12 bored .42 glance .57 bored .80 blink .94 rest"); break;
                case "puff":
                    Seq(s, p, "0 rest .12 puff .65 talk .72 fluster .85 rest .94 rest");
                    if (p > .25f && p < .64f) s.Y = -Pulse(p, 15);
                    if (p >= .65f && p < .80f) s.SideKind = "pfft";
                    break;
                case "manic":
                    Seq(s, p, "0 rest .12 manic .82 caught .94 rest");
                    if (p > .2f && p < .8f) { s.Y = -Pulse(p, 20); s.SideKind = "bread"; s.SideY = 0; s.SideBite = false; }
                    break;
                case "expert": Seq(s, p, "0 rest .13 smug .54 front .68 smug .94 rest"); if (p > .2f && p < .82f) s.Y = -2; break;
                case "disbelief": Seq(s, p, "0 rest .13 disbelief .51 blink .57 disbelief .8 front .94 rest"); break;
                case "confused":
                    Seq(s, p, "0 rest .15 confused .79 blink .94 rest");
                    if (p > .3f && p < .7f) { s.Tilt = 1; s.Fx = "question"; }
                    break;
                case "happy": Seq(s, p, "0 rest .12 happy .45 chew .53 happy .7 smug .94 rest"); if (p > .3f && p < .6f) s.Y = -Pulse(p, 14); break;
                case "love": Seq(s, p, "0 rest .12 love .78 embarrassed .94 rest"); if (p > .16f && p < .79f) { s.Fx = "hearts"; s.Y = -1; } break;
                case "facepalm": Seq(s, p, "0 rest .12 embarrassed .32 cover .74 embarrassed .94 rest"); break;
                case "talk": s.Frame = Step(p, PuheSpec); break;
                case "listen": Seq(s, p, "0 rest .15 front .36 glance .68 front .94 rest"); s.Tilt = p > .36f && p < .68f ? -1 : 0; break;
                case "think": Seq(s, p, "0 rest .13 up .40 confused .63 up .82 smug .94 rest"); if (p > .22f && p < .75f) s.Fx = "dots"; break;
                case "reading": Seq(s, p, "0 rest .13 down .3 glance .47 down .63 confused .83 blink .94 rest"); s.Y = p > .13f && p < .80f ? 2 : 0; break;
                case "crumb":
                case "bread":
                    Seq(s, p, id == "bread"
                        ? "0 rest .08 manic .22 chew .31 crumb .39 chewManic .46 caught .63 blink .69 caught .74 fluster .86 rest .94 rest"
                        : "0 rest .08 crumb .22 chew .31 crumb .39 chew .46 caught .63 blink .69 caught .74 fluster .86 rest .94 rest");
                    if (p >= .63f && p < .69f) s.Y = -Pulse(p, 60);
                    if (p >= .74f && p < .87f) s.CrumbY = Ramp(p, .74f, .87f, 35, 44);
                    if (id == "bread" && p > .08f && p < .74f)
                    {
                        s.SideKind = "bread";
                        s.SideX = p < .3f ? Ramp(p, .16f, .3f, 0, 6) : Ramp(p, .4f, .5f, 6, 0);
                        s.SideY = p < .22f ? Ramp(p, .08f, .22f, 17, 0) : p > .46f ? Ramp(p, .46f, .74f, 0, 18) : 0;
                        s.SideBite = p >= .22f;
                    }
                    break;
                case "preen": Seq(s, p, "0 rest .1 down .23 preen .36 down .46 preen .62 preen .78 smug .94 rest"); break;
                case "yawn": Seq(s, p, "0 rest .12 bored .32 yawn .71 sleep .86 blink .94 rest"); break;
                case "sleep":
                    Seq(s, p, "0 rest .1 bored .24 blink .34 bored .45 sleep .86 fluster .94 rest");
                    if (p > .45f && p < .86f) { s.Y = 3; s.Tilt = 1; s.Fx = "z"; }
                    break;
                case "wake": Seq(s, p, "0 rest 0 sleep .20 shock .40 front .56 smug .94 rest"); if (p > .2f && p < .4f) s.Y = -2; break;
                case "sneeze":
                    Seq(s, p, "0 rest .12 up .32 confused .46 yawn .57 blink .71 fluster .94 rest");
                    if (p > .46f && p < .57f) { s.Y = -2; s.SideKind = "pfft"; }
                    break;
                case "wind":
                    Seq(s, p, "0 rest .1 glance .25 blink .68 fluster .94 rest");
                    if (p > .2f && p < .75f) { s.Tilt = 1; s.X = Pulse(p, 15); s.Fx = "wind"; }
                    break;
                case "rain": Seq(s, p, "0 rest .1 up .33 wing .78 angry .94 rest"); if (p > .15f && p < .8f) s.Fx = "rain"; break;
                case "sun": Seq(s, p, "0 rest .12 up .3 blink .50 wing .78 bored .94 rest"); if (p > .14f && p < .8f) s.Fx = "sun"; break;
                case "snow": Seq(s, p, "0 rest .12 up .42 disbelief .68 blink .8 fluster .94 rest"); if (p > .14f && p < .8f) s.Fx = "snow"; break;
                case "peek":
                    s.Line = p >= .1f && p < .94f;
                    if (p < .28f) s.Y = Ramp(p, .13f, .28f, 0, 24);
                    else if (p < .42f) s.Y = 24;
                    else if (p < .52f) s.Y = Ramp(p, .42f, .52f, 24, 10);
                    else if (p < .68f) { s.Y = 10; s.Frame = "glance"; }
                    else if (p < .77f) s.Y = Ramp(p, .68f, .77f, 10, 24);
                    else s.Y = Ramp(p, .79f, .92f, 24, 0);
                    break;
                case "owl":
                    if (p < .28f) { s.X = Ramp(p, .12f, .28f, 0, 24); s.Frame = p > .12f ? "right" : "rest"; }
                    else if (p < .55f) s.X = 24;
                    else if (p < .69f) { s.Frame = "eyes"; s.X = Ramp(p, .55f, .65f, 24, 0); }
                    else if (p < .79f) { s.Frame = "fluster"; s.X = Ramp(p, .69f, .79f, 22, 0); s.EyesAhead = true; }
                    else { Seq(s, p, "0 rest .79 fluster .84 blink .89 rest .94 rest"); s.Y = p < .84f ? -1 : 0; }
                    break;
                case "arrive": s.X = Ramp(p, .08f, .54f, 24, 0); Seq(s, p, "0 rest 0 left .56 front .76 smug .94 rest"); break;
                case "crash":
                    s.X = Ramp(p, .05f, .29f, 24, 0);
                    Seq(s, p, "0 rest 0 shock .36 fluster .62 front .77 smug .94 rest");
                    if (p > .29f && p < .55f) { s.Y = Pulse(p, 20) != 0 ? -3 : 1; s.Fx = "stars"; }
                    break;
                case "emerge": s.Line = true; s.Y = Ramp(p, .08f, .57f, 24, 0); Seq(s, p, "0 rest 0 glance .65 smug .94 rest"); break;
                case "leaveRight": s.Frame = "right"; s.X = Ramp(p, .15f, .85f, 0, 24); break;
                case "leaveDown": s.Frame = "down"; s.Line = true; s.Y = Ramp(p, .15f, .85f, 0, 24); break;
                case "handoff":
                    s.Line = true; s.OwlX = Ramp(p, .17f, .37f, 0, 24); s.Y = p < .39f ? 24 : Ramp(p, .40f, .66f, 24, 0);
                    s.Frame = Step(p, "0 wing .43 glance .68 shock .77 smug");
                    if (p > .39f) s.OwlX = float.NaN;
                    break;
                case "flyAway":
                    if (p < .16f) { s.Frame = "down"; s.Y = Ramp(p, .02f, .14f, 0, 3); }
                    else { s.FlightKind = "away"; s.FlightT = Mathf.Min(1, (p - .16f) / .74f); }
                    break;
                case "flyBack":
                case "clumsyLand":
                {
                    float loppu = id == "clumsyLand" ? .40f : .58f;
                    if (p < loppu) { s.FlightKind = "back"; s.FlightT = p / loppu; s.FlightNear = id == "clumsyLand"; }
                    else
                    {
                        float t = (p - loppu) / (1 - loppu);
                        s.Frame = t < .20f ? "shock" : t < .65f ? "fluster" : "smug";
                        s.Y = StepLuku(t, "0 -9 .10 3 .22 -3 .36 1 .5 0");
                        s.Tilt = t > .22f && t < .5f ? 1 : 0;
                        if (t > .10f && t < .36f) s.Fx = "stars";
                    }
                    break;
                }
                case "glassCrash":
                    if (p < .37f) { s.FlightKind = "glass"; s.FlightT = p / .37f; }
                    else if (p < .71f) { s.FlightKind = "splat"; s.FlightT = (p - .37f) / .34f; }
                    else { s.Line = true; s.Frame = p < .85f ? "fluster" : "embarrassed"; s.Y = Ramp(p, .75f, .90f, 25, 0); }
                    break;
            }
            if (id == "walkRight" || id == "leaveRight") { s.WalkDir = 1; s.WalkT = Ramp(p, .08f, .94f, 0, 100) / 100f; s.Frame = "right"; s.X = 0; s.Y = Pulse(p, 14); }
            if (id == "walkBack") { s.WalkDir = -1; s.WalkT = Ramp(p, .02f, .83f, 0, 100) / 100f; s.Frame = "left"; s.X = 0; s.Y = Pulse(p, 14); }
        }

        const string PuheSpec = "0 rest .08 talk .17 talkSmall .26 rest .35 talk .47 talkSmall .57 talk .68 blink .76 talkSmall .86 talk .95 rest";

        /// <summary>Puheen nokka: livianSvgAsento('talk', vaihe).frame.</summary>
        public static string PuheSuu(float vaihe)
        {
            if (!(vaihe > 0 && vaihe < 1)) return "rest";
            return Step(vaihe, PuheSpec);
        }

        // --- livianSvgAsento -----------------------------------------------------

        /// <summary>livianSelityseleenVariantti: pitkä askel–selitys vain riittävän pitkässä äänessä.</summary>
        static bool PitkaSelitys(float cueKestoMs, float nopeus)
        {
            nopeus = Mathf.Max(.25f, nopeus > 0 ? nopeus : 1);
            return cueKestoMs >= 5600 && cueKestoMs / nopeus >= 5000;
        }

        public static void SvgAsento(LiviaAsento s, string id, float p, float voimakkuus, float cueKestoMs, float nopeus)
        {
            PikseliAsento(s, id, p);
            s.Ele = id; s.P = Rajaa(p); s.Voimakkuus = Rajaa(voimakkuus);
            if (id == "bunFeast")
            {
                float t = s.P;
                s.Frame = t == 0 || t == 1 ? "rest" : t < .2f ? "grin" : t < .9f ? "smile" : "rest";
                if (t > 0 && t < .2f) { s.Mouth = "talk"; s.FeastPhase = "squeal"; s.FeastHop = Mathf.Sin(t / .2f * PI); }
                else if (t >= .2f && t < .7f)
                {
                    int bites = t >= .62f ? 3 : t >= .48f ? 2 : t >= .34f ? 1 : 0;
                    s.Mouth = bites != 0 && Mathf.Sin((t - .2f) * PI * 22) > 0 ? "talkSmall" : "rest";
                    s.FeastPhase = "bite"; s.FeastGrab = Ease((t - .2f) / .1f); s.FeastBites = bites;
                }
                else if (t >= .7f && t < .9f)
                {
                    s.Mouth = Mathf.Sin((t - .7f) * PI * 18) > 0 ? "talkSmall" : "rest";
                    s.FeastPhase = "chew";
                }
            }
            if (id == "mapPeck")
            {
                // Kaksi rauhallista, toisistaan erottuvaa nokkaisua.
                float first = s.P > .12f && s.P < .42f ? Mathf.Sin((s.P - .12f) / .30f * PI) : 0;
                float second = s.P > .52f && s.P < .82f ? Mathf.Sin((s.P - .52f) / .30f * PI) : 0;
                float amount = Mathf.Max(0, Mathf.Max(first, second));
                s.Frame = amount > .08f ? "down" : "rest";
                s.GazeDown = amount > .08f;
                s.OnMapPeck = true; s.MapPeckAmount = amount; s.MapPeckN = first > second ? 1 : second > 0 ? 2 : 0;
            }
            if (id == "cityExplain")
            {
                s.OnCity = true;
                if (PitkaSelitys(cueKestoMs, nopeus))
                {
                    // Rauhallinen askel sivuun, pysähdys, kaksi selityselettä ja paluu.
                    float ulos = Ease(s.P / .20f), takaisin = 1 - Ease((s.P - .80f) / .18f);
                    float point = Ease((s.P - .18f) / .10f) * (1 - Ease((s.P - .40f) / .10f));
                    float open = Ease((s.P - .50f) / .10f) * (1 - Ease((s.P - .72f) / .12f));
                    s.Frame = s.P <= 0 || s.P >= 1 ? "rest" : s.P < .42f ? "glance" : s.P < .72f ? "front" : "rest";
                    s.CityPitka = true; s.CityAmount = ulos * takaisin; s.CityPoint = point; s.CityOpen = open; s.CityGesture = Mathf.Max(point, open);
                }
                else
                {
                    // Lyhyt koreografia paikallaan: katse sivuun ja yksi hillitty siipiele.
                    float point = Ease((s.P - .12f) / .18f) * (1 - Ease((s.P - .68f) / .22f));
                    s.Frame = s.P <= 0 || s.P >= 1 ? "rest" : s.P < .78f ? "glance" : "rest";
                    s.CityPitka = false; s.CityAmount = 0; s.CityPoint = point; s.CityOpen = 0; s.CityGesture = point * .65f;
                }
            }
            if (id == "glideIn") { s.FlightKind = "opening"; s.FlightT = Ease(p); }
            if (id == "trailerFlee") { s.FlightKind = "trailerAway"; s.FlightT = Ease(p); }
            if (id == "trailerBack") { s.FlightKind = "trailerBack"; s.FlightT = Ease(p); }
            if (id == "chatDashOut") { s.FlightKind = "chatDashOut"; s.FlightT = Ease(Rajaa(p / .55f)); }
            if (id == "chatDashBack") { s.FlightKind = "chatDashBack"; s.FlightT = Ease(p); }
            if (id == "chuckle" && p > .12f && p < .86f)
            {
                float syke = Mathf.Sin((p - .12f) / .74f * PI * 6), voima = s.Voimakkuus;
                s.Frame = "grin"; s.Mouth = syke > 0 ? "talk" : "talkSmall";
                s.Y = -Mathf.Abs(syke) * voima * 1.6f; s.Tilt = syke * voima * .55f;
            }
            if (id == "eyeRub")
            {
                s.Glasses = 1;
                s.GlassesLift = 22 * Ease((p - .10f) / .18f) * (1 - Ease((p - .70f) / .18f));
                s.Frame = p > .30f && p < .68f ? "blink" : "rest";
            }
            if (id == "bookStudy")
            {
                s.Frame = "smug"; s.Glasses = 1; s.GazeDown = true; s.PageTurn = Mathf.Sin(Rajaa((p - .18f) / .64f) * PI);
            }
            if (p > .08f && p < .94f)
            {
                if (id == "smile" || id == "grin" || id == "wink" || id == "welcome" || id == "present")
                    s.Frame = id == "welcome" || id == "present" ? "smile" : id;
                if (id == "glasses") { s.Frame = p < .24f ? "down" : "smug"; s.Glasses = Ease((p - .12f) / .20f) * (1 - Ease((p - .78f) / .16f)); }
                if (id == "welcome") s.Tilt = Mathf.Sin(p * PI * 3) * .4f;
                if (id == "scratch") { s.Frame = "up"; s.Tilt = Mathf.Sin(p * PI * 14) * .45f; }
            }
        }

        // --- uudenEleenAsento ja livianUusiPelitila ------------------------------

        /// <summary>Käsin piirretyn version radat (RADAT), null = ei rataa.</summary>
        sealed class KasinRadat
        {
            public float[] PaaKulma, PaaX, PaaY, Rinta, Hengitys, Ilme, Katse, Siipi, Takasiipi, Sulat, Suusiipi, Rapaytys, Sivu, Paperi;
        }

        static readonly Dictionary<string, KasinRadat> kasin = new Dictionary<string, KasinRadat>();
        static readonly Dictionary<string, float[]> touhuPainot = new Dictionary<string, float[]>();

        static LiviaAsennot()
        {
            foreach (var pari in LiviaData.Radat)
            {
                var r = new KasinRadat();
                foreach (var rata in pari.Value)
                {
                    switch (rata.Key)
                    {
                        case "paaKulma": r.PaaKulma = rata.Value; break;
                        case "paaX": r.PaaX = rata.Value; break;
                        case "paaY": r.PaaY = rata.Value; break;
                        case "rinta": r.Rinta = rata.Value; break;
                        case "hengitys": r.Hengitys = rata.Value; break;
                        case "ilme": r.Ilme = rata.Value; break;
                        case "katse": r.Katse = rata.Value; break;
                        case "siipi": r.Siipi = rata.Value; break;
                        case "takasiipi": r.Takasiipi = rata.Value; break;
                        case "sulat": r.Sulat = rata.Value; break;
                        case "suusiipi": r.Suusiipi = rata.Value; break;
                        case "rapaytys": r.Rapaytys = rata.Value; break;
                        case "sivu": r.Sivu = rata.Value; break;
                        case "paperi": r.Paperi = rata.Value; break;
                        default: Debug.LogWarning("MATKAKIRJA livia: tuntematon rata " + rata.Key); break;
                    }
                }
                kasin[pari.Key.Substring("uusi-".Length)] = r;
            }
            foreach (var pari in LiviaData.Touhu)
            {
                float alku = pari.Value.Alku, loppu = pari.Value.Loppu;
                touhuPainot[pari.Key] = new[] { 0, 0, alku - .06f, 0, alku, 1, loppu, 1, Mathf.Min(.97f, loppu + .07f), 0, 1, 0 };
            }
        }

        /// <summary>Onko eleellä käsin piirretty versio (welcome, chuckle, yawn, grin, disbelief, nod, doubleTake, bookStudy).</summary>
        public static bool OnKasin(string id) => id != null && kasin.ContainsKey(id);

        // liikearvo lasketaan doublena kuten JS: avainajan kohdalla (esim. toimintaP
        // tasan 0,1) float-pyöristys voisi pudottaa ilmeen porrasrajan väärälle puolelle.

        /// <summary>liikearvo: monotoninen kuutiollinen Hermite (aika, arvo) -pareista.</summary>
        public static float Liike(float p, float[] a)
        {
            if (a == null) return 0;
            double q = D(Rajaa(p));
            int n = a.Length / 2;
            for (int i = 1; i < n; i++)
            {
                double ta = D(a[2 * i - 2]), tb = D(a[2 * i]);
                if (q > tb) continue;
                return (float)Hermite(q, ta, tb, D(a[2 * i - 1]), D(a[2 * i + 1]), KulmaPari(a, i - 1, n), KulmaPari(a, i, n));
            }
            return a[2 * n - 1];
        }

        static double Hermite(double p, double ta, double tb, double x, double y, double k0, double k1)
        {
            double t = System.Math.Max(0, System.Math.Min(1, (p - ta) / (tb - ta))), t2 = t * t, t3 = t2 * t, h = tb - ta;
            return (2 * t3 - 3 * t2 + 1) * x + (t3 - 2 * t2 + t) * h * k0 + (-2 * t3 + 3 * t2) * y + (t3 - t2) * h * k1;
        }

        static double D(float v) => (double)(decimal)v;

        static double KulmaPari(float[] a, int i, int n)
        {
            if (i == 0 || i == n - 1) return 0;
            double s1 = (D(a[2 * i + 1]) - D(a[2 * i - 1])) / (D(a[2 * i]) - D(a[2 * i - 2]));
            double s2 = (D(a[2 * i + 3]) - D(a[2 * i + 1])) / (D(a[2 * i + 2]) - D(a[2 * i]));
            return s1 * s2 <= 0 ? 0 : 2 * s1 * s2 / (s1 + s2);
        }

        /// <summary>liikearvo erillisistä aika- ja arvotaulukoista (liikeperheet; null = nollia).</summary>
        static float Liike(float p, float[] ajat, float[] arvot)
        {
            if (arvot == null) return 0;
            double q = D(Rajaa(p));
            int n = ajat.Length;
            for (int i = 1; i < n; i++)
            {
                double ta = D(ajat[i - 1]), tb = D(ajat[i]);
                if (q > tb) continue;
                return (float)Hermite(q, ta, tb, D(arvot[i - 1]), D(arvot[i]), Kulma(ajat, arvot, i - 1), Kulma(ajat, arvot, i));
            }
            return arvot[n - 1];
        }

        static double Kulma(float[] ajat, float[] arvot, int i)
        {
            if (i == 0 || i == ajat.Length - 1) return 0;
            double s1 = (D(arvot[i]) - D(arvot[i - 1])) / (D(ajat[i]) - D(ajat[i - 1]));
            double s2 = (D(arvot[i + 1]) - D(arvot[i])) / (D(ajat[i + 1]) - D(ajat[i]));
            return s1 * s2 <= 0 ? 0 : 2 * s1 * s2 / (s1 + s2);
        }

        /// <summary>
        /// vanhanEleenUusiRata. Radan arvot kerrotaan vakiolla (voima × suunta):
        /// liikearvo on homogeeninen arvojen suhteen, joten kerroin otetaan ulos.
        /// </summary>
        static void UusiRata(LiviaRata r, string baseId, float p)
        {
            if (!LiviaData.Profiilit.TryGetValue(baseId, out var profiili))
            {
                Debug.LogWarning("MATKAKIRJA livia: eleeltä puuttuu liikeprofiili " + baseId);
                return;
            }
            var k = LiviaData.Perheet[profiili.Perhe];
            float voima = profiili.Voima, suunta = profiili.Suunta;
            float Viive(float[] arvot, float sek) => Liike(Rajaa((p - sek) / (1 - sek)), k.Ajat, arvot);
            r.PaaKulma = Liike(p, k.Ajat, k.Paa) * voima * suunta;
            r.PaaX = Liike(p, k.Ajat, k.X) * voima * suunta;
            r.PaaY = Liike(p, k.Ajat, k.Y) * voima;
            r.Rinta = Viive(k.Rinta, .035f) * voima;
            r.Siipi = Mathf.Max(0, Viive(k.Siipi, .045f) * voima);
            r.Takasiipi = Mathf.Max(0, Viive(k.Siipi, .095f) * voima * .60f);
            r.Sulat = Mathf.Max(0, Viive(k.Siipi, .085f) * voima);
            r.Hengitys = Liike(p, k.Ajat, k.Rinta) * voima * -.08f;
        }

        /// <summary>
        /// livianUusiPelitila(id, p): täyttää asennon ja radan. Käsin piirretyillä
        /// eleillä s.UusiPiirto = r, muilla s.KatseluRata = r.
        /// </summary>
        public static void UusiPelitila(LiviaAsento s, LiviaRata r, string id, float p, float voimakkuus, float cueKestoMs, float nopeus)
        {
            r.Nollaa();
            r.BaseId = id;
            p = Rajaa(p);
            r.P = p;
            float voima = .55f + .9f * Rajaa(voimakkuus);
            if (kasin.TryGetValue(id, out var k))
            {
                r.Kasin = true;
                float tp = id == "yawn" ? Liike(p, LiviaData.HaukotuksenTahti) : p;
                r.ToimintaP = tp;
                r.PaaKulma = Liike(tp, k.PaaKulma) * voima; r.PaaX = Liike(tp, k.PaaX) * voima;
                r.PaaY = Liike(tp, k.PaaY) * voima; r.Rinta = Liike(tp, k.Rinta) * voima;
                r.Hengitys = Liike(tp, k.Hengitys); r.Ilme = Liike(tp, k.Ilme); r.Katse = Liike(tp, k.Katse);
                r.Siipi = Liike(tp, k.Siipi); r.Takasiipi = Liike(tp, k.Takasiipi); r.Sulat = Liike(tp, k.Sulat);
                r.Suusiipi = Liike(tp, k.Suusiipi); r.Rapaytys = Liike(tp, k.Rapaytys); r.Sivu = Liike(tp, k.Sivu); r.Paperi = Liike(tp, k.Paperi);
                SvgAsento(s, id, p, voimakkuus, cueKestoMs, nopeus);
                s.UusiPiirto = r;
                return;
            }
            bool touhu = LiviaData.Touhu.TryGetValue(id, out var ajat);
            float toimintaP = touhu ? Liike(p, ajat.Rata) : p;
            r.ToimintaP = toimintaP;
            UusiRata(r, id, toimintaP);
            if (touhu)
            {
                float paino = Liike(p, touhuPainot[id]);
                float hengitys = Mathf.Sin((p - ajat.Alku) / (ajat.Loppu - ajat.Alku) * PI * 2 * ajat.Sykli) * paino;
                float pieni = id == "sleep" ? .45f : id == "sneeze" ? .5f : 1f;
                r.PaaKulma += hengitys * 1.4f * pieni;
                r.PaaY += hengitys * 1.1f * pieni;
                r.Rinta -= hengitys * .8f * pieni;
                r.Hengitys += hengitys * .45f * pieni;
            }
            r.PaaKulma *= voima; r.PaaX *= voima; r.PaaY *= voima; r.Rinta *= voima;
            SvgAsento(s, id, toimintaP, voimakkuus, cueKestoMs, nopeus);
            // Vastatuulessa Pulu siristää ja räpäyttää vain puuskien huipuissa.
            if (id == "wind" && p > .34f && p < .82f)
                s.Frame = Mathf.Sin((p - .34f) * PI * 8) > .9f ? "blink" : "glance";
            if ((id == "bunFeast" || id == "bread") && p > 0 && p < 1) r.Pulla = p;
            if (id == "mapPeck" && p > 0 && p < 1)
            {
                float amount = Liike(p, LiviaData.KartanNokkaisut);
                int peck = p < .5f ? 1 : 2;
                s.OnMapPeck = true; s.MapPeckAmount = amount; s.MapPeckN = peck;
                s.Frame = amount > .08f ? "down" : "rest"; s.GazeDown = amount > .08f;
                r.MapContact = Mathf.Clamp01((amount - .82f) / .18f);
                r.MapPeckNumber = peck;
                r.PaaX += (peck == 1 ? -1.5f : 1.5f) * amount;
            }
            s.KatseluRata = r;
        }
    }
}
