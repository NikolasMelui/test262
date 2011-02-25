﻿/// Copyright (c) 2009 Microsoft Corporation 
/// 
/// Redistribution and use in source and binary forms, with or without modification, are permitted provided
/// that the following conditions are met: 
///    * Redistributions of source code must retain the above copyright notice, this list of conditions and
///      the following disclaimer. 
///    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and 
///      the following disclaimer in the documentation and/or other materials provided with the distribution.  
///    * Neither the name of Microsoft nor the names of its contributors may be used to
///      endorse or promote products derived from this software without specific prior written permission.
/// 
/// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
/// IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
/// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
/// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
/// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
/// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
/// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
/// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

ES5Harness.registerTest({
    id: "15.2.3.7-6-a-93-1",

    path: "TestCases/chapter15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-93-1.js",

    description: "Object.defineProperties will update [[Value]] attribute of named data property 'P' successfully when [[Configurable]] attribute is true and [[Writable]] attribute is false but not when both are false (8.12.9 - step Note & 10.a.ii.1)",

    test: function testcase() {

        var obj = {};

        Object.defineProperty(obj, "property", {
            value: 1001,
            writable: false,
            configurable: true
        });
        
        Object.defineProperty(obj, "property1", {
            value: 1003,
            writable: false,
            configurable: false
        });

        try {
            Object.defineProperties(obj, {
                property: {
                    value: 1002
                },
                property1: {
                    value: 1004
                }
            });

            return false;
        } catch (e) {
            return e instanceof TypeError &&
                dataPropertyAttributesAreCorrect(obj, "property", 1002, false, false, true) &&
                dataPropertyAttributesAreCorrect(obj, "property1", 1003, false, false, false);
        }
    },

    precondition: function prereq() {
        return fnExists(Object.defineProperties) && fnExists(Object.defineProperty);
    }
});