var mongoose = require('mongoose');
var AskDoc = require('./models/askdoc');
var Doc = require('./models/doc');
var Insurence = require('./models/insurence');
var Offer = require('./models/offer');
var Opinion = require('./models/opinion');
var Rating = require('./models/rating');
var Suggestion = require('./models/suggestion');
var User = require('./models/user');
var Gallary = require('./models/gallary');
var Days = require('./models/Days');
var Book = require('./models/Booking');
module.exports = function (app) {
    //var api = express.Router();
    ////////////////error custom format
    function formatedError(err) {
        var count = 0;
        for (var errName in err.errors) {
            count++;
        }
        var replay = [];
        var result;
        var first;
        for (var i = 0; i < count; i++) {
            first = err.errors[Object.keys(err.errors)[i]];
            replay.push({ type: 'error', message: first.message });
        }
        result = { type: "error", errors: replay }
        return result;
    }
    ///////////////Test function
    app.get('/', function (req, res) {

        res.json({ type: 'success', data: 'API is working great' });
    });
    ////////////////users

    //insert  new user
    app.post('/user', function (req, res) {
        if (req.body.SocialId != null) {
            User.findOne({ SocialId: req.body.SocialId, loginway: req.body.loginway }, function (err, user) {
                if (err) {
                    res.json(formatedError(err));
                }
                else {
                    if (user) {
                        console.log(user);
                        res.json({ type: 21, data: 'user here before ' });
                    }
                    else {
                        var user = new User({
                            Name: req.body.Name,
                            SocialId: req.body.SocialId,
                            Email: req.body.Email,
                            picUrl: req.body.picUrl,
                            loginway: req.body.loginway
                        });
                        user.save(function (err) {
                            if (err) {
                                res.json(formatedError(err));
                            }
                            else {
                                res.json({ type: 100, data: user });
                            }
                        });
                    }
                }
            })
        }
    });
    //// get all usres
    app.get('/user', function (req, res) {
        User.find({}, function (err, user) {
            if (err) {
                res.json(formatedError(err));
            } else {
                if (user) {
                    res.json({ code: 100, data: user });
                }
                else {
                    res.json({ code: 21, message: 'no users exist' });
                }
            }
        })
    });
    //doc....................................................
    // insert  new doc 
    app.post('/doc', function (req, res) {
        var Doctor = new Doc({
            Email: req.body.Email,
            Name: req.body.Name,
            Password: req.body.Password,
            Status: req.body.Status,
            PicUrl: req.body.PicUrl,
            Dep: req.body.Dep

        });
        Doctor.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });

                }
                else {
                    res.json(formatedError(err));
                }

            }
            else {
                res.json({ code: 100, data: Doctor });
            }
        });


    });
    //all doc 
    app.get('/doc', function (req, res) {
        Doc.find({}, function (err, docs) {
            if (err)
                res.json(formatedError());
            else
                res.json({ code: 100, data: docs });
        })


    });
    ///one doc
    app.get('/doc/:id', function (req, res) {
        Doc.find({ _id: req.params.id }, function (err, docs) {
            if (err)
                res.json(formatedError());
            else
                res.json({ code: 100, data: docs });
        });
    });
    ///// put 
    app.put('/doc/:id', function (req, res) {
        Doc.findOne({ _id: req.params.id }, function (err, doc) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (doc) {
                    doc.Email = req.body.Email,
                               doc.Name = req.body.Name,
                               doc.Password = req.body.Password,
                               doc.Status = req.body.Status,
                               doc.PicUrl = req.body.PicUrl,
                               doc.Dep = req.body.Dep
                    doc.save(function (err) {
                        if (err)
                            res.json(formatedError(err));
                        else {
                            res.json({ code: 100, data: doc });
                        }
                    })
                }


            }

        });

    });

    ////ask doc..............................................
    app.post('/askdoc', function (req, res) {
        var askdoc = new AskDoc({
            question: req.body.question,
            question_creator: req.body.question_creator,
            dep: req.body.dep


        });
        askdoc.save(function (err) {
            if (err)
                res.json(formatedError(err));
            else
                res.json({ code: 100, data: askdoc });
        })



    });
    //all asks 
    app.get('/askdoc', function (req, res) {
        AskDoc.find({}, function (err, asks) {
            if (err)
                res.json(formatedError());
            else
                res.json({ code: 100, data: asks });
        })


    });
    ///one ask  with id 
    app.get('/askdoc/:id', function (req, res) {
        AskDoc.find({ _id: req.params.id }, function (err, asks) {
            if (err)
                res.json(formatedError());
            else
                res.json({ code: 100, data: asks });
        });
    });
    /////  get one with status and department
    app.get('/askdoc/:dep/:status', function (req, res) {
        AskDoc.find({ dep: req.params.dep, status: req.params.status }, function (err, asks) {
            if (err)
                res.json(formatedError());
            else
                res.json({ code: 100, data: asks });
        });
    });
    ///// put 
    app.put('/askdoc/:id', function (req, res) {
        AskDoc.findOne({ _id: req.params.id }, function (err, ask) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (ask) {

                    ask.answer = req.body.answer,
                    ask.answer_creator = req.body.answer_creator,
                    ask.status = req.body.status
                    ask.dep = req.body.dep

                    ask.save(function (err) {
                        if (err)
                            res.json(formatedError(err));
                        else
                            res.json({ code: 100, data: ask });
                    })
                }


            }

        });

    });
    //delete
    app.delete('/askdoc/:id', function (req, res) {
        AskDoc.findOne({ _id: req.params.id }, function (err, ask) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (ask) {

                    ask.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });
    /////////////// gallary ....................................
    ///post
    app.post('/gallary', function (req, res) {
        var gallary = new Gallary({
            url: req.body.Url
        });
        gallary.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: gallary });
            }
        });
    });
    ////  remove
    app.delete('/gallary/:id', function (req, res) {
        Gallary.findOne({ _id: req.params.id }, function (err, gallary) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (gallary) {

                    gallary.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });
    ////get all 
    app.get('/gallary', function (req, res) {
        Gallary.find({}, function (err, gallary) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (gallary) {

                    res.json({ code: 100, data: gallary });
                }


            }

        });

    });


    //////////insurence 
    app.post('/insurence', function (req, res) {
        var insurence = new Insurence({
            Name: req.body.Name,
            Desc: req.body.Desc,
            PhotoUrl: req.body.Desc
        });
        insurence.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: insurence });
            }
        });
    });
    ////  remove
    app.delete('/insurence/:id', function (req, res) {
        Insurence.findOne({ _id: req.params.id }, function (err, insurence) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (insurence) {

                    insurence.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });
    //edited insurence
    app.put('/insurence/:id', function (req, res) {
        Insurence.findOne({ _id: req.params.id }, function (err, insurence) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (insurence) {
                    insurence.Name = req.body.Name,
                    insurence.Desc = req.body.Desc,
                    insurence.PhotoUrl = req.body.PhotoUrl

                    insurence.save(function (err) {
                        if (err) {
                            res.json(formatedError(err));
                        }
                        else {
                            res.json({ code: 100, data: insurence });

                        }
                    })
                }


            }

        });

    });
    ////get all 
    app.get('/insurence', function (req, res) {
        Insurence.find({}, function (err, insurence) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (insurence) {

                    res.json({ code: 100, data: insurence });
                }
            }

        });

    });
    //////

    /////////offers
    //post offers
    app.post('/offer', function (req, res) {
        var offers = new Offer({
            Name: req.body.Name,
            Dep: req.body.Dep,
            PriceBefore: req.body.PriceBefore,
            PriceAfter: req.body.PriceAfter,
            CreateDate: req.body.CreateDate,
            ExpireDate: req.body.ExpireDate,
            status: req.body.status
        });
        offers.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: offers });
            }
        });
    });
    ////  remove
    app.delete('/offer/:id', function (req, res) {
        Offer.findOne({ _id: req.params.id }, function (err, offer) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (offer) {

                    offer.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });
    //edited offer
    app.put('/offer/:id', function (req, res) {
        Offer.findOne({ _id: req.params.id }, function (err, offer) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (offer) {

                    offer.Name = req.body.Name,
                       offer.Dep = req.body.Dep,
                       offer.PriceBefore = req.body.PriceBefore,
                       offer.PriceAfter = req.body.PriceAfter,
                       offer.ExpireDate = req.body.ExpireDate,
                       offer.status = req.body.status



                    offer.save(function (err) {
                        if (err) {
                            res.json(formatedError(err));
                        }
                        else {
                            res.json({ code: 100, data: offer });

                        }
                    })
                }


            }

        });

    });
    ////get all 
    app.get('/offer', function (req, res) {
        Offer.find({}, function (err, offer) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (offer) {

                    res.json({ code: 100, data: offer });
                }
            }

        });

    });
    ////  GET OFFERS  NOT  EXPIRED  AND STATUS  ENABLE
    app.get('/rightoffer', function (req, res) {
        Offer.find({ status: 'Enable', ExpireDate: { $gt: Date.now() } }, function (err, offer) {
            if (err) {
                res.json(err)
            }
            else {
                if (offer) {

                    res.json({ code: 100, data: offer });
                }
            }

        });

    });

    ////////////////OPINION
    app.post('/opinion', function (req, res) {
        var opinion = new Opinion({
            Creator: req.body.Creator,
            text: req.body.text

        });
        opinion.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: opinion });
            }
        });
    });
    ////  remove
    app.delete('/opinion/:id', function (req, res) {
        Opinion.findOne({ _id: req.params.id }, function (err, opinion) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (opinion) {

                    opinion.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });
    //edited offer
    app.put('/opinion/:id', function (req, res) {
        Opinion.findOne({ _id: req.params.id }, function (err, opinion) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (opinion) {


                    opinion.text = req.body.text,
                    opinion.status = req.body.status




                    opinion.save(function (err) {
                        if (err) {
                            res.json(formatedError(err));
                        }
                        else {
                            res.json({ code: 100, data: opinion });

                        }
                    })
                }


            }

        });

    });
    ////get all 
    app.get('/opinion', function (req, res) {
        Opinion.find({}, function (err, opinion) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (opinion) {

                    res.json({ code: 100, data: opinion });
                }
            }

        });

    });
    ///////// get  all status true
    /////  problem  here  !!!!!!!!!!!!!!!! 
    app.get('/opinion_with_status', function (req, res) {

        Opinion.find({ status: true }, function (err, opinion) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (opinion) {

                    res.json({ code: 100, data: opinion });
                }
            }

        });

    });

    ////////get all  status false
    app.get('/opinion_with_status_flase', function (req, res) {
        Opinion.find({ status: false }, function (err, opinion) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (opinion) {

                    res.json({ code: 100, data: opinion });
                }
            }

        });

    });

    ////  rating
    app.post('/rating', function (req, res) {
        var rating = new Rating({
            creator: req.body.creator,
            rating: req.body.rating,
            depid: req.body.depid
        });
        rating.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: rating });
            }
        });
    });

    //edited offer
    app.put('/rating/:id', function (req, res) {
        Rating.findOne({ _id: req.params.id }, function (err, rate) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (rate) {
                    rate.rating = req.body.rating

                    rate.save(function (err) {
                        if (err) {
                            res.json(formatedError(err));
                        }
                        else {
                            res.json({ code: 100, data: rate });

                        }
                    })
                }


            }

        });

    });
    ////get all 
    app.get('/rating', function (req, res) {
        Rating.find({}, function (err, rating) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (rating) {

                    res.json({ code: 100, data: rating });
                }
            }

        });

    });
    /////////// Suggestion
    app.post('/suggestion', function (req, res) {
        var suggestion = new Suggestion({
            creator: req.body.creator,
            note: req.body.note,
            depid: req.body.depid
        });
        suggestion.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: suggestion });
            }
        });
    });
    ////get all 
    app.get('/suggestion', function (req, res) {
        Suggestion.find({}, function (err, suggestion) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (suggestion) {

                    res.json({ code: 100, data: suggestion });
                }
            }

        });

    });
    /////////////////////////////////////////////////////days
    /////////// days
    app.post('/days', function (req, res) {
        var day = new Days({
            day: req.body.day,
            Time: [{
                from: req.body.from,
                to: req.body.to
            }],
            dep: req.body.dep
        });
        day.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: day });
            }
        });
    });
    ////get all 
    app.get('/days/:daystring', function (req, res) {
        Days.findOne({ day: req.params.daystring }, function (err, day) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (day) {

                    res.json({ code: 100, data: day });
                }
            }

        });

    });

    //////////get all days
    app.get('/days', function (req, res) {
        Days.find({}, function (err, day) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (day) {

                    res.json({ code: 100, data: day });
                }
            }

        });

    });

    //////update embaded doc
    app.put('/days/:_id/:id', function (req, res) {

        Days.findById(req.params._id, function (err, day) {
            if (err) {
                res.json(formatedError(err));
            }
            else {
                var time = day.Time.id(req.params.id);
                time.from = req.body.from,
                time.to = req.body.to;

                day.save(function (err) {
                    if (err) {
                        res.json(formatedError(err));
                    } else {
                        res.json({ code: 100, data: day });
                    }
                });
            }
        });
    });

    //////////////////////////////////////////////////////////booking
    app.post('/booking', function (req, res) {
        var book = new Book({
            day: req.body.day,
            date: req.body.date,
            time: req.body.time,
            Creator: req.body.Creator,
            dep: req.body.dep
        });
        book.save(function (err) {
            if (err) {
                if (err.errmsg) {
                    res.json({ code: 20, message: err.errmsg });
                }
                else {
                    res.json(formatedError(err));
                }
            }
            else {
                res.json({ code: 100, data: book });
            }
        });
    });
    ///// get 
    app.get('/booking/:date/:dep', function (req, res) {
        Book.find({ date: req.params.date, dep: req.params.dep }, function (err, books) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (books) {

                    res.json({ code: 100, data: books });
                }
            }

        });

    });
    ///////// remove 
    app.delete('/booking/:id', function (req, res) {
        Book.findOne({ _id: req.params.id }, function (err, book) {
            if (err) {
                res.json(formatedError(err))
            }
            else {
                if (book) {

                    book.remove();
                    res.json({ code: 100, mesg: 'removed!!' });
                }


            }

        });

    });

















    //    /////////////////////////////////////
    //    //////get leads
    //    api.get('/lead/:_skip/:_limit/:_select/:idorganization', function (req, res) {
    //        Lead.find({ OrganizationId: req.params.idorganization }, function (err, Lead) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            } else {
    //                if (Lead) {
    //                    res.json({ type: 100, data: Lead });
    //                }
    //                else {
    //                    res.json({ code: 21, message: 'no leads exist' });
    //                }
    //            }
    //        }).skip(req.params._skip)
    //                  .limit(req.params._limit)
    //                  .select(req.params._select)
    //                  .populate('Contacts')
    //                  .populate('Opportunity')
    //                  .populate('Custom');
    //    });
    //    ////////////create new lead
    //    api.post('/lead', function (req, res) {
    //        if (req.body.Title != null) {
    //            var title = req.body.Title.toLowerCase();
    //            Lead.findOne({ TitleLower: title, OrganizationId: req.body.OrganizationId }, function (err, lead) {
    //                if (err) {
    //                    res.json(formatedError(err));
    //                }
    //                else {
    //                    if (lead) {
    //                        res.json({ type: 'error', message: 'you have lead with same name' })
    //                    }
    //                    else {
    //                        var LeadSave = new Lead({
    //                            Title: req.body.Title,
    //                            TitleLower: title,
    //                            CurrentStatus: req.body.CurrentStatus,
    //                            StatusLabel: req.body.StatusLabel,
    //                            OrganizationId: req.body.OrganizationId,
    //                            CreatedBy: req.body.CreatedBy,
    //                        });
    //                        LeadSave.save(function (err) {
    //                            if (err) {
    //                                res.json(formatedError(err));
    //                            }
    //                            else {
    //                                Organization.findById({ _id: req.body.OrganizationId }, function (err, organization) {
    //                                    if (err) {
    //                                        res.json(formatedError(err));
    //                                    }
    //                                    else {
    //                                        if (organization != null) {
    //                                            organization.Leads.push(LeadSave._id);
    //                                            organization.save();
    //                                        }
    //                                    }
    //                                });
    //                                res.json({ type: 'success', data: LeadSave });
    //                            }
    //                        });
    //                    }
    //                }
    //            });
    //        }
    //        else {
    //            res.json({ type: 'error', message: 'please  enter title' });
    //            return;

    //        }

    //    });
    //    api.post('/newlead', function (req, res) {
    //        if (req.body.Title != null) {
    //            var title = req.body.Title.toLowerCase();
    //            Lead.findOne({ TitleLower: title, OrganizationId: req.body.OrganizationId }, function (err, lead) {
    //                if (err) {
    //                    res.json(formatedError(err));
    //                }
    //                else {
    //                    if (lead) {
    //                        res.json({ type: 'error', message: 'you have lead with same name' })
    //                    }
    //                    else {
    //                        var LeadSave = new Lead({
    //                            Title: req.body.Title,
    //                            TitleLower: title,
    //                            CurrentStatus: req.body.CurrentStatus,
    //                            StatusLabel: req.body.StatusLabel,
    //                            OrganizationId: req.body.OrganizationId,
    //                            CreatedBy: req.body.CreatedBy,
    //                        });
    //                        LeadSave.save(function (err) {
    //                            if (err) {
    //                                res.json(formatedError(err));
    //                            }
    //                            else {
    //                                Organization.findById({ _id: LeadSave.OrganizationId }, function (err, organization) {
    //                                    if (err) {
    //                                        res.json(err);
    //                                    }
    //                                    else {
    //                                        if (organization != null) {
    //                                            organization.Leads.push(LeadSave._id);
    //                                            organization.save();
    //                                            res.json({ type: 'success', data: LeadSave });
    //                                        }
    //                                    }
    //                                });
    //                            }
    //                        });
    //                    }
    //                }
    //            });
    //        }
    //        else {
    //            res.json({ type: 'error', message: 'please  enter title' });
    //            return;
    //        }

    //    });
    //    ///////get one lead
    //    api.get('/lead/:id', function (req, res) {
    //        Lead.find({ _id: req.params.id }, function (err, Lead) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            } else {
    //                if (Lead) {
    //                    res.json({ type: 100, data: Lead[0] });
    //                }
    //                else {
    //                    res.json({ code: 21, message: 'no leads exist' });
    //                }
    //            }
    //        }).skip(req.params._skip)
    //                  .limit(req.params._limit)
    //                  .select(req.params._select)
    //                  .populate('Contacts')
    //                  .populate('Opportunity')
    //                  .populate('Custom');
    //    });
    //    ///////// delete leadd
    //    api.delete('/lead/:idlead', function (req, res) {
    //        Lead.findOne({ _id: req.params.idlead }, function (err, lead) {

    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                lead.remove();
    //                res.json('Deleted');
    //            }
    //        });
    //    });
    //    //////// update lead
    //    api.put('/merge/lead', function (req, res) {
    //        Lead.findOne({ _id: req.body.LeadId }, function (err, leadfinal) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (leadfinal) {
    //                    Lead.findOne({ _id: req.body.idmerge }, function (err, lead) {
    //                        if (err) {
    //                            res.json(formatedError(err));
    //                        }
    //                        else {
    //                            if (Lead) {
    //                                Contact.find({ LeadId: req.body.idmerge }, function (err, contacts) {
    //                                    if (err) {
    //                                        res.json(formatedError(err));
    //                                    }
    //                                    else {
    //                                        contacts.leadId = req.body.leadId
    //                                        contacts.save(function (err) {
    //                                            if (err) {
    //                                                res.json(formatedError(err));
    //                                            }
    //                                            else {
    //                                                leadfinal.Contacts.push(contacts._id);
    //                                                leadfinal.save(function (err) {
    //                                                    if (err) {
    //                                                        res.json(formatedError(err));
    //                                                    }
    //                                                })
    //                                            }

    //                                        });
    //                                    }
    //                                });
    //                                Opportunity.find({ LeadId: req.body.idmerge }, function (err, opportunity) {
    //                                    if (err) {
    //                                        res.json(formatedError(err));
    //                                    } else {
    //                                        if (opportunity) {
    //                                            opportunity.leadId = req.body.leadId
    //                                            opportunity.save(function (err) {
    //                                                if (err) {
    //                                                    res.json(formatedError(err));
    //                                                }
    //                                                else {
    //                                                    leadfinal.Opportunity.push(opportunity._id);
    //                                                    leadfinal.save(function (err) {
    //                                                        if (err) {
    //                                                            res.json(formatedError(err));
    //                                                        }

    //                                                    });

    //                                                }

    //                                            });
    //                                        }


    //                                    }
    //                                });

    //                                Task.find({ LeadId: req.body.idmerge }, function (err, tasks) {
    //                                    if (err) {
    //                                        res.json(formatedError(err));
    //                                    }
    //                                    else {
    //                                        if (tasks) {
    //                                            tasks.leadId = req.body.leadId
    //                                            tasks.save(function (err) {
    //                                                if (err) {
    //                                                    res.json(formatedError(err));
    //                                                }
    //                                                else {
    //                                                    res.json({ code: 100, data: leadfinal });
    //                                                }
    //                                            })
    //                                        }

    //                                    }
    //                                });
    //                                res.json({ code: 100, data: leadfinal });
    //                            }
    //                            else {
    //                                res.json({ code: 20, data: 'lead not exist' });
    //                            }
    //                        }
    //                    });
    //                }
    //                else {
    //                    res.json({ code: 21, data: 'lead not exist' });
    //                }
    //            }
    //        });
    //    });

    //    ///////merge lead
    //    api.put('/lead', function (req, res) {
    //        var leadId = req.body._id;
    //        if (leadId != null) {
    //            Lead.findById({ _id: req.body._id }, function (err, lead) {
    //                if (err) {
    //                    res.json(formatedError(err));
    //                }
    //                else {
    //                    var title = lead.TitleLower;
    //                    var reqtitle = req.body.Title.toLowerCase();
    //                    if (reqtitle == title) {
    //                        lead.Title = req.body.Title,
    //                                      lead.Description = req.body.Description,
    //                                      lead.Url = req.body.Url,
    //                                      lead.CurrentStatus = req.body.CurrentStatus,
    //                                      lead.StatusLabel = req.body.StatusLabel,
    //                                      lead.OrganizationId = req.body.OrganizationId,
    //                                      lead.UpdateDate = Date.now(),
    //                                      lead.UpdatedBy = req.body.UpdatedBy,
    //                                      lead.HtmlUrl = req.body.HtmlUrl
    //                        lead.save(function (err) {
    //                            if (err) {
    //                                res.json(formatedError(err));
    //                            }
    //                            else {
    //                                res.json({ code: 100, data: lead });
    //                            }
    //                        });
    //                    }
    //                    else {
    //                        Lead.findOne({ TitleLower: title, OrganizationId: req.body.OrganizationId }, function (err, existlead) {
    //                            if (existlead) {
    //                                res.json({ code: 20, message: 'this title exist' });
    //                            }
    //                            else {
    //                                lead.Title = req.body.Title,
    //                                   lead.Description = req.body.Description,
    //                                   lead.Url = req.body.Url,
    //                                   lead.CurrentStatus = req.body.CurrentStatus,
    //                                   lead.StatusLabel = req.body.StatusLabel,
    //                                   lead.OrganizationId = req.body.OrganizationId,
    //                                   lead.UpdateDate = Date.now(),
    //                                   lead.UpdatedBy = req.body.UpdatedBy,
    //                                   lead.HtmlUrl = req.body.HtmlUrl
    //                                lead.save(function (err) {
    //                                    if (err) {
    //                                        res.json(formatedError(err));
    //                                    }
    //                                    else {
    //                                        res.json({ code: 100, data: lead });
    //                                    }
    //                                });
    //                            }
    //                        });
    //                    }
    //                }
    //            });
    //        }
    //        else {
    //            res.json({ code: 21, data: 'error id not exist' });
    //        }
    //    });




    //    ///////////////////////////////////////////custom fields create
    //    api.post('/custom_fields/lead', function (req, res) {
    //        var customData = new CustomField({
    //            Order: req.body.Order,
    //            FieldName: req.body.FieldName,
    //            TypeField: req.body.TypeField,
    //            Choices: [req.body.Choices],
    //            CurrentValue: req.body.CurrentValue,
    //            LeadId: req.body.LeadId
    //        });
    //        customData.save(function (err) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {

    //                Lead.findById(req.body.LeadId, function (err, lead) {

    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    }
    //                    else {
    //                        if (lead) {
    //                            lead.Custom.push(customData._id);
    //                            lead.save(),
    //                            res.json({ type: 'success', data: customData });
    //                        }
    //                        else {
    //                            res.json({ type: 'error', message: 'lead not exist' });
    //                        }
    //                    }
    //                });
    //            }
    //        });
    //    });
    //    api.get('/custom_fields/organization/:id', function (req, res) {
    //        CustomField.findOne({ OrganizationId: req.params.id }, function (err, custom) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (custom) {
    //                    res.json({ type: 'success', data: custom });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'custom fields not exist' });
    //                }
    //            }
    //        });
    //    });
    //    //////////////////Get
    //    api.get('/custom_fields/lead/:id', function (req, res) {
    //        CustomField.findOne({ _id: req.params.id }, function (err, custom) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (custom) {
    //                    res.json({ type: 'success', data: custom });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'custom field not exist' });
    //                }
    //            }
    //        });
    //    });
    //    ////////////////Edit
    //    api.put('/custom_fields/lead/:id', function (req, res) {

    //        CustomField.findOne({ _id: req.params.id }, function (err, custom) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (custom) {
    //                    custom.CurrentValue = req.body.CurrentValue
    //                    custom.save(function (err) {
    //                        if (err) {
    //                            res.json(formatedError(err));
    //                        }
    //                        else {
    //                            res.json(custom)
    //                        }
    //                    });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'custom field not exist ' });
    //                }
    //            }
    //        });
    //    });
    //    //////////////////  remove 
    //    ////////// not delete ref in lead
    //    api.delete('/custom_fields/lead/:id', function (req, res) {
    //        CustomField.findOne({ _id: req.params.id }, function (err, custom) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (custom) {
    //                    custom.remove();
    //                    res.json('Deleted');
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'custom field not exist ' });
    //                }
    //            }
    //        });
    //    });




    //    ///////////////Lead Address
    //    /////add lead address
    //    api.post('/leads/address/:_id', function (req, res) {
    //        Lead.findById(req.params._id, function (err, lead) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {

    //                lead.Addresses.push({
    //                    Order: req.body.Order,
    //                    Type: req.body.Type,
    //                    Country: req.body.Country,
    //                    State: req.body.State,
    //                    City: req.body.City,
    //                    Address: req.body.Address,
    //                    PostalCode: req.body.PostalCode,
    //                    Longitude: req.body.Longitude,
    //                    Latitude: req.body.Latitude
    //                });
    //                lead.save(function (err) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    } else {
    //                        res.json(lead.Addresses);
    //                    }
    //                });
    //            }
    //        });
    //    });
    //    //////////Edit Lead Address
    //    api.put('/leads/address/:_id/:id', function (req, res) {
    //        Lead.findById(req.params._id, function (err, lead) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                var address = lead.Addresses.id(req.params.id);
    //                address.Order = req.body.Order,
    //                address.Type = req.body.Type,
    //                address.Country = req.body.Country,
    //                address.State = req.body.State,
    //                address.City = req.body.City,
    //                address.Address = req.body.Address,
    //                address.PostalCode = req.body.PostalCode,
    //                address.Longitude = req.body.Longitude,
    //                address.Latitude = req.body.Latitude;

    //                lead.save(function (err) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    } else {
    //                        res.json(lead.Addresses)
    //                    }
    //                });
    //            }
    //        });
    //    });
    //    //////////  delete Lead Address
    //    api.delete('/leads/address/:_id/:id', function (req, res) {
    //        Lead.findById(req.params._id, function (err, lead) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                lead.Addresses.id(req.params.id).remove();
    //                lead.save(function (err) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    } else {
    //                        res.json(lead.Addresses)
    //                    }
    //                });
    //            }
    //        });
    //    });
    //    //////////////////////Lead Tasks
    //    api.post('/leadses/tasks/:_idlead/:iduser', function (req, res) {
    //        Lead.findById(req.params._idlead, function (err, lead) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                lead.Tasks.push({
    //                    Value: req.body.Value,
    //                    Date: req.body.Date,
    //                    Time: req.body.Time,
    //                    AssignTo: req.body.AssignTo,
    //                    CreatedBy: req.params.iduser
    //                });
    //                lead.save(function (err) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    } else {
    //                        res.json(lead)
    //                    }
    //                });
    //            }
    //        });
    //    });
    //    //////////Edit Lead tasks
    //    api.put('/leadses/tasks/:idlead/:idtask', function (req, res) {
    //        Lead.findById(req.params.idlead, function (err, lead) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                var Tasks = lead.Tasks.id(req.params.idtask);
    //                Tasks.Value = req.body.Value,
    //                 Tasks.Date = req.body.Date,
    //                Tasks.Time = req.body.Time,
    //                Tasks.TaskCompleted = req.body.TaskCompleted,
    //                Tasks.AssignTo = req.body.AssignTo

    //                lead.save(function (err) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    }
    //                    else {
    //                        res.json(lead)
    //                    }
    //                });
    //            }
    //        });
    //    });
    //    //////////  delete Lead tasks
    //    api.delete('/leadses/tasks/:idlead/:idtasks', function (req, res) {
    //        Lead.findById(req.params.idlead, function (err, lead) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                lead.Tasks.id(req.params.idtasks).remove();
    //                lead.save(function (err) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    } else {
    //                        res.json(lead)
    //                    }
    //                });
    //            }
    //        });
    //    });




    //    ///////////////////////////// Contacts
    //    ///////////////////////////// create contact
    //    api.post('/contact', function (req, res) {
    //        var lower = req.body.Name.toLowerCase();
    //        if (lower == null) {



    //        }
    //        var contactsave = new Contact(req.body);



    //        contactsave.save(function (err) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                Lead.findOne({ _id: req.body.LeadId }, function (err, lead) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    }
    //                    else {

    //                        if (lead) {
    //                            lead.Contacts.push(contactsave._id);
    //                            lead.save(),
    //                            res.json({ type: 'success', data: lead });
    //                        }
    //                        else {
    //                            res.json({ type: 'error', message: 'lead not exist' })
    //                        }
    //                    }
    //                });
    //            }
    //        });
    //    });
    //    api.get('/organization/contact/:_id', function (req, res) {

    //        Contact.find({ 'OrganizationId': req.params._id }, function (err, contact) {
    //            if (err) {
    //                res.json(err);
    //            }
    //            else {
    //                res.json({ type: 'sucess', data: contact });
    //            }

    //        });
    //    });
    //    /////////get just one  contact
    //    api.get('/contact/:_id', function (req, res) {

    //        Contact.findById(req.params._id, function (err, contact) {

    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                res.json({ type: 'success', data: contact });
    //            }

    //        });
    //    });
    //    /////////Edit just one  contact
    //    api.put('/contact/:id', function (req, res) {


    //        Contact.findById(req.params.id, function (err, contact) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (contact != null) {
    //                    if (contact.NameLower == req.body.Name.toLowerCase()) {
    //                        contact.Order = req.body.Order,
    //                        contact.Name = req.body.Name,
    //                        contact.ContactTitle = req.body.ContactTitle;
    //                        contact.save(function (err) {
    //                            if (err) {
    //                                res.json(formatedError(err));
    //                            }
    //                            else {
    //                                res.json({ type: 'success', data: contact });
    //                            }
    //                        });
    //                    }
    //                    else {
    //                        Contact.find({ NameLower: req.body.toLowerCase(), LeadId: req.body.leadId }, function (err, contacts) {
    //                            if (contacts != null) {

    //                                res.json({ type: 'error', message: 'name contact exist' });

    //                            }
    //                            else {
    //                                contact.Order = req.body.Order,
    //                  contact.Name = req.body.Name,
    //                  contact.ContactTitle = req.body.ContactTitle;
    //                                contact.save(function (err) {
    //                                    if (err) {
    //                                        res.json(formatedError(err));
    //                                    }
    //                                    else {
    //                                        res.json({ type: 'success', data: contact });
    //                                    }
    //                                });
    //                            }

    //                        });
    //                    }
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'contact not exist ' });
    //                }
    //            }
    //        });
    //    });
    //    /////////Delete just one  contact
    //    api.delete('/contact/:idcontact', function (req, res) {
    //        Contact.findById(req.params.idcontact, function (err, contact) {
    //            if (err) {

    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (contact) {
    //                    //Lead.findOneAndUpdate({ _id: req.params.idlead }, { $pull: { Contacts: req.params.idcontact } }, function (err) {
    //                    //    if (err) {
    //                    //        res.json(formatedError(err));
    //                    //    }
    //                    //});
    //                    contact.remove();
    //                    res.json('Deleted');
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'contact not exist ' });
    //                }


    //            }
    //        });
    //    });
    //    ////////////////////////////Contacts Phone
    //    ///////////post contact phone
    //    api.post('/contacts/phones/:idcontact', function (req, res) {
    //        Contact.findById(req.params.idcontact, function (err, contact) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                contact.Phones.push({
    //                    Phone: req.body.Phone,
    //                    PhoneFormatted: req.body.PhoneFormatted,
    //                    Type: req.body.Type
    //                });
    //                contact.save(function (err) {
    //                    var count = 0;
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    } else {
    //                        res.json(contact)
    //                    }
    //                });
    //            }
    //        });
    //    });
    //    //////////Edit contact Phone
    //    api.put('/contact/phone/:idcontact/:idphone', function (req, res) {
    //        Contact.findById(req.params.idcontact, function (err, contact) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                var phones = contact.Phones.id(req.params.idphone);
    //                phones.Phone = req.body.Phone,
    //                    phones.PhoneFormatted = req.body.PhoneFormatted,
    //                    phones.Type = req.body.Type;
    //                contact.save(function (err) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    } else {
    //                        res.json(contact)
    //                    }
    //                });
    //            }
    //        });
    //    });
    //    //////////  delete contact phone
    //    api.delete('/contact/phone/:idcontact/:idphone', function (req, res) {
    //        Contact.findById(req.params.idcontact, function (err, contact) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                contact.Phones.id(req.params.idphone).remove();
    //                contact.save(function (err) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    } else {
    //                        res.json(contact)
    //                    }
    //                });
    //            }
    //        });
    //    });




    //    ////////////////////////////////Contact Email
    //    ///////////post contact email
    //    api.post('/contacts/emails/:idcontact', function (req, res) {
    //        //find by email 
    //        // convert to small 
    //        //check if it is exist or not 
    //        Contact.findById(req.params.idcontact, function (err, contact) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                contact.Emails.push({
    //                    Type: req.body.Type,
    //                    EmailLower: req.body.EmailLower,
    //                    Email: req.body.Email
    //                });
    //                contact.save(function (err) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    } else {
    //                        res.json(contact)
    //                    }
    //                });
    //            }
    //        });
    //    });
    //    //////////Edit contact email
    //    api.put('/contact/email/:idcontact/idemail', function (req, res) {
    //        Contact.findById(req.params.idcontact, function (err, contact) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                var emails = contact.Emails.id(req.params.idemail);
    //                emails.Type = req.body.Type,
    //                emails.EmailLower = req.body.EmailLower,
    //                emails.Email = req.body.email;
    //                contact.save(function (err) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    } else {
    //                        res.json(contact)
    //                    }
    //                });
    //            }
    //        });
    //    });
    //    //////////  delete contact email
    //    api.delete('/contact/email/:idcontact/idemail', function (req, res) {
    //        Contact.findById(req.params.idcontact, function (err, contact) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                contact.Emails.id(req.params.idemail).remove();
    //                contact.save(function (err) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    } else {
    //                        res.json(contact)
    //                    }
    //                });
    //            }
    //        });
    //    });
    //    ////////////////////////////////Contact Url
    //    ///////////post contact url
    //    api.post('/contacts/urls/:idcontact', function (req, res) {
    //        Contact.findById(req.params.idcontact, function (err, contact) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                contact.Urls.push({
    //                    Url: req.body.Url

    //                });
    //                contact.save(function (err) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    } else {
    //                        res.json(contact)
    //                    }
    //                });
    //            }
    //        });
    //    });
    //    //////////Edit contact url
    //    api.put('/contact/url/:idcontact/idurl', function (req, res) {
    //        Contact.findById(req.params.idcontact, function (err, contact) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                var urls = contact.Urls.id(req.params.idurl);
    //                urls.Url = req.body.Url;
    //                contact.save(function (err) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    } else {
    //                        res.json(contact)
    //                    }
    //                });
    //            }
    //        });
    //    });
    //    //////////  delete contact url
    //    api.delete('/contact/url/:idcontact/:idurl', function (req, res) {
    //        Contact.findById(req.params._id, function (err, contact) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                contact.Urls.id(req.params.idurl).remove();
    //                contact.save(function (err) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    } else {
    //                        res.json(contact)
    //                    }
    //                });
    //            }
    //        });
    //    });


    //    //////////////////// get opportunities
    //    api.get('/opportunity/:_skip/:_limit/:_select/:idorganization', function (req, res) {
    //        Opportunity.find({ OrganizationId: req.params.idorganization }, function (err, opportunity) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            } else {
    //                if (opportunity) {

    //                    res.json({ type: 100, data: opportunity });
    //                }
    //                else {
    //                    res.json({ code: 21, message: 'no opportunities exist' });
    //                }
    //            }
    //        }).skip(req.params._skip)
    //                  .limit(req.params._limit)
    //                  .select(req.params._select)
    //                  .populate('LeadId')
    //                  .populate('CurrentStatus')
    //                  .populate('AssignedTo');
    //    });
    //    ////////get just opportunity
    //    api.get('/opportunity/:id', function (req, res) {

    //        Opportunity.findById(req.params.id, function (err, opportunity) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (opportunity) {
    //                    res.json({ type: 'success', data: opportunity });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'opportunity not exist' })
    //                }
    //            }
    //        });
    //    });
    //    ////////////create  new Opportunity
    //    api.post('/opportunity', function (req, res) {
    //        var OpportunityData = new Opportunity(req.body);
    //        OpportunityData.save(function (err) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                Lead.findById(req.body.LeadId, function (err, lead) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    }
    //                    else {
    //                        if (lead) {
    //                            lead.Opportunity.push(OpportunityData._id);
    //                            lead.save();
    //                            res.json({ type: 'success', data: OpportunityData });
    //                        }
    //                        else {
    //                            res.json({ type: 'error', message: 'lead not exist' });
    //                        }
    //                    }
    //                });
    //            }
    //        });
    //    });
    //    ///////////Edit Current Opportunity
    //    api.put('/opportunity/:id', function (req, res) {
    //        Opportunity.findOne({ _id: req.params.id }, function (err, opportunity) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (opportunity) {
    //                    opportunity.ValueFormatted = req.body.ValueFormatted,
    //                                 opportunity.ValueCurrency = req.body.ValueCurrency,
    //                                 opportunity.Confidence = req.body.Confidence,
    //                                 opportunity.Note = req.body.Note,
    //                                 opportunity.DateOpen = req.body.DateOpen,
    //                                 opportunity.DateClosed = req.body.DateClosed,
    //                                 opportunity.AssignedTo = req.body.AssignedTo,
    //                                 opportunity.UserName = req.body.UserName,
    //                                 opportunity.UpdatedDate = Date.now(),
    //                                 opportunity.UpdatedId = req.body.UpdatedId,
    //                                 opportunity.ContactId = req.body.ContactId,
    //                                 opportunity.ValuePeriod = req.body.ValuePeriod,
    //                                 opportunity.LeadId = req.body.LeadId,
    //                                 opportunity.OrganizationId = req.body.OrganizationId,
    //                                 opportunity.DateWon = req.body.DateWon;
    //                    opportunity.save(function (err) {
    //                        if (err) {
    //                            res.json(formatedError(err));
    //                        }
    //                        else {
    //                            res.json({ type: 'success', data: opportunity });
    //                        }
    //                    });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'opportunity not exist' })
    //                }

    //            }
    //        });
    //    });
    //    /////////////////////Delete Opportunity
    //    api.delete('/opportunity/:id', function (req, res) {
    //        Opportunity.findOne({ _id: req.params.id }, function (err, oppertunity) {

    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (oppertunity) {
    //                    oppertunity.remove();
    //                    res.json('Deleted');
    //                } else {
    //                    res.json({ type: 'error', message: 'oppertunity not exist' });
    //                }

    //            }
    //        });
    //    });
    //    api.post('/opportunit/:id', function (req, res) {
    //        var query = Opportunity.find({ OrganizationId: req.params.id }, function (err, opportunity) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (opportunity == null) {
    //                    res.json({ type: 'error', message: 'opportunity not exist' });
    //                }
    //                else {

    //                }
    //            }
    //        });
    //        query.where('' + req.body.Title + '', '' + req.body.Value + '');
    //        query.exec(function (err, docs) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                res.json({ type: 'success', data: docs });
    //            }
    //        });
    //    });



    //    /////////////// user
    //    api.post('/user', function (req, res) {
    //        if (req.body.Email != null) {
    //            var email = req.body.Email.toLowerCase();
    //            User.findOne({ EmailLower: email }, function (err, resault) {
    //                if (err) {
    //                    res.json(formatedError(err));
    //                    return;
    //                }
    //                else {
    //                    if (resault) {
    //                        res.json({ type: 'error', message: 'Duplicated email' })
    //                    }
    //                    else {
    //                        var orgData = new Organization({
    //                            Title: req.body.companyName,
    //                            Size: req.body.teamMembers,
    //                            DefaultCurrency: 'Dollar'
    //                        });
    //                        var OrgID;
    //                        orgData.save(function (err) {

    //                            if (err) {
    //                                res.json(formatedError(err));
    //                                return;
    //                            }
    //                            else {
    //                                OrgID = orgData._id;
    //                                var dataUser = req.body;
    //                                var userSave = new User({
    //                                    FirstName: req.body.FirstName,
    //                                    LastName: req.body.LastName,
    //                                    Email: req.body.Email,
    //                                    EmailLower: req.body.Email.toLowerCase(),
    //                                    Password: req.body.Password,
    //                                    Phone: req.body.Phone,
    //                                    OrganizationId: OrgID
    //                                });
    //                                userSave.save(function (err) {

    //                                    if (err) {
    //                                        res.json(formatedError(err));
    //                                        return;
    //                                    }
    //                                    else {
    //                                        res.json({ type: 'success', data: userSave });
    //                                    }
    //                                });
    //                            }
    //                        });

    //                    }
    //                }
    //            });
    //        }
    //        else {
    //            res.json({ type: 'error', message: 'please enter your Email ' });
    //        }
    //    });
    //    //////// take userId
    //    api.get('/me/:id', function (req, res) {
    //        User.findOne({ _id: req.params.id }, function (err, user) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (user) {
    //                    res.json({ type: 'success', data: user });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'user not exist' });
    //                }

    //            }
    //        }).populate('OrganizationId');
    //    });
    //    //////// take userId
    //    api.get('/user/:id', function (req, res) {
    //        User.findOne({ _id: req.params.id }, function (err, user) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (user) {
    //                    res.json({ type: 'success', data: user });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'user not exist' });
    //                }

    //            }
    //        });
    //    });
    //    api.get('/user/all/:idorganization', function (req, res) {
    //        User.find({ OrganizationId: req.params.idorganization }, function (err, user) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (user) {
    //                    res.json({ type: 'success', data: user });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'users not exist' });
    //                }

    //            }
    //        });
    //    });
    //    api.get('/user/availability/:idorganization', function (req, res) {
    //        User.findOne({ OrganizationId: req.params.idorganization, PageCount: { $gt: 0 } }, function (err, user) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (user) {
    //                    res.json({ type: 'success', data: user });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'user not exist' });
    //                }

    //            }
    //        });
    //    });
    //    api.put('/authonticate', function (req, res) {
    //        User.findOne({ Email: req.body.Email, Password: req.body.Password }, function (err, user) {
    //            if (user) {
    //                res.json({ type: 'success', data: user });
    //            }
    //            else {
    //                res.json({ type: 'error', message: 'user name and password not vaild' });
    //            }
    //        });

    //    });
    //    api.put('/user/:id', function (req, res) {
    //        User.findOne({ _id: req.params.id }, function (err, user) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (user) {
    //                    user.Password = req.body.Password

    //                    user.save(function (err) {
    //                        if (err) {
    //                            res.json(formatedError(err));
    //                        }
    //                        else {
    //                            res.json({ type: 'success', data: user });
    //                        }
    //                    });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'user  not exist' });
    //                }

    //            }
    //        });
    //    });
    //    api.put('/user', function (req, res) {
    //        User.findOne({ Email: req.body.Email }, function (err, user) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (user) {
    //                    res.json({ type: 'success', data: user._id });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'user  not exist' });
    //                }

    //            }
    //        });
    //    });



    //    //////////// organization 
    //    ////// create 
    //    api.post('/organization', function (req, res) {
    //        var organizationData = new Organization(req.body);
    //        organizationData.save(function (err) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                res.json({ type: 'success', data: organizationData });
    //            }
    //        });
    //    });
    //    ////////get
    //    api.get('/organization/:id', function (req, res) {
    //        Organization.findOne({ _id: req.params.id }, function (err, organization) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (organization) {
    //                    res.json({ type: 'success', data: organization });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'organization not exist' });
    //                }

    //            }
    //        }).populate('LeadsStatus')
    //              .populate('MemberShip')
    //              .populate('Leads')
    //              .populate('OpportunitiesStatus');
    //    });
    //    api.get('/organizations', function (req, res) {
    //        Organization.find({}, function (err, organization) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (organization) {
    //                    res.json({ type: 'success', data: organization });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'No data found' });
    //                }

    //            }
    //        }).populate('LeadsStatus')
    //              .populate('MemberShip')
    //              .populate('Leads')
    //              .populate('OpportunitiesStatus');
    //    });
    //    /////update
    //    api.put('/organization/:id', function (req, res) {
    //        Organization.findOne({ _id: req.params.id }, function (err, organization) {

    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (organization) {
    //                    organization.Title = req.body.Title,
    //                                  organization.Size = req.body.Size,
    //                                  organization.DefaultCurrency = req.body.DefaultCurrency,
    //                                  organization.UpdatedBy = req.body.UpdatedBy,
    //                                  organization.UpdatedDate = Date.now()
    //                    organization.save(function (err) {
    //                        if (err) {
    //                            res.json(formatedError(err));
    //                        }
    //                        else {
    //                            res.json({ type: 'success', data: organization });
    //                        }
    //                    });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'organization not exist' })
    //                }
    //            }
    //        });
    //    });



    //    ///////////////////////////// lead Status
    //    ////// create
    //    api.post('/status/lead', function (req, res) {
    //        var label = req.body.Label.toLowerCase();
    //        LeadStatus.findOne({ LabelLower: label, OrganizationId: req.body.OrganizationId }, function (err, leadstatus) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (!leadstatus) {
    //                    var leadData = new LeadStatus({
    //                        Label: req.body.Label,
    //                        LabelLower: label,
    //                        OrganizationId: req.body.OrganizationId
    //                    });
    //                    leadData.save(function (err) {
    //                        if (err) {
    //                            res.json(formatedError(err));
    //                            return;
    //                        }
    //                        else {
    //                            Organization.findById({ _id: req.body.OrganizationId }, function (err, organization) {
    //                                if (err) {
    //                                    res.json(formatedError(err));
    //                                    return;
    //                                }
    //                                else {
    //                                    if (organization) {
    //                                        organization.LeadsStatus.push(leadData._id);
    //                                        organization.save();
    //                                        res.json({ type: 'sucess', data: leadData });
    //                                        return;
    //                                    }
    //                                    else {
    //                                        res.json({ type: 'error', message: 'organization not exit' });
    //                                    }

    //                                }
    //                            });
    //                        }
    //                    });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'lead status exist' });
    //                    return;
    //                }
    //            }
    //        });
    //    });
    //    //////////////////Get
    //    api.get('/status/lead/:id', function (req, res) {

    //        LeadStatus.find({ OrganizationId: req.params.id }, function (err, status) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                res.json({ type: 'sucess', data: status });
    //            }
    //        });
    //    });
    //    ////////////////Edit
    //    api.put('/status/lead/:idstatus/:idorganization', function (req, res) {
    //        LeadStatus.findOne({ _id: req.params.idstatus }, function (err, status) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                var label = status.LabelLower;
    //                console.log(label);
    //                var reqlabel = req.body.Label.toLowerCase();
    //                console.log(reqlabel);
    //                if (label == reqlabel) {
    //                    status.Label = req.body.Label,
    //                    status.LabelLower = req.body.Label.toLowerCase()
    //                    status.save(function (err) {
    //                        if (err) {
    //                            res.json(formatedError(err));
    //                        }
    //                        else {
    //                            res.json({ type: 'sucess', data: status });
    //                        }
    //                    });
    //                }
    //                else {
    //                    console.log('arrive here ');
    //                    LeadStatus.findOne({ LabelLower: req.body.Label.toLowerCase(), OrganizationId: req.params.idorganization }, function (err, leadstatus) {
    //                        if (leadstatus) {
    //                            res.json({ type: 'error', message: 'exist name status' });
    //                        }
    //                        else {
    //                            status.Label = req.body.Label,
    //                            status.LabelLower = req.body.Label.toLowerCase()
    //                            status.save(function (err) {
    //                                if (err) {
    //                                    res.json(formatedError(err));
    //                                }
    //                                else {
    //                                    res.json({ type: 'sucess', data: status });
    //                                }
    //                            });
    //                        }
    //                    })
    //                }
    //            }
    //        });
    //    });
    //    //////////////////  remove 
    //    //////////// we must delete it from current status lead
    //    api.delete('/status/lead/:idstatus', function (req, res) {

    //        Lead.count({ CurrentStatus: req.params.idstatus }, function (err, leads) {
    //            if (leads > 0) {
    //                res.json({ type: 'error', message: 'there are ' + leads + ' leads have this status' })
    //            } else {
    //                LeadStatus.findOne({ _id: req.params.idstatus }, function (err, status) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    }
    //                    else {

    //                        status.remove();
    //                        res.json('Deleted');
    //                    }
    //                });
    //            }
    //        });
    //    });



    //    /////////////////////////////////////////////////opportuinty status
    //    ////// create
    //    api.post('/status/opportuinty', function (req, res) {
    //        var label = req.body.Label.toLowerCase();
    //        OpportunityStatus.findOne({ LabelLower: label, OrganizationId: req.body.OrganizationId }, function (err, opportuintystatus) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (!opportuintystatus) {
    //                    var opportuintyData = new OpportunityStatus({
    //                        Label: req.body.Label,
    //                        LabelLower: label,
    //                        Type: req.body.Type,
    //                        OrganizationId: req.body.OrganizationId
    //                    });
    //                    opportuintyData.save(function (err) {
    //                        if (err) {
    //                            res.json(formatedError(err));
    //                        }
    //                        else {
    //                            Organization.findById({ _id: req.body.OrganizationId }, function (err, organization) {
    //                                if (err) {
    //                                    res.json(formatedError(err));
    //                                }
    //                                else {
    //                                    organization.OpportunitiesStatus.push(opportuintyData._id);
    //                                    organization.save();
    //                                }
    //                            });
    //                            res.json({ type: 'sucess', data: opportuintyData });
    //                        }
    //                    });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'opportuinty status exist' });
    //                }
    //            }
    //        });
    //    });
    //    //////////////////Get All opportunities statuses
    //    api.get('/status/opportuinty/:id', function (req, res) {
    //        OpportunityStatus.find({ OrganizationId: req.params.id }, function (err, status) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (status) {
    //                    res.json({ type: 'success', data: status });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'opportuinty not exist' });
    //                }

    //            }
    //        });
    //    });
    //    ////////////////Edit
    //    api.put('/status/opportuinty/:idstatus/:idorganization', function (req, res) {


    //        OpportunityStatus.findOne({ _id: req.params.idstatus }, function (err, status) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                var label = status.LabelLower;
    //                var reqlabel = req.body.Label.toLowerCase();
    //                if (label == reqlabel) {
    //                    status.Label = req.body.Label,
    //                    status.LabelLower = req.body.Label.toLowerCase()
    //                    status.save(function (err) {
    //                        if (err) {
    //                            res.json(formatedError(err));
    //                        }
    //                        else {
    //                            res.json({ type: 'sucess', data: status });
    //                        }
    //                    });
    //                }
    //                else {
    //                    console.log('here we are ');
    //                    OpportunityStatus.findOne({ LabelLower: req.body.Label.toLowerCase(), OrganizationId: req.params.idorganization }, function (err, opportunitystatus) {
    //                        if (opportunitystatus) {
    //                            res.json({ type: 'error', message: 'exist name status' });
    //                        }
    //                        else {
    //                            status.Label = req.body.Label,
    //                            status.LabelLower = req.body.Label.toLowerCase(),
    //                            status.Type = req.body.Type
    //                            status.save(function (err) {
    //                                if (err) {
    //                                    res.json(formatedError(err));
    //                                }
    //                                else {
    //                                    res.json({ type: 'sucess', data: status });
    //                                }
    //                            });
    //                        }
    //                    })
    //                }
    //            }
    //        });

    //    });
    //    //////////////////  remove 
    //    api.delete('/status/opportuinty/:idstatus', function (req, res) {
    //        Opportunity.count({ CurrentStatus: req.params.idstatus }, function (err, opportunity) {
    //            if (opportunity > 0) {
    //                res.json({ type: 'error', message: 'there are ' + opportunity + ' opportunity have this status' })
    //            }
    //            else {
    //                OpportunityStatus.findOne({ _id: req.params.idstatus }, function (err, status) {
    //                    if (err) {
    //                        res.json(formatedError(err));
    //                    }
    //                    else {
    //                        if (status) {

    //                            status.remove();
    //                            res.json('Deleted');
    //                        }
    //                        else {
    //                            res.json({ type: 'error', message: 'opportunity status not exist' });
    //                        }
    //                    }
    //                });
    //            }
    //        });
    //    });



    //    /////////email template
    //    api.post('/email_template', function (req, res) {
    //        var emailtemplate = new EmailTemplate(req.body)
    //        emailtemplate.save(function (err) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                res.json({ type: 'success', data: emailtemplate });
    //            }

    //        });

    //    });
    //    api.get('/email_template/:id', function (req, res) {
    //        EmailTemplate.findOne({ _id: req.params.id }, function (err, emailtemplate) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (emailtemplate != null) {
    //                    res.json({ type: 'success', data: emailtemplate });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'email template not exist' });
    //                }
    //            }

    //        });

    //    });
    //    api.get('/organization/email_template/:id', function (req, res) {
    //        EmailTemplate.find({ Organization: req.params.id }, function (err, emailtemplate) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (emailtemplate != null) {
    //                    res.json({ type: 'success', data: emailtemplate });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'email template not exist' });
    //                }
    //            }

    //        });

    //    });
    //    api.put('/email_template/:id', function (req, res) {
    //        EmailTemplate.findOne({ _id: req.params.id }, function (err, emailtemplate) {
    //            if (err) {

    //                res.json(formatedError(err));
    //            } else {
    //                if (emailtemplate != null) {
    //                    emailtemplate.Name = req.body.Name,
    //                    emailtemplate.Subject = req.body.Subject,
    //                    emailtemplate.Body = req.body.Body,
    //                    emailtemplate.Shared = req.body.Shared,
    //                    emailtemplate.AttachmentUrl = req.body.AttachmentUrl,
    //                    emailtemplate.UpdatedBy = req.body.UpdatedBy,
    //                    UpdatedDate = Date.now

    //                    emailtemplate.save(function (err) {
    //                        if (err) {
    //                            res.json(formatedError(err));
    //                        }
    //                        else {
    //                            res.json({ type: 'success', data: emailtemplate });
    //                        }
    //                    });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'email template not exist' });
    //                }
    //            }

    //        });


    //    });
    //    api.delete('/email_template/:id', function (req, res) {
    //        EmailTemplate.findOne({ _id: req.params.id }, function (err, emailtemplate) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (emailtemplate != null) {
    //                    emailtemplate.remove();
    //                    res.json({ type: 'success', data: 'deleted!' });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'email template not exist' });
    //                }
    //            }

    //        });

    //    });



    //    //////////smart view 
    //    api.post('/saved_search', function (req, res) {
    //        var smartview = new SmartView(req.body)
    //        smartview.save(function (err) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                res.json({ type: 'success', data: smartview });
    //            }

    //        });

    //    });
    //    api.get('/saved_search/:id', function (req, res) {
    //        SmartView.findOne({ _id: req.params.id }, function (err, smartview) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (smartview != null) {
    //                    res.json({ type: 'success', data: smartview });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'smart view not exist' });
    //                }
    //            }

    //        });

    //    });
    //    api.get('/organization/saved_search/:id', function (req, res) {
    //        SmartView.find({ Organization: req.params.id }, function (err, smartview) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (smartview != null) {
    //                    res.json({ type: 'success', data: smartview });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'smart view not exist' });
    //                }
    //            }

    //        });

    //    });
    //    api.put('/saved_search/:id', function (req, res) {
    //        SmartView.findOne({ _id: req.params.id }, function (err, smartview) {
    //            if (err) {

    //                res.json(formatedError(err));
    //            } else {
    //                if (smartview != null) {
    //                    smartview.Shared = req.body.Shared,
    //                    smartview.UsedRecently = true,
    //                    smartview.Query = req.body.Query,
    //                    smartview.Name = req.body.Name
    //                    smartview.save(function (err) {
    //                        if (err) {
    //                            res.json(formatedError(err));
    //                        }
    //                        else {
    //                            res.json({ type: 'success', data: smartview });
    //                        }
    //                    });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'smart view not exist' });
    //                }
    //            }

    //        });


    //    });
    //    api.delete('/saved_search/:id', function (req, res) {
    //        SmartView.findOne({ _id: req.params.id }, function (err, smartview) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (smartview != null) {
    //                    smartview.remove();
    //                    res.json({ type: 'success', data: 'deleted!' });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'smart view not exist' });
    //                }
    //            }

    //        });

    //    });



    //    /////// task
    //    api.post('/task', function (req, res) {
    //        var taskdata = new Task(req.body);
    //        taskdata.save(function (err) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                res.json({ type: 'success', data: taskdata });
    //            }

    //        });

    //    });
    //    api.get('/task/:id', function (req, res) {
    //        Task.findOne({ _id: req.params.id }, function (err, task) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (task != null) {
    //                    res.json({ type: 'success', data: task });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'task not exist' });
    //                }
    //            }

    //        });


    //    });
    //    api.put('/task/:id', function (req, res) {
    //        Task.findOne({ _id: req.params.id }, function (err, task) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (task != null) {
    //                    task.Type = req.body.Type,
    //                    task.ObjectId = req.body.ObjectId,
    //                    task.ObjectType = req.body.ObjectType,
    //                    task.AssignTo = req.body.AssignTo,
    //                    task.AssignName = req.body.AssignName,
    //                    task.IsComplete = req.body.IsComplete,
    //                    task.IsDateLess = req.body.IsDateLess,
    //                    task.LeadId = req.body.LeadId,
    //                    task.LeadName = req.body.LeadName,
    //                    task.Text = req.body.Text,
    //                    task.UpdatedDate = Date.now(),
    //                    task.UpdatedBy = req.body.UpdatedBy,
    //                    task.UpdatedByName = req.body.UpdatedByName,
    //                    task.ContactId = req.body.ContactId,
    //                    task.ContactName = req.body.ContactName
    //                    task.save(function (err) {
    //                        if (err) {
    //                            res.json(formatedError(err));

    //                        }
    //                        else {
    //                            res.json({ type: 'success', data: task });
    //                        }

    //                    });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'task not  exist' });
    //                }
    //            }
    //        });
    //    });
    //    api.delete('/task/:id', function (req, res) {
    //        Task.findOne({ _id: req.params.id }, function (err, task) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (task != null) {
    //                    task.remove();
    //                    res.json({ type: 'success', message: 'deleted!' })
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'task not exist' });
    //                }
    //            }
    //        });

    //    });

    //    api.post('/task/:id', function (req, res) {
    //        var query = Task.find({ Organization: req.params.id }, function (err, tasks) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (tasks == null) {
    //                    res.json({ type: 'error', message: 'tasks not exist' });
    //                }

    //            }
    //        });
    //        query.where('' + req.body.Title + '', '' + req.body.Value + '');
    //        query.exec(function (err, docs) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                res.json({ type: 'success', data: docs });
    //            }
    //        });
    //    });
    //    api.put('/bulk/task', function (req, res) {
    //        var count = 0;
    //        var idtasks = req.body.tasksid;
    //        for (var i = 0; i < idtasks.length; i++) {
    //            count++
    //            Task.findById({ _id: idtasks[i] }, function (err, task) {
    //                if (err) {
    //                    res.json(formatedError(err));
    //                }
    //                else {
    //                    if (task != null) {
    //                        task.IsComplete = req.body.IsComplete,
    //                        task.Date = req.body.Date,
    //                        task.IsDateLess = req.body.IsDateLess,
    //                        task.UpdatedDate = Date.now(),
    //                        task.UpdatedBy = req.body.user,
    //                        task.UpdatedByName = req.body.UpdatedByName
    //                        task.save(function (err) {
    //                            if (err) {
    //                                res.json(formatedError(err));
    //                            }
    //                        })
    //                    }
    //                }
    //            });
    //        }
    //        res.json({ type: 'success', data: 'there are ' + count + ' updated !!' })


    //    });



    //    //// activity
    //    api.post('/activity', function (req, res) {
    //        var activity = new Activity(req.body);
    //        activity.save(function (err) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                res.json(activity);
    //            }

    //        })

    //    });
    //    api.put('/activity/:id', function (req, res) {
    //        Activity.findOne({ _id: req.params.id }, function (err, activity) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (activity) {
    //                    activity.value = req.body.Value,
    //                    activity.UpdatedDate = Date.now(),
    //                    activity.UpdatedBy = req.body.UpdatedBy,
    //                    activity.Customfields = req.body.Customfields
    //                    activity.save(function (err) {
    //                        if (err) {
    //                            res.json(formatedError(err));

    //                        }
    //                        else {
    //                            res.json({ type: 'success', data: activity });
    //                        }

    //                    });
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'activity not  exist' });
    //                }
    //            }
    //        });
    //    });
    //    api.delete('/activity/:id', function (req, res) {
    //        Activity.findOne({ _id: req.params.id }, function (err, activity) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (activity != null) {
    //                    activity.remove();
    //                    res.json({ type: 'success', message: 'deleted!' })
    //                }
    //                else {
    //                    res.json({ type: 'error', message: 'activity not exist' });
    //                }
    //            }
    //        });

    //    });


    //    api.put('/activity', function (req, res) {
    //        var countTitle = [req.body.Title];
    //        var query = Activity.find({ OrganizationId: req.body.OrganizationId }, function (err, activity) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                if (activity == null) {
    //                    res.json({ type: 'error', message: 'opportunity not exist' });
    //                }
    //                else {
    //                }
    //            }
    //        });
    //        if (req.body.Title1 != null) {
    //            query.where('' + req.body.Title1 + '', '' + req.body.Value1 + '');
    //        }
    //        if (req.body.Title2 != null) {
    //            query.where('' + req.body.Title2 + '', '' + req.body.Value2 + '');
    //        }
    //        if (req.body.Title3 != null) {
    //            query.where('' + req.body.Title3 + '', '' + req.body.Value3 + '');
    //        }
    //        if (req.body.Title4 != null) {
    //            query.where('' + req.body.Title4 + '', '' + req.body.Value4 + '');
    //        }
    //        query.exec(function (err, docs) {
    //            if (err) {
    //                res.json(formatedError(err));
    //            }
    //            else {
    //                res.json({ type: 'success', data: docs });
    //            }
    //        });
    //    });
    //return api;
};

