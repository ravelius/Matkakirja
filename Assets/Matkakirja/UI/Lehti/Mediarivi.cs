// LEHDEN MEDIARIVI (Natiivi-UI): web paivitaMediarivit, naytaKieliNappi ja vanhaAaniPuoli (js/maalehti.js)
// sekä soitin kulttuuriAaniNapista / pysaytaKulttuuriAani (js/ui.js).
//
// Rivi on kaupunkilehden etusivun lopussa ja maalehden maaosastossa (uutisten perässä). Parissa
// vasemmalla "Ennen": kaupungin (tai maan) vanha äänitallenne, ja oikealla "Nyt": maan radio suorana
// lähetyksenä live-merkillä, varalla kaupungissa nauhoitettu kielinäyte. Ilman tallennetta radionappi on
// rivillä yksin. Maalehdessä kielinäyte vain oman maan lehdelle (web: vieraan maan lehteen ei kuulu
// väärästä paikasta nauhoitettu näyte).
//
// Lähteet: kokoelma radiot (skeema 1.16, pakettiin vain soivat luokat), moduuli js/packs/vanhat-aanet.json
// (VANHAT_AANET kaupungeittain, VANHAT_AANET_MAA maittain) ja kaupungit.kielinayte (UiSisalto).
//
// SOITIN: yksi ääni kerrallaan kuten webissä. Mikä tahansa painallus soiton aikana pysäyttää. Radio soi
// AVPlayerilla (RadioVirta, sama liitännäinen kuin maailmanradiossa), tallenteet Puhe-soittimella.
// Jos suora lähetys ei aukea, soitin vaihtaa kielinäytteeseen ja live-merkki sammuu (web petti → vara).
// Lehden sulkeminen pysäyttää (web closeArrival → pysaytaKulttuuriAani). Taustaääni väistyy soiton ajaksi.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Mediarivi
    {
        sealed class Asema { public string Nimi, Url; public int Jarjestys; }
        sealed class Tallenne { public string Nimi, Vuosi, Esittaja, Lahde, Url; }

        static Dictionary<string, Asema> radiot;
        static Dictionary<string, Tallenne> vanhatKaupunki, vanhatMaa;
        static bool haussa;
        static readonly List<Action> odottajat = new List<Action>();

        // web MERKKI_SOITA ja MERKKI_SEIS (js/ui-apurit.js)
        const string Soita = "<path d=\"M8.4 5.8 18 12l-9.6 6.2z\"/>";
        const string Seis = "<rect x=\"7\" y=\"7\" width=\"10\" height=\"10\" rx=\"1.4\"/>";
        const float Aikaraja = 12f;

        /// <summary>
        /// Rivi isäntään. kaupunki = kielinäytteen ja tallenteen kaupunki (null = vain maan radio ja
        /// maan tallenne), maa = ISO3 (null = kaupungin maa).
        /// </summary>
        public static void Piirra(VisualElement isa, string kaupunki, string maa = null)
        {
            var rivi = Rakenne.El("mk-lehti__media", isa, PickingMode.Ignore);
            rivi.style.display = DisplayStyle.None;
            Lataa(() => Tayta(rivi, kaupunki, maa ?? (kaupunki != null ? UiSisalto.Kaupunki(kaupunki)?.Maa : null)));
        }

        static void Tayta(VisualElement rivi, string kaupunki, string maa)
        {
            var k = kaupunki != null ? UiSisalto.Kaupunki(kaupunki) : null;
            string nayte = k?.KielinayteUrl, nayteNimi = k?.KielinayteNimi;
            Asema radio = maa != null && radiot.TryGetValue(maa, out var r) ? r : null;
            Tallenne vanha = kaupunki != null && vanhatKaupunki.TryGetValue(kaupunki, out var vk) ? vk
                : maa != null && vanhatMaa.TryGetValue(maa, out var vm) ? vm : null;
            if (radio == null && nayte == null && vanha == null) return;
            rivi.style.display = DisplayStyle.Flex;
            if (vanha != null)
            {
                rivi.AddToClassList("mk-lehti__media--pari");
                var puoli = Puoli(rivi, "Ennen");
                var b = Nappi(puoli, vanha.Nimi, "mk-lehti__kuuntele--vanha", false, out var tila);
                var vuosi = Rakenne.Teksti("· " + vanha.Vuosi, "mk-lehti__kuuntele-vuosi");
                b.Insert(b.IndexOf(tila.Nimi) + 1, vuosi);
                Kirjasimet.Aseta(vuosi, Kirjasin.Kone);
                b.tooltip = $"{vanha.Nimi} — {vanha.Esittaja}, {vanha.Vuosi}";
                string url = vanha.Url;
                b.clicked += () => Painettu(tila, null, url);
                Kirjasimet.Aseta(Rakenne.Teksti($"{vanha.Esittaja} · {vanha.Lahde}", "mk-lehti__kuuntele-lahde", puoli), Kirjasin.Kone);
            }
            if (radio == null && nayte == null) return;
            // Napissa aseman nimi, ei "Kuuntele kieltä" (web: nimi tekee napista houkuttelevan).
            string nimi = radio != null ? radio.Nimi : (nayteNimi ?? "Kaupungissa nauhoitettu näyte");
            var isa = vanha != null ? Puoli(rivi, "Nyt") : rivi;
            var n = Nappi(isa, nimi, null, radio != null, out var t);
            n.tooltip = radio != null ? nimi + " — suora lähetys" : nimi;
            string radioUrl = radio?.Url, vara = nayte;
            n.clicked += () => Painettu(t, radioUrl, radioUrl != null ? vara : nayte);
        }

        static VisualElement Puoli(VisualElement rivi, string rooli)
        {
            var p = Rakenne.El("mk-lehti__aanipuoli", rivi, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(rooli.ToUpperInvariant(), "mk-lehti__aanirooli", p), Kirjasin.Kone);
            return p;
        }

        sealed class Napintila
        {
            public Button Nappi;
            public SvgIkoni Merkki;
            public Label Nimi, Aika;
            public VisualElement Live;
            /// <summary>Kehotusnappi ("Kuuntele näyte"): soidessa "Pysäytä näyte" (web pysaytaKulttuuriAani palauttaa).</summary>
            public string Kehotus;
        }

        /// <summary>
        /// Lehden kuuntelunappi (web .kulttuuri-kuuntele, kulttuuriAaniNapista / esikuunteluNapista): sama
        /// soitin kuin mediarivillä, joten yksi ääni kerrallaan ja toinen painallus pysäyttää. tallenne soi
        /// Puheella; haeVirta hakee ensimmäisellä painalluksella suoratoisto-osoitteen (Apple Musicin
        /// esikuuntelu), joka soi AVPlayerilla.
        /// </summary>
        public static Button Kuuntele(VisualElement isa, string kehotus, string tallenne, Action<Action<string>> haeVirta = null, string otsake = null)
        {
            var b = Nappi(isa, kehotus, null, false, out var t);
            t.Kehotus = kehotus;
            if (otsake != null) b.tooltip = otsake;
            string virtaUrl = null;
            b.clicked += () =>
            {
                if (soiva != null || haeVirta == null) { Painettu(t, null, tallenne); return; }
                if (virtaUrl != null) { Painettu(t, virtaUrl, null); return; }
                t.Nimi.text = "Haetaan…";
                b.SetEnabled(false);
                haeVirta(url =>
                {
                    b.SetEnabled(true);
                    t.Nimi.text = kehotus;
                    if (string.IsNullOrEmpty(url)) { UiNakymat.Hae()?.Tilarivi.Viesti("Näytettä ei löytynyt"); return; }
                    virtaUrl = url;
                    if (soiva == null) Painettu(t, url, null);
                });
            };
            return b;
        }

        static Button Nappi(VisualElement isa, string nimi, string luokka, bool live, out Napintila tila)
        {
            var b = Rakenne.Nappi(null, "mk-lehti__kuuntele" + (luokka != null ? " " + luokka : ""), null, isa);
            tila = new Napintila { Nappi = b };
            tila.Merkki = Rakenne.Ikoni(Soita, "mk-lehti__kuuntele-merkki", b);
            tila.Nimi = Rakenne.Teksti(nimi, "mk-lehti__kuuntele-nimi", b);
            Kirjasimet.Aseta(tila.Nimi, Kirjasin.Kone);
            if (live)
            {
                tila.Live = Rakenne.El("mk-lehti__live", b, PickingMode.Ignore);
                Rakenne.El("mk-lehti__live-piste", tila.Live, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti("LIVE", "mk-lehti__live-teksti", tila.Live), Kirjasin.KoneLihava);
            }
            tila.Aika = Rakenne.Teksti("", "mk-lehti__kuuntele-aika", b);
            tila.Aika.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(tila.Aika, Kirjasin.Kone);
            return b;
        }

        // --- soitin (web kulttuuriAaniNapista) ------------------------------------------------------

        static Napintila soiva;
        static string soivaUrl; // Puhe-soittimen äänite; null = radio
        static RadioVirta virta;
        static float radioAlku;
        static string radioVara;
        static IVisualElementScheduledItem kello;

        static void Painettu(Napintila t, string radio, string tallenne)
        {
            if (soiva != null) { Pysayta(); return; }
            if (radio == null && string.IsNullOrEmpty(tallenne)) return;
            soiva = t;
            t.Nappi.AddToClassList("mk-lehti__kuuntele--soi");
            t.Merkki.Polku = Seis;
            if (t.Kehotus != null) t.Nimi.text = "Pysäytä näyte";
            Aanisoitin.Nayte(true);
            if (radio != null)
            {
                Debug.Log("MATKAKIRJA ui lehti: radio " + radio);
                virta ??= RadioVirta.Luo(UiKerros.Hae().transform);
                virta.Voimakkuus = 0.55f * Puhe.Voimakkuus;
                virta.Avaa(radio, null);
                // Radiolinssin oma viritys voittaa (RadioVirta.Varattu): syy tilariville, ei varanäytettä päälle.
                if (virta.Estetty) { UiNakymat.Hae()?.Tilarivi.Viesti(virta.Virhe); Pysayta(); return; }
                soivaUrl = null;
                radioAlku = Time.unscaledTime;
                radioVara = tallenne;
            }
            else if (!SoitaTallenne(tallenne)) { Pysayta(); return; }
            // Kello lehden juuressa, ei napissa: nappi irtoaa sivua käännettäessä, soitto jatkuu.
            kello ??= UiKerros.Hae().Juuri(UiKerros.Traileri).schedule.Execute(Tikitys).Every(250);
            kello.Resume();
        }

        static bool SoitaTallenne(string url)
        {
            soivaUrl = url;
            return Puhe.Hae().Soita(url, 0, () => { if (soivaUrl == url) Pysayta(); });
        }

        static void Tikitys()
        {
            if (soiva == null) { kello?.Pause(); return; }
            if (soivaUrl == null)
            {
                // Suora lähetys: virhe tai aikaraja → kaupungin kielinäyte, live-merkki sammuu (web petti).
                bool petti = virta.Virhe != null || (!virta.Kuuluu && Time.unscaledTime - radioAlku > Aikaraja);
                if (!petti) return;
                Debug.Log("MATKAKIRJA ui lehti: radio ei auennut (" + (virta.Virhe ?? "aikaraja") + ") " + virta.Kuvaus);
                virta.Sulje();
                string vara = radioVara;
                radioVara = null;
                if (string.IsNullOrEmpty(vara) || !SoitaTallenne(vara)) { Pysayta(); return; }
                if (soiva.Live != null) soiva.Live.style.display = DisplayStyle.None;
                return;
            }
            var p = Puhe.Instanssi;
            // Toinen soitin (luenta, noston näyte) otti Puheen: napin tila palaa ilman pysäytystä.
            if (p == null || p.SoivaUrl != soivaUrl) { Nollaa(); return; }
            if (p.Kesto > 0)
            {
                soiva.Aika.style.display = DisplayStyle.Flex;
                soiva.Aika.text = Muoto(p.Aika) + " / " + Muoto(p.Kesto);
            }
        }

        static string Muoto(float s) => $"{Mathf.FloorToInt(s / 60)}:{Mathf.FloorToInt(s % 60):00}";

        /// <summary>Pysäyttää soivan (web pysaytaKulttuuriAani): toinen painallus tai lehden sulkeminen.</summary>
        public static void Pysayta()
        {
            if (soiva == null) return;
            if (soivaUrl == null) virta?.Sulje();
            else if (Puhe.Instanssi?.SoivaUrl == soivaUrl) Puhe.Instanssi.Pysayta(0.3f);
            Nollaa();
        }

        static void Nollaa()
        {
            var t = soiva;
            soiva = null;
            soivaUrl = null;
            radioVara = null;
            kello?.Pause();
            Aanisoitin.Nayte(false);
            if (t == null) return;
            t.Nappi.RemoveFromClassList("mk-lehti__kuuntele--soi");
            t.Merkki.Polku = Soita;
            if (t.Kehotus != null) t.Nimi.text = t.Kehotus;
            t.Aika.style.display = DisplayStyle.None;
            t.Aika.text = "";
        }

        /// <summary>
        /// Apple Musicin 30 s esikuuntelu (web esikuunteluNapista): iTunes lookup kappaleen id:llä, jos
        /// musiikkilinkissä on sellainen, muuten haku esikuuntelu- tai kappaleen nimellä; previewUrl.
        /// </summary>
        public static void HaeEsikuuntelu(string esikuuntelu, string musiikki, string nimi, Action<string> valmis)
        {
            string url;
            string id = null;
            if (esikuuntelu == null && musiikki != null)
            {
                var m = System.Text.RegularExpressions.Regex.Match(musiikki, @"[?&]i=(\d+)");
                if (!m.Success) m = System.Text.RegularExpressions.Regex.Match(musiikki, @"/(?:song|album)/[^/]+/(?:id)?(\d+)");
                if (m.Success) id = m.Groups[1].Value;
            }
            url = id != null
                ? "https://itunes.apple.com/lookup?id=" + id + "&entity=song&limit=1&country=fi"
                : "https://itunes.apple.com/search?term=" + Uri.EscapeDataString(esikuuntelu ?? nimi ?? "") + "&entity=song&limit=1&country=fi";
            UiKerros.Hae().StartCoroutine(Hae(url, valmis));
        }

        static System.Collections.IEnumerator Hae(string url, Action<string> valmis)
        {
            using var r = UnityEngine.Networking.UnityWebRequest.Get(url);
            r.timeout = 10;
            yield return r.SendWebRequest();
            string tulos = null;
            if (r.result == UnityEngine.Networking.UnityWebRequest.Result.Success)
            {
                try
                {
                    var tulokset = Rakenne.Lista(MiniJson.Kentta(Rakenne.Olio(MiniJson.Jasenna(r.downloadHandler.text)), "results"));
                    tulos = (tulokset ?? new List<object>()).Select(Rakenne.Olio).Select(o => MiniJson.Teksti(o, "previewUrl")).FirstOrDefault(u => !string.IsNullOrEmpty(u));
                }
                catch (FormatException) { }
            }
            valmis(tulos);
        }

        // --- aineisto ---------------------------------------------------------------------------

        static void Lataa(Action valmis)
        {
            if (radiot != null) { UiSisalto.Lataa(valmis); return; }
            odottajat.Add(valmis);
            if (haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(Hae());
        }

        static System.Collections.IEnumerator Hae()
        {
            string r = null, v = null;
            yield return Sisalto.HaeTeksti("radiot", t => r = t, valinnainen: true);
            yield return Sisalto.HaePaketista("moduulit/js/packs/vanhat-aanet.json", t => v = t, true);
            var asemat = new Dictionary<string, Asema>();
            var kaupunki = new Dictionary<string, Tallenne>();
            var maa = new Dictionary<string, Tallenne>();
            try
            {
                var alkiot = Rakenne.Lista(MiniJson.Kentta(Rakenne.Olio(r != null ? MiniJson.Jasenna(r) : null), "alkiot"));
                foreach (var a in (alkiot ?? new List<object>()).Select(Rakenne.Olio).Where(x => x != null))
                {
                    string iso = MiniJson.Teksti(a, "iso3") ?? MiniJson.Teksti(a, "id"), url = MiniJson.Teksti(a, "url");
                    if (iso == null || string.IsNullOrEmpty(url) || MiniJson.Kentta(a, "toimii") is bool toimii && !toimii) continue;
                    int j = (int)(MiniJson.Luku(a, "jarjestys") ?? 1);
                    // Maan ensisijainen asema (web RADIOT[maa]: yksi asema maata kohden).
                    if (asemat.TryGetValue(iso, out var vanha) && vanha.Jarjestys <= j) continue;
                    asemat[iso] = new Asema { Nimi = MiniJson.Teksti(a, "nimi") ?? iso, Url = url, Jarjestys = j };
                }
                var exportit = Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(v != null ? MiniJson.Jasenna(v) : null), "exportit"));
                LueTallenteet(exportit, "VANHAT_AANET", kaupunki);
                LueTallenteet(exportit, "VANHAT_AANET_MAA", maa);
            }
            catch (FormatException e) { Debug.LogWarning("MATKAKIRJA ui mediarivi: " + e.Message); }
            radiot = asemat;
            vanhatKaupunki = kaupunki;
            vanhatMaa = maa;
            haussa = false;
            UiSisalto.Lataa(() =>
            {
                var kutsut = odottajat.ToArray();
                odottajat.Clear();
                foreach (var c in kutsut) { try { c(); } catch (Exception e) { Debug.LogException(e); } }
            });
        }

        static void LueTallenteet(Dictionary<string, object> exportit, string nimi, Dictionary<string, Tallenne> kohde)
        {
            var o = Rakenne.Olio(MiniJson.Kentta(exportit, nimi));
            var arvo = Rakenne.Olio(MiniJson.Kentta(o, "arvo")) ?? o;
            if (arvo == null) return;
            foreach (var kv in arvo)
            {
                var t = Rakenne.Olio(kv.Value);
                string url = t != null ? MiniJson.Teksti(t, "url") : null;
                if (string.IsNullOrEmpty(url)) continue;
                kohde[kv.Key] = new Tallenne
                {
                    Nimi = MiniJson.Teksti(t, "nimi") ?? "", Vuosi = MiniJson.Teksti(t, "vuosi") ?? "",
                    Esittaja = MiniJson.Teksti(t, "esittaja") ?? "", Lahde = MiniJson.Teksti(t, "lahde") ?? "", Url = url,
                };
            }
        }

        /// <summary>Testikomento ui media: rivin tiedot lokiin ilman ääntä.</summary>
        public static void Testaa(string kaupunki, Action<string> kirjaa) => Lataa(() =>
        {
            string maa = UiSisalto.Kaupunki(kaupunki)?.Maa;
            var k = UiSisalto.Kaupunki(kaupunki);
            kirjaa($"media {kaupunki} ({maa}): radio {(maa != null && radiot.TryGetValue(maa, out var r) ? r.Nimi : "-")}, "
                + $"kielinäyte {k?.KielinayteNimi ?? "-"}, tallenne "
                + (vanhatKaupunki.TryGetValue(kaupunki, out var v) ? v.Nimi : maa != null && vanhatMaa.TryGetValue(maa, out var vm) ? vm.Nimi : "-")
                + $" · asemia {radiot.Count}, tallenteita {vanhatKaupunki.Count}+{vanhatMaa.Count}");
        });
    }
}
