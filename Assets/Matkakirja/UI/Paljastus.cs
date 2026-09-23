// AARTEEN PALJASTUS (Natiivi-UI, Fablen B4): webin js/ui.js playTokenReveal / naytaPolloAarre /
// rakennaPaljastus / odotaPaljastuksenSulku ja css .reveal-* — koko ruudun hetki, kun laatan
// alta löytyy aarre (web visa.js answerQuiz: oikea vastaus ja löytö → paljastus → tulos).
//
// Mallit (web malli-valinta, omistajan leiskapäätökset 28.8.2026):
//   tumma       yömusta (#0b0805): pääaarre, mantereen aarre ja kuvattomat löydöt. Pääaarteella
//               yläpuolella "AARNIN LUETTELO" ja "MANNER · UNOHDETTU AARRE", kuvan alla nimi,
//               "Vie unohdettu aarre kotiin ja voitat pelin!", fakta, arvo "ARVO 2000 PUNTAA" ja
//               punainen leima "LÖYDETTY · pv · kk" (lyödään 0,7 s tekstien jälkeen).
//   paikallis   vaalea pergamentti (#e6d8ae): maan oma paikallisaarrekuva (…/aarteet/paikallis/…).
//               Nimi, "+N puntaa", fakta. Ei luettelon tekstejä (kaanon: vain unohdetut aarteet).
//   pöllö       tumma; nimilappu "~~Viisas Pöllö~~ Pulu", selite ja esittely (web POLLO_AARRE).
// Kaaren aarreteksti (web TARINAKAARI[kaupunki].aarre, .reveal-isoisa) fakta-rivin alle.
//
// Rytmi (web): tausta 0,25 s → 0,42 s kuva nousee (0,9 s) → 0,76 s tekstit → pääaarteella leima
// 0,7 s myöhemmin (napautus ohittaa odotuksen) → "Jatka matkaa" näkyviin. Vasta silloin nappi
// tai napautus mihin tahansa sulkee (ajastinta ei ole, web v1119). Pieni liike: kaikki kerralla
// ja 0,9 s tauko ennen sulkukahvaa.
//
// Äänet paljastushetkellä (vain pelissä, testikomento on hiljainen): aarremusiikki
// (audio/musa-aarre-lyria.mp3, pääaarteella musa-paaaarre-lyria.mp3; Musiikki-kytkin) ja
// pääaarteen hihkaisu (audio/huudahdus-star-n.mp3, kertojan kanava; Kertoja-kytkin). Laatan
// tehosteen (star/gem) soittaa ohjain jo löytöhetkellä (PeliOhjain.Aani, Aanitunnukset.Aarre).
// Livia ilahtuu (tunne ilo 0,8). Sulkeutuessa Suljettiin(aarre): UiNakymat heilauttaa laukkua.
// Kaanon: pääaarteella ei tähteä (kuva tai kätköarkku).
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Paljastus
    {
        static readonly string[] Kuut = { "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII" };

        // Web REVEAL_SUB.star ja POLLO_AARRE (js/ui-apurit.js, js/pollo.js; päätoimittajan kaanonteksti).
        public const string PaaaarreRivi = "Vie unohdettu aarre kotiin ja voitat pelin!";
        const string PolloSelite = "Columba Livia, kirjekyyhky, liittyy seuraan";
        const string PolloEsittely = "Laatan alta löytyy Livia — täydeltä nimeltään Columba Livia, "
            + "kirjekyyhky, jonka suku on kantanut viestejä Caesarille ja Pariisin "
            + "piiritykseen. Hän tuuraa Viisasta Pöllöä, joka palaa aivan pian, ja "
            + "kasvattaa sillä välin sinun untuvikkopöllöäsi. Napauta häntä, kun "
            + "haluat kysyä jotakin maailmasta.";

        // Web js/aani-ehdokkaat.js HUUDAHDUKSET.star: kolme luettua hihkaisua (huudahdus-star-1…3.mp3).
        const int PaaHihkaisuja = 3;
        // Web AARRE_MUSIIKKI (musaPolku + MUSIIKIN_PAATE "-lyria"), ämpärin audio/-kansio.
        const string MusiikkiTavallinen = Aanet.Juuri + "audio/musa-aarre-lyria.mp3";
        const string MusiikkiPaa = Aanet.Juuri + "audio/musa-paaaarre-lyria.mp3";
        // Web AARRE_MUSIIKIN_VOIMA ≈ 0,13 musiikin oletusliu'ulla; natiivin oletus Voima.Musiikki = 0,35.
        const float MusiikinKerroin = 0.13f / 0.35f;

        const int KuvaMs = 420, TekstiMs = 760, LeimaMs = 700, PieniLiikeMs = 900;

        readonly VisualElement kerros, tunnus, kuva, kuvapaikka, loyto, leima;
        readonly Label alaotsake, nimi, palkkio, fakta, isoisa, arvo, leimaPvm;
        readonly Button jatka;
        Action suljettu;
        Action ohitaOdotus;
        int versio;
        bool sulkuSallittu, aarreNyt;
        AudioSource musiikki;
        static readonly System.Random arpa = new System.Random();

        public bool Auki { get; private set; }

        /// <summary>Paljastus suljettiin (true = aarre, ei pöllö): laukku heilahtaa (web elavoitaLaukku).</summary>
        public event Action<bool> Suljettiin;

        public Paljastus(UiKerros ui)
        {
            kerros = Rakenne.El("mk-paljastus", ui.Juuri(UiKerros.Valikot));
            kerros.style.display = DisplayStyle.None;
            // Web: napautus mihin tahansa sulkee vasta, kun Jatka matkaa on näkyvissä; sitä ennen se
            // vain ohittaa leiman odotuksen (odota = race(wait, napautus)).
            kerros.RegisterCallback<PointerDownEvent>(_ =>
            {
                if (sulkuSallittu) Sulje();
                else { var o = ohitaOdotus; ohitaOdotus = null; o?.Invoke(); }
            });
            var scene = Rakenne.El("mk-paljastus__scene", kerros, PickingMode.Ignore);

            tunnus = Rakenne.El("mk-paljastus__tunnus", scene, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("AARNIN LUETTELO", "mk-paljastus__otsake", tunnus), Kirjasin.KoneLihava);
            Rakenne.Tausta(Rakenne.El("mk-paljastus__viiva", tunnus, PickingMode.Ignore),
                Kuviot.Vaaka("paljastus-viiva", Kuviot.Vari("#e8c98a", 0f), Kuviot.Vari("#e8c98a", 0.72f)));
            alaotsake = Rakenne.Teksti("UNOHDETTU AARRE", "mk-paljastus__alaotsake", tunnus);
            Kirjasimet.Aseta(alaotsake, Kirjasin.Kone);

            kuvapaikka = Rakenne.El("mk-paljastus__kuvapaikka", scene, PickingMode.Ignore);
            kuva = Rakenne.El("mk-paljastus__kuva", kuvapaikka, PickingMode.Ignore);
            Rakenne.Tausta(Rakenne.El("mk-paljastus__reuna", kuvapaikka, PickingMode.Ignore), Kuviot.Vinjetti);

            var caption = Rakenne.El("mk-paljastus__caption", scene, PickingMode.Ignore);
            nimi = Rakenne.Teksti("", "mk-paljastus__nimi", caption);
            Kirjasimet.Aseta(nimi, Kirjasin.LukuLihava);
            palkkio = Rakenne.Teksti("", "mk-paljastus__palkkio", caption);
            Kirjasimet.Aseta(palkkio, Kirjasin.Luku);
            fakta = Rakenne.Teksti("", "mk-paljastus__fakta", caption);
            Kirjasimet.Aseta(fakta, Kirjasin.LukuKursiivi);
            isoisa = Rakenne.Teksti("", "mk-paljastus__isoisa", caption);
            Kirjasimet.Aseta(isoisa, Kirjasin.Luku);

            loyto = Rakenne.El("mk-paljastus__loyto", scene, PickingMode.Ignore);
            arvo = Rakenne.Teksti("", "mk-paljastus__arvo", loyto);
            Kirjasimet.Aseta(arvo, Kirjasin.Kone);
            leima = Rakenne.El("mk-paljastus__leima", loyto, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("LÖYDETTY", "mk-paljastus__leimateksti", leima), Kirjasin.KoneLihava);
            leimaPvm = Rakenne.Teksti("", "mk-paljastus__leimapvm", leima);
            Kirjasimet.Aseta(leimaPvm, Kirjasin.KoneLihava);

            jatka = Rakenne.Nappi("JATKA MATKAA", "mk-paljastus__jatka", Sulje, scene);
            Kirjasimet.Aseta(jatka, Kirjasin.KoneLihava);
        }

        static bool Aarre(string tyyppi) => tyyppi == "star" || tyyppi == "pieniAarre" || tyyppi == "isoAarre" || tyyppi == "mannerAarre";

        /// <summary>Paljastetaanko tämä löytö (web: quiz.right && quiz.found; aarretyypit ja pöllö)?</summary>
        public static bool Kuuluu(KysymysNaytto d) => d != null && d.Oikein && (Aarre(d.LoytoTyyppi) || d.LoytoTyyppi == "pollo");

        /// <summary>
        /// Näyttää paljastuksen kysymyksen löydöstä. valmis kutsutaan suljettaessa.
        /// aanet = false: ei musiikkia, hihkaisua eikä Livian elettä (testikomento).
        /// kaupunki = löytökaupunki mantereen nimeä varten (oletus pelaajan kaupunki).
        /// </summary>
        public void Nayta(KysymysNaytto d, Action valmis = null, bool aanet = true, string kaupunki = null)
        {
            suljettu = valmis;
            string tyyppi = d.LoytoTyyppi;
            bool pollo = tyyppi == "pollo";
            bool paa = tyyppi == "star";
            aarreNyt = Aarre(tyyppi);
            // Web: maan oma paikallisaarrekuva → vinjetointimalli; kaikki muut tummassa.
            bool paikallis = !pollo && d.LoytoKuvaUrl != null && d.LoytoKuvaUrl.Contains("/aarteet/paikallis/");
            kerros.EnableInClassList("mk-paljastus--paikallis", paikallis);
            tunnus.style.display = paa ? DisplayStyle.Flex : DisplayStyle.None;
            loyto.style.display = paa ? DisplayStyle.Flex : DisplayStyle.None;

            // Luettelon alaotsake: "EUROOPPA · UNOHDETTU AARRE" (web MANNER_NIMET[mannerOf(kaupunki)]).
            string k = kaupunki ?? PeliOhjain.Instanssi?.PelaajanKaupunki;
            string manner = k != null ? UiSisalto.Kaupunki(k)?.Manner : null;
            alaotsake.text = manner != null && KauppaVakiot.MannerNimet.TryGetValue(manner, out var mn)
                ? mn.Nimi.ToUpperInvariant() + " · UNOHDETTU AARRE" : "UNOHDETTU AARRE";

            // Nimi: pöllöllä yliviivattu nimilappu (web polloNimilappu), muuten löydön nimi.
            nimi.enableRichText = pollo;
            nimi.text = pollo ? "<s>Viisas Pöllö</s> Pulu" : d.LoytoNimi ?? NimiRivista(d.Loyto) ?? "";
            // Alarivi: web REVEAL_SUB[type] ?? "+N puntaa" (löytöhetken arvo).
            string rivi = pollo ? PolloSelite : paa ? PaaaarreRivi : Puntaa(d.Loyto);
            Nakyy(palkkio, rivi);
            Nakyy(fakta, pollo ? null : d.LoytoFakta);
            Nakyy(isoisa, pollo ? PolloEsittely : KaarenAarre(d));

            var nyt = DateTime.Now;
            arvo.text = paa ? $"ARVO {LaattaVakiot.PaaaarrePalkkio} PUNTAA" : "";
            leimaPvm.text = $"{nyt.Day} · {Kuut[nyt.Month - 1]}";

            int v = ++versio;
            kuva.style.backgroundImage = StyleKeyword.None;
            kuvapaikka.Q<LaattaIkoni>()?.RemoveFromHierarchy();
            // Kuva: löydön oma (manner-/maakohtainen), laattatyypin aarrekuva tai piirros varana.
            string url = pollo ? null : !string.IsNullOrEmpty(d.LoytoKuvaUrl) ? d.LoytoKuvaUrl
                : LaattaIkoni.AarreKuvat.TryGetValue(tyyppi ?? "", out var u) ? u : null;
            if (url != null)
                Kuvat.Hae(url, t =>
                {
                    if (v != versio) return;
                    if (t != null) kuva.style.backgroundImage = new StyleBackground(t);
                    else Vara(tyyppi);
                });
            else Vara(tyyppi);

            // Tila alkuun.
            sulkuSallittu = false;
            ohitaOdotus = null;
            foreach (var c in new[] { "mk-auki", "mk-kuva", "mk-nakyy", "mk-lyoty", "mk-jatka" }) kerros.RemoveFromClassList(c);
            jatka.pickingMode = PickingMode.Ignore;
            kerros.style.display = DisplayStyle.Flex;
            Auki = true;
            SyoteLukko.Esta(this);

            bool liike = !LinssiUi.VahennettyLiike();
            void Myohemmin(long ms, Action a) => kerros.schedule.Execute(() => { if (v == versio) a(); }).StartingIn(ms);
            void KuvaEsiin()
            {
                kerros.AddToClassList("mk-kuva");
                if (!aanet) return;
                if (aarreNyt) Pulu.Hae().Tunne("ilo", 0.8f);
                // Web playTokenReveal: sfx.play(treasureSound(type)) kuvan noustessa (ei pöllöllä, naytaPolloAarre).
                // Pelikoodari b32be57: ohjain ei enää soita laatan ääntä vastaushetkellä.
                if (!pollo) Aanet.Tehoste(Aanitunnukset.Aarre(tyyppi));
                SoitaMusiikki(pollo ? null : paa ? MusiikkiPaa : MusiikkiTavallinen);
                if (paa) SoitaHihkaisu();
            }
            void JatkaEsiin()
            {
                kerros.AddToClassList("mk-jatka");
                jatka.pickingMode = PickingMode.Position;
                sulkuSallittu = true;
            }
            void OdotaTaiNapauta(long ms, Action a)
            {
                bool tehty = false;
                void Kerran() { if (tehty || v != versio) return; tehty = true; ohitaOdotus = null; a(); }
                ohitaOdotus = Kerran;
                kerros.schedule.Execute(Kerran).StartingIn(ms);
            }

            kerros.schedule.Execute(() => { if (v == versio) kerros.AddToClassList("mk-auki"); });
            if (!liike)
            {
                // Web reducedMotion: kaikki kerralla, leima lyöty, 0,9 s (napautus ohittaa) ja sulkukahva.
                KuvaEsiin();
                kerros.AddToClassList("mk-nakyy");
                if (paa) kerros.AddToClassList("mk-lyoty");
                OdotaTaiNapauta(PieniLiikeMs, JatkaEsiin);
                return;
            }
            Myohemmin(KuvaMs, KuvaEsiin);
            Myohemmin(KuvaMs + TekstiMs, () =>
            {
                kerros.AddToClassList("mk-nakyy");
                if (!paa) { JatkaEsiin(); return; }
                // Leiman lyönti: kortti luetaan hetki, sitten LÖYDETTY jalkaan (napautus ohittaa odotuksen).
                OdotaTaiNapauta(LeimaMs, () => { kerros.AddToClassList("mk-lyoty"); JatkaEsiin(); });
            });
        }

        static void Nakyy(Label l, string teksti)
        {
            l.text = teksti ?? "";
            l.style.display = string.IsNullOrEmpty(teksti) ? DisplayStyle.None : DisplayStyle.Flex;
        }

        /// <summary>"Löysit: X · +640 £" → "+640 puntaa" (web `+${arvo} puntaa`), tai null.</summary>
        static string Puntaa(string loyto)
        {
            if (string.IsNullOrEmpty(loyto)) return null;
            var m = Regex.Match(loyto, @"\+(\d+)\s*£");
            return m.Success ? "+" + m.Groups[1].Value + " puntaa" : null;
        }

        /// <summary>"Löysit: X · …" → "X" (varanimi, jos ohjain ei antanut LoytoNimeä).</summary>
        static string NimiRivista(string loyto)
        {
            if (string.IsNullOrEmpty(loyto) || !loyto.StartsWith("Löysit: ", StringComparison.Ordinal)) return null;
            var r = loyto.Substring(8).Split('\n')[0];
            int i = r.IndexOf(" · ", StringComparison.Ordinal);
            return i >= 0 ? r.Substring(0, i) : r;
        }

        /// <summary>
        /// Kaaren aarreteksti (web TARINAKAARI[kaupunki].aarre): Pelikoodarin KysymysNaytto.KaariAarre
        /// (b32be57). Varana vanha päättely: ohjain liittää tekstin repliikin ensimmäiseksi riviksi ja
        /// antaa samalla kätkökuvan (KysymysApu.LisaaKohtaaminen).
        /// </summary>
        static string KaarenAarre(KysymysNaytto d)
        {
            if (!string.IsNullOrEmpty(d.KaariAarre)) return d.KaariAarre;
            if (string.IsNullOrEmpty(d.KatkoKuvaUrl) || string.IsNullOrEmpty(d.Repliikki)) return null;
            foreach (var r in d.Repliikki.Split('\n')) if (r.Trim().Length > 0) return r.Trim();
            return null;
        }

        void Vara(string tyyppi)
        {
            // Ei kuvaa: sama piirros kuin tulosruudussa (kätköarkku, ei tähteä; pöllöllä viivaikoni).
            var ikoni = new LaattaIkoni(tyyppi == "star" ? "isoAarre" : tyyppi);
            ikoni.AddToClassList("mk-paljastus__varaikoni");
            kuvapaikka.Add(ikoni);
        }

        // --- äänet ----------------------------------------------------------------------------

        /// <summary>Web soitaAarreMusiikki: Musiikki-kytkin, edellinen aihe pois; puuttuva tiedosto on hiljainen.</summary>
        void SoitaMusiikki(string url)
        {
            if (url == null || !Asetukset.Paalla(Kytkin.Aanimaisema) || !Asetukset.Paalla(Kytkin.Musiikki)) return;
            int v = versio;
            Aanet.Hae(url, klippi =>
            {
                if (klippi == null || v != versio) return;
                if (musiikki == null)
                {
                    musiikki = UiKerros.Hae().gameObject.AddComponent<AudioSource>();
                    musiikki.playOnAwake = false;
                }
                musiikki.Stop();
                musiikki.clip = klippi;
                musiikki.volume = Mathf.Clamp01(Asetukset.Taso(Voima.Musiikki) * MusiikinKerroin);
                musiikki.Play();
            });
        }

        /// <summary>Web soitaHihkaisu: pääaarteen luettu hihkaisu kertojan kanavalla, ei kertojattomassa tilassa.</summary>
        static void SoitaHihkaisu()
        {
            if (!Asetukset.Paalla(Kytkin.Kertoja)) return;
            Aanet.Soita(AaniKanava.Kertoja, Aanet.Juuri + $"audio/huudahdus-star-{arpa.Next(PaaHihkaisuja) + 1}.mp3");
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            versio++;
            sulkuSallittu = false;
            ohitaOdotus = null;
            kerros.RemoveFromClassList("mk-auki");
            kerros.schedule.Execute(() => { if (!Auki) kerros.style.display = DisplayStyle.None; }).StartingIn(300);
            SyoteLukko.Vapauta(this);
            var s = suljettu;
            suljettu = null;
            s?.Invoke();
            Suljettiin?.Invoke(aarreNyt);
        }

        // --- testikomento (ui paljastus) --------------------------------------------------------

        /// <summary>
        /// Testikomento ilman peliä ja ilman ääniä: tyyppi star (oletus) | isoAarre | pieniAarre |
        /// mannerAarre | pollo | piirros (kuvaton), kaupunki mantereen nimeä varten (oletus pariisi),
        /// kaari = paikkamerkki kaaren aarretekstille. Nimet ja faktat ovat KysymysEsimerkin (FIN).
        /// </summary>
        public string Testaa(string argumentit)
        {
            string tyyppi = "star", kaupunki = "pariisi";
            bool kaari = false;
            var tyypit = new HashSet<string> { "star", "isoaarre", "pieniaarre", "manneraarre", "pollo", "piirros" };
            foreach (var a in (argumentit ?? "").Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries))
            {
                string x = a.ToLowerInvariant();
                if (x == "kaari") kaari = true;
                else if (tyypit.Contains(x)) tyyppi = x == "isoaarre" ? "isoAarre" : x == "pieniaarre" ? "pieniAarre" : x == "manneraarre" ? "mannerAarre" : x;
                else kaupunki = x;
            }
            var d = new KysymysNaytto { Vastattu = true, Oikein = true, TulosVaihe = 2, LoytoTyyppi = tyyppi };
            switch (tyyppi)
            {
                case "star":
                    d.Loyto = "Löysit: Unohdettu aarre · +1 ◈";
                    break;
                case "isoAarre":
                    d.LoytoNimi = "Ivalojoen kultahippu";
                    d.Loyto = "Löysit: Ivalojoen kultahippu · +640 £";
                    d.LoytoKuvaUrl = Kuvat.PeiliJuuri + "kohtaamiset/aarteet/paikallis/fin-iso.jpg";
                    d.LoytoFakta = "Ivalojoen kultaryntäys alkoi 1870, ja huippuvuonna 1871 joelta huuhdottiin yli 50 kiloa kultaa.";
                    break;
                case "pieniAarre":
                    d.LoytoNimi = "Tervatynnyrin pohjalta löytynyt hopeariksi";
                    d.Loyto = "Löysit: Tervatynnyrin pohjalta löytynyt hopeariksi · +180 £";
                    d.LoytoKuvaUrl = Kuvat.PeiliJuuri + "kohtaamiset/aarteet/paikallis/fin-pieni.jpg";
                    d.LoytoFakta = "Terva oli 1800-luvun Suomen tärkein vientitavara, ja Oulu oli maailman suurimpia tervasatamia.";
                    break;
                case "mannerAarre":
                    d.Loyto = "Löysit: Mantereen aarre · +1000 £";
                    break;
                case "pollo":
                    d.Loyto = "Laatan alta lehahti pöllö!";
                    break;
                default: // piirros: kuvaton iso aarre
                    d.LoytoTyyppi = "isoAarre";
                    d.Loyto = "Löysit: Kätketty matka-arkku · +640 £";
                    break;
            }
            if (kaari)
            {
                d.KatkoKuvaUrl = "https://matkakirja.app/assets/kohtaamiset/kohtaaminen-katko.jpg";
                d.Repliikki = "(Kaaren aarreteksti tulee tähän: testikomennon paikkamerkki, ei kaanonia.)";
            }
            UiSisalto.Lataa(() => Nayta(d, () => Debug.Log("MATKAKIRJA ui paljastus: suljettu"), false, kaupunki));
            return null;
        }
    }
}
