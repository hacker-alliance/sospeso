data "archive_file" "hello-zip" {
  type        = "zip"
  source_dir  = "api/hello"
  output_path = "zips/hello.zip"
}


resource "ibm_function_action" "nodehello" {
  name = "hello"

  exec {
    kind = "nodejs:10"
    code = filebase64("${data.archive_file.hello-zip.output_path}")
  }
  publish = true
}

