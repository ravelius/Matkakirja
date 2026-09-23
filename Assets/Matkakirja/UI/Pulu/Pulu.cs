// PULU (Livia, kirjekyyhky Columba livia) natiivina (Natiivi-UI, erä 5).
//
// Webin js/livia-eleet.js:n käyttäytyminen: yksi ele kerrallaan
// (LiviaKuva piirtää, LiviaEleet kertoo kestot), lepo, taustaeleet ~8 s
// kierrolla (30 s joutilaisuuden jälkeen rauhallinen ele, 3 min jälkeen uni),
// herääminen toiminnasta, leijunta kartan vedon aikana (0→1 260 ms, 1→0
// 280 ms), puheen aikana rytmitetty nokka ("talk", 1,5 s jakso; ei huulisynkkaa),
// tilanteiden sovittelu (vähintään 2,8 s eleiden väli, liike-eleitä ei
// keskeytetä, puhe voittaa taustaeleet) ja ensisaapuminen ("handoff",
// myöhemmin "clumsyLand").
//
// Paikka: oikea alakulma turva-alueen sisällä (webin pollo-nappi: right 1,1rem,
// bottom 3,6rem; kartalla 5,3rem). Kun alareunan kortti (kaupunkikortti,
// matkavalinta) on auki, pulu hyppää sen yläpuolelle (webin
// pulu-paneelin-ylla, omistaja 19.9.2026); modaalisen dialogin aikana pulu
// kutistuu 0,72:een (webin lehti/dialogi).
//
// Pelin rajapinta (Pelikoodari, Fable, Linssiseppä kutsuvat):
//   Pulu.Hae().Sano(teksti, aaniUrl, eleet?)      repliikki kuplaan + ääni + ele
//   Pulu.Hae().Tilanne(laji, …)                   webin ilmoitaLivianTilanne
//   Pulu.Hae().Tunne(tunne, voimakkuus)           sisällön tunnetagi {tunne, voimakkuus}
//   Pulu.Hae().Ele(id)                            suora ele (testit)
// Napautus puluun: webissä avaa chatin (tulossa natiiviin); nyt tervehdys ja
// viimeisin kuittaamaton repliikki uudelleen.
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Pulu
    {
        /// <summary>Pulun kerros: pelidialogien (30) yläpuolella, valikoiden (40) alla.</summary>
        public const int Kerros = 35;
        const float VahimmaisVali = 2800f, KierrosMs = 8000f, JoutoMs = 30000f, UniMs = 180000f, EleValiMs = 22000f;

        static Pulu instanssi;
        public static Pulu Hae() => instanssi ??= new Pulu(UiKerros.Hae());
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() => instanssi = null;

        readonly UiKerros kerros;
        readonly VisualElement alue, nayttamo, kosketus;
        readonly LiviaKuva kuva;
        readonly LiviaTila tila = new LiviaTila();
        public readonly PuluKuplat Kuplat;

        // Nykyinen ele ja lepo.
        string ele, omistaja, jatko, lepoEle;
        float eleAlkoi, eleKesto;
        bool nukkuu, ensisaapunut, nakyvissa = true;
        float viimeTilanne = -1e6f, viimeToimi, viimeEle, leiju;
        bool leijuTavoite;
        Vector2 edellinenOsoitin;
        int taustaVuoro;
        string edellinenTausta;
        PuluKuplat.Kupla puheKupla;
        float puheAlkoi = -1;
        string viimeRepliikki;
        readonly System.Random arpa = new System.Random();

        public bool Puhuu => Aanet.PuluPuhuu;
        public string NykyinenEle => ele;

        Pulu(UiKerros kerros)
        {
            this.kerros = kerros;
            var juuri = kerros.Juuri(Kerros);
            kerros.Turva(Kerros);
            alue = Rakenne.El("mk-pulu", juuri, PickingMode.Ignore);
            Kuplat = new PuluKuplat(alue);
            nayttamo = Rakenne.El("mk-pulu__nayttamo", alue, PickingMode.Ignore);
            kuva = new LiviaKuva { pickingMode = PickingMode.Ignore };
            kuva.AddToClassList("mk-pulu__kuva");
            nayttamo.Add(kuva);
            // Kosketusalue linnun lepopaikalla (näyttämön alaosan keskellä), ei koko näyttämö.
            kosketus = Rakenne.El("mk-pulu__kosketus", nayttamo);
            kosketus.RegisterCallback<PointerDownEvent>(e => { e.StopPropagation(); Napautettu(); });

            viimeToimi = viimeEle = Aika;
            kerros.TurvaMuuttui += Asettele;
            kerros.JokaRuutu += Ruutu;
            alue.schedule.Execute(Kierros).Every((long)KierrosMs);
            Asettele();
        }

        static float Aika => Time.unscaledTime * 1000f;

        // --- paikka ----------------------------------------------------------------

        void Asettele()
        {
            var r = kerros.Reunat(Kerros);
            alue.style.right = r.z + 8;
            alue.style.bottom = Alareuna(r.w);
        }

        /// <summary>Webin 3,6rem/5,3rem + turva; alareunan kortin yläpuolelle, jos kortti on auki.</summary>
        float Alareuna(float turvaAla)
        {
            float perus = turvaAla + 58f;
            var ui = UiNakymat.Olemassa ? UiNakymat.Hae() : null; // ei luoda näkymiä tästä
            if (ui == null) return perus;
            float korkein = 0;
            foreach (var paneeli in new[] { ui.Kaupunkikortti.Alue, ui.Matkavalinta.KorttiAlue })
            {
                if (paneeli == null || paneeli.resolvedStyle.display == DisplayStyle.None || paneeli.panel == null) continue;
                var kortti = paneeli.childCount > 0 ? paneeli[0] : paneeli;
                var ruudunKorkeus = paneeli.panel.visualTree.layout.height;
                if (kortti.worldBound.height <= 0) continue;
                korkein = Mathf.Max(korkein, ruudunKorkeus - kortti.worldBound.yMin + 6f);
            }
            return Mathf.Max(perus, korkein);
        }

        // --- joka ruutu ----------------------------------------------------------------

        void Ruutu()
        {
            if (!nakyvissa) return;
            float nyt = Aika;
            SeuraaToimintaa(nyt);

            // Leijunta: sormi vetää karttaa (ei UI:n päällä), pulu levossa.
            float dt = Mathf.Min(64f, Time.unscaledDeltaTime * 1000f);
            leiju = Mathf.Clamp01(leiju + dt * (leijuTavoite ? 1f / 260f : -1f / 280f));

            if (ele != null)
            {
                float p = Mathf.Clamp01((nyt - eleAlkoi) / Mathf.Max(1f, eleKesto));
                if (p >= 1f) EleValmis();
                else { tila.Ele = ele; tila.P = p; }
            }
            if (ele == null)
            {
                tila.Ele = nukkuu ? "sleep" : (lepoEle ?? "blink");
                tila.P = nukkuu ? 0.5f : 0f;
            }
            // Nokka liikkuu puheen ajan (ei liike-eleissä).
            bool puhuu = Aanet.PuluPuhuu && (ele == null || LiviaEleet.Ryhma(ele) != "Liike");
            if (puhuu && puheAlkoi < 0) puheAlkoi = nyt;
            if (!puhuu) puheAlkoi = -1;
            tila.Puhe = puhuu ? ((nyt - puheAlkoi) % 1500f) / 1500f : -1f;
            tila.Leiju = leiju;
            tila.Astronautti = Astronautti;
            kuva.Aseta(tila);

            // Paikka ja koko (kortti auki → yläpuolelle, modaali → 0,72).
            alue.style.bottom = Alareuna(kerros.Reunat(Kerros).w);
            bool modaali = SyoteLukko.Estetty;
            alue.EnableInClassList("mk-pulu--pieni", modaali);
        }

        /// <summary>Astronautin kamera (Linssiseppä asettaa): kypärä päähän.</summary>
        public bool Astronautti { get; set; }

        void SeuraaToimintaa(float nyt)
        {
            var o = Pointer.current;
            if (o == null) { leijuTavoite = false; return; }
            var paikka = o.position.ReadValue();
            if (o.press.wasPressedThisFrame) Toiminta(nyt);
            bool vetaa = o.press.isPressed && (paikka - edellinenOsoitin).sqrMagnitude > 4f && !UiKerros.Peittaa(paikka);
            edellinenOsoitin = paikka;
            if (vetaa)
            {
                viimeToimi = nyt;
                if (Rauhallinen() && (ele == null || omistaja == "idle")) { if (omistaja == "idle") Katkaise(); leijuTavoite = true; }
            }
            else if (!o.press.isPressed) leijuTavoite = false;
        }

        void Toiminta(float nyt)
        {
            bool nukkui = nukkuu;
            viimeToimi = nyt;
            if (omistaja == "idle") Katkaise();
            if (nukkui) { nukkuu = false; Toista("wake"); }
        }

        bool Rauhallinen() => nakyvissa && !Aanet.PuluPuhuu && !Aanet.KertojaPuhuu && !SyoteLukko.Estetty && Kuplat.Maara == 0;

        void Kierros()
        {
            float nyt = Aika, tauko = nyt - viimeToimi;
            if (ele != null || !Rauhallinen() || leiju > 0 || leijuTavoite || nukkuu) return;
            if (tauko < JoutoMs || nyt - viimeEle < EleValiMs) return;
            if (tauko >= UniMs) { Toista("sleep", "idle"); nukkuu = true; return; }
            string id;
            do { id = TaustaEleet[arpa.Next(TaustaEleet.Length)]; } while (id == edellinenTausta && TaustaEleet.Length > 1);
            edellinenTausta = id;
            taustaVuoro++;
            Toista(id, "idle");
        }

        static readonly string[] TaustaEleet = { "blink", "turn", "preen", "glance", "tilt", "lookUp", "lookDown", "mapPeck" };

        // --- eleet --------------------------------------------------------------

        /// <summary>Soittaa eleen (webin toista). Palauttaa false, jos elettä ei ole.</summary>
        public bool Toista(string id, string omistajaNimi = null, string jatkoEle = null)
        {
            if (id == "owl") id = "flyAway";
            if (!LiviaEleet.Olemassa(id)) return false;
            ele = id;
            omistaja = omistajaNimi;
            jatko = jatkoEle;
            eleAlkoi = Aika;
            eleKesto = LiviaEleet.KestoMs(id);
            viimeEle = eleAlkoi;
            if (id != "sleep") nukkuu = false;
            lepoEle = null;
            leijuTavoite = false;
            return true;
        }

        public bool Ele(string id) => Toista(id);

        void Katkaise() { ele = null; omistaja = null; jatko = null; }

        void EleValmis()
        {
            string valmis = ele;
            string seuraava = jatko;
            Katkaise();
            // Lähtöeleiden jälkeen pulu palaa (webin palaa(): lento → flyBack, 1/7 lasiin; kävely → walkBack).
            string paluu = valmis switch
            {
                "flyAway" => arpa.Next(7) == 0 ? "glassCrash" : "flyBack",
                "walkRight" => "walkBack",
                "leaveRight" => "arrive",
                "leaveDown" => "emerge",
                _ => null,
            };
            if (valmis == "sleep") nukkuu = true;
            string seuraavaksi = seuraava ?? paluu;
            if (seuraavaksi != null) alue.schedule.Execute(() => { if (ele == null) Toista(seuraavaksi); }).StartingIn(paluu != null ? 1500 : 800);
        }

        // --- tilanteet (webin ilmoitaLivianTilanne) ---------------------------------

        /// <summary>
        /// Pelitilanne: success, retry, emotion (tunne), answer (teksti), card (symboli/otsikko),
        /// photo (kaupunki), narration, narrationEnd, reaction (tarkoitus, voimakkuus),
        /// arrival (saapuminen), bunGranted. Palauttaa, soiko ele.
        /// </summary>
        public bool Tilanne(string laji, string teksti = null, string tunne = null, float voimakkuus = 0.5f, string symboli = null, string kaupunki = null)
        {
            float nyt = Aika;
            if (!nakyvissa) return false;
            if (ele != null && LiviaEleet.Ryhma(ele) == "Liike") return false;
            if (laji == "bunGranted") { Aanet.PulunTehoste("pulu.pulla-riemu"); return Toista("bunFeast", laji); }
            if (laji == "narrationEnd") { if (omistaja == "narration" || omistaja == "reaction") Katkaise(); return false; }
            bool vapaa = laji == "card" || laji == "narration" || laji == "answer" || laji == "reaction";
            if (!vapaa && nyt - viimeTilanne < VahimmaisVali) return false;
            if (Aanet.PuluPuhuu && laji != "photo") return false;
            string id = laji switch
            {
                "success" => "grin",
                "retry" => "nod",
                "emotion" => TunteenEle(tunne),
                "answer" => RepliikinEle(teksti) is var r && r != "blink" ? r : "smile",
                "card" => AiheenEle(symboli, teksti),
                "photo" => kaupunki == "venetsia" ? "love" : "present",
                "narration" => omistaja == "narration" ? "nod" : "lookUp",
                "reaction" => ReaktionEle(tunne, voimakkuus),
                "arrival" => ensisaapunut ? (arpa.Next(7) == 0 ? "glassCrash" : "clumsyLand") : "handoff",
                _ => null,
            };
            if (laji == "arrival") { ensisaapunut = true; Aanet.PulunOhjelma("saapuu"); }
            if (id == null) return false;
            viimeTilanne = nyt;
            viimeToimi = nyt;
            return Toista(id, laji);
        }

        /// <summary>Sisällön tunnetagi {tunne, voimakkuus} (webin LIVIAN_TUNTEET).</summary>
        public bool Tunne(string tunne, float voimakkuus = 0.5f) => Tilanne("emotion", tunne: tunne, voimakkuus: voimakkuus);

        public static string TunteenEle(string tunne) => (tunne ?? "").Trim().ToLowerInvariant() switch
        {
            "utelias" => "lookUp", "lammin" => "smile", "ilo" => "grin", "hammastys" => "disbelief",
            "miettiva" => "think", "vakava" => "listen", "ylpea" => "expert", "rakkaus" => "love",
            "hammentynyt" => "confused", "jannitys" => "doubleTake", _ => null,
        };

        /// <summary>Luentareaktio (webin livianLuentareaktionTiedot).</summary>
        public static string ReaktionEle(string tarkoitus, float voima) => tarkoitus switch
        {
            "myotailee" => "nod", "epailee" => "shake", "torjuu" => "shake",
            "huvittuu" => voima < 0.4f ? "smile" : voima < 0.55f ? "grin" : "chuckle",
            "hammastyy" => voima < 0.65f ? "doubleTake" : "disbelief",
            "vakavoituu" => "listen", _ => null,
        };

        static bool On(string teksti, string kuvio) => Regex.IsMatch(teksti, kuvio, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);

        /// <summary>Repliikin sävy tekstistä (webin livianRepliikinEle, sama järjestys).</summary>
        public static string RepliikinEle(string t)
        {
            t ??= "";
            if (On(t, "kääk|apua!|kauhist|hui!")) return "shock";
            if (On(t, "aivan tavallinen|ihast|rakas|rakast|sydämeni")) return "love";
            if (On(t, "pulla|pullaa|pullan|muru")) return On(t, "tuijot|näen|tuoksu|pulla ensin") ? "manic" : "bread";
            if (On(t, "en minä|nol|anteeksi|hups|vahingossa|minun vik")) return "embarrassed";
            if (On(t, "en voi uskoa|ei voi olla|uskomaton|oikeastiko|yhdeksäntuhatta")) return "disbelief";
            if (On(t, "pah!|kehtaa|tuoht|hävy|epäreilu|suut")) return "angry";
            if (On(t, "en tiedä|mitähän|kummall|häh")) return "confused";
            if (On(t, "pitkäst|kylläst|odotellaan|taasko")) return "bored";
            if (On(t, "pöh|puh!|posk|pier")) return "puff";
            if (On(t, "nuk|uness|väsyt")) return "yawn";
            if (On(t, "lum|hiutale")) return "snow";
            if (On(t, "sade|sataa|märkä")) return "rain";
            if (On(t, "aurinko|häikäis")) return "sun";
            if (On(t, "tuuli|mistral")) return "wind";
            if (On(t, "kyllä kyllä|juuri niin|aivan oikein|olet oikeassa")) return "nod";
            if (On(t, "oikein|löysit|onnistu|hienoa|hah")) return "grin";
            if (On(t, "väärin|ei todellakaan")) return "shake";
            if (On(t, "tiedän|asiantunt|minähän sanoin|tietenkin|selvennys|kuulehan")) return "expert";
            return "blink";
        }

        /// <summary>Kortin aiheen sävy (webin livianAiheEle): vakavaa ei tervehditä virneellä.</summary>
        public static string AiheenEle(string symboli, string teksti)
        {
            var s = teksti ?? "";
            if (On(s, "kuol|surma|hirt|orju|orjia|sota|soda|nälänhä|vainot|hauta|teloit")) return "listen";
            if (On(s, "ihast|rakast|rakkaus")) return "love";
            if (On(s, "pulla|leipä|leivän|leipom|muru")) return "manic";
            if (symboli == "elain") return On(s, "lintu|linnut|kyyhky|pulu") ? "grin" : On(s, "hevonen|hevos|varsa") ? "doubleTake" : "tilt";
            return symboli switch
            {
                "huuto" => "disbelief", "silma" => "lookUp", "historia" => "glasses", "luonto" => "tilt", "ruoka" => "smile",
                "kulttuuri" => "smile", "tekniikka" => "glasses", "kauppa" => "expert", "sana" => "glasses", "merenkulku" => "lookUp",
                "urheilu" => "grin", "kaupunki" => "present", "ihme" => "disbelief", "hetki" => "glasses", _ => "listen",
            };
        }

        // --- puhe ------------------------------------------------------------------

        /// <summary>
        /// Livian repliikki: kupla + ääni (valinnainen ämpärin mp3) + ele (annettu tai
        /// tekstin sävystä). kuitattu = kuplan napautus (seuraava repliikki). Pulu ei
        /// puhu kertojan päälle: silloin kupla näkyy äänettä.
        /// </summary>
        public void Sano(string teksti, string aaniUrl = null, string eleId = null, Action kuitattu = null)
        {
            if (string.IsNullOrEmpty(teksti)) return;
            viimeRepliikki = teksti;
            viimeToimi = Aika;
            if (nukkuu) { nukkuu = false; Toista("wake"); }
            var kupla = Kuplat.Lisaa(teksti, 0, kuitattu);
            puheKupla = kupla;
            var id = eleId ?? RepliikinEle(teksti);
            if (id != "blink" && (ele == null || LiviaEleet.Ryhma(ele) != "Liike")) Toista(id, "speech");
            if (!string.IsNullOrEmpty(aaniUrl))
                Aanet.Soita(AaniKanava.Puhe, aaniUrl, klippi =>
                {
                    // Pidempi ääni pidentää kuplaa (webin livianKuplanAjastin).
                    if (klippi != null) Kuplat.AsetaKesto(kupla, Mathf.Max(PuluKuplat.Lukuaika(teksti), klippi.length * 1000f + 600f));
                });
        }

        /// <summary>Livian äänitetyn repliikin osoite (webin livianAaniNimi): aanet/pulu/livia-{lähde}-{n}.mp3.</summary>
        public static string AaniOsoite(string lahde, int indeksi, string versio = null) =>
            Aanet.Juuri + "aanet/pulu/livia-" + lahde + "-" + (indeksi + 1) + ".mp3" + (versio != null ? "?v=" + versio : "");

        /// <summary>Pulun napautus (UiNakymat avaa keskustelun).</summary>
        public event Action Napautus;

        void Napautettu()
        {
            viimeToimi = Aika;
            if (nukkuu) { nukkuu = false; Toista("wake"); }
            if (Napautus != null) { Napautus(); return; }
            Aanet.PulunTehoste("pulu.kujerrus");
            if (Kuplat.Maara == 0 && viimeRepliikki != null) Kuplat.Lisaa(viimeRepliikki);
            Tilanne("chatOpen");
            Toista("welcome", "chatOpen");
        }

        /// <summary>Pulu näkyviin tai piiloon (lehti, linssin oma näkymä).</summary>
        public void Nayta(bool nakyy)
        {
            nakyvissa = nakyy;
            alue.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (!nakyy) { Katkaise(); Kuplat.TyhjennaKaikki(); Aanet.Pysayta(AaniKanava.Puhe); }
        }
    }
}
