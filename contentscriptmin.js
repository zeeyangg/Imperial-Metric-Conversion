void browser.runtime.sendMessage({
    message: 'Is metric enabled'
}, function(b) {
    if (b.metricIsEnabled) {
        var fractions = {
            '\xBC': 0.25,
            '\xBD': 0.5,
            '\xBE': 0.75,
            '\u2150': 0.1428,
            '\u2151': 0.111,
            '\u2152': 0.1,
            '\u2153': 0.333,
            '\u2154': 0.667,
            '\u2155': 0.2,
            '\u2156': 0.4,
            '\u2157': 0.6,
            '\u2158': 0.8,
            '\u2159': 0.167,
            '\u215A': 0.8333,
            '\u215B': 0.125,
            '\u215C': 0.375,
            '\u215D': 0.625,
            '\u215E': 0.875
        };

        const intOrFloat = '([0-9,.]+)',
            intOrFloatNoFrac = '([.,0-9]+(?![/\u2044]))?',
            unitSuffix = '( [(][0-9])?([^a-z]|$)',
            unitSuffixIn = '( [(]?[0-9]| [a-z]+)?([^a-z]|$)',
            unitSuffixft = '( [(]?[0-9]|[-\u2212 \xA0]?[0-9])?([^a-z]|$)',
            unitfrac = '[-\u2212 \xA0]?([\xBC\xBD\xBE\u2150\u2151\u2152\u2153\u2154\u2155\u2156\u2157\u2158\u2159\u215A\u215B\u215C\u215D\u215E]|[0-9]+[/\u2044][0-9]+)?',
            sqcu = '([-\u2212 \xA0]?(sq.?|square|cu.?|cubic))?',
            sq = '([-\u2212 \xA0]?(sq.?|square))?',
            units = [{
                regex: /(([0-9,.]+)[  ]?(°|º|deg(rees)?)[  ]?F(ahrenheits?)?( [(][0-9])?([^a-z]|$))/ig,
                unit: '\xB0C',
                multiplier: 1
            }, {
                regex: /([a-z#$€£]?([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?([-−  ]?(sq.?|square|cu.?|cubic))?[-−  ]?in(ch|ches|²|³)?( [(]?[0-9]| [a-z]+)?([^a-z]|$))/ig,
                unit: 'cm',
                unit2: 'mm',
                multiplier: 2.54,
                multiplier2: 25.4,
                multipliercu: 0.0163871,
                fullround: !0
            }, {
                regex: /([°º]? ?([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[-−  ]?('|′|’)(?!['′’])( [(]?[0-9]|[-−  ]?[0-9])?([^a-z]|$))/g,
                unit: 'm',
                multiplier: 0.3048
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?([-−  ]?(sq.?|square|cu.?|cubic))?[-−  ]?(feet|foot|ft)(²|³)?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'm',
                multiplier: 0.3048,
                multipliercu: 28.31690879986443
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?([-−  ]?(sq.?|square))?[  ]?(mi|miles?)(²|³)?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'km',
                multiplier: 1.60934,
                fullround: !0
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?([-−  ]?(sq.?|square))?[  ]?(yards?|yd)(²|³)?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'm',
                multiplier: 0.9144
            }, {
                regex: /(([0-9,.]+)[  ]?mph)( [(][0-9])?([^a-z]|$)/ig,
                unit: 'km/h',
                multiplier: 1.60934,
                fullround: !0,
                forceround: !0
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[  ]?(pound|lb)s?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'kg',
                unit2: 'g',
                multiplier: 0.453592,
                multiplier2: 453.592,
                fullround: !0
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[  ]?(ounces?|oz)( [(][0-9])?([^a-z]|$))/ig,
                unit: 'g',
                multiplier: 28.3495,
                forceround: !0
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[  ]?fl(uid)? ?(ounces?|oz)( [(][0-9])?([^a-z]|$))/ig,
                unit: 'mL',
                multiplier: 29.5735,
                forceround: !0,
                multiplierimp: 28.4131
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[  ]?gal(lons?)?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'L',
                multiplier: 3.78541,
                multiplierimp: 4.54609
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[  ]?pints?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'L',
                unit2: 'mL',
                multiplier: 0.473176,
                multiplier2: 473.176,
                fullround: !0,
                multiplierimp: 0.568261
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[-−  ]?cups?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'mL',
                multiplier: 236.59,
                forceround: !0,
                multiplierimp: 284.131
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[-−  ]?(qt|quarts?)( [(][0-9])?([^a-z]|$))/ig,
                unit: 'L',
                multiplier: 0.946353,
                multiplierimp: 1.13652
            }, {
                regex: /(([0-9,.]+)[  ]?stones?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'kg',
                multiplier: 6.35029
            }, {
                regex: /(([0-9,.]+)[  ]?mpgs?)( [(][0-9])?([^a-z]|$)/ig,
                unit: 'L/100km',
                multiplier: 0.425
            }];


        function walk(a) {
            let b, c;
            switch (a.nodeType) {
                case 1:
                case 9:
                case 11:
                    for (b = a.firstChild; b;) c = b.nextSibling, !1 === /SCRIPT|STYLE|IMG|NOSCRIPT|TEXTAREA|CODE/ig.test(b.nodeName) && walk(b), b = c;
                    break;
                case 3:
                    procNode(a);
                    break;
                default:
            }
        }

        function procNode(a) {
            let b = a.nodeValue;
            b.startsWith('{') || (b = qIn(b), b = amIn(b), b = rectIn(b), b = rectFt(b), b = rectFt2(b), b = ftin2m(b), b = sim(b), a.nodeValue = b)
        }

        function sim(a) {
            const b = units.length;
            for (let d = 0; d < b; d++)
                if (-1 !== a.search(units[d].regex))
                    for (let e; null !== (e = units[d].regex.exec(a));) try {
                        if (void 0 !== e[2] && !1 === /(?:^|\s)(\d*\.?\d+|\d{1,3}(?:,\d{3})*(?:\.\d+)?)(?!\S)/g.test(e[2])) continue;
                        let g = 0;
                        if (1 == d) {
                            if (/[a-z#$€£]/i.test(e[1].substring(0, 1))) continue;
                            if (void 0 !== e[7]) {
                                if (hasNumber(e[7])) continue;
                                if (' a' == e[7]) continue;
                                if (' an' == e[7]) continue;
                                if (' the' == e[7]) continue;
                                if (' my' == e[7]) continue;
                                if (' his' == e[7]) continue;
                                if (/ her/.test(e[7])) continue;
                                if (/ their/.test(e[7])) continue;
                                if (/ our/.test(e[7])) continue;
                                if (/ your/.test(e[7])) continue;
                                g = e[7].length
                            }
                        }
                        if (2 == d) {
                            if (/[°º]/.test(e[1])) continue;
                            if (/\d/ig.test(e[5])) continue
                        }
                        let h = '';
                        if (/[\(]/.test(e[1])) continue;
                        const k = e[1];
                        var c = e[2];
                        if (void 0 !== e[2] && (c = c.replace(',', ''), /[⁄]/.test(e[2]) ? (e[3] = e[2], c = 0) : c = parseFloat(c)), isNaN(c) && (c = 0), '/' === e[3]) continue;
                        if (void 0 !== e[3] && (c += addFraction(e[3])), 0 === c || isNaN(c)) continue;
                        /²/.test(e[1]) ? h = '\xB2' : /³/.test(e[1]) ? h = '\xB3' : 'undefined' != typeof e[5] && -1 !== e[5].toLowerCase().indexOf('sq') ? h = '\xB2' : 'undefined' != typeof e[5] && -1 !== e[5].toLowerCase().indexOf('cu') && (h = '\xB3');
                        const l = convAndForm(c, d, h);
                        let m = e.index + k.length;
                        m = m - e[e.length - 1].length - g, a = insertAt(a, l, m)
                    } catch (g) {}
            return a
        }

        function addFraction(frac) {
            if (fractions[frac] === void 0) try {
                if (/[a-zA-Z,\?\!\.]/.test(frac)) return 0;
                let cleanedFrac = frac.replace(/[^\d\/⁄]/, '');
                return cleanedFrac = frac.replace(/[⁄]/, '/'), 3 > cleanedFrac.length ? 0 : eval(cleanedFrac)
            } catch (a) {
                return 0
            }
            return fractions[frac]
        }

        function convAndForm(a, b, c) {
            let d = units[b].multiplier;
            !0 === isUK && void 0 !== units[b].multiplierimp && (d = units[b].multiplierimp);
            let e = units[b].unit;
            !0 === useMM && void 0 !== units[b].multiplier2 && (e = units[b].unit2, d = units[b].multiplier2);
            const g = !1 === useRounding && (!0 === useMM && void 0 !== units[b].multiplier2 && units[b].fullround || units[b].forceround);
            var h;
            if (0 === b) h = convertToC(a);
            else if ('\xB2' === c) h = convert(a, Math.pow(d, 2), g);
            else if ('\xB3' === c) h = convert(a, units[b].multipliercu, g), e = 'L', c = '';
            else {
                h = convert(a, d, g);
                let k = stepUpOrDown(h, e);
                h = roundNicely(k.met), e = k.unit
            }
            return 100 === h && 'cm' === e && !1 === useMM ? (h = 1, e = 'm') : 1e3 == h && 'mm' == e && !0 == useMM && (h = 1, e = 'm'), h = replaceWithComma(h), ' (' + h + ' ' + e + c + ')\u02DC '
        }

        function convert(a, b, c) {
            let d = a * b;
            return !0 === c ? Math.round(d) : roundNicely(d)
        }

        function stepUpOrDown(a, b) {
            return 1 > a ? 'cm' === b ? (a *= 10, b = 'mm') : 'm' === b ? !0 === useMM ? (a *= 1e3, b = 'mm') : (a *= 100, b = 'cm') : 'km' === b ? (a *= 1e3, b = 'm') : 'kg' === b ? (a *= 1e3, b = 'g') : 'L' === b ? (a *= 1e3, b = 'mL') : void 0 : 1e4 < a && (useGiga && (1e8 < a && ('m' === b ? (a /= 1e9, b = 'Gm') : 'g' === b ? (a /= 1e9, b = 'Gg') : 'L' === b ? (a /= 1e9, b = 'GL') : 'km' === b ? (a /= 1e6, b = 'Gm') : 'kg' === b ? (a /= 1e6, b = 'Gg') : void 0), 1e5 < a && ('m' === b ? (a /= 1e6, b = 'Mm') : 'g' === b ? (a /= 1e6, b = 'Mg') : 'L' === b ? (a /= 1e6, b = 'ML') : 'km' === b ? (a /= 1e3, b = 'Mm') : 'kg' === b ? (a /= 1e3, b = 'Mg') : 'kL' === b ? (a /= 1e3, b = 'ML') : void 0), 1e3 < a && 'L' === b && (a /= 1e3, b = 'KL')), 'mm' === b ? !0 === useMM ? (a /= 1e3, b = 'm') : (a /= 100, b = 'cm') : 'cm' === b ? (a /= 100, b = 'm') : 'm' === b ? (a /= 1e3, b = 'km') : 'g' === b ? (a /= 1e3, b = 'kg') : 'mL' === b ? (a /= 1e3, b = 'L') : void 0), {
                met: a,
                unit: b
            }
        }

        function replaceWithComma(a) {
            return !1 === useComma ? !0 === useSpaces ? a.toLocaleString('us-EN').replace(',', ' ') : a.toLocaleString('us-EN') : !0 === useSpaces ? a.toLocaleString('de-DE').replace('.', ' ') : a.toLocaleString('de-DE')
        }

        function roundNicely(a) {
            if (!1 === useRounding) return Math.round(100 * a) / 100;
            var b = Math.round(a);
            if (3 > Math.abs(100 * (1 - a / b))) return b;
            var c = Math.round(10 * a) / 10;
            if (1.6 > Math.abs(100 * (1 - a / c))) return c;
            var d = Math.round(100 * a) / 100;
            return d
        }

        function convertToC(a) {
            return Math.round(5 / 9 * (a - 32))
        }

        function insertAt(a, b, c) {
            return a.substr(0, c) + b + a.substr(c)
        }

        function amIn(a) {
            let b = /(([0-9]+(.[0-9]+)?)[  ]?[x|*][  ]?([0-9]+(.[0-9]+)?)[  ]?[x|*][  ]?([0-9]+(.[0-9]+)?)[  ]?in(ch|ches|.)?)([^a-zA-Z]|$)/ig;
            if (-1 !== a.search(b))
                for (let c; null !== (c = b.exec(a));) try {
                    const d = c[1];
                    let e = 2.54,
                        g = ' cm';
                    !0 === useMM && (e = 25.4, g = ' mm');
                    let h = replaceWithComma(roundNicely(c[2] * e)),
                        k = replaceWithComma(roundNicely(c[4] * e)),
                        l = replaceWithComma(roundNicely(c[6] * e));
                    const m = c.index + d.length,
                        n = '(' + h + ' x ' + k + ' x ' + l + g + ')\u02DC' + c[c.length - 1];
                    a = a.replace(c[0], n)
                } catch (d) {}
            return a
        }

        function rectIn(a) {
            let b = /(([0-9]+(.[0-9]+)?)[-−  ]?[x|*|×][-−  ]?([0-9]+(.[0-9]+)?)[-−  ]?in(ch|ches|.)?)([^a-zA-Z]|$)/ig;
            if (-1 !== a.search(b))
                for (let c; null !== (c = b.exec(a));) try {
                    const d = c[1];
                    let e = 2.54,
                        g = ' cm';
                    !0 === useMM && (e = 25.4, g = ' mm');
                    let h = replaceWithComma(roundNicely(c[2] * e)),
                        k = replaceWithComma(roundNicely(c[4] * e));
                    const l = c.index + d.length,
                        m = '(' + h + ' x ' + k + g + ')\u02DC' + c[c.length - 1];
                    a = a.replace(c[0], m)
                } catch (d) {}
            return a
        }

        function rectFt2(a) {
            let b = /(([0-9]+(.[0-9]+)?)[-−  ]?[x|*|×][-−  ]?([0-9]+(.[0-9]+)?)[-−  ]?(feet|foot|ft))([^a-zA-Z]|$)/ig;
            if (-1 !== a.search(b))
                for (let c; null !== (c = b.exec(a));) try {
                    const d = c[1];
                    let e = 0.3048,
                        h = replaceWithComma(roundNicely(c[2] * e)),
                        k = replaceWithComma(roundNicely(c[4] * e));
                    const l = c.index + d.length,
                        m = '(' + h + ' x ' + k + ' m' + ')\u02DC' + c[c.length - 1];
                    a = a.replace(c[0], m)
                } catch (d) {}
            return a
        }

        function rectFt(a) {
            let b = /(([0-9]+)['′’][-−  ]?[x|*|×][-−  ]?([0-9]+)['′’])([^a-zA-Z]|$)/ig;
            if (-1 !== a.search(b))
                for (let c; null !== (c = b.exec(a));) try {
                    const d = c[1];
                    let e = 0.3048,
                        h = replaceWithComma(roundNicely(c[2] * e)),
                        k = replaceWithComma(roundNicely(c[3] * e));
                    const l = c.index + d.length,
                        m = '(' + h + ' x ' + k + ' m' + ')\u02DC' + c[c.length - 1];
                    a = a.replace(c[0], m)
                } catch (d) {}
            return a
        }

        function hasNumber(a) {
            return /\d/.test(a)
        }

        function qIn(a) {
            for (let c, b = /([°|º]? ?(([0-9]{0,3})['’′][-−  ]?)?(([.0-9]+(?!\/)(.[0-9]+)?)?[-−  ]?([^ a-z,?.!]|[0-9]+[\/⁄][0-9]+)?)?("|″|”|“|’’|''|′′)( [(][0-9])?)/g, d = !1; null !== (c = b.exec(a));) try {
                const e = c[1];
                if (/“/.test(e)) {
                    d = !0;
                    continue
                }
                if (!hasNumber(e) && /[\"\″]/.test(e)) {
                    d = !d;
                    continue
                }
                if (!0 == d) {
                    d = !1;
                    continue
                }
                if (/[\(]/.test(c[9])) continue;
                if (/[°|º]/.test(e)) continue;
                let g = parseFloat(c[3]);
                isNaN(g) && (g = 0);
                let h = c[5];
                if (/[⁄]/.test(c[5]) ? (c[7] = c[5], h = 0) : (h = parseFloat(h), isNaN(h) && (h = 0)), void 0 !== c[7] && (h += addFraction(c[7])), 0 === h || isNaN(h)) continue;
                let k = g + h / 12,
                    l = '';
                l = 3 < k ? convAndForm(g + h / 12, 2, '') : convAndForm(12 * g + h, 1, '');
                const m = c.index + e.length;
                a = insertAt(a, l, m)
            } catch (e) {}
            return a
        }

        function ftin2m(a) {
            let b = /(([0-9]{0,3}).?(ft|yd).?([0-9]+(.[0-9]+)?).?in(ch|ches)?)/g;
            if (-1 !== a.search(b))
                for (let d; null !== (d = b.exec(a));) try {
                    d[0];
                    let g = d[2];
                    g = parseFloat(g);
                    let h = d[4];
                    h = parseFloat(h);
                    let k = 0;
                    var c = /yd/i;
                    c.test(d[3]) && (g *= 3), k = 12 * g + h;
                    let l = '(' + replaceWithComma(roundNicely(0.0254 * k)) + ' m)\u02DC';
                    a = a.replace(d[0], l)
                } catch (e) {}
            return a
        }
        var useComma, useMM, useRounding, useMO, useGiga, useSpaces, isUK = !1;
        document.addEventListener('DOMContentLoaded', function() {
            var a = document.documentElement.outerHTML;
            return /contenteditable/.test(a) ? void console.log('Everything Metric extension is when there is an \'contenteditable\' element on page to prevent unintentional edits') : /docs\.google\./.test(window.location.toString()) || /drive\.google\./.test(window.location.toString()) ? void console.log('Everything Metric extension is disabled on Google Docs to prevent unintentional edits') : /medium\.com/.test(window.location.toString()) && /\/edit/.test(window.location.toString()) ? void console.log('Everything Metric extension is disabled on medium.com/.../edit') : void browser.runtime.sendMessage({
                message: 'Is metric enabled'
            }, function(b) {
                if (useComma = b.useComma, useMM = b.useMM, useRounding = b.useRounding, useMO = b.useMO, useGiga = b.useGiga, useSpaces = b.useSpaces, !0 === b.metricIsEnabled) {
                    let c = !1;
                    /\.amazon\./.test(window.location.toString()) && (c = !0), /\.uk\//.test(window.location.toString()) && (isUK = !0), walk(document.body), (!0 === useMO || !0 == c) && initMO(document.body)
                }
            })
        }, !1);

        function initMO(a) {
            MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            var b = new MutationObserver(function(e) {
                    for (var h = 0; h < e.length; h++)
                        for (var k = 0; k < e[h].addedNodes.length; k++) walk(e[h].addedNodes[k])
                }),
                c = {
                    characterData: !1,
                    childList: !0,
                    subtree: !0
                };
            (function() {
                b.takeRecords(), b.observe(a, c)
            })()
        }

    } else {
        console.log("Imperial Enabled");
        var fractions = {
            '\xBC': 0.25,
            '\xBD': 0.5,
            '\xBE': 0.75,
            '\u2150': 0.1428,
            '\u2151': 0.111,
            '\u2152': 0.1,
            '\u2153': 0.333,
            '\u2154': 0.667,
            '\u2155': 0.2,
            '\u2156': 0.4,
            '\u2157': 0.6,
            '\u2158': 0.8,
            '\u2159': 0.167,
            '\u215A': 0.8333,
            '\u215B': 0.125,
            '\u215C': 0.375,
            '\u215D': 0.625,
            '\u215E': 0.875
        };

        const intOrFloat = '([0-9,.]+)',
            intOrFloatNoFrac = '([.,0-9]+(?![/\u2044]))?',
            unitSuffix = '( [(][0-9])?([^a-z]|$)',
            unitSuffixIn = '( [(]?[0-9]| [a-z]+)?([^a-z]|$)',
            unitSuffixft = '( [(]?[0-9]|[-\u2212 \xA0]?[0-9])?([^a-z]|$)',
            unitfrac = '[-\u2212 \xA0]?([\xBC\xBD\xBE\u2150\u2151\u2152\u2153\u2154\u2155\u2156\u2157\u2158\u2159\u215A\u215B\u215C\u215D\u215E]|[0-9]+[/\u2044][0-9]+)?',
            sqcu = '([-\u2212 \xA0]?(sq.?|square|cu.?|cubic))?',
            sq = '([-\u2212 \xA0]?(sq.?|square))?',
            units = [{
                regex: /(([0-9,.]+)[  ]?(°|º|deg(rees)?)[  ]?C(elsius?)?( [(][0-9])?([^a-z]|$))/ig,
                unit: '\xB0F',
                multiplier: 1
            }, {
                regex: /([a-z#$€£]?([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?([-−  ]?(sq.?|square|cu.?|cubic))?[-−  ]?in(ch|ches|²|³)?( [(]?[0-9]| [a-z]+)?([^a-z]|$))/ig,
                unit: 'cm',
                unit2: 'mm',
                multiplier: 2.54,
                multiplier2: 25.4,
                multipliercu: 0.0163871,
                fullround: !0
            }, {
                regex: /([°º]? ?([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[-−  ]?('|′|’)(?!['′’])( [(]?[0-9]|[-−  ]?[0-9])?([^a-z]|$))/g,
                unit: 'm',
                multiplier: 0.3048
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?([-−  ]?(sq.?|square|cu.?|cubic))?[-−  ]?(feet|foot|ft)(²|³)?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'm',
                multiplier: 0.3048,
                multipliercu: 28.31690879986443
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?([-−  ]?(sq.?|square))?[  ]?(mi|miles?)(²|³)?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'km',
                multiplier: 1.60934,
                fullround: !0
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?([-−  ]?(sq.?|square))?[  ]?(yards?|yd)(²|³)?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'm',
                multiplier: 0.9144
            }, {
                regex: /(([0-9,.]+)[  ]?mph)( [(][0-9])?([^a-z]|$)/ig,
                unit: 'km/h',
                multiplier: 1.60934,
                fullround: !0,
                forceround: !0
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[  ]?(kilogram|kilogramme|kg)s?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'lb',
                multiplier: 2.20462,
                fullround: !0
            }, {
				regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[  ]?(grams?|grammes?|g)( [(][0-9])?([^a-z]|$))/ig,
                unit: 'oz',
                multiplier: 0.035274,
                forceround: !0
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[  ]?fl(uid)? ?(ounces?|oz)( [(][0-9])?([^a-z]|$))/ig,
                unit: 'mL',
                multiplier: 29.5735,
                forceround: !0,
                multiplierimp: 28.4131
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[  ]?gal(lons?)?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'L',
                multiplier: 3.78541,
                multiplierimp: 4.54609
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[  ]?pints?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'L',
                unit2: 'mL',
                multiplier: 0.473176,
                multiplier2: 473.176,
                fullround: !0,
                multiplierimp: 0.568261
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[-−  ]?cups?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'mL',
                multiplier: 236.59,
                forceround: !0,
                multiplierimp: 284.131
            }, {
                regex: /(([.,0-9]+(?![\/⁄]))?[-−  ]?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|[0-9]+[\/⁄][0-9]+)?[-−  ]?(qt|quarts?)( [(][0-9])?([^a-z]|$))/ig,
                unit: 'L',
                multiplier: 0.946353,
                multiplierimp: 1.13652
            }, {
                regex: /(([0-9,.]+)[  ]?stones?( [(][0-9])?([^a-z]|$))/ig,
                unit: 'kg',
                multiplier: 6.35029
            }, {
                regex: /(([0-9,.]+)[  ]?mpgs?)( [(][0-9])?([^a-z]|$)/ig,
                unit: 'L/100km',
                multiplier: 0.425
            }];


        function walk(a) {
            let b, c;
            switch (a.nodeType) {
                case 1:
                case 9:
                case 11:
                    for (b = a.firstChild; b;) c = b.nextSibling, !1 === /SCRIPT|STYLE|IMG|NOSCRIPT|TEXTAREA|CODE/ig.test(b.nodeName) && walk(b), b = c;
                    break;
                case 3:
                    procNode(a);
                    break;
                default:
            }
        }

        function procNode(a) {
            let b = a.nodeValue;
            b.startsWith('{') || (b = qIn(b), b = amIn(b), b = rectIn(b), b = rectFt(b), b = rectFt2(b), b = ftin2m(b), b = sim(b), a.nodeValue = b)
        }

        function sim(a) {
            const b = units.length;
            for (let d = 0; d < b; d++)
                if (-1 !== a.search(units[d].regex))
                    for (let e; null !== (e = units[d].regex.exec(a));) try {
                        if (void 0 !== e[2] && !1 === /(?:^|\s)(\d*\.?\d+|\d{1,3}(?:,\d{3})*(?:\.\d+)?)(?!\S)/g.test(e[2])) continue;
                        let g = 0;
                        if (1 == d) {
                            if (/[a-z#$€£]/i.test(e[1].substring(0, 1))) continue;
                            if (void 0 !== e[7]) {
                                if (hasNumber(e[7])) continue;
                                if (' a' == e[7]) continue;
                                if (' an' == e[7]) continue;
                                if (' the' == e[7]) continue;
                                if (' my' == e[7]) continue;
                                if (' his' == e[7]) continue;
                                if (/ her/.test(e[7])) continue;
                                if (/ their/.test(e[7])) continue;
                                if (/ our/.test(e[7])) continue;
                                if (/ your/.test(e[7])) continue;
                                g = e[7].length
                            }
                        }
                        if (2 == d) {
                            if (/[°º]/.test(e[1])) continue;
                            if (/\d/ig.test(e[5])) continue
                        }
                        let h = '';
                        if (/[\(]/.test(e[1])) continue;
                        const k = e[1];
                        var c = e[2];
                        if (void 0 !== e[2] && (c = c.replace(',', ''), /[⁄]/.test(e[2]) ? (e[3] = e[2], c = 0) : c = parseFloat(c)), isNaN(c) && (c = 0), '/' === e[3]) continue;
                        if (void 0 !== e[3] && (c += addFraction(e[3])), 0 === c || isNaN(c)) continue;
                        /²/.test(e[1]) ? h = '\xB2' : /³/.test(e[1]) ? h = '\xB3' : 'undefined' != typeof e[5] && -1 !== e[5].toLowerCase().indexOf('sq') ? h = '\xB2' : 'undefined' != typeof e[5] && -1 !== e[5].toLowerCase().indexOf('cu') && (h = '\xB3');
                        const l = convAndForm(c, d, h);
                        let m = e.index + k.length;
                        m = m - e[e.length - 1].length - g, a = insertAt(a, l, m)
                    } catch (g) {}
            return a
        }

        function addFraction(frac) {
            if (fractions[frac] === void 0) try {
                if (/[a-zA-Z,\?\!\.]/.test(frac)) return 0;
                let cleanedFrac = frac.replace(/[^\d\/⁄]/, '');
                return cleanedFrac = frac.replace(/[⁄]/, '/'), 3 > cleanedFrac.length ? 0 : eval(cleanedFrac)
            } catch (a) {
                return 0
            }
            return fractions[frac]
        }

        function convAndForm(a, b, c) {
            let d = units[b].multiplier;
            !0 === isUK && void 0 !== units[b].multiplierimp && (d = units[b].multiplierimp);
            let e = units[b].unit;
            !0 === useMM && void 0 !== units[b].multiplier2 && (e = units[b].unit2, d = units[b].multiplier2);
            const g = !1 === useRounding && (!0 === useMM && void 0 !== units[b].multiplier2 && units[b].fullround || units[b].forceround);
            var h;
            if (0 === b) h = convertToF(a);
            else if ('\xB2' === c) h = convert(a, Math.pow(d, 2), g);
            else if ('\xB3' === c) h = convert(a, units[b].multipliercu, g), e = 'L', c = '';
            else {
                h = convert(a, d, g);
                let k = stepUpOrDown(h, e);
                h = roundNicely(k.met), e = k.unit
            }
            return 100 === h && 'cm' === e && !1 === useMM ? (h = 1, e = 'm') : 1e3 == h && 'mm' == e && !0 == useMM && (h = 1, e = 'm'), h = replaceWithComma(h), ' (' + h + ' ' + e + c + ')\u02DC '
        }

        function convert(a, b, c) {
            let d = a * b;
            return !0 === c ? Math.round(d) : roundNicely(d)
        }

        function stepUpOrDown(a, b) {
            return 1 > a ? 'cm' === b ? (a *= 10, b = 'mm') : 'm' === b ? !0 === useMM ? (a *= 1e3, b = 'mm') : (a *= 100, b = 'cm') : 'km' === b ? (a *= 1e3, b = 'm') : 'kg' === b ? (a *= 1e3, b = 'g') : 'L' === b ? (a *= 1e3, b = 'mL') : void 0 : 1e4 < a && (useGiga && (1e8 < a && ('m' === b ? (a /= 1e9, b = 'Gm') : 'g' === b ? (a /= 1e9, b = 'Gg') : 'L' === b ? (a /= 1e9, b = 'GL') : 'km' === b ? (a /= 1e6, b = 'Gm') : 'kg' === b ? (a /= 1e6, b = 'Gg') : void 0), 1e5 < a && ('m' === b ? (a /= 1e6, b = 'Mm') : 'g' === b ? (a /= 1e6, b = 'Mg') : 'L' === b ? (a /= 1e6, b = 'ML') : 'km' === b ? (a /= 1e3, b = 'Mm') : 'kg' === b ? (a /= 1e3, b = 'Mg') : 'kL' === b ? (a /= 1e3, b = 'ML') : void 0), 1e3 < a && 'L' === b && (a /= 1e3, b = 'KL')), 'mm' === b ? !0 === useMM ? (a /= 1e3, b = 'm') : (a /= 100, b = 'cm') : 'cm' === b ? (a /= 100, b = 'm') : 'm' === b ? (a /= 1e3, b = 'km') : 'g' === b ? (a /= 1e3, b = 'kg') : 'mL' === b ? (a /= 1e3, b = 'L') : void 0), {
                met: a,
                unit: b
            }
        }

        function replaceWithComma(a) {
            return !1 === useComma ? !0 === useSpaces ? a.toLocaleString('us-EN').replace(',', ' ') : a.toLocaleString('us-EN') : !0 === useSpaces ? a.toLocaleString('de-DE').replace('.', ' ') : a.toLocaleString('de-DE')
        }

        function roundNicely(a) {
            if (!1 === useRounding) return Math.round(100 * a) / 100;
            var b = Math.round(a);
            if (3 > Math.abs(100 * (1 - a / b))) return b;
            var c = Math.round(10 * a) / 10;
            if (1.6 > Math.abs(100 * (1 - a / c))) return c;
            var d = Math.round(100 * a) / 100;
            return d
        }

        function convertToF(a) {
            return Math.round((9 / 5 * a) + 32)
        }

        function insertAt(a, b, c) {
            return a.substr(0, c) + b + a.substr(c)
        }

        function amIn(a) {
            let b = /(([0-9]+(.[0-9]+)?)[  ]?[x|*][  ]?([0-9]+(.[0-9]+)?)[  ]?[x|*][  ]?([0-9]+(.[0-9]+)?)[  ]?in(ch|ches|.)?)([^a-zA-Z]|$)/ig;
            if (-1 !== a.search(b))
                for (let c; null !== (c = b.exec(a));) try {
                    const d = c[1];
                    let e = 2.54,
                        g = ' cm';
                    !0 === useMM && (e = 25.4, g = ' mm');
                    let h = replaceWithComma(roundNicely(c[2] * e)),
                        k = replaceWithComma(roundNicely(c[4] * e)),
                        l = replaceWithComma(roundNicely(c[6] * e));
                    const m = c.index + d.length,
                        n = '(' + h + ' x ' + k + ' x ' + l + g + ')\u02DC' + c[c.length - 1];
                    a = a.replace(c[0], n)
                } catch (d) {}
            return a
        }

        function rectIn(a) {
            let b = /(([0-9]+(.[0-9]+)?)[-−  ]?[x|*|×][-−  ]?([0-9]+(.[0-9]+)?)[-−  ]?in(ch|ches|.)?)([^a-zA-Z]|$)/ig;
            if (-1 !== a.search(b))
                for (let c; null !== (c = b.exec(a));) try {
                    const d = c[1];
                    let e = 2.54,
                        g = ' cm';
                    !0 === useMM && (e = 25.4, g = ' mm');
                    let h = replaceWithComma(roundNicely(c[2] * e)),
                        k = replaceWithComma(roundNicely(c[4] * e));
                    const l = c.index + d.length,
                        m = '(' + h + ' x ' + k + g + ')\u02DC' + c[c.length - 1];
                    a = a.replace(c[0], m)
                } catch (d) {}
            return a
        }

        function rectFt2(a) {
            let b = /(([0-9]+(.[0-9]+)?)[-−  ]?[x|*|×][-−  ]?([0-9]+(.[0-9]+)?)[-−  ]?(feet|foot|ft))([^a-zA-Z]|$)/ig;
            if (-1 !== a.search(b))
                for (let c; null !== (c = b.exec(a));) try {
                    const d = c[1];
                    let e = 0.3048,
                        h = replaceWithComma(roundNicely(c[2] * e)),
                        k = replaceWithComma(roundNicely(c[4] * e));
                    const l = c.index + d.length,
                        m = '(' + h + ' x ' + k + ' m' + ')\u02DC' + c[c.length - 1];
                    a = a.replace(c[0], m)
                } catch (d) {}
            return a
        }

        function rectFt(a) {
            let b = /(([0-9]+)['′’][-−  ]?[x|*|×][-−  ]?([0-9]+)['′’])([^a-zA-Z]|$)/ig;
            if (-1 !== a.search(b))
                for (let c; null !== (c = b.exec(a));) try {
                    const d = c[1];
                    let e = 0.3048,
                        h = replaceWithComma(roundNicely(c[2] * e)),
                        k = replaceWithComma(roundNicely(c[3] * e));
                    const l = c.index + d.length,
                        m = '(' + h + ' x ' + k + ' m' + ')\u02DC' + c[c.length - 1];
                    a = a.replace(c[0], m)
                } catch (d) {}
            return a
        }

        function hasNumber(a) {
            return /\d/.test(a)
        }

        function qIn(a) {
            for (let c, b = /([°|º]? ?(([0-9]{0,3})['’′][-−  ]?)?(([.0-9]+(?!\/)(.[0-9]+)?)?[-−  ]?([^ a-z,?.!]|[0-9]+[\/⁄][0-9]+)?)?("|″|”|“|’’|''|′′)( [(][0-9])?)/g, d = !1; null !== (c = b.exec(a));) try {
                const e = c[1];
                if (/“/.test(e)) {
                    d = !0;
                    continue
                }
                if (!hasNumber(e) && /[\"\″]/.test(e)) {
                    d = !d;
                    continue
                }
                if (!0 == d) {
                    d = !1;
                    continue
                }
                if (/[\(]/.test(c[9])) continue;
                if (/[°|º]/.test(e)) continue;
                let g = parseFloat(c[3]);
                isNaN(g) && (g = 0);
                let h = c[5];
                if (/[⁄]/.test(c[5]) ? (c[7] = c[5], h = 0) : (h = parseFloat(h), isNaN(h) && (h = 0)), void 0 !== c[7] && (h += addFraction(c[7])), 0 === h || isNaN(h)) continue;
                let k = g + h / 12,
                    l = '';
                l = 3 < k ? convAndForm(g + h / 12, 2, '') : convAndForm(12 * g + h, 1, '');
                const m = c.index + e.length;
                a = insertAt(a, l, m)
            } catch (e) {}
            return a
        }

        function ftin2m(a) {
            let b = /(([0-9]{0,3}).?(ft|yd).?([0-9]+(.[0-9]+)?).?in(ch|ches)?)/g;
            if (-1 !== a.search(b))
                for (let d; null !== (d = b.exec(a));) try {
                    d[0];
                    let g = d[2];
                    g = parseFloat(g);
                    let h = d[4];
                    h = parseFloat(h);
                    let k = 0;
                    var c = /yd/i;
                    c.test(d[3]) && (g *= 3), k = 12 * g + h;
                    let l = '(' + replaceWithComma(roundNicely(0.0254 * k)) + ' m)\u02DC';
                    a = a.replace(d[0], l)
                } catch (e) {}
            return a
        }
        var useComma, useMM, useRounding, useMO, useGiga, useSpaces, isUK = !1;
        document.addEventListener('DOMContentLoaded', function() {
            var a = document.documentElement.outerHTML;
            return /contenteditable/.test(a) ? void console.log('Everything Metric extension is when there is an \'contenteditable\' element on page to prevent unintentional edits') : /docs\.google\./.test(window.location.toString()) || /drive\.google\./.test(window.location.toString()) ? void console.log('Everything Metric extension is disabled on Google Docs to prevent unintentional edits') : /medium\.com/.test(window.location.toString()) && /\/edit/.test(window.location.toString()) ? void console.log('Everything Metric extension is disabled on medium.com/.../edit') : void browser.runtime.sendMessage({
                message: 'Is metric enabled'
            }, function(b) {
                if (useComma = b.useComma, useMM = b.useMM, useRounding = b.useRounding, useMO = b.useMO, useGiga = b.useGiga, useSpaces = b.useSpaces, !1 === b.metricIsEnabled) {
					console.log("Background if successful");
                    let c = !1;
                    /\.amazon\./.test(window.location.toString()) && (c = !0), /\.uk\//.test(window.location.toString()) && (isUK = !0), walk(document.body), (!0 === useMO || !0 == c) && initMO(document.body)
                }
            })
        }, !1);

        function initMO(a) {
            MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            var b = new MutationObserver(function(e) {
                    for (var h = 0; h < e.length; h++)
                        for (var k = 0; k < e[h].addedNodes.length; k++) walk(e[h].addedNodes[k])
                }),
                c = {
                    characterData: !1,
                    childList: !0,
                    subtree: !0
                };
            (function() {
                b.takeRecords(), b.observe(a, c)
            })()
        }
    }
});