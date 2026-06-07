package com.cscorner.kaska;

import android.os.Bundle;
import android.os.CancellationSignal;
import android.os.ParcelFileDescriptor;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintDocumentInfo;
import android.print.PageRange;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream; // ✅ MISSING IMPORT FIXED
import java.io.IOException;

public class PDFPrintAdapter extends PrintDocumentAdapter {

    private final File pdfFile;

    public PDFPrintAdapter(File file) {
        this.pdfFile = file;
    }

    @Override
    public void onLayout(PrintAttributes oldAttributes, PrintAttributes newAttributes,
                         CancellationSignal cancellationSignal,
                         LayoutResultCallback callback, Bundle extras) {
        if (cancellationSignal.isCanceled()) {
            callback.onLayoutCancelled();
            return;
        }

        PrintDocumentInfo info = new PrintDocumentInfo.Builder("PrintedText.pdf")
                .setContentType(PrintDocumentInfo.CONTENT_TYPE_DOCUMENT)
                .build();
        callback.onLayoutFinished(info, true);
    }

    @Override
    public void onWrite(PageRange[] pages, ParcelFileDescriptor destination,
                        CancellationSignal cancellationSignal, WriteResultCallback callback) {
        try (FileInputStream in = new FileInputStream(pdfFile);
             FileOutputStream out = new FileOutputStream(destination.getFileDescriptor())) {

            byte[] buffer = new byte[1024];
            int size;
            while ((size = in.read(buffer)) >= 0 && !cancellationSignal.isCanceled()) {
                out.write(buffer, 0, size);
            }

            if (cancellationSignal.isCanceled()) {
                callback.onWriteCancelled();
            } else {
                callback.onWriteFinished(new PageRange[]{PageRange.ALL_PAGES});
            }

        } catch (IOException e) {
            callback.onWriteFailed(e.getMessage());
        }
    }
}
