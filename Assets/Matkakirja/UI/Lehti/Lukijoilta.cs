// LUKIJOILTA KEHITTÄJÄN LIITTEENÄ (Natiivi-UI): webin js/lehti.js avaaLukijoiltaLehti, lukijoiltaSivut,
// raamatunMuutosSivut, reaktioSivut ja proSivut; verkkokutsut js/ehdotukset.js (haeEhdotukset, ehdotusKuvaOsoite,
// haeProTuottajat, lisaaProTuottaja, paataProProfiili, proKuvaOsoite) ja js/reaktiot.js (haeReaktiolista,
// merkitseVirheKorjatuksi).
//
// Ehdotukset haetaan ehdotusworkerilta kuratointiavaimella (GitHubin salaisuus EHDOTUS_AVAIN). Avain syötetään
// salasanakenttään; se säilyy vain iOS Keychainissa (Fable 24.9.), ei koskaan PlayerPrefsissä eikä lokissa, ja
// hylätty avain poistetaan avainnipusta. Webin window.prompt-kyselyt ovat natiivissa kenttiä sivulla.
// Sähköposti näkyy vain täällä. Vain kehittäjätilassa eikä
// App Store -buildissa (Tyohuone.Sallittu).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Lukijoilta
    {
        const string AvainTalle = "matkakirja-ehdotus-avain"; // vanha PlayerPrefs-avain (poistetaan)
        const string Nimi = "Lukijoilta";
        static string Osoite => Palautekanava.Osoite;

        // Fable 24.9.: kuratointiavain vain iOS Keychainiin — ei PlayerPrefsiin, tiedostoon eikä lokiin. Pelikoodarin
        // MatkakirjaAvaimet.mm (kSecClassGenericPassword, palvelu fi.matkakirja.avaimet, tili KeychainNimi, vain tällä
        // laitteella). Editorissa ja muualla kuin iOS:llä avain elää vain käynnistyksen muistissa.
        const string KeychainNimi = "ehdotus-avain";
#if UNITY_IOS && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern int MatkakirjaAvaimet_Aseta(string nimi, string arvo);
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern string MatkakirjaAvaimet_Hae(string nimi);
#endif
        static string avain = "";
        static bool luettu;

        /// <summary>
        /// Löydös 177 (Fable 26.9.: web on malli, uusi peli = puhdas alku): Uusi peli poistaa kuratointiavaimen
        /// Keychainista kuten web tyhjennaMuistit poistaa matkakirja-ehdotus-avaimen.
        /// </summary>
        public static void Unohda() => Avain = "";

        /// <summary>Lue: Keychainista kerran käynnistyksessä. Tallenna: Keychainiin; tyhjä = poisto (hylätty avain).</summary>
        static string Avain
        {
            get
            {
                PoistaVanha();
                if (!luettu)
                {
                    luettu = true;
#if UNITY_IOS && !UNITY_EDITOR
                    avain = MatkakirjaAvaimet_Hae(KeychainNimi) ?? "";
#endif
                }
                return avain;
            }
            set
            {
                avain = value ?? "";
                luettu = true;
#if UNITY_IOS && !UNITY_EDITOR
                if (MatkakirjaAvaimet_Aseta(KeychainNimi, avain.Length > 0 ? avain : null) != 1)
                    Debug.LogWarning("MATKAKIRJA ui lukijoilta: avainnippuun kirjoitus ei onnistunut (avain vain muistissa)");
#endif
            }
        }

        /// <summary>Aiempi versio tallensi avaimen PlayerPrefsiin: pois laitteelta ensimmäisellä käytöllä.</summary>
        static void PoistaVanha()
        {
            if (!PlayerPrefs.HasKey(AvainTalle)) return;
            PlayerPrefs.DeleteKey(AvainTalle);
            PlayerPrefs.Save();
        }

        static string Q(string s) => UnityWebRequest.EscapeURL(s ?? "").Replace("+", "%20");

        // --- verkko (web omistajanKutsu) ------------------------------------------------------------

        struct Vastaus { public bool Ok; public string Virhe; public Dictionary<string, object> Data; }

        static IEnumerator Kutsu(string polku, string metodi, string runko, Action<Vastaus> valmis)
        {
            string erotin = polku.Contains("?") ? "&" : "?";
            using var r = new UnityWebRequest(Osoite + polku + erotin + "avain=" + Q(Avain), metodi) { downloadHandler = new DownloadHandlerBuffer() };
            if (runko != null)
            {
                r.uploadHandler = new UploadHandlerRaw(System.Text.Encoding.UTF8.GetBytes(runko));
                r.SetRequestHeader("content-type", "application/json");
            }
            r.timeout = 20;
            yield return r.SendWebRequest();
            Dictionary<string, object> data = null;
            try { data = Rakenne.Olio(MiniJson.Jasenna(r.downloadHandler?.text ?? "")); } catch (FormatException) { /* tyhjä runko */ }
            var v = new Vastaus { Data = data ?? new Dictionary<string, object>() };
            if (r.responseCode == 401) v.Virhe = "Avain ei kelpaa.";
            else if (r.result == UnityWebRequest.Result.ConnectionError) v.Virhe = "yhteyttä ei saatu";
            else if (r.responseCode < 200 || r.responseCode >= 300) v.Virhe = MiniJson.Teksti(data, "virhe") ?? "HTTP " + r.responseCode;
            else v.Ok = true;
            valmis(v);
        }

        static List<Dictionary<string, object>> Lista(Dictionary<string, object> o, string k) =>
            (Rakenne.Lista(MiniJson.Kentta(o, k)) ?? new List<object>()).Select(Rakenne.Olio).Where(x => x != null).ToList();

        static string T(Dictionary<string, object> o, string k) => MiniJson.Teksti(o, k);
        static bool B(Dictionary<string, object> o, string k) => MiniJson.Kentta(o, k) is bool b && b;
        static int N(Dictionary<string, object> o, string k) => MiniJson.Kentta(o, k) is double d ? (int)d : MiniJson.Kentta(o, k) is long l ? (int)l : 0;

        /// <summary>Web ehdotusAika: fi-FI lyhyt päivä ja kellonaika (24.9.2026 klo 5.12) paikallisessa ajassa.</summary>
        static string Aika(string iso)
        {
            if (string.IsNullOrEmpty(iso)) return "";
            if (!DateTime.TryParse(iso, CultureInfo.InvariantCulture, DateTimeStyles.AdjustToUniversal | DateTimeStyles.AssumeUniversal, out var d)) return iso;
            d = d.ToLocalTime();
            return $"{d.Day}.{d.Month}.{d.Year} klo {d.Hour}.{d.Minute:00}";
        }

        // --- avaus (web avaaLukijoiltaLehti) ---------------------------------------------------------

        public static void Avaa()
        {
            if (!Tyohuone.Sallittu) return;
            if (string.IsNullOrEmpty(Avain))
            {
                Ohje("Ilman avainta ehdotuksia ei voi lukea. Avain on GitHubin salaisuus EHDOTUS_AVAIN, sama jolla worker "
                    + "julkaistiin. Syötä avain alle — se tallentuu vain tämän laitteen avainnippuun (Keychain).", true);
                return;
            }
            Ohje("Haetaan ehdotuksia…");
            UiKerros.Hae().StartCoroutine(Hae());
        }

        static void Ohje(string teksti, bool avainKentta = false)
        {
            var nosto = new LehtiNosto { Otsikko = Nimi, Teksti = teksti };
            if (avainKentta) nosto.Lisa = AvainKentta;
            Tyohuone.Lehti?.NaytaLiite(Nimi, new List<LehtiSivu> { Tyohuone.Sivu(Nimi, null, false, nosto) });
        }

        static void AvainKentta(VisualElement isa)
        {
            var k = new TextField { isPasswordField = true };
            k.AddToClassList("mk-palaute__kentta");
            k.textEdition.placeholder = "Lukijoilta-avain (EHDOTUS_AVAIN)";
            Rakenne.VapautaNappaimistonSulkeutuessa(k);
            Kirjasimet.Aseta(k, Kirjasin.Kone);
            isa.Add(k);
            var napit = Rakenne.El("mk-tyohuone__napit", isa, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Nappi("Hae avaimella", "mk-tyohuone__nappi", () =>
            {
                string a = (k.value ?? "").Trim();
                if (a.Length == 0) return;
                Avain = a;
                Avaa();
            }, napit), Kirjasin.Kone);
        }

        static IEnumerator Hae()
        {
            Vastaus ehdotukset = default, tuottajat = default, reaktiot = default;
            // Pro-lista ja reaktiot eivät saa viedä ehdotuksia mukanaan (vanha worker ei tunne reittejä: 404).
            var k1 = UiKerros.Hae().StartCoroutine(Kutsu("/lista", "GET", null, v => ehdotukset = v));
            var k2 = UiKerros.Hae().StartCoroutine(Kutsu("/pro-lista", "GET", null, v => tuottajat = v));
            var k3 = UiKerros.Hae().StartCoroutine(Kutsu("/reaktio-lista", "GET", null, v => reaktiot = v));
            yield return k1; yield return k2; yield return k3;
            // Lehti suljettu tai vaihtunut odotuksen aikana: ei avata uudelleen (web tutkiTila-tarkistus).
            if (Tyohuone.Lehti?.LiiteAuki != Nimi) yield break;
            if (!ehdotukset.Ok)
            {
                if (ehdotukset.Virhe != null && ehdotukset.Virhe.IndexOf("avain", StringComparison.OrdinalIgnoreCase) >= 0) Avain = "";
                Ohje("Ehdotuksia ei saatu haettua: " + ehdotukset.Virhe, string.IsNullOrEmpty(Avain));
                yield break;
            }
            if (!tuottajat.Ok) Debug.LogWarning("MATKAKIRJA ui lukijoilta: pro-tuottajien haku ei onnistunut: " + tuottajat.Virhe);
            if (!reaktiot.Ok) Debug.LogWarning("MATKAKIRJA ui lukijoilta: reaktiolaskurien haku ei onnistunut: " + reaktiot.Virhe);
            var sivut = new List<LehtiSivu>();
            sivut.AddRange(EhdotusSivut(Lista(ehdotukset.Data, "ehdotukset")));
            sivut.AddRange(ReaktioSivut(reaktiot.Ok ? Lista(reaktiot.Data, "kohteet") : new List<Dictionary<string, object>>()));
            sivut.AddRange(ProSivut(tuottajat.Ok ? Lista(tuottajat.Data, "tuottajat") : new List<Dictionary<string, object>>()));
            Tyohuone.Lehti?.NaytaLiite(Nimi, sivut);
        }

        static LehtiSivu Sivu(string otsikko, params LehtiNosto[] nostot) => Tyohuone.Sivu(otsikko, null, false, nostot);

        static LehtiNosto Kuva(string otsikko, string url, string selite) => new LehtiNosto
        {
            Otsikko = otsikko, Teksti = "", Kuva = new LehtiKuva { Lahde = url, Lyhyt = selite, Selite = selite },
        };

        // --- ehdotukset (web lukijoiltaSivut, lukijoiltaTiedot, kuvavinkinRivit) -----------------------

        static bool OnRaamatunMuutos(Dictionary<string, object> e) =>
            T(e, "laji") == "raamattu" || (T(e, "teksti") ?? "").StartsWith("[Raamatun muutokset]", StringComparison.Ordinal);

        static string KayttoluvanNimi(string arvo) =>
            arvo == "sellaisenaan" ? "Kuvaa saa käyttää pelissä sellaisenaan"
            : arvo == "taustatieto" ? "Vain taustatiedoksi kohteesta — kuvaa ei julkaista" : arvo ?? "";

        static string Tiedot(Dictionary<string, object> e)
        {
            var rivit = new List<string>();
            string laji = T(e, "laji");
            if (laji == "kuvapalaute")
            {
                rivit.Add("PALAUTE HAVAINNEKUVASTA");
                if (!string.IsNullOrEmpty(T(e, "kuvatunnus"))) rivit.Add("Kuva: " + T(e, "kuvatunnus"));
                if (!string.IsNullOrEmpty(T(e, "kuvalahde"))) rivit.Add("Lähderivi: " + T(e, "kuvalahde"));
            }
            else if (laji == "kuvavinkki") rivit.Add("KUVAVINKKI PAIKASTA");
            if (!string.IsNullOrEmpty(T(e, "paikka"))) rivit.Add("Paikka: " + T(e, "paikka"));
            if (Rakenne.Olio(MiniJson.Kentta(e, "kuvaoikeudet")) is Dictionary<string, object> ko)
            {
                rivit.Add("Oikeudet: " + (B(ko, "omaKuva") ? "lähettäjä vakuuttaa ottaneensa kuvan itse ja omistavansa oikeudet" : "EI VAKUUTUSTA"));
                rivit.Add("Käyttölupa: " + KayttoluvanNimi(T(ko, "kayttolupa")));
            }
            if (Rakenne.Olio(MiniJson.Kentta(e, "pro")) is Dictionary<string, object> pro)
                rivit.Add("PRO-LÄHDE: " + (string.IsNullOrEmpty(T(pro, "nimi")) ? T(pro, "tekijaId") : T(pro, "nimi")));
            if (!string.IsNullOrEmpty(T(e, "teksti"))) rivit.Add(T(e, "teksti"));
            if (!string.IsNullOrEmpty(T(e, "sivu"))) rivit.Add("Sivuehdotus: " + T(e, "sivu"));
            if (!string.IsNullOrEmpty(T(e, "tarkenne"))) rivit.Add("Tarkenne: " + T(e, "tarkenne"));
            rivit.Add("Nimimerkki: " + (string.IsNullOrEmpty(T(e, "nimimerkki")) ? "(ei annettu)" : T(e, "nimimerkki"))
                + (B(e, "saaKrediitteihin") ? " — saa näkyä krediiteissä" : " — ei krediitteihin"));
            rivit.Add("Sähköposti: " + (string.IsNullOrEmpty(T(e, "sahkoposti")) ? "(ei annettu)" : T(e, "sahkoposti")));
            var kuvat = Lista(e, "kuvat");
            if (kuvat.Count > 0) rivit.Add($"Kuvia: {kuvat.Count}" + (B(e, "lisenssivakuutus") ? " — lisenssivakuutus annettu" : " — EI lisenssivakuutusta"));
            rivit.Add("Tila: " + (T(e, "tila") ?? "uusi"));
            if (MiniJson.Kentta(e, "palkkio") != null) rivit.Add($"Palkkio: {N(e, "palkkio")} p");
            if (!string.IsNullOrEmpty(T(e, "lunastuskoodi"))) rivit.Add("Lunastuskoodi: " + T(e, "lunastuskoodi"));
            if (!string.IsNullOrEmpty(T(e, "kommentti"))) rivit.Add("Kuratointi: " + T(e, "kommentti"));
            return string.Join("\n\n", rivit);
        }

        static IEnumerable<LehtiSivu> EhdotusSivut(List<Dictionary<string, object>> ehdotukset)
        {
            var raamatut = ehdotukset.Where(OnRaamatunMuutos).ToList();
            var lukijoilta = ehdotukset.Where(e => !OnRaamatunMuutos(e)).ToList();
            yield return Sivu(Nimi, new LehtiNosto
            {
                Otsikko = $"{lukijoilta.Count} ehdotusta" + (raamatut.Count > 0 ? $" · {raamatut.Count} Raamatun muutosta" : ""),
                Teksti = lukijoilta.Count > 0
                    ? "Uusin ensin. Yksi ehdotus sivua kohti: kuvat, teksti, sivuehdotus ja lähettäjän tiedot. Sähköposti näkyy vain "
                      + "täällä — sitä ei viedä peliin eikä repoon.\n\nKuratointi (\"kuratoi\"-ajo) kirjoittaa kommentin, tilan, "
                      + "palkkion ja lunastuskoodin samaan meta.jsoniin.\n\nPro-sisällöntuottajat ovat lehden lopussa omilla sivuillaan."
                    : "Yhtään ehdotusta ei ole vielä tullut.",
            });
            foreach (var e in lukijoilta)
            {
                var nostot = new List<LehtiNosto> { new LehtiNosto { Otsikko = string.IsNullOrEmpty(T(e, "sivu")) ? "Ehdotus" : T(e, "sivu"), Teksti = Tiedot(e) } };
                int j = 0;
                foreach (var kuva in Lista(e, "kuvat"))
                {
                    string tiedosto = T(kuva, "tiedosto");
                    nostot.Add(Kuva($"Kuva {++j}", $"{Osoite}/kohde/{Q(T(e, "kansio") + "/" + tiedosto)}?avain={Q(Avain)}", tiedosto));
                }
                yield return Sivu($"{Aika(T(e, "aikaleima"))} · {(string.IsNullOrEmpty(T(e, "nimimerkki")) ? "Nimetön" : T(e, "nimimerkki"))}", nostot.ToArray());
            }
            if (raamatut.Count == 0) yield break;
            yield return Sivu("Raamatun muutokset", new LehtiNosto
            {
                Otsikko = $"{raamatut.Count} lähetystä",
                Teksti = "Työhuoneen Raamattu-lehdestä lähetetyt muutokset. Jokainen sivu kertoo osion, kohdan numeron sekä vanhan ja "
                    + "uuden tekstin. Vain Fable kirjoittaa js/tyohuone-raamattu.js:ään.",
            });
            foreach (var e in raamatut)
                yield return Sivu($"{Aika(T(e, "aikaleima"))} · Raamattu", new LehtiNosto { Otsikko = "Raamatun muutokset", Teksti = Tiedot(e) });
        }

        // --- reaktiot (web reaktioSivut, reaktioRivi, reaktioTiedot) ---------------------------------

        static readonly (string Id, string Nimi)[] Symbolit =
            { ("hieno", "Hieno"), ("ihana", "Ihana"), ("mielenkiintoinen", "Mielenkiintoinen"), ("tylsa", "Tylsä"), ("virhe", "Virhe") };

        static string ReaktioRivi(Dictionary<string, object> aanet)
        {
            var osat = Symbolit.Where(s => N(aanet, s.Id) > 0).Select(s => $"{s.Nimi} {N(aanet, s.Id)}").ToList();
            return osat.Count > 0 ? string.Join(" · ", osat) : "ei ääniä";
        }

        static string ReaktioTiedot(Dictionary<string, object> k)
        {
            var rivit = new List<string> { ReaktioRivi(Rakenne.Olio(MiniJson.Kentta(k, "aanet"))) };
            string otsikko = T(k, "otsikko"), kohde = T(k, "kohde");
            if (!string.IsNullOrEmpty(otsikko) && otsikko != kohde) rivit.Add("Otsikko: " + otsikko);
            rivit.Add("Kohdeavain: " + kohde);
            if (!string.IsNullOrEmpty(T(k, "paivitetty"))) rivit.Add("Viimeisin ääni: " + Aika(T(k, "paivitetty")));
            if (!string.IsNullOrEmpty(T(k, "korjattu"))) rivit.Add("Merkitty korjatuksi: " + Aika(T(k, "korjattu")));
            return string.Join("\n\n", rivit);
        }

        static IEnumerable<LehtiSivu> ReaktioSivut(List<Dictionary<string, object>> kohteet)
        {
            Dictionary<string, object> Aanet(Dictionary<string, object> k) => Rakenne.Olio(MiniJson.Kentta(k, "aanet"));
            var tahralliset = kohteet.Where(k => N(Aanet(k), "virhe") > 0).ToList();
            var summa = Symbolit.ToDictionary(s => s.Id, s => (object)(double)kohteet.Sum(k => N(Aanet(k), s.Id)));
            var yhteenveto = new List<LehtiNosto>
            {
                new LehtiNosto
                {
                    Otsikko = $"{kohteet.Count} kohdetta on saanut ääniä",
                    Teksti = ReaktioRivi(summa) + "\n\n"
                        + "Pelaajat äänestävät jokaista popupia ja lehden väliotsikkoa viidellä symbolilla: laakeriseppele (Hieno), sydän "
                        + "(Ihana), suurennuslasi (Mielenkiintoinen), tiimalasi (Tylsä) ja mustetahra (Virhe). Yksi ääni laitetta ja kohdetta "
                        + "kohti, vaihdettavissa. Laskurit ovat yhteisiä; laitteista ei tallenneta mitään.\n\n"
                        + (tahralliset.Count > 0
                            ? $"{tahralliset.Count} kohteessa on mustetahra — ne ovat seuraavalla sivulla omine korjausnappeineen."
                            : "Yhdessäkään kohteessa ei ole mustetahraa."),
                },
            };
            yhteenveto.AddRange(kohteet.Take(60).Select(k => new LehtiNosto
            {
                Otsikko = string.IsNullOrEmpty(T(k, "otsikko")) ? T(k, "kohde") : T(k, "otsikko"), Teksti = ReaktioTiedot(k),
            }));
            yield return Sivu("Reaktiot", yhteenveto.ToArray());
            var virheet = new List<LehtiNosto>
            {
                new LehtiNosto
                {
                    Otsikko = tahralliset.Count > 0 ? $"{tahralliset.Count} kohdetta odottaa korjausta" : "Ei avoimia mustetahroja",
                    Teksti = "Virheen SELITYS on lehden alkupään ehdotussivuilla etuliitteellä REAKTIO/VIRHE — sama kohdeavain löytyy "
                        + "ehdotuksen Sisältö-riviltä. Kun virhe on korjattu peliin, paina alta \"Merkitse korjatuksi\": tahralaskuri "
                        + "nollautuu ja tahra häviää pelaajien näkymästä. Muut äänet jäävät koskematta.",
                },
            };
            foreach (var k in tahralliset)
            {
                string kohde = T(k, "kohde");
                virheet.Add(new LehtiNosto
                {
                    Otsikko = $"{(string.IsNullOrEmpty(T(k, "otsikko")) ? kohde : T(k, "otsikko"))} — {N(Aanet(k), "virhe")} tahraa",
                    Teksti = ReaktioTiedot(k),
                    Lisa = isa => Toiminto(isa, "Merkitse korjatuksi", null, (_, valmis) =>
                        UiKerros.Hae().StartCoroutine(Kutsu("/reaktio-korjattu", "PUT", "{\"kohde\":" + PeliApu.Json(kohde) + "}", valmis))),
                });
            }
            yield return Sivu($"Virheilmoitukset ({tahralliset.Count})", virheet.ToArray());
        }

        /// <summary>
        /// Web nosto.toiminnot: nappi (ja valinnainen kommenttikenttä webin window.promptin tilalla). Onnistunut kutsu
        /// avaa lehden uudelleen tuoreilla tiedoilla; epäonnistunut kertoo syyn napissa.
        /// </summary>
        static void Toiminto(VisualElement isa, string nimi, TextField kommentti, Action<string, Action<Vastaus>> tee)
        {
            var napit = isa.Q(className: "mk-tyohuone__napit") ?? Rakenne.El("mk-tyohuone__napit", isa, PickingMode.Ignore);
            Button b = null;
            b = Rakenne.Nappi(nimi, "mk-tyohuone__nappi", () =>
            {
                b.SetEnabled(false);
                tee((kommentti?.value ?? "").Trim(), v =>
                {
                    if (v.Ok) { Avaa(); return; }
                    b.SetEnabled(true);
                    Lomake.Nimi(b, "Ei onnistunut: " + v.Virhe);
                });
            }, napit);
            Kirjasimet.Aseta(b, Kirjasin.Kone);
        }

        static TextField Kentta(VisualElement isa, string vihje, bool monirivi = false)
        {
            var k = new TextField { multiline = monirivi };
            k.AddToClassList("mk-palaute__kentta");
            if (monirivi) k.AddToClassList("mk-palaute__kentta--iso");
            k.textEdition.placeholder = vihje;
            Rakenne.VapautaNappaimistonSulkeutuessa(k);
            Kirjasimet.Aseta(k, Kirjasin.Kone);
            isa.Add(k);
            return k;
        }

        // --- pro-tuottajat (web proSivut, proTiedot, proNapit) ----------------------------------------

        static string ProTila(string tila) =>
            tila == "odottaa" ? "odottaa hyväksyntää" : tila == "julkaistu" ? "julkaistu" : tila == "hylatty" ? "hylätty" : "kutsuttu, ei vielä profiilia";

        static string ProTiedot(Dictionary<string, object> t)
        {
            var rivit = new List<string>
            {
                "Sähköposti: " + T(t, "sahkoposti"),
                $"Koodi: {T(t, "koodi")}   (kopioi tämä tuottajalle — pysyvä)",
                $"Tekijätunnus: {T(t, "tekijaId")}   (kuvan lähderiville: tekijaId)",
                "Tila: " + ProTila(T(t, "tila")),
            };
            var profiili = Rakenne.Olio(MiniJson.Kentta(t, "profiili"));
            if (!string.IsNullOrEmpty(T(profiili, "esittely"))) rivit.Add("Esittely: " + T(profiili, "esittely"));
            foreach (var l in Lista(profiili, "linkit")) rivit.Add("Linkki: " + T(l, "url"));
            if (!string.IsNullOrEmpty(T(profiili, "paivitetty"))) rivit.Add("Profiili päivitetty: " + Aika(T(profiili, "paivitetty")));
            if (!string.IsNullOrEmpty(T(t, "julkaistu"))) rivit.Add("Julkaistu: " + Aika(T(t, "julkaistu")));
            if (!string.IsNullOrEmpty(T(t, "kommentti"))) rivit.Add("Oma kommentti: " + T(t, "kommentti"));
            return string.Join("\n\n", rivit);
        }

        static IEnumerable<LehtiSivu> ProSivut(List<Dictionary<string, object>> tuottajat)
        {
            int odottavat = tuottajat.Count(t => T(t, "tila") == "odottaa");
            yield return Sivu("Pro-tuottajat", new LehtiNosto
            {
                Otsikko = $"{tuottajat.Count} pro-tuottajaa",
                Teksti = (odottavat > 0 ? $"{odottavat} profiilia odottaa hyväksyntääsi.\n\n" : "Yksikään profiili ei odota hyväksyntää.\n\n")
                    + "Pro-tuottaja on henkilökohtaisesti kutsumasi ammattilainen: hän saa krediitin ja oman tekijäsivun peliin vastineeksi "
                    + "laadukkaasta sisällöstä. Lisää tuottaja, kopioi hänen koodinsa ja lähetä se lupapohjan kanssa "
                    + "(docs/pro-lisenssilupa.md).\n\nKun tuottajan kuva julkaistaan, lisää kuvan lähderiville kentät tekija ja "
                    + "tekijaId — silloin nimestä tulee painike, joka avaa tekijäsivun.",
                Lisa = LisaaTuottaja,
            });
            foreach (var t in tuottajat)
            {
                string nimi = string.IsNullOrEmpty(T(t, "nimi")) ? T(t, "sahkoposti") : T(t, "nimi");
                var profiili = Rakenne.Olio(MiniJson.Kentta(t, "profiili"));
                var nostot = new List<LehtiNosto>
                {
                    new LehtiNosto { Otsikko = nimi, Teksti = ProTiedot(t), Lisa = profiili != null ? (Action<VisualElement>)(isa => ProNapit(isa, t)) : null },
                };
                if (Rakenne.Olio(MiniJson.Kentta(profiili, "kuva")) is Dictionary<string, object> kuva)
                    nostot.Add(Kuva("Profiilikuva", $"{Osoite}/pro-kuva/{Q(T(t, "tekijaId"))}?avain={Q(Avain)}", T(kuva, "tiedosto")));
                yield return Sivu($"{nimi} · {ProTila(T(t, "tila"))}", nostot.ToArray());
            }
        }

        /// <summary>Web proNapit: Julkaise (uudelleen) / Hylkää kommentilla (window.prompt → kenttä).</summary>
        static void ProNapit(VisualElement isa, Dictionary<string, object> t)
        {
            var kommentti = Kentta(isa, "Kommentti tuottajalle (vapaaehtoinen; hylätessä: miksi profiilia ei julkaista)");
            string sahkoposti = T(t, "sahkoposti");
            void Paata(string tila, string k, Action<Vastaus> valmis) => UiKerros.Hae().StartCoroutine(Kutsu("/pro-hyvaksy", "PUT",
                "{\"sahkoposti\":" + PeliApu.Json(sahkoposti) + ",\"tila\":" + PeliApu.Json(tila) + ",\"kommentti\":" + PeliApu.Json(k) + "}", valmis));
            Toiminto(isa, T(t, "tila") == "julkaistu" ? "Julkaise uudelleen" : "Julkaise", kommentti, (k, v) => Paata("julkaistu", k, v));
            Toiminto(isa, "Hylkää", kommentti, (k, v) => Paata("hylatty", k, v));
        }

        /// <summary>Web "Lisää pro-tuottaja": sähköposti ja nimi kenttinä; tulos (koodi) näkyy sivulla kopioitavana.</summary>
        static void LisaaTuottaja(VisualElement isa)
        {
            var sahkoposti = Kentta(isa, "Tuottajan sähköposti");
            sahkoposti.keyboardType = TouchScreenKeyboardType.EmailAddress;
            var nimi = Kentta(isa, "Tuottajan nimi (näkyy pelissä)");
            var napit = Rakenne.El("mk-tyohuone__napit", isa, PickingMode.Ignore);
            var tulos = Tyohuone.Teksti(isa, "", "mk-tyohuone__tulos");
            Button b = null;
            b = Rakenne.Nappi("Lisää pro-tuottaja", "mk-tyohuone__nappi", () =>
            {
                string s = (sahkoposti.value ?? "").Trim();
                if (s.Length == 0) return;
                b.SetEnabled(false);
                UiKerros.Hae().StartCoroutine(Kutsu("/pro-tuottaja", "PUT",
                    "{\"sahkoposti\":" + PeliApu.Json(s) + ",\"nimi\":" + PeliApu.Json((nimi.value ?? "").Trim()) + "}", v =>
                    {
                        b.SetEnabled(true);
                        if (!v.Ok) { Lomake.Nimi(b, "Ei onnistunut: " + v.Virhe); return; }
                        var t = Rakenne.Olio(MiniJson.Kentta(v.Data, "tuottaja"));
                        string koodi = T(t, "koodi");
                        tulos.text = $"{(B(v.Data, "uusi") ? "Uusi tuottaja" : "Tuottaja oli jo listalla")}\n\n{T(t, "nimi")}\n{T(t, "sahkoposti")}\n\n"
                            + $"KOODI: {koodi}\n\nKoodi on pysyvä. Kopioi se tuottajalle lupapohjan kanssa.";
                        tulos.selection.isSelectable = true;
                        Lomake.Nimi(b, "Lisää pro-tuottaja");
                        var kopioi = Rakenne.Nappi("Kopioi koodi", "mk-tyohuone__nappi", null, napit);
                        kopioi.clicked += () => { GUIUtility.systemCopyBuffer = koodi; Lomake.Nimi(kopioi, "Kopioitu"); };
                        Kirjasimet.Aseta(kopioi, Kirjasin.Kone);
                    }));
            }, napit);
            Kirjasimet.Aseta(b, Kirjasin.Kone);
        }
    }
}
