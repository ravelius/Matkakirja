// LEHDEN FOKUSTEHTÄVÄT (Natiivi-UI): kevyen kulun nimetyt lehtitehtävät ja pullavinkki
// kaupunkilehden aihesivulla (web js/fokustehtavat.js piirraSivunTehtava, piirraNimettyTehtava,
// piirraVisanVastaukset, piirraPullaOstos, pullaOstosnappi, kuittausTeksti; css/fokusvirta.css
// .fokus-tehtava, .fokus-tehtava-vihje, .fokus-pulla*).
//
// Data: kokoelma lehtitehtavat (Siirtoseppä, skeema 1.17) — alkio {kaupunki, tehtava, sivu, otsake,
// palkinto: piste|juliste, juliste (julisteavain tai null), palkkio, visa {kysymys, vaihtoehdot, oikea,
// fakta}}. Varareitti: fokusvirrat → data.lehtitehtavat (Fokusvirrat.cs), julisteavain webin säännöllä.
// Pullan nimet maittain: moduulit/js/fokustehtavat.json → exportit.PULLA_NIMET / PULLA_YLEISNIMI.
// Aarteen avauksen edellytys (kohtaaminen ja paikka maailmankartalla): Fokusvirrat.AarteenAvaus.
//
// Säännöt (web):
//   - Tehtävä vain kaupunkilehdessä, pelaajan nykyisessä kaupungissa ja fokusmoodissa; sivu =
//     lehden sivun indeksi (0 = etusivu). Nimetty tehtävä korvaa sivun oman minitehtävän.
//   - Nimilaatta = otsake ("AARTEEN AVAUS" / "JULISTE"), alla vihjerivi. palkinto ≠ juliste avaa
//     aarteen; kun aarre on jo auki, laatta on "LEHDEN KYSYMYS" ja vihje "oikeasta vastauksesta rahaa".
//   - Vastaus kerran: LehtiTeko Minitehtavavastaus aiheella fokus:<id>, palkkio 50 (vain oikeasta).
//     Tulos "Oikein! +50 puntaa. fakta" / "Oikea vastaus: X. fakta". Juliste myönnetään heti, vedos
//     kyljessä merkitään voitetuksi ja "Lunasta juliste" avaa suurennoksen; jo vastatussa takautuva
//     myöntö (oikein ratkaistu tai jo laukussa).
//   - Oikean vastauksen jälkeen Livia kuittaa (kuittausTeksti: mitä tapahtui ja mitä on tekemättä).
//   - Pullavinkki aarteen avaavan tehtävän alle (myös vastattuun, umpikujan esto), kun aarre on vielä
//     avaamatta: "Osta <pulla> Livialle (25 £)" → varmistus (6 s) → LehtiTeko PullaVinkki. Kassa ei
//     riitä → nappi harmaana ja Livian hienovarainen pettymys.
// Erot webiin: kulttuurivisa ei ole vielä natiivilehdessä, joten sen "AARTEEN AVAUS" -kehys ja visan
// kirjaus aarteen avaajaksi puuttuvat; pullan ja palkkion kukkaroleima tulee ohjaimen RahaMuuttui-
// tapahtumasta (alarivi RahaSyyt: "Aarteen avaus ratkesi" myös JULISTE-tehtävästä, "pulla Livialle").
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    /// <summary>Kaupunkilehden sivulle sidottu nimetty tehtävä (web fokusvirta lehtitehtavat).</summary>
    public sealed class Lehtitehtava
    {
        public string Kaupunki, Id, Otsake, Palkinto, Vihje;
        /// <summary>Julisteen avain (Kaupat.MyonnaJuliste), vain palkinto = juliste; null = ei julistetta.</summary>
        public string Juliste;
        /// <summary>Lehden sivun indeksi (0 = etusivu); -1 = ei sivua.</summary>
        public int Sivu = -1;
        public int Palkkio = KauppaVakiot.FokusTehtavaPalkkio;
        public LehtiTehtava Visa;
        /// <summary>Web avaaAarteen: kaikki muut kuin julistetehtävät avaavat aarteen.</summary>
        public bool AvaaAarteen => Palkinto != "juliste";
        /// <summary>Minitehtävän aihe Kaupat-avaimessa (fokus:&lt;id&gt;).</summary>
        public string Aihe => Fokusdata.Aihe(Id);
    }

    public sealed class LehtiFokus
    {
        // Webin tekstit (js/fokustehtavat.js), Fablen ja omistajan hyväksymät.
        static string AarteenVihje => Kieli.T("ui.lehtifokus.aarteen-vihje");
        static string JulisteenVihje => Kieli.T("ui.lehtifokus.julisteen-vihje");
        static string AarreAukiOtsake => Kieli.T("ui.lehtifokus.aarre-auki-otsake");
        static string AarreAukiVihje => Kieli.T("ui.lehtifokus.aarre-auki-vihje");
        static string Ratkaistu => Kieli.T("ui.lehtifokus.ratkaistu");
        static string AarreSyttyi => Kieli.T("ui.lehtifokus.aarre-syttyi");
        static string AarreRahaa => Kieli.T("ui.lehtifokus.aarre-rahaa");
        static string AarreRahaaLyhyt => Kieli.T("ui.lehtifokus.aarre-rahaa-lyhyt");
        static string JulisteTalteen => Kieli.T("ui.lehtifokus.juliste-talteen");
        static string JulisteKehu => Kieli.T("ui.lehtifokus.juliste-kehu");
        static string PullaKoyhaLivia => Kieli.T("ui.sahke.pulla-koyha-livia");
        static string PullaVarmistusOhje => Kieli.T("ui.sahke.pulla-varmistus-ohje");
        const long PullaVarmistusMs = 6000;

        // --- data (kerran istunnossa) ---------------------------------------------------------

        static Dictionary<string, List<Lehtitehtava>> tehtavat;
        static Dictionary<string, string> pullaNimet = new Dictionary<string, string>();
        static string pullaYleisnimi = "makea pulla";
        static bool haussa;
        static readonly List<Action> odottajat = new List<Action>();

        /// <summary>Lataa lehtitehtävät, pullan nimet ja fokusvirrat; valmis kutsutaan aina (myös virheessä).</summary>
        public static void Lataa(Action valmis)
        {
            if (tehtavat != null) { valmis?.Invoke(); return; }
            if (valmis != null) odottajat.Add(valmis);
            if (haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(Lue());
        }

        static IEnumerator Lue()
        {
            string kokoelma = null, moduuli = null;
            yield return Sisalto.HaeTeksti("lehtitehtavat", t => kokoelma = t, valinnainen: true);
            yield return Sisalto.HaePaketista("moduulit/js/fokustehtavat.json", t => moduuli = t, true);
            bool virrat = false;
            Fokusvirrat.Lataa(() => virrat = true);
            while (!virrat) yield return null;
            var t = new Dictionary<string, List<Lehtitehtava>>();
            try { LueKokoelma(kokoelma, t); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui lehtitehtävät: " + e.Message); }
            try { LuePullat(moduuli); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui pullan nimet: " + e.Message); }
            tehtavat = t;
            haussa = false;
            var k = odottajat.ToArray();
            odottajat.Clear();
            foreach (var a in k) { try { a(); } catch (Exception e) { Debug.LogException(e); } }
        }

        static void LueKokoelma(string json, Dictionary<string, List<Lehtitehtava>> t)
        {
            if (string.IsNullOrEmpty(json)) return;
            var juuri = MiniJson.Jasenna(json) as Dictionary<string, object>;
            foreach (var a in Rakenne.Lista(MiniJson.Kentta(juuri, "alkiot")) ?? new List<object>())
            {
                if (!(a is Dictionary<string, object> o)) continue;
                var d = Rakenne.Paatasolta(o);
                string kaupunki = MiniJson.Teksti(o, "kaupunki") ?? MiniJson.Teksti(d, "kaupunki");
                var x = Tehtava(d, kaupunki, MiniJson.Teksti(d, "tehtava"), MiniJson.Kentta(d, "juliste") as string);
                if (x != null) Lisaa(t, x);
            }
        }

        static void Lisaa(Dictionary<string, List<Lehtitehtava>> t, Lehtitehtava x)
        {
            if (!t.TryGetValue(x.Kaupunki, out var l)) t[x.Kaupunki] = l = new List<Lehtitehtava>();
            l.Add(x);
        }

        /// <summary>Alkio → tehtävä (kokoelma tai fokusvirran raakadata); ilman vaihtoehtoja null.</summary>
        static Lehtitehtava Tehtava(Dictionary<string, object> d, string kaupunki, string id, string juliste)
        {
            if (d == null || kaupunki == null) return null;
            id ??= MiniJson.Teksti(d, "id");
            var visa = MiniJson.Kentta(d, "visa") as Dictionary<string, object>;
            var vv = Rakenne.Lista(MiniJson.Kentta(visa, "vaihtoehdot"));
            if (id == null || vv == null || vv.Count == 0) return null;
            var v = new LehtiTehtava
            {
                Kysymys = MiniJson.Teksti(visa, "kysymys"), Fakta = MiniJson.Teksti(visa, "fakta"),
                Vaihtoehdot = vv.Select(s => s?.ToString() ?? "").ToList(),
            };
            var oikea = MiniJson.Kentta(visa, "oikea");
            v.Oikea = oikea is string os ? Math.Max(0, v.Vaihtoehdot.IndexOf(os)) : (int)(MiniJson.Luku(visa, "oikea") ?? 0);
            var palkinto = MiniJson.Teksti(d, "palkinto");
            return new Lehtitehtava
            {
                Kaupunki = kaupunki, Id = id, Otsake = MiniJson.Teksti(d, "otsake") ?? "", Palkinto = palkinto,
                Vihje = MiniJson.Teksti(d, "vihje"), Juliste = palkinto == "juliste" ? juliste : null,
                Sivu = MiniJson.Luku(d, "sivu") is double s ? (int)s : -1,
                Palkkio = MiniJson.Luku(d, "palkkio") is double p && p > 0 ? (int)p : KauppaVakiot.FokusTehtavaPalkkio,
                Visa = v,
            };
        }

        /// <summary>Varareitti: fokusvirran lehtitehtävät (vanhempi paketti), julisteavain webin säännöllä.</summary>
        static List<Lehtitehtava> Varalta(string kaupunki)
        {
            var l = new List<Lehtitehtava>();
            var raaka = Fokusvirrat.Hae(kaupunki)?.Lehtitehtavat;
            if (raaka == null) return l;
            foreach (var o in raaka.OfType<Dictionary<string, object>>())
            {
                // Web: tehtävän oma avain voittaa kaupungin oletuksen, jos se on julisteissa.
                string oma = MiniJson.Teksti(o, "juliste");
                string avain = oma != null && Juliste(oma) != null ? oma : kaupunki;
                var x = Tehtava(o, kaupunki, null, Juliste(avain) != null ? avain : null);
                if (x != null) l.Add(x);
            }
            return l;
        }

        static void LuePullat(string json)
        {
            if (string.IsNullOrEmpty(json)) return;
            var v = MiniJson.Kentta(MiniJson.Jasenna(json) as Dictionary<string, object>, "exportit") as Dictionary<string, object>;
            object Arvo(string nimi)
            {
                var x = MiniJson.Kentta(v, nimi);
                return x is Dictionary<string, object> o && o.ContainsKey("arvo") ? o["arvo"] : x;
            }
            if (Arvo("PULLA_NIMET") is Dictionary<string, object> n)
                foreach (var kv in n) if (kv.Value is string s && s.Length > 0) pullaNimet[kv.Key.ToUpperInvariant()] = s;
            if (Arvo("PULLA_YLEISNIMI") is string y && y.Length > 0) pullaYleisnimi = y;
        }

        /// <summary>Kaupungin lehtitehtävät (tyhjä, jos ei ladattu tai ei tehtäviä).</summary>
        public static IReadOnlyList<Lehtitehtava> Kaupungille(string kaupunki)
        {
            if (kaupunki == null || tehtavat == null) return Array.Empty<Lehtitehtava>();
            if (!tehtavat.TryGetValue(kaupunki, out var l)) tehtavat[kaupunki] = l = Varalta(kaupunki);
            return l;
        }

        /// <summary>Web pullanNimi: maan pullavastine tai yleisnimi.</summary>
        public static string PullanNimi(string kaupunki)
        {
            var iso = UiSisalto.Kaupunki(kaupunki)?.Maa;
            return iso != null && pullaNimet.TryGetValue(iso.ToUpperInvariant(), out var n) ? n : pullaYleisnimi;
        }

        static JulisteTiedot Juliste(string avain) =>
            avain == null ? null : UiSisalto.Julisteet.FirstOrDefault(j => j.Id == avain) ?? UiSisalto.Julisteet.FirstOrDefault(j => j.Id == null && j.Kaupunki == avain);

        // --- pelin tila lehden kautta (testiavauksessa suoraan kaupoista) -----------------------

        readonly Func<LehtiTila> tila;
        readonly Func<LehtiTeko, KauppaTulos> teko;
        readonly Kuvasuurennos suurennos;

        public LehtiFokus(Func<LehtiTila> tila, Func<LehtiTeko, KauppaTulos> teko, Kuvasuurennos suurennos)
        {
            this.tila = tila;
            this.teko = teko;
            this.suurennos = suurennos;
        }

        static Kaupat K => PeliOhjain.Instanssi?.Kaupat;

        bool Vastattu(string k, string a) => tila() is LehtiTila t ? t.MinitehtavaVastattu(k, a) : K?.MinitehtavaVastattu(k, a) ?? false;
        bool Oikein(string k, string a) => tila() is LehtiTila t ? t.MinitehtavaRatkaistu(k, a) : K?.MinitehtavaRatkaistu(k, a) ?? false;
        bool JulisteLaukussa(string avain) => tila() is LehtiTila t ? t.JulisteLaukussa(avain) : K?.JulisteLaukussa(avain) ?? false;
        bool Fokusmoodi => tila()?.Fokusmoodi ?? true;
        int Raha => tila()?.Raha ?? PeliOhjain.Instanssi?.Matka?.Tila.Pelaaja.Raha ?? int.MaxValue;

        /// <summary>Web aarreAuki: jälki jo kartalla tai laatta käännetty (avaajasta vain rahaa).</summary>
        bool AarreAuki(string k)
        {
            if (tila() is LehtiTila t) return t.AarreAuki(k);
            var kaupat = K;
            if (kaupat == null) return false;
            return kaupat.PullaVinkkiOstettu(k)
                || Kaupungille(k).Any(x => x.AvaaAarteen && kaupat.MinitehtavaRatkaistu(k, x.Aihe))
                || kaupat.MinitehtavaRatkaistu(k, Fokusdata.Aihe(Fokusdata.KulttuurivisaId))
                || !kaupat.Matka.LaattaTassa(k);
        }

        /// <summary>Web pullaTarjolla: aarteen avaus mahdollinen (kohtaaminen ja paikka) ja aarre vielä kiinni.</summary>
        bool PullaTarjolla(string k) => Fokusmoodi && Fokusvirrat.Hae(k)?.AarteenAvaus == true && !AarreAuki(k);

        /// <summary>
        /// Web fokusSivunTehtava: kaupunkilehti, pelaajan nykyinen kaupunki (testiavauksessa mikä tahansa),
        /// fokusmoodi ja sivulle sidottu tehtävä.
        /// </summary>
        public Lehtitehtava SivunTehtava(Lehti lehti, int sivu)
        {
            if (lehti == null || lehti.Laji != LehtiLaji.Kaupunki || tehtavat == null || !Fokusmoodi) return null;
            if (tila() != null)
            {
                var s = PeliOhjain.Instanssi?.Matka?.Tila.Pelaaja.Sijainti;
                if (s == null || !s.Value.Kaupungissa || s.Value.Kaupunki != lehti.Omistaja) return null;
            }
            return Kaupungille(lehti.Omistaja).FirstOrDefault(t => t.Sivu == sivu);
        }

        // --- piirto ----------------------------------------------------------------------------

        /// <summary>
        /// Kytkentä Lehtinakyman aihesivulle (web piirraSivunTehtava): piirtää sivun nimetyn tehtävän.
        /// Tosi = sivulla on nimetty tehtävä, jolloin sivun oma minitehtävä väistyy.
        /// </summary>
        public bool Piirra(VisualElement s, Lehti lehti, int sivu)
        {
            var t = SivunTehtava(lehti, sivu);
            if (t == null) return false;
            Tehtava(s, lehti.Omistaja, t);
            return true;
        }

        void Tehtava(VisualElement s, string kaupunki, Lehtitehtava t)
        {
            var juliste = t.Palkinto == "juliste" ? Juliste(t.Juliste) : null;
            string julisteAvain = juliste != null ? t.Juliste : null;
            bool rahaaVain = t.AvaaAarteen && AarreAuki(kaupunki);
            string nimilaatta = rahaaVain ? AarreAukiOtsake : (t.Otsake ?? "").ToUpperInvariant();

            var laatikko = Rakenne.El("mk-lehti__tehtava mk-fokus", s, PickingMode.Ignore);
            if (juliste != null) laatikko.AddToClassList("mk-fokus--palkinnollinen");
            var otsake = Rakenne.Teksti(nimilaatta, "mk-lehti__tehtavaotsake mk-fokus__otsake", laatikko);
            Kirjasimet.Aseta(otsake, Kirjasin.KoneBold); // web .minitehtava-otsikko font-weight 700

            if (Vastattu(kaupunki, t.Aihe))
            {
                var runko0 = Rakenne.El("mk-lehti__tehtavarunko", laatikko, PickingMode.Ignore);
                var palsta0 = Rakenne.El("mk-lehti__tehtavapalsta", runko0, PickingMode.Ignore);
                // Takautuva myöntö: oikein vastannut saa julisteensa, väärin vastannut ei.
                if (juliste != null)
                {
                    bool voitettu = Oikein(kaupunki, t.Aihe) || JulisteLaukussa(julisteAvain);
                    if (voitettu) teko(new LehtiTeko { Laji = LehtiTekoLaji.JulisteMyonto, Avain = julisteAvain, Kaupunki = kaupunki });
                    Julistepalkinto(runko0, juliste, voitettu);
                }
                Kirjasimet.Aseta(Rakenne.Teksti(t.Visa.Fakta ?? Ratkaistu, "mk-lehti__kysymys", palsta0), Kirjasin.LukuLihava);
                // Pulla on umpikujan avain: väärin vastannut voi yhä ostaa vinkin.
                if (t.AvaaAarteen) Pulla(laatikko, kaupunki, () => otsake.text = AarreAukiOtsake);
                return;
            }

            string vihjeteksti = rahaaVain ? AarreAukiVihje : t.Vihje ?? (t.AvaaAarteen ? AarteenVihje : JulisteenVihje);
            var vihje = Rakenne.Teksti(vihjeteksti, "mk-fokus__vihje", laatikko);
            Kirjasimet.Aseta(vihje, Kirjasin.LukuKursiivi);
            var runko = Rakenne.El("mk-lehti__tehtavarunko", laatikko, PickingMode.Ignore);
            var palsta = Rakenne.El("mk-lehti__tehtavapalsta", runko, PickingMode.Ignore);
            Action voita = juliste != null ? Julistepalkinto(runko, juliste, JulisteLaukussa(julisteAvain)) : null;
            Kirjasimet.Aseta(Rakenne.Teksti(t.Visa.Kysymys ?? "", "mk-lehti__kysymys", palsta), Kirjasin.LukuLihava);
            var vaihtoehdot = Rakenne.El("mk-fokus__vaihtoehdot", palsta, PickingMode.Ignore);
            var tulos = Rakenne.Teksti("", "mk-lehti__tehtavatulos", palsta);
            tulos.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(tulos, Kirjasin.Luku);

            for (int i = 0; i < t.Visa.Vaihtoehdot.Count; i++)
            {
                int valinta = i;
                var b = Rakenne.Nappi(t.Visa.Vaihtoehdot[i], "mk-nosto__visanappi mk-fokus__vastaus", null, vaihtoehdot);
                Kirjasimet.Aseta(b, Kirjasin.Luku);
                b.Insert(0, Rakenne.El("mk-fokus__ruutu", null, PickingMode.Ignore)); // web ::before-valintaruutu
                b.clicked += () =>
                {
                    bool oikein = valinta == t.Visa.Oikea;
                    // Tilanne ENNEN vastausta: kuittaus ei saa kertoa jäljen syttyneen, jos se paloi jo.
                    bool oliAuki = AarreAuki(kaupunki);
                    var r = teko(new LehtiTeko
                    {
                        Laji = LehtiTekoLaji.Minitehtavavastaus, Kaupunki = kaupunki, Aihe = t.Aihe, Oikein = oikein, Palkkio = t.Palkkio,
                        // Kukkaroleima "<nimilaatta> ratkesi" (web fokustehtavat.js sub, nimilaatta raakana).
                        Selite = rahaaVain ? AarreAukiOtsake : t.Otsake,
                    });
                    // Jo vastattu tai muu virhe: mitään ei piirretä eikä soiteta (web kirjaa → !ok).
                    if (r != null && !r.Ok) return;
                    vihje.RemoveFromHierarchy();
                    vaihtoehdot.Clear();
                    tulos.text = (oikein ? Kieli.T("ui.lehtifokus.oikein", t.Palkkio) : Kieli.T("ui.lehtifokus.oikea-vastaus", t.Visa.Vaihtoehdot[t.Visa.Oikea])) + (t.Visa.Fakta ?? "");
                    tulos.EnableInClassList("mk-oikein", oikein);
                    tulos.EnableInClassList("mk-vaarin", !oikein);
                    tulos.style.display = DisplayStyle.Flex;
                    Aanet.PulunTehoste(oikein ? "correct" : "wrong");
                    if (oikein && juliste != null)
                    {
                        // Juliste kokoelmaan heti, katselu vasta napista (omistaja 22.8.2026).
                        teko(new LehtiTeko { Laji = LehtiTekoLaji.JulisteMyonto, Avain = julisteAvain, Kaupunki = kaupunki });
                        voita?.Invoke();
                        var lunasta = Rakenne.Nappi(Kieli.T("ui.nosto.lunasta-juliste"), "mk-lehti__lunastus", () => NaytaJuliste(juliste), palsta);
                        Kirjasimet.Aseta(lunasta, Kirjasin.LukuLihava);
                    }
                    // Aarteen avaajan oikea vastaus: pulla ei ole enää tarjolla (jälki syttyi).
                    if (oikein && t.AvaaAarteen) laatikko.Q(className: "mk-fokus__pulla")?.RemoveFromHierarchy();
                    // Livia kertoo palkinnosta viimeisenä (kirjanpito on jo tallessa).
                    if (oikein) Pulu.Hae().Sano(Kuittaus(kaupunki, t, oliAuki));
                };
            }

            // Tarjous vastauslipukkeiden alle, ei niiden sekaan.
            if (t.AvaaAarteen)
                Pulla(laatikko, kaupunki, () =>
                {
                    otsake.text = AarreAukiOtsake;
                    if (vihje.parent != null) vihje.text = AarreAukiVihje;
                });
        }

        /// <summary>Web kuittausTeksti: mitä tapahtui ja mitä on vielä tekemättä (enintään kaksi virkettä).</summary>
        string Kuittaus(string kaupunki, Lehtitehtava t, bool auki)
        {
            var kaikki = Kaupungille(kaupunki);
            if (t.AvaaAarteen)
            {
                var juliste = kaikki.FirstOrDefault(x => x.Palkinto == "juliste" && !Vastattu(kaupunki, x.Aihe));
                if (juliste == null) return auki ? AarreRahaa : AarreSyttyi;
                return Kieli.T("ui.lehtifokus.kuittaus-juliste", auki ? AarreRahaaLyhyt : AarreSyttyi, Suunta(t, juliste), juliste.Otsake);
            }
            var aarre = auki ? null : kaikki.FirstOrDefault(x => x.AvaaAarteen && !Vastattu(kaupunki, x.Aihe));
            return aarre == null ? JulisteKehu : Kieli.T("ui.lehtifokus.kuittaus-aarre", JulisteTalteen, aarre.Otsake);
        }

        static string Suunta(Lehtitehtava t, Lehtitehtava kohde) =>
            Kieli.T(t.Sivu < 0 || kohde.Sivu < 0 ? "ui.lehtifokus.suunta-lehden" : kohde.Sivu > t.Sivu ? "ui.lehtifokus.suunta-seuraavan" : "ui.lehtifokus.suunta-edellisen");

        // --- pulla Livialle --------------------------------------------------------------------

        /// <summary>
        /// Web piirraPullaOstos + pullaOstosnappi: kaksi napautusta (varmistus raukeaa 6 s:ssa), tyhjä
        /// kassa harmaana Livian äänellä, onnistunut osto jättää kuittausrivin napin tilalle.
        /// </summary>
        void Pulla(VisualElement laatikko, string kaupunki, Action aarreAvattiin)
        {
            if (!PullaTarjolla(kaupunki)) return;
            string nimi = PullanNimi(kaupunki);
            int hinta = KauppaVakiot.PullaHinta;
            var rivi = Rakenne.El("mk-fokus__pulla", laatikko, PickingMode.Ignore);
            var nappi = Rakenne.Nappi("", "mk-fokus__pullanappi", null, rivi);
            Kirjasimet.Aseta(nappi, Kirjasin.LukuLihava);
            var huomio = Rakenne.Teksti("", "mk-fokus__pullahuomio", rivi);
            Kirjasimet.Aseta(huomio, Kirjasin.LukuKursiivi);
            bool odottaa = false;
            IVisualElementScheduledItem ajastin = null;

            void Paivita()
            {
                var teksti = nappi.Q<Label>();
                if (Raha < hinta)
                {
                    odottaa = false;
                    nappi.EnableInClassList("mk-fokus__pullanappi--varmistus", false);
                    nappi.EnableInClassList("mk-fokus__pullanappi--koyha", true);
                    nappi.pickingMode = PickingMode.Ignore;
                    teksti.text = Kieli.T("ui.sahke.koyha-vinkki", nimi, hinta);
                    huomio.text = PullaKoyhaLivia;
                    huomio.style.display = DisplayStyle.Flex;
                    return;
                }
                nappi.EnableInClassList("mk-fokus__pullanappi--koyha", false);
                nappi.pickingMode = PickingMode.Position;
                nappi.EnableInClassList("mk-fokus__pullanappi--varmistus", odottaa);
                teksti.text = odottaa ? Kieli.T("ui.sahke.varmista-vinkki", nimi, hinta) : Kieli.T("ui.lehtifokus.osta-pulla", nimi, hinta);
                huomio.text = odottaa ? PullaVarmistusOhje : "";
                huomio.style.display = odottaa ? DisplayStyle.Flex : DisplayStyle.None;
            }

            nappi.clicked += () =>
            {
                if (!odottaa)
                {
                    odottaa = true;
                    Paivita();
                    ajastin?.Pause();
                    ajastin = nappi.schedule.Execute(() => { odottaa = false; Paivita(); });
                    ajastin.ExecuteLater(PullaVarmistusMs);
                    return;
                }
                ajastin?.Pause();
                var r = teko(new LehtiTeko { Laji = LehtiTekoLaji.PullaVinkki, Kaupunki = kaupunki, Selite = Kieli.T("ui.lehtifokus.pulla-livialle", nimi) });
                if (r != null && !r.Ok)
                {
                    // Kassa ehti tyhjentyä tai ostos on jo tehty: nappi kertoo tilanteen.
                    odottaa = false;
                    Paivita();
                    return;
                }
                rivi.Clear();
                Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.lehtifokus.pulla-tehty", nimi, hinta), "mk-fokus__pullatehty", rivi), Kirjasin.LukuKursiivi);
                aarreAvattiin?.Invoke();
                // Kiitos ja vinkki yhdessä kuplassa, sitten pullariemu (web kuittausPinta → bunGranted).
                var pulu = Pulu.Hae();
                pulu.Sano(Kieli.T("ui.lehtifokus.pulla-kiitos", char.ToUpperInvariant(nimi[0]) + nimi.Substring(1)));
                pulu.Tilanne("bunGranted");
            };
            Paivita();
        }

        // --- juliste ---------------------------------------------------------------------------

        /// <summary>Pikkuvedos tehtävälaatikon kyljessä (web piirraJulistepalkinto); palauttaa "merkitse voitetuksi".</summary>
        Action Julistepalkinto(VisualElement runko, JulisteTiedot j, bool voitettu)
        {
            var kotelo = Rakenne.El("mk-lehti__julistepalkinto", runko);
            var kuva = Rakenne.El("mk-lehti__julistekuva", kotelo, PickingMode.Ignore);
            var merkki = Rakenne.Teksti("", "mk-lehti__julistemerkki", kotelo);
            Kirjasimet.Aseta(merkki, Kirjasin.KoneLihava);
            Natiivi.Kuvat.Hae(j.Url, t =>
            {
                if (t == null) { kotelo.RemoveFromHierarchy(); return; }
                kuva.style.backgroundImage = new StyleBackground(t);
                kuva.style.height = Mathf.Round(kuva.resolvedStyle.width * t.height / Mathf.Max(1f, t.width));
            });
            kuva.RegisterCallback<GeometryChangedEvent>(e =>
            {
                var tx = kuva.resolvedStyle.backgroundImage.texture;
                if (tx != null) kuva.style.height = Mathf.Round(e.newRect.width * tx.height / Mathf.Max(1f, tx.width));
            });
            void Aseta(bool v)
            {
                kotelo.EnableInClassList("mk-voitettu", v);
                merkki.text = Kieli.T(v ? "ui.lehtifokus.voitettu" : "ui.lehtifokus.palkinto");
            }
            Aseta(voitettu);
            kotelo.RegisterCallback<ClickEvent>(_ => { if (kotelo.ClassListContains("mk-voitettu")) NaytaJuliste(j); });
            return () => Aseta(true);
        }

        void NaytaJuliste(JulisteTiedot j) =>
            suurennos.Avaa(new List<LehtiKuva>
            {
                new LehtiKuva
                {
                    Lahde = j.Url, Otsikko = j.Otsikko, Lyhyt = j.Lyhyt, Selite = j.Selite ?? j.Lyhyt ?? j.Otsikko,
                    LahdeRivi = Kieli.T("ui.nosto.oma-paino"),
                },
            });

        // --- testi -----------------------------------------------------------------------------

        /// <summary>Ensimmäisen tehtävän sivu (juliste = julistetehtävän); -1 = kaupungilla ei ole tehtäviä.</summary>
        public static int TestiSivu(string kaupunki, bool juliste)
        {
            var l = Kaupungille(kaupunki);
            return (l.FirstOrDefault(t => (t.Palkinto == "juliste") == juliste) ?? l.FirstOrDefault())?.Sivu ?? -1;
        }

        /// <summary>Testikomento: "fokus-vastaa n" napauttaa vaihtoehtoa n, "fokus-pulla" pullanappia (kahdesti = osto).</summary>
        public static string Testaa(VisualElement sivu, string mita, int n)
        {
            var laatikko = sivu?.Q(className: "mk-fokus");
            if (laatikko == null) return "sivulla ei ole fokustehtävää";
            Button b = mita == "fokus-pulla" ? laatikko.Q<Button>(className: "mk-fokus__pullanappi")
                : laatikko.Query<Button>(className: "mk-fokus__vastaus").ToList().ElementAtOrDefault(n);
            if (b == null) return mita == "fokus-pulla" ? "ei pullatarjousta" : "ei vaihtoehtoa " + n;
            using (var e = NavigationSubmitEvent.GetPooled()) { e.target = b; b.SendEvent(e); }
            return null;
        }
    }
}
