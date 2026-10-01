// MYLLY-NÄKYMÄ (Siirtoseppä 1.10.2026; omistajan hyväksymä lautapelien pohja, Päätoimittajan loki b3e273d72):
//   PELI    = KUVANÄKYMÄ (lauta kuvan paikalla, himmennys-kuva 92 %, ✕ 44 pt) + PANEELI (PAPERI-pergamentti: kapiteeli,
//             vuororivi, pelaajarivit, ohje, napit Säännöt / Luovuta). KAPEA: paneeli laudan alla; KESKI/LEVEÄ: oikealla 350 pt.
//   VALINTA = KORTTI (vastustaja: KYTKIN-ryhmä Helppo / Normaali / Vaikea + Kaveri samalla laitteella; Peruuta / Aloita peli).
//   TULOS   = KORTTI (voitto, häviö, tasapeli; botin voitosta palkkio PelinTalous.Minipeli; "Tulos kirjattiin matkakirjaan.").
// Vain tyylikirjan arvot (Tyylikirja.cs, Tyylikirja.uss); äänet olemassa olevista tehosteista (click, correct, coin, wrong).
// Säännöt ja botti: Peli/Pelit/Mylly.cs ja Pelikehys.cs (Peli-testit MyllyTestit). Botti hakee kopiosta taustasäikeessä.
// Testikomento: ui mylly [valinta | peli helppo|normaali|vaikea|kaveri | asema <24 merkkiä> <käsi0> <käsi1> <vuoro> | tila | sulje].
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Peli;
using Matkakirja.Peli.Pelit;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class MyllyNakyma
    {
        static MyllyNakyma instanssi;
        public static MyllyNakyma Hae() => instanssi ??= new MyllyNakyma(UiKerros.Hae());
        /// <summary>UiNakymat.SuljeKaikki: ei luo näkymää, jos sitä ei ole avattu.</summary>
        public static void SuljeJosAuki() => instanssi?.Sulje();

        /// <summary>Paikan tiedot kohteelta (pelikatalogi: Mühle Saksassa, Mlin Serbiassa, Moara Moldovassa).</summary>
        public string Paikka = null, PaikallinenNimi = "Mühle", Maa = "Saksa";

        readonly VisualElement juuri, peliTaso, paneeli, korttiTaso;
        readonly MyllyLauta lauta;
        readonly Label kapiteeli, vuoroRivi, nimi0, nimi1, lukema0, lukema1, ohje;
        readonly VisualElement merkki0, merkki1;
        readonly Kortti valintaKortti, tulosKortti;
        readonly List<Button> tasoNapit = new List<Button>();
        readonly Label tulosKapiteeli, tulosOtsikko, tulosApuri, tulosPalkkio, tulosKirjattu;
        readonly VisualElement tulosPalkkioRivi;

        Mylly peli;
        Vastustaja vastustaja = Vastustaja.BottiNormaali;
        readonly List<MyllySiirto> siirrot = new List<MyllySiirto>();
        int valittu = -1, poistoKohde = -1, poistoLahde = -1;
        bool bottiMiettii, paattynyt;
        int kerta;
        readonly Satunnainen sat = new Satunnainen((long)DateTime.Now.Ticks);

        public bool Auki { get; private set; }

        MyllyNakyma(UiKerros kerros)
        {
            juuri = kerros.Juuri(UiKerros.Pelidialogit);

            // PELI: KUVANÄKYMÄ + PANEELI.
            peliTaso = Rakenne.El("mk-himmennys mk-peli", juuri);
            peliTaso.style.display = DisplayStyle.None;
            lauta = new MyllyLauta(Napautus);
            peliTaso.Add(lauta);
            var rasti = Rakenne.Nappi("×", "mk-peli__sulje", Sulje, peliTaso);
            Kirjasimet.Aseta(rasti, Kirjasin.Luku);
            paneeli = Rakenne.El("mk-peli__paneeli", peliTaso);
            kapiteeli = Rakenne.Teksti("", "mk-kortti__kapiteeli", paneeli);
            Kirjasimet.Aseta(kapiteeli, Tyylikirja.Kirjain.Kapiteeli);
            vuoroRivi = Rakenne.Teksti("", "mk-peli__vuoro", paneeli);
            Kirjasimet.Aseta(vuoroRivi, Kirjasin.LukuLihava);
            (merkki0, nimi0, lukema0) = PelaajaRivi("mk-peli__merkki--vaalea");
            (merkki1, nimi1, lukema1) = PelaajaRivi("mk-peli__merkki--tumma");
            ohje = Rakenne.Teksti("", "mk-peli__ohje", paneeli);
            Kirjasimet.Aseta(ohje, Tyylikirja.Kirjain.Apuri);
            var napit = Rakenne.El("mk-kortti__napit", paneeli, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Nappi("Säännöt", "mk-nappi--toiminto", NaytaSaannot, napit), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Nappi("Luovuta", "mk-nappi--toiminto", Luovuta, napit), Kirjasin.Kone);
            peliTaso.RegisterCallback<GeometryChangedEvent>(_ => Asettele());

            // KORTIT (valinta, tulos, säännöt) himmennyksellä pelin päälle.
            korttiTaso = Rakenne.El("mk-himmennys mk-himmennys--tumma", juuri);
            korttiTaso.style.display = DisplayStyle.None;

            // Kortit lisätään himmennykseen yksi kerrallaan (NaytaKortti): Rakenne.Nayta ponnauttaa kaikki Kortti-lapset.
            valintaKortti = new Kortti("mk-peli__kortti", pohja: true);
            var vk = Rakenne.Teksti("", "mk-kortti__kapiteeli mk-peli__valinta-kapiteeli", valintaKortti.Sisus);
            Kirjasimet.Aseta(vk, Tyylikirja.Kirjain.Kapiteeli);
            Kirjasimet.Aseta(Rakenne.Teksti("Pelataanko myllyä?", "mk-kortti__otsikko", valintaKortti.Sisus), Tyylikirja.Kirjain.Otsikko);
            var ala = Rakenne.Teksti("", "mk-kortti__alaotsikko mk-peli__valinta-ala", valintaKortti.Sisus);
            Kirjasimet.Aseta(ala, Tyylikirja.Kirjain.Apuri);
            Rakenne.Teksti("Kolme nappulaa samalla viivalla on mylly: saat poistaa yhden vastustajan nappulan. Se, jolta jää alle kolme, häviää.",
                "mk-kortti__teksti", valintaKortti.Sisus);
            var vo = Rakenne.Teksti("Vastustaja", "mk-peli__valiotsikko", valintaKortti.Sisus);
            Kirjasimet.Aseta(vo, Tyylikirja.Kirjain.Valiotsikko);
            var ryhma = Rakenne.El("mk-peli__kytkinryhma", valintaKortti.Sisus);
            foreach (var (teksti, v) in new[] { ("Helppo botti", Vastustaja.BottiHelppo), ("Normaali", Vastustaja.BottiNormaali), ("Vaikea", Vastustaja.BottiVaikea) })
                tasoNapit.Add(Kirjasimet.Aseta(Rakenne.Nappi(teksti, "mk-peli__kytkin", () => ValitseVastustaja(v), ryhma), Kirjasin.Luku));
            var kaveriRyhma = Rakenne.El("mk-peli__kytkinryhma", valintaKortti.Sisus);
            tasoNapit.Add(Kirjasimet.Aseta(Rakenne.Nappi("Kaveri samalla laitteella", "mk-peli__kytkin", () => ValitseVastustaja(Vastustaja.Kaveri), kaveriRyhma), Kirjasin.Luku));
            var vn = Rakenne.El("mk-kortti__napit", valintaKortti.Sisus, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Nappi("Peruuta", "mk-nappi--toiminto", Sulje, vn), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Nappi("Aloita peli", "mk-nappi--kulta", AloitaPeli, vn), Kirjasin.KoneLihava);

            tulosKortti = new Kortti("mk-peli__kortti", pohja: true);
            tulosKapiteeli = Rakenne.Teksti("", "mk-kortti__kapiteeli", tulosKortti.Sisus);
            Kirjasimet.Aseta(tulosKapiteeli, Tyylikirja.Kirjain.Kapiteeli);
            tulosOtsikko = Rakenne.Teksti("", "mk-kortti__otsikko", tulosKortti.Sisus);
            Kirjasimet.Aseta(tulosOtsikko, Tyylikirja.Kirjain.Otsikko);
            tulosApuri = Rakenne.Teksti("", "mk-kortti__alaotsikko", tulosKortti.Sisus);
            Kirjasimet.Aseta(tulosApuri, Tyylikirja.Kirjain.Apuri);
            tulosPalkkioRivi = Rakenne.El("mk-peli__rivi", tulosKortti.Sisus, PickingMode.Ignore);
            Rakenne.Teksti("Voittopalkkio", "mk-peli__rivi-nimi", tulosPalkkioRivi);
            tulosPalkkio = Rakenne.Teksti("", "mk-peli__palkkio", tulosPalkkioRivi);
            Kirjasimet.Aseta(tulosPalkkio, Tyylikirja.Kirjain.Valiotsikko);
            tulosKirjattu = Rakenne.Teksti("Tulos kirjattiin matkakirjaan.", "mk-kortti__alaotsikko mk-peli__kirjattu", tulosKortti.Sisus);
            Kirjasimet.Aseta(tulosKirjattu, Tyylikirja.Kirjain.Apuri);
            var tn = Rakenne.El("mk-kortti__napit", tulosKortti.Sisus, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Nappi("Pelaa uudelleen", "mk-nappi--toiminto", () => NaytaKortti(valintaKortti), tn), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Nappi("Jatka matkaa", "mk-nappi--kulta", Sulje, tn), Kirjasin.KoneLihava);

            Kirjasimet.Aseta(peliTaso, Kirjasin.Luku);
            Kirjasimet.Aseta(korttiTaso, Kirjasin.Luku);
        }

        (VisualElement, Label, Label) PelaajaRivi(string merkkiLuokka)
        {
            var rivi = Rakenne.El("mk-peli__rivi", paneeli, PickingMode.Ignore);
            var m = Rakenne.El("mk-peli__merkki " + merkkiLuokka, rivi, PickingMode.Ignore);
            var n = Rakenne.Teksti("", "mk-peli__rivi-nimi", rivi);
            var l = Rakenne.Teksti("", "mk-peli__lukema", rivi);
            Kirjasimet.Aseta(l, Tyylikirja.Kirjain.Kapiteeli);
            return (m, n, l);
        }

        // --- avaus ja sulku ------------------------------------------------------------------------------------------

        /// <summary>Avaa vastustajan valinnan (KORTTI). Paikka: kohteen nimi kapiteeliin ja matkakirjaan.</summary>
        public void Avaa(string paikka = null)
        {
            if (paikka != null) Paikka = paikka;
            Auki = true;
            SyoteLukko.Esta(this);
            UiKerros.Hae().Juuri(Pulu.Kerros).style.visibility = Visibility.Hidden;
            peli ??= new Mylly();
            Paivita();
            peliTaso.style.display = DisplayStyle.Flex;
            Rakenne.Nayta(peliTaso, true, Tyylikirja.Kesto.Avaus);
            NaytaKortti(valintaKortti);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            kerta++;
            bottiMiettii = false;
            Rakenne.Nayta(korttiTaso, false, Tyylikirja.Kesto.Sulku);
            Rakenne.Nayta(peliTaso, false, Tyylikirja.Kesto.Sulku);
            SyoteLukko.Vapauta(this);
            UiKerros.Hae().Juuri(Pulu.Kerros).style.visibility = StyleKeyword.Null;
        }

        void NaytaKortti(Kortti k)
        {
            if (k.parent != korttiTaso)
            {
                korttiTaso.Clear();
                korttiTaso.Add(k);
                korttiTaso.RemoveFromClassList("mk-auki"); // uusi kortti ponnahtaa (Rakenne.Nayta: muutos kiinni → auki)
            }
            if (k == valintaKortti)
            {
                valintaKortti.Q<Label>(className: "mk-peli__valinta-kapiteeli").text = (Maa ?? "") + (Paikka != null ? " · " + Paikka : " · kohtaaminen");
                valintaKortti.Q<Label>(className: "mk-peli__valinta-ala").text = "Sama peli on Saksassa Mühle, Serbiassa Mlin ja Moldovassa Moara.";
                ValitseVastustaja(vastustaja);
            }
            korttiTaso.style.display = DisplayStyle.Flex;
            Rakenne.Nayta(korttiTaso, true, Tyylikirja.Kesto.Avaus);
        }

        void PiilotaKortti() => Rakenne.Nayta(korttiTaso, false, Tyylikirja.Kesto.Sulku);

        void ValitseVastustaja(Vastustaja v)
        {
            vastustaja = v;
            for (int i = 0; i < tasoNapit.Count; i++) tasoNapit[i].EnableInClassList("mk-valittu", i == (int)v);
        }

        public void AloitaPeli()
        {
            kerta++;
            peli = new Mylly();
            paattynyt = false; bottiMiettii = false;
            valittu = poistoKohde = poistoLahde = -1;
            PiilotaKortti();
            Paivita();
        }

        // --- vuorot ---------------------------------------------------------------------------------------------------

        bool IhmisenVuoro => !paattynyt && !bottiMiettii && (vastustaja == Vastustaja.Kaveri || peli.Vuorossa == 0);

        void Napautus(int piste)
        {
            if (!IhmisenVuoro) return;
            peli.Siirrot(siirrot);
            int oma = peli.Vuorossa;
            if (poistoKohde >= 0)
            {
                foreach (var s in siirrot)
                    if (s.Mihin == poistoKohde && s.Mista == poistoLahde && s.Poista == piste) { Tee(s); return; }
                return;
            }
            if (peli.Nappula(piste) == oma && !peli.Asetusvaihe(oma))
            {
                valittu = siirrot.Exists(s => s.Mista == piste) ? piste : -1;
                Aanet.Tehoste("click", 0.5f);
                Paivita();
                return;
            }
            if (peli.Nappula(piste) >= 0) return;
            int lahde = peli.Asetusvaihe(oma) ? -1 : valittu;
            if (lahde < 0 && !peli.Asetusvaihe(oma)) return;
            var ehdokkaat = siirrot.FindAll(s => s.Mista == lahde && s.Mihin == piste);
            if (ehdokkaat.Count == 0) return;
            if (ehdokkaat[0].Poista >= 0)
            {
                // Mylly: näytetään siirto ja odotetaan poistettavan valintaa.
                poistoKohde = piste; poistoLahde = lahde;
                Aanet.Tehoste("correct", 0.7f);
                Paivita();
                return;
            }
            Tee(ehdokkaat[0]);
        }

        void Tee(MyllySiirto s)
        {
            peli.Tee(s);
            valittu = poistoKohde = poistoLahde = -1;
            Aanet.Tehoste("click");
            Paivita();
            if (TarkistaLoppu()) return;
            if (vastustaja != Vastustaja.Kaveri && peli.Vuorossa == 1) BotinVuoro();
        }

        void BotinVuoro()
        {
            bottiMiettii = true;
            Paivita();
            int oma = ++kerta;
            var kopio = peli.Kopio();
            var (syvyys, hairio) = Botti.Taso(vastustaja);
            float alku = Time.realtimeSinceStartup;
            var tehtava = Task.Run(() => Botti.Valitse(kopio, syvyys, hairio, sat));
            UiKerros.Hae().StartCoroutine(Odota());
            System.Collections.IEnumerator Odota()
            {
                while (!tehtava.IsCompleted || Time.realtimeSinceStartup - alku < 0.45f) yield return null;
                if (oma != kerta || !Auki) yield break;
                bottiMiettii = false;
                if (tehtava.IsFaulted) { Debug.LogError("MATKAKIRJA mylly: botti " + tehtava.Exception); yield break; }
                var s = tehtava.Result;
                peli.Tee(s);
                Aanet.Tehoste(s.Poista >= 0 ? "wrong" : "click", 0.8f);
                Paivita();
                TarkistaLoppu();
            }
        }

        bool TarkistaLoppu()
        {
            var t = peli.Lopputulos();
            if (!t.HasValue) return false;
            Lopeta(t.Value);
            return true;
        }

        void Luovuta()
        {
            if (paattynyt) { Sulje(); return; }
            Lopeta(-2);
        }

        void Lopeta(int voittaja)
        {
            paattynyt = true; bottiMiettii = false; kerta++;
            var tulos = new PeliTulos
            {
                PeliId = "DEU-2", Nimi = "Mylly", PaikallinenNimi = PaikallinenNimi, Paikka = Paikka, Vastustaja = vastustaja,
                Voittaja = voittaja, Siirtoja = peli.Siirtoja, Paiva = DateTime.Now.ToString("yyyy-MM-dd"),
            };
            int palkkio = 0;
            var matka = PeliOhjain.Instanssi != null ? PeliOhjain.Instanssi.Matka : null;
            if (matka != null) palkkio = Pelikehys.Kirjaa(matka, tulos, PelinTalous.Minipeli).Palkkio;
            Debug.Log("MATKAKIRJA mylly: " + Pelikehys.Matkakirjarivi(tulos) + (palkkio > 0 ? $" +{palkkio} £" : ""));
            Paivita();

            bool kaveri = vastustaja == Vastustaja.Kaveri;
            tulosKapiteeli.text = "Mylly · " + (voittaja == -1 ? "tasapeli" : voittaja == -2 ? "luovutus" : kaveri || voittaja == 0 ? "voitto" : "tappio");
            tulosOtsikko.text = voittaja == -1 ? "Tasapeli" : voittaja == -2 ? "Luovutit tämän pelin"
                : kaveri ? (voittaja == 0 ? "Vaalea voitti!" : "Tumma voitti!")
                : voittaja == 0 ? "Mylly on sinun!" : "Botti voitti tällä kertaa";
            string vast = Pelikehys.VastustajanNimi(vastustaja);
            tulosApuri.text = kaveri ? $"Kaveripeli, {peli.Siirtoja} siirtoa."
                : voittaja == 0 ? $"Voitit {(vast.StartsWith("botti") ? "botin" + vast.Substring(5) : vast)} {peli.Siirtoja} siirrossa."
                : $"Vastassa {vast}, {peli.Siirtoja} siirtoa.";
            tulosPalkkioRivi.style.display = palkkio > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            tulosPalkkio.text = $"+{palkkio} £";
            tulosKirjattu.style.display = matka != null ? DisplayStyle.Flex : DisplayStyle.None;
            Aanet.Tehoste(palkkio > 0 ? "coin" : voittaja == 0 || kaveri ? "correct" : "wrong");
            UiKerros.Hae().StartCoroutine(Viive());
            System.Collections.IEnumerator Viive() { yield return new WaitForSecondsRealtime(0.6f); if (Auki) NaytaKortti(tulosKortti); }
        }

        void NaytaSaannot()
        {
            UiNakymat.Hae().Vahvistus.Kysy("Myllyn säännöt",
                "Asetus: nappulat vuorotellen tyhjiin pisteisiin. Siirto: viivaa pitkin viereiseen tyhjään pisteeseen. Kun nappuloita on " +
                "kolme, saa lentää mihin tahansa. Mylly (kolme samalla viivalla) poistaa yhden vastustajan nappulan, ei valmiista myllystä, " +
                "jos muita on. Alle kolme nappulaa tai ei siirtoja: häviö.",
                "Sulje", "Jatka peliä", null, "Mylly · Mühle · Mlin · Moara");
        }

        // --- näyttö ---------------------------------------------------------------------------------------------------

        void Paivita()
        {
            if (peli == null) return;
            bool kaveri = vastustaja == Vastustaja.Kaveri;
            kapiteeli.text = "Mylly · " + PaikallinenNimi + " · " + Maa;
            nimi0.text = kaveri ? "Vaalea" : "Sinä";
            nimi1.text = kaveri ? "Tumma" : Pelikehys.VastustajanNimi(vastustaja).Replace("botti (", "Botti · ").TrimEnd(')');
            lukema0.text = Lukema(0); lukema1.text = Lukema(1);
            int oma = peli.Vuorossa;
            string kuka = kaveri ? (oma == 0 ? "Vaalea" : "Tumma") : "Sinun vuorosi";
            if (paattynyt) { vuoroRivi.text = "Peli päättyi."; ohje.text = ""; }
            else if (bottiMiettii) { vuoroRivi.text = "Botti miettii…"; ohje.text = ""; }
            else if (poistoKohde >= 0) { vuoroRivi.text = $"Mylly! Valitse poistettava {(oma == 0 ? "tumma" : "vaalea")} nappula."; ohje.text = "Myllyssä olevaa ei saa poistaa, jos muita on."; }
            else if (peli.Asetusvaihe(oma)) { vuoroRivi.text = $"{kuka}: aseta nappula."; ohje.text = $"Asetusvaihe: {peli.Kadessa(oma)} kädessä. Kolme samalla viivalla on mylly."; }
            else if (peli.Lentaa(oma)) { vuoroRivi.text = $"{kuka}: lennä nappula."; ohje.text = "Kolme nappulaa jäljellä: saat siirtää mihin tahansa tyhjään pisteeseen."; }
            else { vuoroRivi.text = $"{kuka}: {(valittu >= 0 ? "valitse kohde." : "valitse siirrettävä nappula.")}"; ohje.text = "Siirtovaihe: viivaa pitkin viereiseen tyhjään pisteeseen."; }
            ohje.style.display = string.IsNullOrEmpty(ohje.text) ? DisplayStyle.None : DisplayStyle.Flex;

            // Laudan korostukset.
            var kohteet = new List<int>(); var poistettavat = new List<int>();
            if (IhmisenVuoro)
            {
                peli.Siirrot(siirrot);
                foreach (var s in siirrot)
                {
                    if (poistoKohde >= 0) { if (s.Mihin == poistoKohde && s.Mista == poistoLahde && s.Poista >= 0) poistettavat.Add(s.Poista); }
                    else if (valittu >= 0 && s.Mista == valittu) kohteet.Add(s.Mihin);
                }
            }
            var viim = peli.Viimeisin;
            lauta.Aseta(peli, valittu, poistoKohde, poistoLahde, kohteet, poistettavat, viim.HasValue ? viim.Value.Mihin : -1);
        }

        string Lukema(int p) => peli.Kadessa(p) > 0 ? $"{peli.Kadessa(p)} kädessä · {peli.Laudalla(p)} laudalla" : $"{peli.Laudalla(p)} laudalla";

        void Asettele()
        {
            float w = peliTaso.layout.width, h = peliTaso.layout.height;
            if (float.IsNaN(w) || w <= 0 || h <= 0) return;
            var t = UiKerros.Hae().Reunat(UiKerros.Pelidialogit);
            float m = Tyylikirja.Vali.M, osuma = Tyylikirja.Nappi.Osuma;
            var rasti = peliTaso.Q(className: "mk-peli__sulje");
            rasti.style.top = t.y + m; rasti.style.right = t.z + m;
            bool kapea = Pohja.Leveys(w - t.x - t.z) == Pohja.Luokka.Kapea && h > w;
            if (kapea)
            {
                float koko = w - t.x - t.z - 2 * m;
                float yla = t.y + m + osuma + Tyylikirja.Vali.S;
                Sijoita(lauta, t.x + m, yla, koko, koko);
                paneeli.style.left = t.x + m; paneeli.style.right = t.z + m; paneeli.style.width = StyleKeyword.Auto;
                paneeli.style.top = yla + koko + m; paneeli.style.bottom = StyleKeyword.Auto;
            }
            else
            {
                float pw = Tyylikirja.Leveys.Paneeli;
                float koko = Mathf.Min(h - t.y - t.w - 2 * m, w - t.x - t.z - pw - 3 * m);
                float vasen = t.x + m + Mathf.Max(0, (w - t.x - t.z - pw - 3 * m - koko) / 2f);
                Sijoita(lauta, vasen, t.y + m, koko, koko);
                paneeli.style.left = StyleKeyword.Auto; paneeli.style.right = t.z + m; paneeli.style.width = pw;
                paneeli.style.top = t.y + m + osuma + Tyylikirja.Vali.S; paneeli.style.bottom = StyleKeyword.Auto;
            }
        }

        static void Sijoita(VisualElement e, float x, float y, float w, float h)
        {
            e.style.left = Mathf.Round(x); e.style.top = Mathf.Round(y); e.style.width = Mathf.Round(w); e.style.height = Mathf.Round(h);
        }

        // --- testikomento ---------------------------------------------------------------------------------------------

        public string Komento(string loput)
        {
            var o = (loput ?? "").Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            string k = o.Length > 0 ? o[0] : "valinta";
            switch (k)
            {
                case "valinta": Avaa(); return "mylly: valinta";
                case "peli":
                    if (!Auki) Avaa();
                    if (o.Length > 1) ValitseVastustaja(o[1] switch { "helppo" => Vastustaja.BottiHelppo, "vaikea" => Vastustaja.BottiVaikea, "kaveri" => Vastustaja.Kaveri, _ => Vastustaja.BottiNormaali });
                    AloitaPeli();
                    return "mylly: peli " + vastustaja;
                case "asema" when o.Length >= 5:
                    if (!Auki) Avaa();
                    PiilotaKortti();
                    kerta++; paattynyt = false; bottiMiettii = false; valittu = poistoKohde = poistoLahde = -1;
                    peli = Mylly.Asemasta(o[1], int.Parse(o[2]), int.Parse(o[3]), int.Parse(o[4]));
                    Paivita();
                    return "mylly: asema " + peli.Asema();
                case "napauta" when o.Length >= 2: Napautus(int.Parse(o[1])); return "mylly: " + vuoroRivi.text;
                case "tulos" when o.Length >= 2: if (!Auki) Avaa(); Lopeta(int.Parse(o[1])); return "mylly: tulos " + o[1];
                case "tila": return Auki ? $"mylly: {peli?.Asema()} vuoro {peli?.Vuorossa} | {vuoroRivi.text}" : "mylly: kiinni";
                case "sulje": Sulje(); return "mylly: suljettu";
            }
            return "mylly: tuntematon (valinta | peli <taso> | asema <24> <k0> <k1> <vuoro> | napauta <n> | tulos <0|1|-1|-2> | tila | sulje)";
        }
    }

    /// <summary>Myllyn lauta (KUVANÄKYMÄN kuvan paikalla): pergamenttipinta, viivat ja pisteet musteella, nappulat teeman
    /// pinnalla (vaalea) ja musteella (tumma); valinta, kohteet, viimeisin siirto ja poistettavat toiminto-kullalla.</summary>
    public sealed class MyllyLauta : VisualElement
    {
        readonly Action<int> napautettu;
        Mylly peli;
        int valittu = -1, poistoKohde = -1, poistoLahde = -1, viimeisin = -1;
        readonly List<int> kohteet = new List<int>(), poistettavat = new List<int>();

        public MyllyLauta(Action<int> napautettu)
        {
            this.napautettu = napautettu;
            AddToClassList("mk-peli__lauta");
            generateVisualContent += Piirra;
            RegisterCallback<PointerDownEvent>(e =>
            {
                int p = Lahin(e.localPosition);
                if (p >= 0) { napautettu(p); e.StopPropagation(); }
            });
        }

        public void Aseta(Mylly m, int valittu, int poistoKohde, int poistoLahde, List<int> kohteet, List<int> poistettavat, int viimeisin)
        {
            peli = m; this.valittu = valittu; this.poistoKohde = poistoKohde; this.poistoLahde = poistoLahde; this.viimeisin = viimeisin;
            this.kohteet.Clear(); this.kohteet.AddRange(kohteet);
            this.poistettavat.Clear(); this.poistettavat.AddRange(poistettavat);
            MarkDirtyRepaint();
        }

        float Marginaali => contentRect.width * 0.09f;
        float Askel => (contentRect.width - 2 * Marginaali) / 6f;
        Vector2 Kohta(int p) => new Vector2(Marginaali + Mylly.Paikat[p].X * Askel, Marginaali + Mylly.Paikat[p].Y * Askel);

        int Lahin(Vector2 kohta)
        {
            if (contentRect.width <= 0) return -1;
            float raja = Mathf.Max(Askel * 0.5f, Tyylikirja.Nappi.Osuma / 2f);
            int paras = -1; float parasD = raja * raja;
            for (int p = 0; p < Mylly.Pisteita; p++)
            {
                float d = (Kohta(p) - kohta).sqrMagnitude;
                if (d < parasD) { parasD = d; paras = p; }
            }
            return paras;
        }

        void Piirra(MeshGenerationContext mgc)
        {
            var r = contentRect;
            if (r.width < 10) return;
            var t = Tyylikirja.Paperi;
            var p = mgc.painter2D;
            float s = Askel, sade = s * 0.36f, viiva = Mathf.Max(2f, r.width / 160f);
            Color muste = t.Muste, pehmea = t.MustePehmea, pinta = t.Pinta, kulta = t.Toiminto, reunus = t.Reunus;

            // Viivat.
            p.strokeColor = pehmea; p.lineWidth = viiva; p.lineCap = LineCap.Round;
            for (int a = 0; a < Mylly.Pisteita; a++)
                foreach (int b in Mylly.Naapurit[a])
                    if (b > a) { p.BeginPath(); p.MoveTo(Kohta(a)); p.LineTo(Kohta(b)); p.Stroke(); }

            // Valmiit myllyt (kulta, läpikuultava).
            if (peli != null)
            {
                var myllyVari = kulta; myllyVari.a = 0.55f;
                foreach (var m in Mylly.Myllyt)
                {
                    int o = peli.Nappula(m[0]);
                    if (o >= 0 && peli.Nappula(m[1]) == o && peli.Nappula(m[2]) == o)
                    {
                        p.strokeColor = myllyVari; p.lineWidth = sade * 0.9f;
                        p.BeginPath(); p.MoveTo(Kohta(m[0])); p.LineTo(Kohta(m[2])); p.Stroke();
                    }
                }
            }

            // Pisteet.
            for (int a = 0; a < Mylly.Pisteita; a++) Ympyra(p, Kohta(a), sade * 0.22f, pehmea, null, 0);
            // Kohteet (valitun nappulan lailliset siirrot).
            foreach (int k in kohteet) Ympyra(p, Kohta(k), sade * 0.45f, null, kulta, sade * 0.12f);
            if (peli == null) return;

            for (int a = 0; a < Mylly.Pisteita; a++)
            {
                int o = peli.Nappula(a);
                bool siirtyy = a == poistoLahde;
                if (o < 0 && a != poistoKohde) continue;
                if (siirtyy) continue; // nappula on jo siirtymässä poistoKohteeseen
                if (a == poistoKohde && o < 0) o = peli.Vuorossa;
                if (poistettavat.Contains(a)) Katkoympyra(p, Kohta(a), sade * 1.28f, kulta, sade * 0.14f);
                if (a == valittu) Ympyra(p, Kohta(a), sade * 1.22f, null, kulta, sade * 0.16f);
                Ympyra(p, Kohta(a), sade, o == 0 ? pinta : muste, o == 0 ? muste : pehmea, sade * 0.1f);
                Ympyra(p, Kohta(a), sade * 0.62f, null, o == 0 ? reunus : pehmea, sade * 0.06f);
                if (a == viimeisin) Ympyra(p, Kohta(a), sade * 0.2f, kulta, null, 0);
            }
        }

        static void Ympyra(Painter2D p, Vector2 c, float r, Color? tayte, Color? reuna, float paksuus)
        {
            p.BeginPath();
            p.Arc(c, r, 0f, 360f);
            p.ClosePath();
            if (tayte.HasValue) { p.fillColor = tayte.Value; p.Fill(); }
            if (reuna.HasValue && paksuus > 0) { p.strokeColor = reuna.Value; p.lineWidth = paksuus; p.Stroke(); }
        }

        static void Katkoympyra(Painter2D p, Vector2 c, float r, Color vari, float paksuus)
        {
            p.strokeColor = vari; p.lineWidth = paksuus; p.lineCap = LineCap.Butt;
            const int Paloja = 12;
            for (int i = 0; i < Paloja; i++)
            {
                float a0 = i * 360f / Paloja, a1 = a0 + 360f / Paloja * 0.6f;
                p.BeginPath(); p.Arc(c, r, a0, a1); p.Stroke();
            }
        }
    }
}
